# Gym App Implementation Plan (from `gym.md` + `gym-schema.md`)

## 1) Inputs and Objective

- Inputs reviewed: `gym.md`, `gym-schema.md`
- Objective: deliver a production-ready V1 for gym operations (cashier/admin first), then member mobile experience.
- Delivery principle: optimize for operational reliability (subscriptions, payments, access) before comfort features.

## 2) Scope Lock (MVP vs V1.1)

### MVP (must ship first)

- Auth + RBAC (`ADMIN`, `CASHIER`, `COACH`, `MEMBER`)
- Members CRUD + search + archive + profile timeline
- Plans + subscriptions lifecycle (create, renew, freeze, cancel, transfer)
- Manual cashier payments (partial/full), idempotency, refunds/void (admin only)
- Invoice generation + PDF download
- QR access decision engine + manual override + full access logs
- Classes/occurrences + booking + waitlist + attendance
- Notifications (template-based) with async queue and non-blocking failures
- Settings + audit logs + dashboard KPIs + exports (basic CSV)

### V1.1 (defer unless explicitly needed in MVP)

- `EmergencyContact`, `MemberDocument`, `MemberTag`, `MemberTagItem`, `MemberAuditLog`
- `PlanDiscount`, `PlanDiscountItem` advanced discount campaigns
- `PaymentInstallment` schedule management
- `BroadcastMessage` campaigns

Reason: these models exist in `gym-schema.md` and are valuable, but they are not critical to the cashier-first operational path defined in `gym.md`.

## 3) Reconciliation Decisions Between Docs

1. Use `gym-schema.md` as the DB baseline, but gate V1.1 tables behind module flags.
2. Keep one-invoice-per-payment for MVP (`Invoice.paymentId` unique) unless business asks for multi-invoice split.
3. Keep `access.allow_partial_payment_access` setting as server-side decision input in the access engine.
4. Treat member app as dedicated SPA shell (as recommended in `gym.md`) while admin/cashier/coach remain server-driven shell.

## 4) Delivery Roadmap (Effort Buckets)

## Sprint 0 - Foundations (L)

- Monorepo bootstrap (`apps/api`, `apps/web`, `packages/*`)
- Docker Compose (api, worker, web, db, redis, nginx)
- Prisma setup + initial migration + seed data (admin, payment methods, default settings)
- Global NestJS foundations: auth skeleton, guards, validation, exception filters, audit interceptor

**Exit criteria**
- `docker compose up` runs all services
- DB migrates and seeds cleanly
- Health check endpoint responds

## Sprint 1 - Revenue Core (L)

- Members module
- Plans module
- Subscriptions module with rules (`renewal`, `freeze`, `duplicate unlimited guard`)
- Payments module with idempotency + partial payments + refund/void
- Invoices module + PDF generation

**Exit criteria**
- End-to-end flow works: create member -> subscribe -> pay -> invoice generated
- Admin-only protections enforced for refund/void
- Audit logs written for financial and subscription status changes

## Sprint 2 - Access Control (M)

- Member QR generation/rotation
- Access decision engine + reason codes
- Cashier scan/manual check-in + override with mandatory reason
- Access logs with filters

**Exit criteria**
- Scan result returned with clear reason and persisted log
- Override requires reason and actor identity
- Pack subscriptions decrement sessions when authorized (if enabled)

## Sprint 3 - Classes & Bookings (M)

- Classes and occurrences
- Booking creation/cancelation with cutoff rules
- Waitlist promotion logic
- Coach attendance marking

**Exit criteria**
- Capacity and race conditions handled transactionally
- Late cancelation rules enforced from settings
- Coach can manage attendance only for owned classes

## Sprint 4 - Member Mobile Experience (L)

- Member shell + JWT flow
- Home, QR, subscription view, planning, bookings, invoices, profile
- Offline-friendly QR display strategy

**Exit criteria**
- Member can log in, show QR, reserve/cancel, download invoices
- No admin layout leakage into member UX

## Sprint 5 - Reporting, Notifications, Hardening (M)

- Dashboard KPIs and exports
- Scheduled jobs (J-7/J-3/J-1 expiry reminders, unpaid reminders, class reminders)
- Observability, backup/restore checks, smoke e2e suite

**Exit criteria**
- Scheduled jobs run and failures are non-blocking
- KPI/report screens stable under realistic data volume
- Release checklist signed off

## 5) Acceptance Criteria for Critical Workflows

### WF-01 New Member Sale

- Detect duplicate by phone/email before creation
- Create member number
- Optional subscription + payment flow
- Invoice PDF generated on payment
- All events auditable

### WF-02 Renewal Rules

- Renewal start = current `endsAt` when active
- Renewal start = today when expired
- Reject renewal while frozen (unless explicit business override)

### WF-03 Access Decision

- Refuse blocked/archived/no active sub/frozen/expired/no sessions left
- Log every attempt with `decision_reason_code`
- Override creates explicit override record and audit trail

### WF-04 Booking Capacity Race

- Simultaneous last-seat requests resolved transactionally
- Winner gets `booked`; loser gets `waiting_list` with message

### WF-05 Notification Fault Tolerance

- Domain operation succeeds even if email/SMS fails
- Failure reason is persisted for retry/inspection

## 6) Technical Guardrails

- Keep money values in integer minor units (`Int`, FCFA)
- Use DB constraints + app rules (never app-only invariants)
- Enforce idempotency on create-payment
- Keep all sensitive actions in immutable `audit_logs`
- Avoid role checks in UI only; enforce on backend guards

## 7) Top Risks and Mitigation

- Scan latency too high -> dedicated scan route + trimmed payload + DB indexes on active subscription queries
- Double payment submission -> idempotency + disabled submit state + transaction boundary
- Override abuse -> reason min length + actor capture + admin review report
- Booking over-capacity -> row-level lock/transaction around counters
- Schema bloat early -> keep V1.1 modules disabled until core KPIs are green

## 8) First Executable Slice (next 30-60 min)

1. Create monorepo skeleton and Docker Compose.
2. Add Prisma schema baseline and generate initial migration.
3. Seed minimum operational data:
   - 1 admin user
   - payment methods (`cash`, `card`, `transfer`, `cheque`)
   - critical settings (`booking.cancel_cutoff_hours`, `access.allow_partial_payment_access`, `invoice.prefix`, `invoice.next_number`)

If this slice passes, Sprint 1 can start immediately with members/subscriptions/payments.
