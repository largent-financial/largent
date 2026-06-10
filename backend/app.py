from pathlib import Path

import click
from datetime import datetime
from email.message import EmailMessage
import secrets
import smtplib
import ssl
import string
from uuid import UUID

from flask import Flask, jsonify, request, send_from_directory, session
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
        TaxTreatment,
        Transaction,
        User,
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

    def serialize_user(user: User):
        return {
            "id": str(user.id),
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
        }

    def cents_from_amount(value) -> int:
        return int(round(float(value or 0) * 100))

    def amount_from_cents(value) -> float:
        return round((value or 0) / 100, 2)

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
            return jsonify({"authenticated": False, "user": None}), 401

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

    def send_recovery_email(recipient_email: str, recovery_code: str) -> None:
        if not app.config.get("MAIL_USERNAME") or not app.config.get("MAIL_PASSWORD"):
            raise RuntimeError("Mail credentials are not configured.")

        message = EmailMessage()
        message["Subject"] = "Your Largent password recovery code"
        message["From"] = app.config.get("MAIL_DEFAULT_SENDER") or app.config.get("MAIL_USERNAME")
        message["To"] = recipient_email
        message.set_content(
            (
                "Use this recovery code to reset your Largent password:\n\n"
                f"{recovery_code}\n\n"
                "Copy the code, return to the app, and paste it into the recovery form.\n"
                "If you did not request this, you can ignore this email."
            )
        )

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

        budget_month = month_start_from_label(month_label)
        budget = (
            db.session.execute(
                db.select(MonthlyBudget).filter_by(user_id=user.id, budget_month=budget_month)
            )
            .scalars()
            .first()
        )

        if not budget:
            budget = MonthlyBudget(user_id=user.id, budget_month=budget_month)
            db.session.add(budget)

        profile = get_current_income_profile(user)
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
