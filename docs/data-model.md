# Largent Data Model

## Primary goals
- Support account creation and login
- Persist Step A income inputs and estimated take-home results
- Persist one monthly ledger per user per month
- Persist editable sections/categories/allocations
- Persist spending transactions tied to that month’s ledger
- Support password recovery, email verification, welcome emails, and monthly summary emails later

## Core entities

### 1. `users`
Stores the account owner.
- Identity: `email`
- Auth: `password_hash`
- Profile: `first_name`, `last_name`
- Lifecycle: `is_active`, `email_verified_at`, `last_login_at`

### 2. `auth_tokens`
Stores hashed one-time tokens for:
- password reset
- email verification

These are separate from sessions and intentionally short-lived.

### 3. `income_profiles`
Stores the latest Step A input set and the resulting estimate.
- `income_method`: salary vs manual take-home
- salary/manual amount inputs
- state, filing status, pay frequency
- extra withholding and tax treatment
- estimated monthly outputs for gross, federal, state, FICA, and net

Why separate this from budgets:
- the user may update their income assumptions over time
- a monthly budget should reference the profile that generated it

### 4. `income_profile_deductions`
Stores per-profile deduction inputs.
Examples:
- 401(k)
- Roth
- HSA

For each deduction we store:
- `input_mode`: yearly amount vs percent of paycheck
- `annual_amount_cents`
- `percent_bps`
- `tax_treatment`: pre-tax vs post-tax
- `is_enabled`

### 5. `monthly_budgets`
Represents a saved monthly ledger for one user and one month.
- one row per user per calendar month
- references the income profile used to create it
- stores budget-level totals and state
- `status` supports draft/finalized/archive later

### 6. `budget_sections`
Groups categories into buckets such as:
- Assets
- Fixed Expenses
- Variable Expenses

These are editable by the user and tied to a specific monthly budget.

### 7. `budget_categories`
Stores the actual line items inside each section.
Examples:
- Investments
- Rent
- Groceries
- Custom user-added categories

Each category stores:
- title
- allocated amount
- sort order
- archived state

### 8. `transactions`
Stores tracked spending entries.
- amount
- purchase date
- memo
- linked to a monthly budget
- linked to a budget category

This table powers:
- progress bars
- transaction history
- future reporting/charts

### 9. `email_events`
Audit/log table for outbound emails.
Useful for:
- welcome email history
- password reset sends
- monthly summary sends
- debugging provider failures

## Relationship summary
- `users` 1 → many `income_profiles`
- `income_profiles` 1 → many `income_profile_deductions`
- `users` 1 → many `monthly_budgets`
- `monthly_budgets` 1 → many `budget_sections`
- `budget_sections` 1 → many `budget_categories`
- `monthly_budgets` 1 → many `transactions`
- `budget_categories` 1 → many `transactions`
- `users` 1 → many `auth_tokens`
- `users` 1 → many `email_events`

## Storage conventions
- Money: integer cents
- Percentages: basis points (`900` = `9.00%`)
- Month budgets: `budget_month` is always the first day of that month
- Timestamps: `timestamptz`
- IDs: UUIDs

## Why this schema fits the current app
It matches the frontend already built:
- Step A maps to `income_profiles` + `income_profile_deductions`
- Ledger allocation maps to `monthly_budgets` + `budget_sections` + `budget_categories`
- Dashboard tracking maps to `transactions`
- Donut chart and progress bars can be derived from `budget_categories` and `transactions`

## Near-term backend implications
When we move to Flask auth/backend structure next:
- use SQLAlchemy models matching this schema
- add migrations with Flask-Migrate / Alembic
- enforce lowercase emails on write
- hash passwords with `werkzeug.security` or `argon2`
- never store raw reset tokens, only hashes
- use service functions to keep budget totals synchronized

## Recommended first API resources
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /me`
- `PUT /income-profile/current`
- `GET /budgets/:month`
- `PUT /budgets/:month`
- `POST /budgets/:month/transactions`
- `GET /budgets/:month/transactions`
