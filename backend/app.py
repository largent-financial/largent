from pathlib import Path

import base64
import click
from cryptography.fernet import Fernet
from datetime import datetime
from email.message import EmailMessage
import hashlib
import json
import secrets
import smtplib
import ssl
import string
from urllib import error as urlerror
from urllib import request as urlrequest
from uuid import UUID

from flask import Flask, jsonify, request, send_from_directory, session
from sqlalchemy import func
from werkzeug.security import check_password_hash, generate_password_hash

from .config import Config
from .extensions import db, migrate


ROOT_DIR = Path(__file__).resolve().parent.parent


def create_app() -> Flask:
    app = Flask(__name__, static_folder=str(ROOT_DIR), static_url_path="")
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from .models import (
        BudgetCategory,
        BudgetSection,
        BudgetStatus,
        DeductionInputMode,
        FilingStatus,
        IncomeMethod,
        IncomeProfile,
        IncomeProfileDeduction,
        MonthlyBudget,
        PayFrequency,
        PlaidAccount,
        PlaidItem,
        PlaidTransactionRaw,
        PlaidTransactionReview,
        PlaidWebhookEvent,
        TaxTreatment,
        Transaction,
        User,
        UserEntitlement,
        UserSubscription,
    )

    @app.cli.command("init-db")
    def init_db_command():
        schema_path = ROOT_DIR / "backend" / "schema.sql"
        schema_sql = schema_path.read_text()
        raw_connection = db.engine.raw_connection()
        try:
            with raw_connection.cursor() as cursor:
                cursor.execute(schema_sql)
            raw_connection.commit()
        finally:
            raw_connection.close()
        click.echo("Database schema applied.")

    @app.cli.command("sync-auth-recovery")
    def sync_auth_recovery_command():
        raw_connection = db.engine.raw_connection()
        try:
            with raw_connection.cursor() as cursor:
                cursor.execute(
                    """
                    alter table users
                    add column if not exists pw_code_hash text,
                    add column if not exists pw_code_updated_at timestamptz
                    """
                )
            raw_connection.commit()
        finally:
            raw_connection.close()

        users_missing_codes = db.session.execute(db.select(User).filter(User.pw_code_hash.is_(None))).scalars().all()
        for user in users_missing_codes:
            recovery_code = generate_recovery_code()
            user.pw_code_hash = generate_password_hash(recovery_code)
            user.pw_code_updated_at = datetime.utcnow()
        if users_missing_codes:
            db.session.commit()
        click.echo("Auth recovery columns synced.")

    @app.cli.command("sync-banking-billing-schema")
    def sync_banking_billing_schema_command():
        raw_connection = db.engine.raw_connection()
        try:
            with raw_connection.cursor() as cursor:
                cursor.execute(
                    """
                    create table if not exists user_subscriptions (
                      id uuid primary key default gen_random_uuid(),
                      user_id uuid not null references users(id) on delete cascade,
                      provider varchar(30) not null default 'stripe',
                      provider_customer_id varchar(255),
                      provider_subscription_id varchar(255) unique,
                      plan_key varchar(50) not null,
                      status varchar(30) not null,
                      current_period_start timestamptz,
                      current_period_end timestamptz,
                      cancel_at_period_end boolean not null default false,
                      canceled_at timestamptz,
                      created_at timestamptz not null default now(),
                      updated_at timestamptz not null default now()
                    );
                    create index if not exists user_subscriptions_user_status_idx on user_subscriptions(user_id, status);

                    create table if not exists user_entitlements (
                      user_id uuid primary key references users(id) on delete cascade,
                      premium_access boolean not null default false,
                      bank_sync_enabled boolean not null default false,
                      max_linked_accounts integer not null default 2,
                      source varchar(30) not null default 'system',
                      updated_at timestamptz not null default now()
                    );

                    create table if not exists plaid_items (
                      id uuid primary key default gen_random_uuid(),
                      user_id uuid not null references users(id) on delete cascade,
                      plaid_item_id varchar(255) not null unique,
                      plaid_access_token_encrypted text not null,
                      institution_id varchar(255),
                      institution_name varchar(255),
                      status varchar(30) not null default 'active',
                      sync_cursor text,
                      error_code varchar(100),
                      error_message text,
                      last_webhook_at timestamptz,
                      last_synced_at timestamptz,
                      disconnected_at timestamptz,
                      created_at timestamptz not null default now(),
                      updated_at timestamptz not null default now()
                    );
                    create index if not exists plaid_items_user_status_idx on plaid_items(user_id, status);

                    create table if not exists plaid_accounts (
                      id uuid primary key default gen_random_uuid(),
                      user_id uuid not null references users(id) on delete cascade,
                      plaid_item_row_id uuid not null references plaid_items(id) on delete cascade,
                      plaid_account_id varchar(255) not null unique,
                      persistent_account_id varchar(255),
                      name varchar(255) not null,
                      official_name varchar(255),
                      mask varchar(20),
                      type varchar(50) not null,
                      subtype varchar(50),
                      is_active boolean not null default true,
                      last_synced_at timestamptz,
                      created_at timestamptz not null default now(),
                      updated_at timestamptz not null default now()
                    );
                    create index if not exists plaid_accounts_user_active_idx on plaid_accounts(user_id, is_active);
                    create index if not exists plaid_accounts_item_active_idx on plaid_accounts(plaid_item_row_id, is_active);

                    create table if not exists plaid_transactions_raw (
                      id uuid primary key default gen_random_uuid(),
                      user_id uuid not null references users(id) on delete cascade,
                      plaid_item_row_id uuid not null references plaid_items(id) on delete cascade,
                      plaid_account_row_id uuid not null references plaid_accounts(id) on delete cascade,
                      plaid_transaction_id varchar(255) not null unique,
                      pending_transaction_id varchar(255),
                      account_owner varchar(255),
                      name varchar(255) not null,
                      merchant_name varchar(255),
                      amount_cents integer not null,
                      iso_currency_code varchar(10) not null default 'USD',
                      authorized_date date,
                      posted_date date,
                      category_primary varchar(100),
                      category_detailed varchar(150),
                      personal_finance_category_primary varchar(100),
                      personal_finance_category_detailed varchar(150),
                      payment_channel varchar(50),
                      transaction_type varchar(50),
                      pending boolean not null default false,
                      raw_json jsonb not null default '{}'::jsonb,
                      removed_at timestamptz,
                      created_at timestamptz not null default now(),
                      updated_at timestamptz not null default now()
                    );
                    create index if not exists plaid_transactions_user_posted_idx on plaid_transactions_raw(user_id, posted_date desc);
                    create index if not exists plaid_transactions_account_posted_idx on plaid_transactions_raw(plaid_account_row_id, posted_date desc);
                    create index if not exists plaid_transactions_user_pending_idx on plaid_transactions_raw(user_id, pending);

                    create table if not exists plaid_transaction_reviews (
                      id uuid primary key default gen_random_uuid(),
                      plaid_transaction_row_id uuid not null unique references plaid_transactions_raw(id) on delete cascade,
                      user_id uuid not null references users(id) on delete cascade,
                      monthly_budget_id uuid references monthly_budgets(id) on delete set null,
                      budget_category_id uuid references budget_categories(id) on delete set null,
                      ledger_transaction_id uuid references transactions(id) on delete set null,
                      status varchar(30) not null default 'unreviewed',
                      memo varchar(255),
                      reviewed_at timestamptz,
                      created_at timestamptz not null default now(),
                      updated_at timestamptz not null default now()
                    );
                    create index if not exists plaid_transaction_reviews_user_status_idx on plaid_transaction_reviews(user_id, status);

                    create table if not exists plaid_webhook_events (
                      id uuid primary key default gen_random_uuid(),
                      user_id uuid references users(id) on delete set null,
                      plaid_item_row_id uuid references plaid_items(id) on delete set null,
                      plaid_event_id varchar(255),
                      webhook_type varchar(100) not null,
                      webhook_code varchar(100) not null,
                      payload jsonb not null default '{}'::jsonb,
                      processed_at timestamptz,
                      created_at timestamptz not null default now()
                    );
                    create index if not exists plaid_webhook_events_item_created_idx on plaid_webhook_events(plaid_item_row_id, created_at desc);
                    create index if not exists plaid_webhook_events_type_code_idx on plaid_webhook_events(webhook_type, webhook_code);
                    """
                )
            raw_connection.commit()
        finally:
            raw_connection.close()

        db.session.execute(
            db.text(
                """
                insert into user_entitlements (user_id, premium_access, bank_sync_enabled, max_linked_accounts, source, updated_at)
                select id, false, false, 2, 'system', now()
                from users
                on conflict (user_id) do nothing
                """
            )
        )
        db.session.commit()
        click.echo("Banking and billing schema synced.")

    @app.cli.command("grant-premium")
    @click.option("--email", required=True, help="User email to grant premium access to.")
    def grant_premium_command(email: str):
        normalized_email = email.strip().lower()
        user = db.session.execute(db.select(User).filter_by(email=normalized_email)).scalar_one_or_none()
        if not user:
            click.echo("User not found.")
            return

        entitlement = get_user_entitlement(user, create_if_missing=True)
        entitlement.premium_access = True
        entitlement.bank_sync_enabled = True
        entitlement.max_linked_accounts = 2
        entitlement.source = "manual"
        db.session.commit()
        click.echo(f"Premium access granted to {normalized_email}.")

    def serialize_user(user: User):
        return {
            "id": str(user.id),
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
        }

    def serialize_subscription(subscription: UserSubscription | None):
        if not subscription:
            return None

        return {
            "id": str(subscription.id),
            "provider": subscription.provider,
            "planKey": subscription.plan_key,
            "status": subscription.status,
            "providerCustomerId": subscription.provider_customer_id,
            "providerSubscriptionId": subscription.provider_subscription_id,
            "currentPeriodStart": subscription.current_period_start.isoformat() if subscription.current_period_start else None,
            "currentPeriodEnd": subscription.current_period_end.isoformat() if subscription.current_period_end else None,
            "cancelAtPeriodEnd": subscription.cancel_at_period_end,
            "canceledAt": subscription.canceled_at.isoformat() if subscription.canceled_at else None,
        }

    def serialize_entitlement(entitlement: UserEntitlement | None):
        if not entitlement:
            return {
                "premiumAccess": False,
                "bankSyncEnabled": False,
                "maxLinkedAccounts": 2,
                "source": "system",
            }

        return {
            "premiumAccess": entitlement.premium_access,
            "bankSyncEnabled": entitlement.bank_sync_enabled,
            "maxLinkedAccounts": entitlement.max_linked_accounts,
            "source": entitlement.source,
        }

    def serialize_plaid_account(account: PlaidAccount):
        return {
            "id": str(account.id),
            "plaidAccountId": account.plaid_account_id,
            "persistentAccountId": account.persistent_account_id,
            "name": account.name,
            "officialName": account.official_name,
            "mask": account.mask,
            "type": account.type,
            "subtype": account.subtype,
            "isActive": account.is_active,
            "lastSyncedAt": account.last_synced_at.isoformat() if account.last_synced_at else None,
        }

    def serialize_plaid_item(item: PlaidItem):
        return {
            "id": str(item.id),
            "plaidItemId": item.plaid_item_id,
            "institutionId": item.institution_id,
            "institutionName": item.institution_name,
            "status": item.status,
            "lastWebhookAt": item.last_webhook_at.isoformat() if item.last_webhook_at else None,
            "lastSyncedAt": item.last_synced_at.isoformat() if item.last_synced_at else None,
            "disconnectedAt": item.disconnected_at.isoformat() if item.disconnected_at else None,
            "accounts": [
                serialize_plaid_account(account)
                for account in sorted(item.accounts, key=lambda account: (account.created_at, account.name))
            ],
        }

    def cents_from_amount(value) -> int:
        return int(round(float(value or 0) * 100))

    def amount_from_cents(value) -> float:
        return round((value or 0) / 100, 2)

    def get_plaid_base_url() -> str:
        env = (app.config.get("PLAID_ENV") or "sandbox").lower()
        env_map = {
            "sandbox": "https://sandbox.plaid.com",
            "development": "https://development.plaid.com",
            "production": "https://production.plaid.com",
        }
        return env_map.get(env, env_map["sandbox"])

    def get_plaid_products() -> list[str]:
        raw_products = app.config.get("PLAID_PRODUCTS") or "transactions"
        return [product.strip() for product in raw_products.split(",") if product.strip()]

    def get_plaid_country_codes() -> list[str]:
        raw_codes = app.config.get("PLAID_COUNTRY_CODES") or "US"
        return [code.strip().upper() for code in raw_codes.split(",") if code.strip()]

    def get_plaid_webhook_url() -> str | None:
        configured = app.config.get("PLAID_WEBHOOK_URL")
        if configured:
            return configured

        app_base_url = (app.config.get("APP_BASE_URL") or "").rstrip("/")
        if app_base_url.startswith("http://") or app_base_url.startswith("https://"):
            return f"{app_base_url}/api/plaid/webhooks"
        return None

    def get_plaid_fernet() -> Fernet:
        configured_key = app.config.get("PLAID_TOKEN_ENCRYPTION_KEY")
        if configured_key:
            return Fernet(configured_key.encode("utf-8"))

        secret_key = app.config.get("SECRET_KEY") or "dev-secret-key"
        derived_key = base64.urlsafe_b64encode(hashlib.sha256(secret_key.encode("utf-8")).digest())
        return Fernet(derived_key)

    def encrypt_plaid_access_token(access_token: str) -> str:
        return get_plaid_fernet().encrypt(access_token.encode("utf-8")).decode("utf-8")

    def decrypt_plaid_access_token(encrypted_access_token: str) -> str:
        return get_plaid_fernet().decrypt(encrypted_access_token.encode("utf-8")).decode("utf-8")

    def plaid_api_request(path: str, payload: dict) -> dict:
        client_id = app.config.get("PLAID_CLIENT_ID")
        secret = app.config.get("PLAID_SECRET")
        if not client_id or not secret:
            raise RuntimeError("Plaid credentials are not configured.")

        request_body = {
            **payload,
            "client_id": client_id,
            "secret": secret,
        }
        request_data = json.dumps(request_body).encode("utf-8")
        request_url = f"{get_plaid_base_url()}{path}"
        plaid_request = urlrequest.Request(
            request_url,
            data=request_data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with urlrequest.urlopen(plaid_request, timeout=30) as response:
                return json.loads(response.read().decode("utf-8"))
        except urlerror.HTTPError as error:
            error_payload = error.read().decode("utf-8") if error.fp else ""
            try:
                parsed_payload = json.loads(error_payload) if error_payload else {}
            except json.JSONDecodeError:
                parsed_payload = {}
            message = parsed_payload.get("error_message") or parsed_payload.get("display_message") or "Plaid request failed."
            raise ValueError(message) from error

    def ensure_bank_sync_access(user: User):
        entitlement = get_user_entitlement(user, create_if_missing=True)
        if not entitlement.premium_access or not entitlement.bank_sync_enabled:
            raise PermissionError("Bank sync is available with Largent Premium.")
        return entitlement

    def month_start_from_label(month_label: str):
        return datetime.strptime(month_label, "%B %Y").date().replace(day=1)

    def serialize_income_profile(profile: IncomeProfile | None):
        if not profile:
            return None

        return {
            "id": str(profile.id),
            "method": profile.income_method.value,
            "annualSalary": amount_from_cents(profile.annual_salary_cents),
            "manualMonthlyIncome": amount_from_cents(profile.manual_monthly_take_home_cents),
            "state": profile.state_code,
            "filingStatus": profile.filing_status.value if profile.filing_status else None,
            "payFrequency": profile.pay_frequency.value if profile.pay_frequency else None,
            "extraWithholding": amount_from_cents(profile.extra_withholding_cents),
            "extraWithholdingTaxTreatment": profile.extra_withholding_tax_treatment.value,
            "results": {
                "monthlyGross": amount_from_cents(profile.estimated_gross_monthly_cents),
                "monthlyFederalTax": amount_from_cents(profile.estimated_federal_monthly_cents),
                "monthlyStateTax": amount_from_cents(profile.estimated_state_monthly_cents),
                "monthlyFica": amount_from_cents(profile.estimated_fica_monthly_cents),
                "monthlyNet": amount_from_cents(profile.estimated_net_monthly_cents),
            },
            "deductions": [
                {
                    "key": deduction.deduction_key,
                    "title": deduction.title,
                    "inputMode": "yearly" if deduction.input_mode == DeductionInputMode.AMOUNT else "percent",
                    "yearlyAmount": amount_from_cents(deduction.annual_amount_cents),
                    "percent": round((deduction.percent_bps or 0) / 100, 2),
                    "taxTreatment": "pretax" if deduction.tax_treatment == TaxTreatment.PRE_TAX else "posttax",
                    "enabled": deduction.is_enabled,
                }
                for deduction in sorted(profile.deductions, key=lambda item: (item.sort_order, item.created_at))
            ],
        }

    def serialize_budget(budget):
        if not budget:
            return None

        sections = []
        for section in sorted(budget.sections, key=lambda item: (item.sort_order, item.created_at)):
            sections.append(
                {
                    "id": str(section.id),
                    "sectionKey": section.section_key,
                    "title": section.title,
                    "categories": [
                        {
                            "id": str(category.id),
                            "title": category.title,
                            "amount": amount_from_cents(category.allocated_cents),
                            "isArchived": category.is_archived,
                        }
                        for category in sorted(section.categories, key=lambda item: (item.sort_order, item.created_at))
                        if not category.is_archived
                    ],
                }
            )

        category_map = {
            str(category.id): (section.title, category.title)
            for section in budget.sections
            for category in section.categories
        }

        transactions = [
            {
                "id": str(transaction.id),
                "amount": amount_from_cents(transaction.amount_cents),
                "date": transaction.purchased_on.isoformat(),
                "categoryId": str(transaction.budget_category_id),
                "categoryTitle": category_map.get(str(transaction.budget_category_id), ("", ""))[1],
                "sectionTitle": category_map.get(str(transaction.budget_category_id), ("", ""))[0],
                "memo": transaction.memo or "",
            }
            for transaction in sorted(budget.transactions, key=lambda item: item.created_at)
            if transaction.deleted_at is None
        ]

        return {
            "id": str(budget.id),
            "monthLabel": budget.month_label,
            "monthlyIncome": amount_from_cents(budget.net_monthly_income_cents),
            "allocatedTotal": amount_from_cents(budget.allocated_total_cents),
            "remainingToAllocate": amount_from_cents(budget.remaining_to_allocate_cents),
            "status": budget.status.value,
            "sections": sections,
            "transactions": transactions,
        }

    def get_current_income_profile(user: User):
        return (
            db.session.execute(
                db.select(IncomeProfile)
                .filter_by(user_id=user.id, is_current=True)
                .order_by(IncomeProfile.created_at.desc())
            )
            .scalars()
            .first()
        )

    def get_current_month_budget(user: User):
        return (
            db.session.execute(
                db.select(MonthlyBudget)
                .filter_by(user_id=user.id)
                .order_by(MonthlyBudget.budget_month.desc(), MonthlyBudget.created_at.desc())
            )
            .scalars()
            .first()
        )

    def get_user_entitlement(user: User, create_if_missing: bool = False):
        entitlement = db.session.get(UserEntitlement, user.id)
        if not entitlement and create_if_missing:
            entitlement = UserEntitlement(user_id=user.id)
            db.session.add(entitlement)
            db.session.flush()
        return entitlement

    def get_active_subscription(user: User):
        return (
            db.session.execute(
                db.select(UserSubscription)
                .filter_by(user_id=user.id)
                .order_by(UserSubscription.created_at.desc())
            )
            .scalars()
            .first()
        )

    def get_plaid_items_for_user(user: User):
        return (
            db.session.execute(
                db.select(PlaidItem)
                .filter_by(user_id=user.id)
                .order_by(PlaidItem.created_at.asc())
            )
            .scalars()
            .all()
        )

    def get_active_plaid_accounts_count(user: User) -> int:
        return int(
            db.session.execute(
                db.select(func.count(PlaidAccount.id))
                .filter_by(user_id=user.id, is_active=True)
            ).scalar_one()
        )

    def save_income_profile(user: User, payload: dict):
        existing_profile = get_current_income_profile(user)
        if existing_profile:
            profile = existing_profile
        else:
            profile = IncomeProfile(user_id=user.id, is_current=True)
            db.session.add(profile)

        method = payload.get("method") or "salary"
        profile.income_method = IncomeMethod.MANUAL if method == "manual" else IncomeMethod.SALARY
        profile.annual_salary_cents = cents_from_amount(payload.get("annualSalary")) if method == "salary" else None
        profile.manual_monthly_take_home_cents = cents_from_amount(payload.get("manualMonthlyIncome")) if method == "manual" else None
        state_code = payload.get("stateCode")
        profile.state_code = state_code
        filing_status = payload.get("filingStatus")
        profile.filing_status = FilingStatus(filing_status) if filing_status else None
        pay_frequency = payload.get("payFrequency")
        profile.pay_frequency = PayFrequency(pay_frequency) if pay_frequency else None
        profile.extra_withholding_cents = cents_from_amount(payload.get("extraWithholding"))
        extra_treatment = payload.get("extraWithholdingTaxTreatment") or "posttax"
        profile.extra_withholding_tax_treatment = TaxTreatment.PRE_TAX if extra_treatment == "pretax" else TaxTreatment.POST_TAX

        results = payload.get("results") or {}
        profile.estimated_gross_monthly_cents = cents_from_amount(results.get("monthlyGross"))
        profile.estimated_federal_monthly_cents = cents_from_amount(results.get("monthlyFederalTax"))
        profile.estimated_state_monthly_cents = cents_from_amount(results.get("monthlyStateTax"))
        profile.estimated_fica_monthly_cents = cents_from_amount(results.get("monthlyFica"))
        profile.estimated_net_monthly_cents = cents_from_amount(results.get("monthlyNet"))

        for deduction in list(profile.deductions):
            db.session.delete(deduction)
        db.session.flush()

        for index, deduction in enumerate(payload.get("deductions") or []):
            deduction_mode = deduction.get("inputMode") or "yearly"
            profile.deductions.append(
                IncomeProfileDeduction(
                    deduction_key=deduction.get("key"),
                    title=deduction.get("title") or deduction.get("key"),
                    input_mode=DeductionInputMode.AMOUNT if deduction_mode == "yearly" else DeductionInputMode.PERCENT,
                    annual_amount_cents=cents_from_amount(deduction.get("yearlyAmount")) if deduction.get("yearlyAmount") is not None else 0,
                    percent_bps=int(round(float(deduction.get("percent") or 0) * 100)),
                    tax_treatment=TaxTreatment.PRE_TAX if deduction.get("taxTreatment") == "pretax" else TaxTreatment.POST_TAX,
                    is_enabled=bool(deduction.get("enabled")),
                    sort_order=index,
                )
            )

        return profile

    @app.get("/api/app-state")
    def app_state():
        user = get_current_user()
        if not user:
            return jsonify(
                {
                    "authenticated": False,
                    "user": None,
                    "incomeProfile": None,
                    "monthlyBudget": None,
                    "hasCompletedOnboarding": False,
                }
            )

        income_profile = get_current_income_profile(user)
        monthly_budget = get_current_month_budget(user)

        return jsonify(
            {
                "authenticated": True,
                "user": serialize_user(user),
                "incomeProfile": serialize_income_profile(income_profile),
                "monthlyBudget": serialize_budget(monthly_budget),
                "hasCompletedOnboarding": bool(income_profile and monthly_budget),
            }
        )

    @app.get("/api/premium/status")
    def premium_status():
        user = get_current_user()
        if not user:
            return jsonify({"message": "You must be logged in to view premium status."}), 401

        entitlement = get_user_entitlement(user, create_if_missing=True)
        subscription = get_active_subscription(user)
        db.session.commit()

        return jsonify(
            {
                "user": serialize_user(user),
                "entitlement": serialize_entitlement(entitlement),
                "subscription": serialize_subscription(subscription),
            }
        )

    @app.get("/api/plaid/status")
    def plaid_status():
        user = get_current_user()
        if not user:
            return jsonify({"message": "You must be logged in to view bank sync status."}), 401

        entitlement = get_user_entitlement(user, create_if_missing=True)
        items = get_plaid_items_for_user(user)
        active_accounts_count = get_active_plaid_accounts_count(user)
        db.session.commit()

        return jsonify(
            {
                "entitlement": serialize_entitlement(entitlement),
                "summary": {
                    "activeConnectedAccounts": active_accounts_count,
                    "maxLinkedAccounts": entitlement.max_linked_accounts if entitlement else 2,
                    "canLinkMoreAccounts": active_accounts_count < (entitlement.max_linked_accounts if entitlement else 2),
                    "premiumRequired": not (entitlement.premium_access and entitlement.bank_sync_enabled) if entitlement else True,
                },
                "items": [serialize_plaid_item(item) for item in items],
            }
        )

    @app.post("/api/plaid/link-token")
    def create_plaid_link_token():
        user = get_current_user()
        if not user:
            return jsonify({"message": "You must be logged in to connect a bank account."}), 401

        try:
            entitlement = ensure_bank_sync_access(user)
        except PermissionError as error:
            db.session.commit()
            return jsonify({"message": str(error)}), 403

        active_accounts_count = get_active_plaid_accounts_count(user)
        if active_accounts_count >= entitlement.max_linked_accounts:
            db.session.commit()
            return jsonify({"message": "You have already reached your 2 connected account limit."}), 403

        webhook_url = get_plaid_webhook_url()
        plaid_payload = {
            "client_name": "Largent",
            "country_codes": get_plaid_country_codes(),
            "language": "en",
            "products": get_plaid_products(),
            "user": {"client_user_id": str(user.id)},
        }
        if webhook_url:
            plaid_payload["webhook"] = webhook_url

        try:
            plaid_response = plaid_api_request("/link/token/create", plaid_payload)
        except ValueError as error:
            db.session.rollback()
            return jsonify({"message": str(error)}), 502

        db.session.commit()
        return jsonify(
            {
                "linkToken": plaid_response.get("link_token"),
                "expiration": plaid_response.get("expiration"),
                "requestId": plaid_response.get("request_id"),
            }
        )

    @app.post("/api/plaid/exchange-public-token")
    def exchange_plaid_public_token():
        user = get_current_user()
        if not user:
            return jsonify({"message": "You must be logged in to connect a bank account."}), 401

        payload = request.get_json(silent=True) or {}
        public_token = payload.get("publicToken")
        metadata = payload.get("metadata") or {}
        if not public_token:
            return jsonify({"message": "Plaid public token is required."}), 400

        try:
            entitlement = ensure_bank_sync_access(user)
        except PermissionError as error:
            db.session.commit()
            return jsonify({"message": str(error)}), 403

        active_accounts_count = get_active_plaid_accounts_count(user)
        if active_accounts_count >= entitlement.max_linked_accounts:
            db.session.commit()
            return jsonify({"message": "You have already reached your 2 connected account limit."}), 403

        try:
            exchange_response = plaid_api_request("/item/public_token/exchange", {"public_token": public_token})
            access_token = exchange_response["access_token"]
            plaid_item_id = exchange_response["item_id"]
            accounts_response = plaid_api_request("/accounts/get", {"access_token": access_token})
        except ValueError as error:
            db.session.rollback()
            return jsonify({"message": str(error)}), 502

        accounts = accounts_response.get("accounts") or []
        metadata_accounts = metadata.get("accounts") or []
        selected_account_ids_in_order = [
            account.get("id")
            for account in metadata_accounts
            if account.get("id")
        ]
        if selected_account_ids_in_order:
            selected_lookup = set(selected_account_ids_in_order)
            accounts_by_id = {
                account.get("account_id"): account
                for account in accounts
                if account.get("account_id")
            }
            ordered_selected_accounts = [
                accounts_by_id[account_id]
                for account_id in selected_account_ids_in_order
                if account_id in selected_lookup and account_id in accounts_by_id
            ]
            accounts = ordered_selected_accounts

        remaining_slots = max(0, entitlement.max_linked_accounts - active_accounts_count)
        if remaining_slots <= 0:
            try:
                plaid_api_request("/item/remove", {"access_token": access_token})
            except Exception:
                pass
            db.session.rollback()
            return jsonify({"message": f"You can connect up to {entitlement.max_linked_accounts} bank accounts on Premium."}), 400

        if len(accounts) > remaining_slots:
            accounts = accounts[:remaining_slots]

        institution = metadata.get("institution") or {}
        existing_item = db.session.execute(db.select(PlaidItem).filter_by(plaid_item_id=plaid_item_id)).scalar_one_or_none()
        if existing_item and existing_item.user_id != user.id:
            try:
                plaid_api_request("/item/remove", {"access_token": access_token})
            except Exception:
                pass
            db.session.rollback()
            return jsonify({"message": "This bank connection is already linked to another user."}), 409

        if existing_item:
            plaid_item = existing_item
            plaid_item.plaid_access_token_encrypted = encrypt_plaid_access_token(access_token)
            plaid_item.institution_id = institution.get("institution_id") or plaid_item.institution_id
            plaid_item.institution_name = institution.get("name") or plaid_item.institution_name
            plaid_item.status = "active"
            plaid_item.error_code = None
            plaid_item.error_message = None
            plaid_item.disconnected_at = None
            plaid_item.last_synced_at = datetime.utcnow()
        else:
            plaid_item = PlaidItem(
                user_id=user.id,
                plaid_item_id=plaid_item_id,
                plaid_access_token_encrypted=encrypt_plaid_access_token(access_token),
                institution_id=institution.get("institution_id"),
                institution_name=institution.get("name"),
                status="active",
                last_synced_at=datetime.utcnow(),
            )
            db.session.add(plaid_item)
            db.session.flush()

        for account_payload in accounts:
            existing_account = db.session.execute(
                db.select(PlaidAccount).filter_by(plaid_account_id=account_payload["account_id"])
            ).scalar_one_or_none()

            if existing_account:
                existing_account.user_id = user.id
                existing_account.plaid_item_row_id = plaid_item.id
                existing_account.persistent_account_id = account_payload.get("persistent_account_id")
                existing_account.name = account_payload.get("name") or existing_account.name
                existing_account.official_name = account_payload.get("official_name")
                existing_account.mask = account_payload.get("mask")
                existing_account.type = account_payload.get("type") or existing_account.type
                existing_account.subtype = account_payload.get("subtype")
                existing_account.is_active = True
                existing_account.last_synced_at = datetime.utcnow()
                continue

            db.session.add(
                PlaidAccount(
                    user_id=user.id,
                    plaid_item_row_id=plaid_item.id,
                    plaid_account_id=account_payload["account_id"],
                    persistent_account_id=account_payload.get("persistent_account_id"),
                    name=account_payload.get("name") or "Connected account",
                    official_name=account_payload.get("official_name"),
                    mask=account_payload.get("mask"),
                    type=account_payload.get("type") or "unknown",
                    subtype=account_payload.get("subtype"),
                    is_active=True,
                    last_synced_at=datetime.utcnow(),
                )
            )

        db.session.commit()
        db.session.refresh(plaid_item)

        return jsonify(
            {
                "message": "Bank account connected successfully.",
                "item": serialize_plaid_item(plaid_item),
                "summary": {
                    "activeConnectedAccounts": get_active_plaid_accounts_count(user),
                    "maxLinkedAccounts": entitlement.max_linked_accounts,
                },
            }
        )

    @app.post("/api/plaid/webhooks")
    def plaid_webhooks():
        payload = request.get_json(silent=True) or {}
        plaid_item_id = payload.get("item_id")
        item = None
        user_id = None
        if plaid_item_id:
            item = db.session.execute(db.select(PlaidItem).filter_by(plaid_item_id=plaid_item_id)).scalar_one_or_none()
            if item:
                item.last_webhook_at = datetime.utcnow()
                user_id = item.user_id

        db.session.add(
            PlaidWebhookEvent(
                user_id=user_id,
                plaid_item_row_id=item.id if item else None,
                plaid_event_id=payload.get("webhook_id") or payload.get("request_id"),
                webhook_type=payload.get("webhook_type") or "unknown",
                webhook_code=payload.get("webhook_code") or "unknown",
                payload=payload,
                processed_at=datetime.utcnow(),
            )
        )
        db.session.commit()
        return jsonify({"status": "ok"})

    def is_strong_password(password: str) -> bool:
        return len(password) >= 8 and any(character.isdigit() for character in password) and any(
            not character.isalnum() for character in password
        )

    def generate_recovery_code() -> str:
        alphabet = string.ascii_uppercase + string.digits
        return "".join(secrets.choice(alphabet) for _ in range(12))

    def rotate_recovery_code(user: User) -> str:
        recovery_code = generate_recovery_code()
        user.pw_code_hash = generate_password_hash(recovery_code)
        user.pw_code_updated_at = datetime.utcnow()
        return recovery_code

    def send_email(recipient_email: str, subject: str, content: str) -> None:
        if not app.config.get("MAIL_USERNAME") or not app.config.get("MAIL_PASSWORD"):
            raise RuntimeError("Mail credentials are not configured.")

        message = EmailMessage()
        message["Subject"] = subject
        message["From"] = app.config.get("MAIL_DEFAULT_SENDER") or app.config.get("MAIL_USERNAME")
        message["To"] = recipient_email
        message.set_content(content)

        mail_server = app.config.get("MAIL_SERVER")
        mail_port = app.config.get("MAIL_PORT")

        if app.config.get("MAIL_USE_SSL"):
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(mail_server, mail_port, context=context) as smtp:
                smtp.login(app.config["MAIL_USERNAME"], app.config["MAIL_PASSWORD"])
                smtp.send_message(message)
            return

        with smtplib.SMTP(mail_server, mail_port) as smtp:
            smtp.starttls(context=ssl.create_default_context())
            smtp.login(app.config["MAIL_USERNAME"], app.config["MAIL_PASSWORD"])
            smtp.send_message(message)

    def send_recovery_email(recipient_email: str, recovery_code: str) -> None:
        send_email(
            recipient_email,
            "Your Largent password recovery code",
            (
                "Use this recovery code to reset your Largent password:\n\n"
                f"{recovery_code}\n\n"
                "Copy the code, return to the app, and paste it into the recovery form.\n"
                "If you did not request this, you can ignore this email."
            ),
        )

    def send_welcome_email(user: User) -> None:
        send_email(
            user.email,
            "Welcome to Largent",
            (
                f"Hi {user.first_name},\n\n"
                "Welcome to Largent — we’re glad you’re here.\n\n"
                "Your budget should feel clear, not overwhelming. Largent is here to help you see what’s coming in, "
                "decide where it should go, and stay on top of it throughout the month.\n\n"
                "Here’s the best way to get started:\n"
                "1. Complete your income setup\n"
                "2. Save your monthly ledger\n"
                "3. Log spending as it happens so your dashboard stays accurate\n"
                "4. Revisit your categories anytime and adjust them as your month changes\n\n"
                "Largent is built to help you budget, plan, and grow — without the clutter.\n\n"
                "Thanks for getting started,\n"
                "The Largent Team"
            ),
        )

    def get_current_user():
        user_id = session.get("user_id")
        if not user_id:
            return None
        try:
            return db.session.get(User, UUID(user_id))
        except (ValueError, TypeError):
            session.clear()
            return None

    @app.post("/api/auth/signup")
    def signup():
        payload = request.get_json(silent=True) or {}
        first_name = (payload.get("firstName") or "").strip()
        last_name = (payload.get("lastName") or "").strip()
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password") or ""
        confirm_password = payload.get("confirmPassword") or ""

        if not first_name or not last_name or not email or not password or not confirm_password:
            return jsonify({"message": "Please complete every field to create your account."}), 400

        if password != confirm_password:
            return jsonify({"message": "Passwords do not match."}), 400

        if not is_strong_password(password):
            return jsonify({"message": "Password must be at least 8 characters and include 1 number and 1 special character."}), 400

        existing_user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if existing_user:
            return jsonify({"message": "An account with that email already exists. Please log in."}), 409

        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password_hash=generate_password_hash(password),
            pw_code_hash=generate_password_hash(generate_recovery_code()),
            pw_code_updated_at=datetime.utcnow(),
            last_login_at=datetime.utcnow(),
        )
        db.session.add(user)
        db.session.commit()

        session["user_id"] = str(user.id)
        session.permanent = True

        try:
            send_welcome_email(user)
        except Exception:
            pass

        return jsonify({"message": "Account created successfully.", "user": serialize_user(user)}), 201

    @app.post("/api/auth/login")
    def login():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()
        password = payload.get("password") or ""

        if not email or not password:
            return jsonify({"message": "Enter your email and password to continue."}), 400

        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if not user or not check_password_hash(user.password_hash, password):
            return jsonify({"message": "We could not find a matching email and password."}), 401

        user.last_login_at = datetime.utcnow()
        db.session.commit()

        session["user_id"] = str(user.id)
        session.permanent = True

        return jsonify(
            {
                "message": "Logged in successfully.",
                "user": serialize_user(user),
                "hasCompletedOnboarding": bool(get_current_income_profile(user) and get_current_month_budget(user)),
            }
        )

    @app.post("/api/onboarding/save")
    def save_onboarding():
        user = get_current_user()
        if not user:
            return jsonify({"message": "You must be logged in to save onboarding."}), 401

        payload = request.get_json(silent=True) or {}
        profile = save_income_profile(user, payload)
        db.session.commit()

        return jsonify(
            {
                "message": "Onboarding saved successfully.",
                "incomeProfile": serialize_income_profile(profile),
            }
        )

    @app.post("/api/ledger/save")
    def save_ledger():
        user = get_current_user()
        if not user:
            return jsonify({"message": "You must be logged in to save your ledger."}), 401

        payload = request.get_json(silent=True) or {}
        month_label = payload.get("monthLabel")
        if not month_label:
            return jsonify({"message": "Month label is required."}), 400

        profile = get_current_income_profile(user)
        budget_month = month_start_from_label(month_label)
        budget = (
            db.session.execute(
                db.select(MonthlyBudget).filter_by(user_id=user.id, budget_month=budget_month)
            )
            .scalars()
            .first()
        )

        if not budget:
            budget = MonthlyBudget(
                user_id=user.id,
                budget_month=budget_month,
                income_profile_id=profile.id if profile else None,
                month_label=month_label,
                net_monthly_income_cents=cents_from_amount(payload.get("monthlyIncome")),
                allocated_total_cents=cents_from_amount(payload.get("allocatedTotal")),
                remaining_to_allocate_cents=cents_from_amount(payload.get("remainingToAllocate")),
                status=BudgetStatus.FINALIZED,
                finalized_at=datetime.utcnow(),
            )
            db.session.add(budget)
        else:
            budget.income_profile_id = profile.id if profile else None
            budget.month_label = month_label
            budget.net_monthly_income_cents = cents_from_amount(payload.get("monthlyIncome"))
            budget.allocated_total_cents = cents_from_amount(payload.get("allocatedTotal"))
            budget.remaining_to_allocate_cents = cents_from_amount(payload.get("remainingToAllocate"))
            budget.status = BudgetStatus.FINALIZED
            budget.finalized_at = datetime.utcnow()

        for transaction in list(budget.transactions):
            db.session.delete(transaction)
        for section in list(budget.sections):
            db.session.delete(section)
        db.session.flush()

        category_id_map = {}
        for section_index, section_payload in enumerate(payload.get("sections") or []):
            section = BudgetSection(
                monthly_budget=budget,
                title=section_payload.get("title"),
                section_key=section_payload.get("sectionKey"),
                sort_order=section_index,
            )
            db.session.add(section)
            db.session.flush()

            for category_index, category_payload in enumerate(section_payload.get("categories") or []):
                category = BudgetCategory(
                    budget_section=section,
                    title=category_payload.get("title"),
                    category_key=category_payload.get("id"),
                    allocated_cents=cents_from_amount(category_payload.get("amount")),
                    sort_order=category_index,
                    is_archived=False,
                )
                db.session.add(category)
                db.session.flush()
                category_id_map[category_payload.get("id")] = category.id

        for transaction_payload in payload.get("transactions") or []:
            mapped_category_id = category_id_map.get(transaction_payload.get("categoryId"))
            if not mapped_category_id:
                continue
            db.session.add(
                Transaction(
                    user_id=user.id,
                    monthly_budget=budget,
                    budget_category_id=mapped_category_id,
                    amount_cents=cents_from_amount(transaction_payload.get("amount")),
                    purchased_on=datetime.strptime(transaction_payload.get("date"), "%Y-%m-%d").date(),
                    memo=transaction_payload.get("memo") or "",
                )
            )

        db.session.commit()

        return jsonify(
            {
                "message": "Ledger saved successfully.",
                "monthlyBudget": serialize_budget(budget),
            }
        )

    @app.get("/api/auth/me")
    def auth_me():
        user = get_current_user()
        if not user:
            return jsonify({"authenticated": False, "user": None}), 200

        return jsonify({"authenticated": True, "user": serialize_user(user)})

    @app.post("/api/auth/logout")
    def logout():
        session.clear()
        return jsonify({"message": "Logged out successfully."})

    @app.post("/api/auth/forgot-password")
    def forgot_password():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()

        if not email:
            return jsonify({"message": "Enter your email to request a recovery code."}), 400

        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if not user:
            return jsonify({"message": "If that email exists, we sent a recovery code."})

        recovery_code = rotate_recovery_code(user)
        db.session.commit()

        try:
            send_recovery_email(user.email, recovery_code)
        except Exception:
            return jsonify({"message": "We couldn't send a recovery code right now. Please try again in a moment."}), 503

        return jsonify({"message": "If that email exists, we sent a recovery code."})

    @app.post("/api/auth/reset-password")
    def reset_password():
        payload = request.get_json(silent=True) or {}
        email = (payload.get("email") or "").strip().lower()
        recovery_code = (payload.get("recoveryCode") or "").strip().upper()
        password = payload.get("password") or ""
        confirm_password = payload.get("confirmPassword") or ""

        if not email or not recovery_code or not password or not confirm_password:
            return jsonify({"message": "Complete every field to reset your password."}), 400

        if password != confirm_password:
            return jsonify({"message": "Passwords do not match."}), 400

        if not is_strong_password(password):
            return jsonify({"message": "Password must be at least 8 characters and include 1 number and 1 special character."}), 400

        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
        if not user or not user.pw_code_hash or not check_password_hash(user.pw_code_hash, recovery_code):
            return jsonify({"message": "That recovery code or email does not match our records."}), 400

        user.password_hash = generate_password_hash(password)
        rotate_recovery_code(user)
        db.session.commit()

        return jsonify({"message": "Password reset successfully. Please log in with your new password."})

    @app.get("/api/health")
    def healthcheck():
        database_ready = False
        if app.config.get("SQLALCHEMY_DATABASE_URI"):
            try:
                with db.engine.connect() as connection:
                    connection.exec_driver_sql("SELECT 1")
                database_ready = True
            except Exception:
                database_ready = False

        return jsonify(
            {
                "status": "ok",
                "databaseConfigured": bool(app.config.get("SQLALCHEMY_DATABASE_URI")),
                "databaseReady": database_ready,
                "plaidConfigured": bool(app.config.get("PLAID_CLIENT_ID") and app.config.get("PLAID_SECRET")),
                "stripeConfigured": bool(app.config.get("STRIPE_SECRET_KEY")),
            }
        )

    @app.get("/")
    def serve_index():
        return send_from_directory(app.static_folder, "index.html")

    @app.get("/<path:asset_path>")
    def serve_assets(asset_path: str):
        asset_file = ROOT_DIR / asset_path
        if asset_file.exists() and asset_file.is_file():
            return send_from_directory(app.static_folder, asset_path)
        return send_from_directory(app.static_folder, "index.html")

    return app


app = create_app()
