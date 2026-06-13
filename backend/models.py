import enum
import uuid
from datetime import datetime

from sqlalchemy import Date, DateTime, Enum, ForeignKey, Index, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .extensions import db


def generate_uuid() -> uuid.UUID:
    return uuid.uuid4()


def enum_values(enum_cls):
    return [member.value for member in enum_cls]


def pg_enum(enum_cls, name: str, create_type: bool = True):
    return Enum(
        enum_cls,
        name=name,
        values_callable=enum_values,
        validate_strings=True,
        create_type=create_type,
    )


class IncomeMethod(enum.Enum):
    SALARY = "salary"
    MANUAL = "manual"


class FilingStatus(enum.Enum):
    SINGLE = "single"
    MARRIED_FILING_JOINTLY = "married_filing_jointly"
    MARRIED_FILING_SEPARATELY = "married_filing_separately"
    HEAD_OF_HOUSEHOLD = "head_of_household"


class PayFrequency(enum.Enum):
    WEEKLY = "weekly"
    BIWEEKLY = "biweekly"
    SEMIMONTHLY = "semi_monthly"
    MONTHLY = "monthly"


class DeductionInputMode(enum.Enum):
    AMOUNT = "yearly_amount"
    PERCENT = "percent_of_paycheck"


class TaxTreatment(enum.Enum):
    PRE_TAX = "pretax"
    POST_TAX = "posttax"


class BudgetStatus(enum.Enum):
    DRAFT = "draft"
    FINALIZED = "finalized"
    ARCHIVED = "archived"


