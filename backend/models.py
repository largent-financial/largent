import enum
import uuid
from datetime import datetime

from sqlalchemy import Date, DateTime, Enum, ForeignKey, Index, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .extensions import db


def generate_uuid() -> uuid.UUID:
    return uuid.uuid4()


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
    SEMIMONTHLY = "semimonthly"
    MONTHLY = "monthly"


class DeductionInputMode(enum.Enum):
    AMOUNT = "amount"
    PERCENT = "percent"


class TaxTreatment(enum.Enum):
    PRE_TAX = "pre_tax"
    POST_TAX = "post_tax"


class BudgetStatus(enum.Enum):
    DRAFT = "draft"
    FINALIZED = "finalized"


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
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    auth_tokens: Mapped[list["AuthToken"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    income_profiles: Mapped[list["IncomeProfile"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    monthly_budgets: Mapped[list["MonthlyBudget"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    transactions: Mapped[list["Transaction"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    email_events: Mapped[list["EmailEvent"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class AuthToken(TimestampMixin, db.Model):
    __tablename__ = "auth_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    purpose: Mapped[TokenPurpose] = mapped_column(Enum(TokenPurpose, name="token_purpose"), nullable=False)
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
    income_method: Mapped[IncomeMethod] = mapped_column(Enum(IncomeMethod, name="income_method"), nullable=False)
    annual_salary_cents: Mapped[int | None] = mapped_column(Integer)
    manual_monthly_take_home_cents: Mapped[int | None] = mapped_column(Integer)
    state_code: Mapped[str | None] = mapped_column(String(2))
    filing_status: Mapped[FilingStatus | None] = mapped_column(Enum(FilingStatus, name="filing_status"))
    pay_frequency: Mapped[PayFrequency | None] = mapped_column(Enum(PayFrequency, name="pay_frequency"))
    extra_withholding_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    extra_withholding_tax_treatment: Mapped[TaxTreatment] = mapped_column(
        Enum(TaxTreatment, name="tax_treatment"),
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
        Enum(DeductionInputMode, name="deduction_input_mode"),
        nullable=False,
    )
    annual_amount_cents: Mapped[int | None] = mapped_column(Integer)
    percent_bps: Mapped[int | None] = mapped_column(Integer)
    tax_treatment: Mapped[TaxTreatment] = mapped_column(
        Enum(TaxTreatment, name="tax_treatment", create_type=False),
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
    status: Mapped[BudgetStatus] = mapped_column(Enum(BudgetStatus, name="budget_status"), default=BudgetStatus.DRAFT, nullable=False)
    finalized_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship(back_populates="monthly_budgets")
    income_profile: Mapped["IncomeProfile"] = relationship(back_populates="budgets")
    sections: Mapped[list["BudgetSection"]] = relationship(back_populates="monthly_budget", cascade="all, delete-orphan")
    transactions: Mapped[list["Transaction"]] = relationship(back_populates="monthly_budget", cascade="all, delete-orphan")
    email_events: Mapped[list["EmailEvent"]] = relationship(back_populates="monthly_budget")

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

