# Largent Security Policy

Last updated: June 11, 2026

## Purpose
This Security Policy describes the baseline security practices Largent uses or intends to operationalize in support of its budgeting, account, subscription, and bank-sync workflows.

Largent is owned and operated by **Sean Pelillo Enterprises**.

## Security Ownership
Largent should maintain a clearly designated security owner responsible for information security oversight, risk response, and vendor coordination.

Recommended public-facing security contact format:
- **Security contact:** Sean Pelillo, Owner / Operator
- **Email:** `security@largent.com` or another monitored security inbox

Replace placeholder contact details before publication.

## Access Control
Largent limits access to production systems, data stores, and operational tools to only those accounts that require it for legitimate business operations. Security expectations include:
- unique user accounts for critical systems
- least-privilege access to production resources
- strong passwords for administrator accounts
- multi-factor authentication on critical systems where available
- prompt removal or rotation of credentials when access is no longer needed

Critical systems may include hosting platforms, code repositories, database consoles, Plaid, Stripe, email infrastructure, and domain or DNS providers.

## Authentication and Credential Handling
Largent applies baseline account protections including:
- password hashing for end-user passwords
- password complexity requirements
- password recovery flows using rotating recovery codes or equivalent secure reset mechanisms
- session controls designed to reduce unauthorized access risk
- restricted storage of sensitive tokens and secrets in environment configuration rather than source code

## Encryption
Largent requires:
- **encryption in transit** using TLS 1.2 or better between clients and servers
- **encrypted connections** to managed infrastructure and database services where supported
- **at-rest protections** provided by managed vendors and infrastructure providers, plus careful handling of sensitive tokens and identifiers

## Infrastructure and Vendor Security
Largent relies on established third-party providers for infrastructure and financial integrations. Security posture includes evaluating whether vendors support:
- role-based access controls
- secure credential storage
- encrypted transport
- audit logging or event visibility
- administrative MFA

Key vendors may include Plaid, Stripe, Render, GitHub, email providers, and managed database platforms.

## Application Security Practices
Largent aims to maintain practical application security measures, including:
- input validation for user-provided data
- confirmation prompts around sensitive account changes
- restrictions around destructive actions
- secure handling of authentication state
- controlled storage of premium, billing, and bank-link metadata
- periodic review of logs and error handling for sensitive endpoints

## Vulnerability Management
Largent should maintain a lightweight but active vulnerability management process. This may include:
- keeping framework and package dependencies reasonably current
- patching critical vulnerabilities in a timely manner
- reviewing production issues and unexpected exceptions
- using provider dashboards, dependency alerts, or similar tooling to identify risks
- periodically reviewing developer machines and production assets for updates and security posture

## Incident Response
If Largent becomes aware of a suspected security incident involving unauthorized access, data exposure, or service misuse, the response process should include:
- investigating the affected systems and scope
- containing access or rotating credentials where necessary
- documenting the event and remediation steps
- notifying affected users and vendors when appropriate and legally required
- applying corrective measures to reduce recurrence risk

## Data Minimization
Largent seeks to collect and retain only the information needed to:
- operate core budgeting workflows
- support premium subscription features
- enable optional bank-sync automation
- satisfy legal, billing, fraud-prevention, and operational needs

## Security Review and Updates
This policy should be reviewed periodically as the product, vendors, and regulatory expectations evolve.

---

*This document is an operational draft for product and compliance readiness and should be reviewed by counsel before public release.*
