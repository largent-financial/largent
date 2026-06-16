# Largent Data Retention and Deletion Policy

Last updated: June 11, 2026

## Purpose
This policy describes how Largent retains, deletes, and manages user data related to accounts, budgets, subscriptions, and optional bank-connected experiences.

## Retention Principles
Largent aims to retain data only as long as reasonably necessary to:
- provide the service requested by the user
- preserve saved budgeting and spending history
- operate account security and recovery workflows
- support billing, auditing, and fraud prevention
- comply with applicable legal obligations
- resolve disputes and enforce agreements

## Data Categories and Retention Approach

### 1. Account Data
Account records such as name, email, password hash, recovery metadata, communication preferences, and entitlement state are generally retained while an account remains active.

If an account is deleted, Largent may retain limited records for legitimate security, fraud-prevention, tax, accounting, or legal reasons for a reasonable period.

### 2. Budget and Planning Data
Onboarding inputs, income estimate settings, deduction selections, ledger categories, allocations, manual transactions, and dashboard-related budgeting history may be retained while the account is active so users can return to prior saved states.

### 3. Plaid and Bank Connection Data
If a user connects a bank account through Plaid, Largent may retain the minimum operational data needed to maintain the connection, display synced transactions, and support budget categorization. This may include:
- Plaid item identifiers
- linked account metadata
- synced transaction data and sync cursors
- timestamps and connection state

If a user disconnects a bank connection, Largent should stop future syncing for that connection. Certain historical transaction records already imported into the budgeting flow may remain if they are part of the user’s saved spending history, unless deletion is specifically requested and operationally feasible.

### 4. Billing and Premium Data
Subscription, billing-state, promo-redemption, and entitlement records may be retained for bookkeeping, fraud prevention, support history, and reconciliation needs even after premium access ends.

### 5. Email and Security Event Data
Largent may retain records of welcome emails, recovery emails, reminder emails, login events, and account-change events for support, audit, and abuse-prevention purposes.

## User Deletion Requests
Users may request account deletion or data deletion review through Largent support.

When a deletion request is received, Largent may:
- verify the requester’s identity
- deactivate or remove access to the account
- delete data that is no longer needed for legitimate operational or legal purposes
- preserve limited records necessary for security, fraud prevention, accounting, compliance, backups, or dispute resolution

## Backups
Deleted data may persist in backups for a limited period until backup rotation cycles complete. Backup data is not intended for routine product use and should be removed through normal retention cycles where feasible.

## Premium Expiry and Promo Data
Promo code redemption history and premium entitlement dates may be retained after expiration in order to:
- prevent duplicate or abusive use
- support customer service
- preserve billing and entitlement history

## Policy Updates
This policy may be updated as the product’s infrastructure, integrations, and legal obligations evolve.

## Contact
Use a monitored support or privacy contact for retention or deletion requests, such as:
- `largentsupport@gmail.com`


Replace placeholders before publication.

---

*This document is an operational draft for product and compliance readiness and should be reviewed by counsel before public release.*
