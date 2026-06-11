-- Largent initial relational schema
-- Target: PostgreSQL 15+
-- Conventions:
--   * money stored as integer cents
--   * percentages stored as basis points (1% = 100)
--   * budget_month stored as first day of the month

create extension if not exists pgcrypto;

create type income_method as enum ('salary', 'manual');
create type filing_status as enum (
  'single',
  'married_filing_jointly',
  'married_filing_separately',
  'head_of_household'
);
create type pay_frequency as enum ('weekly', 'biweekly', 'semi_monthly', 'monthly');
create type deduction_input_mode as enum ('yearly_amount', 'percent_of_paycheck');
create type tax_treatment as enum ('pretax', 'posttax');
create type budget_status as enum ('draft', 'finalized', 'archived');
create type token_purpose as enum ('password_reset', 'email_verification');

create table users (
  id uuid primary key default gen_random_uuid(),
  email varchar(320) not null unique,
  password_hash text not null,
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  is_active boolean not null default true,
  marketing_opt_in boolean not null default false,
  monthly_summary_emails_enabled boolean not null default true,
  security_emails_enabled boolean not null default true,
  email_verified_at timestamptz,
  last_login_at timestamptz,
  pw_code_hash text,
  pw_code_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint users_email_lowercase check (email = lower(email))
);

create table auth_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  purpose token_purpose not null,
  token_hash text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now(),
  constraint auth_tokens_unused_or_used_after_create check (used_at is null or used_at >= created_at)
);

create unique index auth_tokens_token_hash_idx on auth_tokens(token_hash);
create index auth_tokens_user_purpose_idx on auth_tokens(user_id, purpose);

create table income_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  income_method income_method not null,
  annual_salary_cents integer,
  manual_monthly_take_home_cents integer,
  state_code varchar(100),
  filing_status filing_status,
  pay_frequency pay_frequency,
  extra_withholding_cents integer not null default 0,
  extra_withholding_tax_treatment tax_treatment not null default 'posttax',
  estimated_gross_monthly_cents integer,
  estimated_federal_monthly_cents integer,
  estimated_state_monthly_cents integer,
  estimated_fica_monthly_cents integer,
  estimated_net_monthly_cents integer,
  is_current boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint income_profiles_salary_or_manual check (
    (income_method = 'salary' and annual_salary_cents is not null and manual_monthly_take_home_cents is null)
    or
    (income_method = 'manual' and manual_monthly_take_home_cents is not null and annual_salary_cents is null)
  ),
  constraint income_profiles_nonnegative_amounts check (
    coalesce(annual_salary_cents, 0) >= 0
    and coalesce(manual_monthly_take_home_cents, 0) >= 0
    and extra_withholding_cents >= 0
    and coalesce(estimated_gross_monthly_cents, 0) >= 0
    and coalesce(estimated_federal_monthly_cents, 0) >= 0
    and coalesce(estimated_state_monthly_cents, 0) >= 0
    and coalesce(estimated_fica_monthly_cents, 0) >= 0
    and coalesce(estimated_net_monthly_cents, 0) >= 0
  )
);

create unique index income_profiles_current_user_idx on income_profiles(user_id) where is_current = true;
create index income_profiles_user_created_idx on income_profiles(user_id, created_at desc);

create table income_profile_deductions (
  id uuid primary key default gen_random_uuid(),
  income_profile_id uuid not null references income_profiles(id) on delete cascade,
  deduction_key varchar(50) not null,
  title varchar(100) not null,
  input_mode deduction_input_mode not null,
  annual_amount_cents integer,
  percent_bps integer,
  tax_treatment tax_treatment not null,
  is_enabled boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint income_profile_deductions_unique_key unique (income_profile_id, deduction_key),
  constraint income_profile_deductions_valid_inputs check (
    (
      input_mode = 'yearly_amount'
      and annual_amount_cents is not null
      and annual_amount_cents >= 0
      and (percent_bps is null or percent_bps >= 0)
    )
    or
    (
      input_mode = 'percent_of_paycheck'
      and percent_bps is not null
      and percent_bps >= 0
      and (annual_amount_cents is null or annual_amount_cents >= 0)
    )
  )
);

create index income_profile_deductions_profile_idx on income_profile_deductions(income_profile_id, sort_order, created_at);