class TokenPurpose(enum.Enum):
    PASSWORD_RESET = "password_reset"
    EMAIL_VERIFICATION = "email_verification"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class User(TimestampMixin, db.Model):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    marketing_opt_in: Mapped[bool] = mapped_column(default=False, nullable=False)
    monthly_summary_emails_enabled: Mapped[bool] = mapped_column(default=True, nullable=False)
    security_emails_enabled: Mapped[bool] = mapped_column(default=True, nullable=False)
    transaction_push_alerts_enabled: Mapped[bool] = mapped_column(default=False, nullable=False)
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    pw_code_hash: Mapped[str | None] = mapped_column(String(255))
    pw_code_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    auth_tokens: Mapped[list["AuthToken"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    income_profiles: Mapped[list["IncomeProfile"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    monthly_budgets: Mapped[list["MonthlyBudget"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    transactions: Mapped[list["Transaction"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    email_events: Mapped[list["EmailEvent"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    subscriptions: Mapped[list["UserSubscription"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    entitlement: Mapped["UserEntitlement | None"] = relationship(back_populates="user", cascade="all, delete-orphan", uselist=False)
    promo_code_redemptions: Mapped[list["PromoCodeRedemption"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    plaid_items: Mapped[list["PlaidItem"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    plaid_accounts: Mapped[list["PlaidAccount"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    plaid_transactions: Mapped[list["PlaidTransactionRaw"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    plaid_transaction_reviews: Mapped[list["PlaidTransactionReview"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    plaid_webhook_events: Mapped[list["PlaidWebhookEvent"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    push_subscriptions: Mapped[list["PushSubscription"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class AuthToken(TimestampMixin, db.Model):
    __tablename__ = "auth_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    purpose: Mapped[TokenPurpose] = mapped_column(pg_enum(TokenPurpose, "token_purpose"), nullable=False)
    token_hash: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="auth_tokens")

    __table_args__ = (
        Index("ix_auth_tokens_user_purpose", "user_id", "purpose"),
    )


class IncomeProfile(TimestampMixin, db.Model):
    __tablename__ = "income_profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    income_method: Mapped[IncomeMethod] = mapped_column(pg_enum(IncomeMethod, "income_method"), nullable=False)
    annual_salary_cents: Mapped[int | None] = mapped_column(Integer)
    manual_monthly_take_home_cents: Mapped[int | None] = mapped_column(Integer)
    state_code: Mapped[str | None] = mapped_column(String(100))
    filing_status: Mapped[FilingStatus | None] = mapped_column(pg_enum(FilingStatus, "filing_status"))
    pay_frequency: Mapped[PayFrequency | None] = mapped_column(pg_enum(PayFrequency, "pay_frequency"))
    extra_withholding_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    extra_withholding_tax_treatment: Mapped[TaxTreatment] = mapped_column(
        pg_enum(TaxTreatment, "tax_treatment"),
        default=TaxTreatment.POST_TAX,
        nullable=False,
    )
    estimated_gross_monthly_cents: Mapped[int | None] = mapped_column(Integer)
    estimated_federal_monthly_cents: Mapped[int | None] = mapped_column(Integer)
    estimated_state_monthly_cents: Mapped[int | None] = mapped_column(Integer)
    estimated_fica_monthly_cents: Mapped[int | None] = mapped_column(Integer)
    estimated_net_monthly_cents: Mapped[int | None] = mapped_column(Integer)
    is_current: Mapped[bool] = mapped_column(default=True, nullable=False)

    user: Mapped["User"] = relationship(back_populates="income_profiles")
    deductions: Mapped[list["IncomeProfileDeduction"]] = relationship(
        back_populates="income_profile",
        cascade="all, delete-orphan",
    )
    budgets: Mapped[list["MonthlyBudget"]] = relationship(back_populates="income_profile")

    __table_args__ = (
        Index("ix_income_profiles_user_current", "user_id", "is_current"),
    )


class IncomeProfileDeduction(TimestampMixin, db.Model):
    __tablename__ = "income_profile_deductions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    income_profile_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("income_profiles.id", ondelete="CASCADE"),
        nullable=False,
    )
    deduction_key: Mapped[str] = mapped_column(String(100), nullable=False)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    input_mode: Mapped[DeductionInputMode] = mapped_column(
        pg_enum(DeductionInputMode, "deduction_input_mode"),
        nullable=False,
    )
    annual_amount_cents: Mapped[int | None] = mapped_column(Integer)
    percent_bps: Mapped[int | None] = mapped_column(Integer)
    tax_treatment: Mapped[TaxTreatment] = mapped_column(
        pg_enum(TaxTreatment, "tax_treatment", create_type=False),
        default=TaxTreatment.PRE_TAX,
        nullable=False,
    )
    is_enabled: Mapped[bool] = mapped_column(default=False, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    income_profile: Mapped["IncomeProfile"] = relationship(back_populates="deductions")

    __table_args__ = (
        UniqueConstraint("income_profile_id", "deduction_key", name="uq_income_profile_deduction_key"),
    )


class MonthlyBudget(TimestampMixin, db.Model):
    __tablename__ = "monthly_budgets"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    income_profile_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("income_profiles.id", ondelete="SET NULL"))
    budget_month: Mapped[datetime] = mapped_column(Date, nullable=False)
    month_label: Mapped[str] = mapped_column(String(40), nullable=False)
    net_monthly_income_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    allocated_total_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    remaining_to_allocate_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[BudgetStatus] = mapped_column(pg_enum(BudgetStatus, "budget_status"), default=BudgetStatus.DRAFT, nullable=False)
    finalized_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="monthly_budgets")
    income_profile: Mapped["IncomeProfile"] = relationship(back_populates="budgets")
    sections: Mapped[list["BudgetSection"]] = relationship(back_populates="monthly_budget", cascade="all, delete-orphan")
    transactions: Mapped[list["Transaction"]] = relationship(back_populates="monthly_budget", cascade="all, delete-orphan")
    email_events: Mapped[list["EmailEvent"]] = relationship(back_populates="monthly_budget")
    plaid_transaction_reviews: Mapped[list["PlaidTransactionReview"]] = relationship(back_populates="monthly_budget")

    __table_args__ = (
        UniqueConstraint("user_id", "budget_month", name="uq_monthly_budget_user_month"),
    )


class BudgetSection(TimestampMixin, db.Model):
    __tablename__ = "budget_sections"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    monthly_budget_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("monthly_budgets.id", ondelete="CASCADE"),
        nullable=False,
    )
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    section_key: Mapped[str | None] = mapped_column(String(100))
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    monthly_budget: Mapped["MonthlyBudget"] = relationship(back_populates="sections")
    categories: Mapped[list["BudgetCategory"]] = relationship(back_populates="budget_section", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("monthly_budget_id", "title", name="uq_budget_section_title"),
    )


class BudgetCategory(TimestampMixin, db.Model):
    __tablename__ = "budget_categories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    budget_section_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("budget_sections.id", ondelete="CASCADE"),
        nullable=False,
    )
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    category_key: Mapped[str | None] = mapped_column(String(100))
    allocated_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_archived: Mapped[bool] = mapped_column(default=False, nullable=False)

    budget_section: Mapped["BudgetSection"] = relationship(back_populates="categories")
    transactions: Mapped[list["Transaction"]] = relationship(back_populates="budget_category")
    plaid_transaction_reviews: Mapped[list["PlaidTransactionReview"]] = relationship(back_populates="budget_category")


class Transaction(TimestampMixin, db.Model):
    __tablename__ = "transactions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    monthly_budget_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("monthly_budgets.id", ondelete="CASCADE"),
        nullable=False,
    )
    budget_category_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("budget_categories.id", ondelete="CASCADE"),
        nullable=False,
    )
    amount_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    purchased_on: Mapped[datetime] = mapped_column(Date, nullable=False)
    memo: Mapped[str | None] = mapped_column(Text)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="transactions")
    monthly_budget: Mapped["MonthlyBudget"] = relationship(back_populates="transactions")
    budget_category: Mapped["BudgetCategory"] = relationship(back_populates="transactions")
    plaid_transaction_reviews: Mapped[list["PlaidTransactionReview"]] = relationship(back_populates="ledger_transaction")

    __table_args__ = (
        Index("ix_transactions_budget_category_date", "monthly_budget_id", "budget_category_id", "purchased_on"),
        Index("ix_transactions_user_date", "user_id", "purchased_on"),
    )


class EmailEvent(TimestampMixin, db.Model):
    __tablename__ = "email_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    recipient_email: Mapped[str] = mapped_column(String(255), nullable=False)
    auth_token_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("auth_tokens.id", ondelete="SET NULL"))
    monthly_budget_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("monthly_budgets.id", ondelete="SET NULL"))
    provider_message_id: Mapped[str | None] = mapped_column(String(255))
    provider_status: Mapped[str | None] = mapped_column(String(100))
    sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    failed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    error_message: Mapped[str | None] = mapped_column(Text)

    user: Mapped["User"] = relationship(back_populates="email_events")
    monthly_budget: Mapped["MonthlyBudget"] = relationship(back_populates="email_events")


class UserSubscription(TimestampMixin, db.Model):
    __tablename__ = "user_subscriptions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    provider: Mapped[str] = mapped_column(String(30), nullable=False, default="stripe")
    provider_customer_id: Mapped[str | None] = mapped_column(String(255))
    provider_subscription_id: Mapped[str | None] = mapped_column(String(255), unique=True)
    plan_key: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    current_period_start: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    current_period_end: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    cancel_at_period_end: Mapped[bool] = mapped_column(default=False, nullable=False)
    canceled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="subscriptions")

    __table_args__ = (
        Index("ix_user_subscriptions_user_status", "user_id", "status"),
    )


class UserEntitlement(db.Model):
    __tablename__ = "user_entitlements"

    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    premium_access: Mapped[bool] = mapped_column(default=False, nullable=False)
    bank_sync_enabled: Mapped[bool] = mapped_column(default=False, nullable=False)
    admin_granted: Mapped[bool] = mapped_column(default=False, nullable=False)
    admin_granted_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    admin_granted_by: Mapped[str | None] = mapped_column(String(255))
    max_linked_accounts: Mapped[int] = mapped_column(Integer, default=2, nullable=False)
    source: Mapped[str] = mapped_column(String(30), nullable=False, default="system")
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="entitlement")


class PromoCode(TimestampMixin, db.Model):
    __tablename__ = "promo_codes"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    label: Mapped[str | None] = mapped_column(String(120))
    code_hash: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    access_type: Mapped[str] = mapped_column(String(30), nullable=False, default="lifetime")
    duration_months: Mapped[int | None] = mapped_column(Integer)
    max_redemptions: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    times_redeemed: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_by: Mapped[str | None] = mapped_column(String(120))

    redemptions: Mapped[list["PromoCodeRedemption"]] = relationship(back_populates="promo_code", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_promo_codes_active_expires", "is_active", "expires_at"),
    )


class PromoCodeRedemption(TimestampMixin, db.Model):
    __tablename__ = "promo_code_redemptions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    promo_code_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("promo_codes.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    granted_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="active")
    redeemed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    expiry_reminder_sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    promo_code: Mapped["PromoCode"] = relationship(back_populates="redemptions")
    user: Mapped["User"] = relationship(back_populates="promo_code_redemptions")

    __table_args__ = (
        Index("ix_promo_redemptions_user_status", "user_id", "status"),
        UniqueConstraint("promo_code_id", "user_id", name="uq_promo_code_redemption_user"),
    )


class PlaidItem(TimestampMixin, db.Model):
    __tablename__ = "plaid_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plaid_item_id: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    plaid_access_token_encrypted: Mapped[str] = mapped_column(Text, nullable=False)
    institution_id: Mapped[str | None] = mapped_column(String(255))
    institution_name: Mapped[str | None] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="active")
    sync_cursor: Mapped[str | None] = mapped_column(Text)
    error_code: Mapped[str | None] = mapped_column(String(100))
    error_message: Mapped[str | None] = mapped_column(Text)
    last_webhook_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    disconnected_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="plaid_items")
    accounts: Mapped[list["PlaidAccount"]] = relationship(back_populates="plaid_item", cascade="all, delete-orphan")
    transactions: Mapped[list["PlaidTransactionRaw"]] = relationship(back_populates="plaid_item", cascade="all, delete-orphan")
    webhook_events: Mapped[list["PlaidWebhookEvent"]] = relationship(back_populates="plaid_item", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_plaid_items_user_status", "user_id", "status"),
    )


class PlaidAccount(TimestampMixin, db.Model):
    __tablename__ = "plaid_accounts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plaid_item_row_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("plaid_items.id", ondelete="CASCADE"), nullable=False)
    plaid_account_id: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    persistent_account_id: Mapped[str | None] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    official_name: Mapped[str | None] = mapped_column(String(255))
    mask: Mapped[str | None] = mapped_column(String(20))
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    subtype: Mapped[str | None] = mapped_column(String(50))
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    last_synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="plaid_accounts")
    plaid_item: Mapped["PlaidItem"] = relationship(back_populates="accounts")
    transactions: Mapped[list["PlaidTransactionRaw"]] = relationship(back_populates="plaid_account", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_plaid_accounts_user_active", "user_id", "is_active"),
        Index("ix_plaid_accounts_item_active", "plaid_item_row_id", "is_active"),
    )


class PlaidTransactionRaw(TimestampMixin, db.Model):
    __tablename__ = "plaid_transactions_raw"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plaid_item_row_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("plaid_items.id", ondelete="CASCADE"), nullable=False)
    plaid_account_row_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("plaid_accounts.id", ondelete="CASCADE"), nullable=False)
    plaid_transaction_id: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    pending_transaction_id: Mapped[str | None] = mapped_column(String(255))
    account_owner: Mapped[str | None] = mapped_column(String(255))
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    merchant_name: Mapped[str | None] = mapped_column(String(255))
    amount_cents: Mapped[int] = mapped_column(Integer, nullable=False)
    iso_currency_code: Mapped[str] = mapped_column(String(10), nullable=False, default="USD")
    authorized_date: Mapped[datetime | None] = mapped_column(Date)
    posted_date: Mapped[datetime | None] = mapped_column(Date)
    category_primary: Mapped[str | None] = mapped_column(String(100))
    category_detailed: Mapped[str | None] = mapped_column(String(150))
    personal_finance_category_primary: Mapped[str | None] = mapped_column(String(100))
    personal_finance_category_detailed: Mapped[str | None] = mapped_column(String(150))
    payment_channel: Mapped[str | None] = mapped_column(String(50))
    transaction_type: Mapped[str | None] = mapped_column(String(50))
    pending: Mapped[bool] = mapped_column(default=False, nullable=False)
    raw_json: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    removed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="plaid_transactions")
    plaid_item: Mapped["PlaidItem"] = relationship(back_populates="transactions")
    plaid_account: Mapped["PlaidAccount"] = relationship(back_populates="transactions")
    review: Mapped["PlaidTransactionReview | None"] = relationship(back_populates="plaid_transaction", cascade="all, delete-orphan", uselist=False)

    __table_args__ = (
        Index("ix_plaid_transactions_user_posted", "user_id", "posted_date"),
        Index("ix_plaid_transactions_account_posted", "plaid_account_row_id", "posted_date"),
        Index("ix_plaid_transactions_user_pending", "user_id", "pending"),
    )


class PlaidTransactionReview(TimestampMixin, db.Model):
    __tablename__ = "plaid_transaction_reviews"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    plaid_transaction_row_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plaid_transactions_raw.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    monthly_budget_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("monthly_budgets.id", ondelete="SET NULL"))
    budget_category_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("budget_categories.id", ondelete="SET NULL"))
    ledger_transaction_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("transactions.id", ondelete="SET NULL"))
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="unreviewed")
    memo: Mapped[str | None] = mapped_column(String(255))
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    plaid_transaction: Mapped["PlaidTransactionRaw"] = relationship(back_populates="review")
    user: Mapped["User"] = relationship(back_populates="plaid_transaction_reviews")
    monthly_budget: Mapped["MonthlyBudget | None"] = relationship(back_populates="plaid_transaction_reviews")
    budget_category: Mapped["BudgetCategory | None"] = relationship(back_populates="plaid_transaction_reviews")
    ledger_transaction: Mapped["Transaction | None"] = relationship(back_populates="plaid_transaction_reviews")

    __table_args__ = (
        Index("ix_plaid_transaction_reviews_user_status", "user_id", "status"),
    )


class PlaidWebhookEvent(db.Model):
    __tablename__ = "plaid_webhook_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    plaid_item_row_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), ForeignKey("plaid_items.id", ondelete="SET NULL"))
    plaid_event_id: Mapped[str | None] = mapped_column(String(255))
    webhook_type: Mapped[str] = mapped_column(String(100), nullable=False)
    webhook_code: Mapped[str] = mapped_column(String(100), nullable=False)
    payload: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    processed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped["User | None"] = relationship(back_populates="plaid_webhook_events")
    plaid_item: Mapped["PlaidItem | None"] = relationship(back_populates="webhook_events")

    __table_args__ = (
        Index("ix_plaid_webhook_events_item_created", "plaid_item_row_id", "created_at"),
        Index("ix_plaid_webhook_events_type_code", "webhook_type", "webhook_code"),
    )


class PushSubscription(TimestampMixin, db.Model):
    __tablename__ = "push_subscriptions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    endpoint: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    p256dh_key: Mapped[str] = mapped_column(Text, nullable=False)
    auth_key: Mapped[str] = mapped_column(Text, nullable=False)
    content_encoding: Mapped[str | None] = mapped_column(String(50))
    user_agent: Mapped[str | None] = mapped_column(Text)
    device_label: Mapped[str | None] = mapped_column(String(120))
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    last_seen_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_notified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="push_subscriptions")

    __table_args__ = (
        Index("ix_push_subscriptions_user_active", "user_id", "is_active"),
    )