create table monthly_budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  income_profile_id uuid references income_profiles(id) on delete set null,
  budget_month date not null,
  month_label varchar(40) not null,
  net_monthly_income_cents integer not null,
  allocated_total_cents integer not null default 0,
  remaining_to_allocate_cents integer not null default 0,
  status budget_status not null default 'draft',
  finalized_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint monthly_budgets_month_start check (date_trunc('month', budget_month::timestamp) = budget_month::timestamp),
  constraint monthly_budgets_nonnegative_income check (net_monthly_income_cents >= 0),
  constraint monthly_budgets_totals_reasonable check (allocated_total_cents >= 0)
);

create unique index monthly_budgets_user_month_idx on monthly_budgets(user_id, budget_month);
create index monthly_budgets_user_status_idx on monthly_budgets(user_id, status, budget_month desc);

create table budget_sections (
  id uuid primary key default gen_random_uuid(),
  monthly_budget_id uuid not null references monthly_budgets(id) on delete cascade,
  title varchar(100) not null,
  section_key varchar(50),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint budget_sections_unique_title_per_budget unique (monthly_budget_id, title)
);

create index budget_sections_budget_idx on budget_sections(monthly_budget_id, sort_order, created_at);

create table budget_categories (
  id uuid primary key default gen_random_uuid(),
  budget_section_id uuid not null references budget_sections(id) on delete cascade,
  title varchar(120) not null,
  category_key varchar(50),
  allocated_cents integer not null default 0,
  sort_order integer not null default 0,
  is_archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint budget_categories_nonnegative_allocated check (allocated_cents >= 0)
);

create index budget_categories_section_idx on budget_categories(budget_section_id, sort_order, created_at);
create index budget_categories_active_idx on budget_categories(budget_section_id, is_archived);

create table transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  monthly_budget_id uuid not null references monthly_budgets(id) on delete cascade,
  budget_category_id uuid not null references budget_categories(id) on delete restrict,
  amount_cents integer not null,
  purchased_on date not null,
  memo varchar(255),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint transactions_positive_amount check (amount_cents > 0)
);

create index transactions_budget_category_idx on transactions(monthly_budget_id, budget_category_id, purchased_on desc);
create index transactions_user_date_idx on transactions(user_id, purchased_on desc);
create index transactions_active_idx on transactions(monthly_budget_id, deleted_at);

create table email_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  event_type varchar(100) not null,
  recipient_email varchar(320) not null,
  auth_token_id uuid references auth_tokens(id) on delete set null,
  monthly_budget_id uuid references monthly_budgets(id) on delete set null,
  provider_message_id varchar(255),
  provider_status varchar(100),
  sent_at timestamptz,
  failed_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index email_events_user_type_idx on email_events(user_id, event_type, created_at desc);
create index email_events_recipient_idx on email_events(recipient_email, created_at desc);

create table user_subscriptions (
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

create index user_subscriptions_user_status_idx on user_subscriptions(user_id, status);

create table user_entitlements (
  user_id uuid primary key references users(id) on delete cascade,
  premium_access boolean not null default false,
  bank_sync_enabled boolean not null default false,
  max_linked_accounts integer not null default 2,
  source varchar(30) not null default 'system',
  updated_at timestamptz not null default now(),
  constraint user_entitlements_reasonable_limit check (max_linked_accounts >= 0 and max_linked_accounts <= 10)
);

create table plaid_items (
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

create index plaid_items_user_status_idx on plaid_items(user_id, status);

create table plaid_accounts (
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

create index plaid_accounts_user_active_idx on plaid_accounts(user_id, is_active);
create index plaid_accounts_item_active_idx on plaid_accounts(plaid_item_row_id, is_active);

create table plaid_transactions_raw (
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

create index plaid_transactions_user_posted_idx on plaid_transactions_raw(user_id, posted_date desc);
create index plaid_transactions_account_posted_idx on plaid_transactions_raw(plaid_account_row_id, posted_date desc);
create index plaid_transactions_user_pending_idx on plaid_transactions_raw(user_id, pending);

create table plaid_transaction_reviews (
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

create index plaid_transaction_reviews_user_status_idx on plaid_transaction_reviews(user_id, status);

create table plaid_webhook_events (
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

create index plaid_webhook_events_item_created_idx on plaid_webhook_events(plaid_item_row_id, created_at desc);
create index plaid_webhook_events_type_code_idx on plaid_webhook_events(webhook_type, webhook_code);
