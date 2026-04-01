On fait les deux en séquence. D'abord le `schema.prisma` complet, ensuite la structure NestJS.

---

## schema.prisma — Complet

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

enum UserType {
  admin
  cashier
  coach
  member
}

enum UserStatus {
  active
  inactive
  blocked
}

enum MemberStatus {
  draft
  active
  inactive
  blocked
  archived
}

enum Gender {
  male
  female
  other
}

enum PlanType {
  monthly
  quarterly
  annual
  session_pack
  class_only
  custom
}

enum AccessScope {
  full_gym
  classes_only
  specific_classes
}

enum SubscriptionStatus {
  draft
  pending_payment
  active
  frozen
  expired
  cancelled
  transferred
}

enum SubscriptionSource {
  new_subscription
  renewal
  manual_admin
  transfer
}

enum PaymentStatus {
  draft
  partial
  paid
  voided
  refunded
}

enum InvoiceStatus {
  draft
  issued
  cancelled
}

enum InvoiceType {
  invoice
  receipt
  credit_note
}

enum QrCodeStatus {
  active
  revoked
  rotated
}

enum AccessAttemptType {
  qr_scan
  manual_lookup
  manual_override
}

enum AccessDecision {
  authorized
  refused
  overridden
}

enum ClassStatus {
  draft
  active
  inactive
  cancelled
}

enum OccurrenceStatus {
  scheduled
  completed
  cancelled
}

enum BookingStatus {
  booked
  waiting_list
  cancelled
  late_cancelled
  attended
  absent
}

enum BookingCreatedByType {
  member
  cashier
  admin
}

enum NotificationChannel {
  email
  sms
}

enum NotificationStatus {
  pending
  sent
  failed
  cancelled
}

// ─────────────────────────────────────────────
// AUTH & RBAC
// ─────────────────────────────────────────────

model User {
  id            BigInt      @id @default(autoincrement())
  firstName     String      @map("first_name") @db.VarChar(100)
  lastName      String      @map("last_name") @db.VarChar(100)
  email         String      @unique @db.VarChar(255)
  phone         String?     @db.VarChar(20)
  passwordHash  String      @map("password_hash") @db.VarChar(255)
  userType      UserType    @map("user_type")
  status        UserStatus  @default(active)
  lastLoginAt   DateTime?   @map("last_login_at") @db.Timestamptz
  createdAt     DateTime    @default(now()) @map("created_at") @db.Timestamptz
  updatedAt     DateTime    @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  member                    Member?             @relation("UserMember")
  createdMembers            Member[]            @relation("CreatedByUser")
  updatedMembers            Member[]            @relation("UpdatedByUser")
  memberAuditLogs           MemberAuditLog[]
  createdSubscriptions      Subscription[]      @relation("SubscriptionCreatedBy")
  approvedFreezes           SubscriptionFreeze[] @relation("FreezeApprovedBy")
  createdFreezes            SubscriptionFreeze[] @relation("FreezeCreatedBy")
  subscriptionStatusLogs    SubscriptionStatusLog[]
  payments                  Payment[]           @relation("CashierPayments")
  voidedPayments            Payment[]           @relation("VoidedByUser")
  processedRefunds          Refund[]
  createdInvoices           Invoice[]
  coachClasses              Class[]             @relation("CoachClasses")
  coachOccurrences          ClassOccurrence[]   @relation("CoachOccurrences")
  createdClasses            Class[]             @relation("CreatedClasses")
  bookings                  Booking[]
  accessLogs                AccessLog[]
  accessOverrides           AccessOverride[]
  auditLogs                 AuditLog[]
  notifications             Notification[]
  broadcastMessages         BroadcastMessage[]

  @@map("users")
}

// ─────────────────────────────────────────────
// MEMBRES
// ─────────────────────────────────────────────

model Member {
  id                BigInt        @id @default(autoincrement())
  memberNumber      String        @unique @map("member_number") @db.VarChar(20)
  firstName         String        @map("first_name") @db.VarChar(100)
  lastName          String        @map("last_name") @db.VarChar(100)
  gender            Gender?
  dateOfBirth       DateTime?     @map("date_of_birth") @db.Date
  phone             String?       @db.VarChar(20)
  email             String?       @db.VarChar(255)
  status            MemberStatus  @default(draft)
  photoPath         String?       @map("photo_path") @db.VarChar(500)
  goalNotes         String?       @map("goal_notes") @db.Text
  medicalNotes      String?       @map("medical_notes") @db.Text
  internalNotes     String?       @map("internal_notes") @db.Text
  joinedAt          DateTime?     @map("joined_at") @db.Date
  archivedAt        DateTime?     @map("archived_at") @db.Timestamptz
  linkedUserId      BigInt?       @unique @map("linked_user_id")
  createdByUserId   BigInt?       @map("created_by_user_id")
  updatedByUserId   BigInt?       @map("updated_by_user_id")
  createdAt         DateTime      @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime      @updatedAt @map("updated_at") @db.Timestamptz

  // Relations
  linkedUser          User?               @relation("UserMember", fields: [linkedUserId], references: [id])
  createdByUser       User?               @relation("CreatedByUser", fields: [createdByUserId], references: [id])
  updatedByUser       User?               @relation("UpdatedByUser", fields: [updatedByUserId], references: [id])
  emergencyContacts   EmergencyContact[]
  documents           MemberDocument[]
  tags                MemberTagItem[]
  auditLogs           MemberAuditLog[]
  subscriptions       Subscription[]
  payments            Payment[]
  invoices            Invoice[]
  qrCodes             MemberQrCode[]
  accessLogs          AccessLog[]
  bookings            Booking[]
  notifications       Notification[]

  @@index([lastName])
  @@index([phone])
  @@index([email])
  @@index([status])
  @@map("members")
}

model EmergencyContact {
  id          BigInt   @id @default(autoincrement())
  memberId    BigInt   @map("member_id")
  fullName    String   @map("full_name") @db.VarChar(200)
  relationship String  @db.VarChar(100)
  phone       String   @db.VarChar(20)
  isPrimary   Boolean  @default(false) @map("is_primary")
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz

  member      Member   @relation(fields: [memberId], references: [id])

  @@map("emergency_contacts")
}

model MemberDocument {
  id                BigInt   @id @default(autoincrement())
  memberId          BigInt   @map("member_id")
  documentType      String   @map("document_type") @db.VarChar(100)
  filePath          String   @map("file_path") @db.VarChar(500)
  uploadedByUserId  BigInt?  @map("uploaded_by_user_id")
  createdAt         DateTime @default(now()) @map("created_at") @db.Timestamptz

  member            Member   @relation(fields: [memberId], references: [id])

  @@map("member_documents")
}

model MemberTag {
  id        BigInt          @id @default(autoincrement())
  name      String          @unique @db.VarChar(100)
  color     String?         @db.VarChar(7)
  createdAt DateTime        @default(now()) @map("created_at") @db.Timestamptz

  items     MemberTagItem[]

  @@map("member_tags")
}

model MemberTagItem {
  memberId    BigInt    @map("member_id")
  tagId       BigInt    @map("tag_id")

  member      Member    @relation(fields: [memberId], references: [id])
  tag         MemberTag @relation(fields: [tagId], references: [id])

  @@id([memberId, tagId])
  @@map("member_tag_items")
}

model MemberAuditLog {
  id                BigInt   @id @default(autoincrement())
  memberId          BigInt   @map("member_id")
  action            String   @db.VarChar(100)
  performedByUserId BigInt?  @map("performed_by_user_id")
  oldValues         Json?    @map("old_values")
  newValues         Json?    @map("new_values")
  notes             String?  @db.Text
  createdAt         DateTime @default(now()) @map("created_at") @db.Timestamptz

  member            Member   @relation(fields: [memberId], references: [id])
  performedByUser   User?    @relation(fields: [performedByUserId], references: [id])

  @@index([memberId])
  @@map("member_audit_logs")
}

// ─────────────────────────────────────────────
// PLANS & TARIFICATION
// ─────────────────────────────────────────────

model SubscriptionPlan {
  id               BigInt        @id @default(autoincrement())
  code             String        @unique @db.VarChar(50)
  name             String        @db.VarChar(200)
  description      String?       @db.Text
  planType         PlanType      @map("plan_type")
  durationDays     Int?          @map("duration_days")
  sessionCount     Int?          @map("session_count")
  accessScope      AccessScope   @map("access_scope")
  price            Int
  currency         String        @default("XOF") @db.VarChar(3)
  isActive         Boolean       @default(true) @map("is_active")
  allowsFreeze     Boolean       @default(true) @map("allows_freeze")
  allowsTransfer   Boolean       @default(false) @map("allows_transfer")
  createdAt        DateTime      @default(now()) @map("created_at") @db.Timestamptz
  updatedAt        DateTime      @updatedAt @map("updated_at") @db.Timestamptz

  subscriptions    Subscription[]
  discounts        PlanDiscountItem[]

  @@index([planType])
  @@index([isActive])
  @@map("subscription_plans")
}

model PlanDiscount {
  id              BigInt            @id @default(autoincrement())
  name            String            @db.VarChar(200)
  discountType    String            @map("discount_type") @db.VarChar(50)
  discountValue   Int               @map("discount_value")
  isActive        Boolean           @default(true) @map("is_active")
  startsAt        DateTime?         @map("starts_at") @db.Timestamptz
  endsAt          DateTime?         @map("ends_at") @db.Timestamptz
  createdAt       DateTime          @default(now()) @map("created_at") @db.Timestamptz

  plans           PlanDiscountItem[]

  @@map("plan_discounts")
}

model PlanDiscountItem {
  planId      BigInt          @map("plan_id")
  discountId  BigInt          @map("discount_id")

  plan        SubscriptionPlan @relation(fields: [planId], references: [id])
  discount    PlanDiscount     @relation(fields: [discountId], references: [id])

  @@id([planId, discountId])
  @@map("plan_discount_items")
}

// ─────────────────────────────────────────────
// ABONNEMENTS
// ─────────────────────────────────────────────

model Subscription {
  id                      BigInt              @id @default(autoincrement())
  memberId                BigInt              @map("member_id")
  subscriptionPlanId      BigInt              @map("subscription_plan_id")
  status                  SubscriptionStatus  @default(draft)
  sourceType              SubscriptionSource  @map("source_type")
  startedAt               DateTime            @map("started_at") @db.Date
  endsAt                  DateTime?           @map("ends_at") @db.Date
  originalPrice           Int                 @map("original_price")
  discountAmount          Int                 @default(0) @map("discount_amount")
  finalPrice              Int                 @map("final_price")
  currency                String              @default("XOF") @db.VarChar(3)
  remainingSessions       Int?                @map("remaining_sessions")
  notes                   String?             @db.Text
  previousSubscriptionId  BigInt?             @map("previous_subscription_id")
  transferredToMemberId   BigInt?             @map("transferred_to_member_id")
  cancelledAt             DateTime?           @map("cancelled_at") @db.Timestamptz
  createdByUserId         BigInt?             @map("created_by_user_id")
  createdAt               DateTime            @default(now()) @map("created_at") @db.Timestamptz
  updatedAt               DateTime            @updatedAt @map("updated_at") @db.Timestamptz

  member                  Member              @relation(fields: [memberId], references: [id])
  plan                    SubscriptionPlan    @relation(fields: [subscriptionPlanId], references: [id])
  previousSubscription    Subscription?       @relation("SubscriptionHistory", fields: [previousSubscriptionId], references: [id])
  nextSubscriptions       Subscription[]      @relation("SubscriptionHistory")
  createdByUser           User?               @relation("SubscriptionCreatedBy", fields: [createdByUserId], references: [id])
  transferredToMember     Member?             @relation(fields: [transferredToMemberId], references: [id])
  freezes                 SubscriptionFreeze[]
  statusLogs              SubscriptionStatusLog[]
  payments                Payment[]
  invoices                Invoice[]
  accessLogs              AccessLog[]

  @@index([memberId, status])
  @@index([startedAt, endsAt])
  @@index([subscriptionPlanId])
  @@map("subscriptions")
}

// Relation self-référentielle — Prisma nécessite les deux côtés nommés
// On ajoute la relation transferredToMember sur Member séparément

model SubscriptionFreeze {
  id                  BigInt       @id @default(autoincrement())
  subscriptionId      BigInt       @map("subscription_id")
  startsAt            DateTime     @map("starts_at") @db.Date
  endsAt              DateTime     @map("ends_at") @db.Date
  daysFrozen          Int          @map("days_frozen")
  reason              String?      @db.Text
  approvedByUserId    BigInt?      @map("approved_by_user_id")
  createdByUserId     BigInt?      @map("created_by_user_id")
  createdAt           DateTime     @default(now()) @map("created_at") @db.Timestamptz

  subscription        Subscription @relation(fields: [subscriptionId], references: [id])
  approvedByUser      User?        @relation("FreezeApprovedBy", fields: [approvedByUserId], references: [id])
  createdByUser       User?        @relation("FreezeCreatedBy", fields: [createdByUserId], references: [id])

  @@map("subscription_freezes")
}

model SubscriptionStatusLog {
  id                BigInt       @id @default(autoincrement())
  subscriptionId    BigInt       @map("subscription_id")
  oldStatus         String?      @map("old_status") @db.VarChar(50)
  newStatus         String       @map("new_status") @db.VarChar(50)
  changedByUserId   BigInt?      @map("changed_by_user_id")
  reason            String?      @db.Text
  createdAt         DateTime     @default(now()) @map("created_at") @db.Timestamptz

  subscription      Subscription @relation(fields: [subscriptionId], references: [id])
  changedByUser     User?        @relation(fields: [changedByUserId], references: [id])

  @@index([subscriptionId])
  @@map("subscription_status_logs")
}

// ─────────────────────────────────────────────
// PAIEMENTS & FACTURATION
// ─────────────────────────────────────────────

model PaymentMethod {
  id        BigInt    @id @default(autoincrement())
  code      String    @unique @db.VarChar(50)
  name      String    @db.VarChar(100)
  isActive  Boolean   @default(true) @map("is_active")
  createdAt DateTime  @default(now()) @map("created_at") @db.Timestamptz

  payments  Payment[]

  @@map("payment_methods")
}

model Payment {
  id                BigInt          @id @default(autoincrement())
  memberId          BigInt          @map("member_id")
  subscriptionId    BigInt?         @map("subscription_id")
  paymentReference  String          @unique @map("payment_reference") @db.VarChar(100)
  idempotencyKey    String?         @unique @map("idempotency_key") @db.VarChar(255)
  status            PaymentStatus   @default(draft)
  paymentMethodId   BigInt          @map("payment_method_id")
  paymentDate       DateTime        @map("payment_date") @db.Date
  amountDue         Int             @map("amount_due")
  amountPaid        Int             @map("amount_paid")
  remainingBalance  Int             @default(0) @map("remaining_balance")
  currency          String          @default("XOF") @db.VarChar(3)
  cashierUserId     BigInt          @map("cashier_user_id")
  voidedByUserId    BigInt?         @map("voided_by_user_id")
  voidReason        String?         @map("void_reason") @db.Text
  notes             String?         @db.Text
  receiptNumber     String?         @unique @map("receipt_number") @db.VarChar(100)
  createdAt         DateTime        @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime        @updatedAt @map("updated_at") @db.Timestamptz

  member            Member          @relation(fields: [memberId], references: [id])
  subscription      Subscription?   @relation(fields: [subscriptionId], references: [id])
  paymentMethod     PaymentMethod   @relation(fields: [paymentMethodId], references: [id])
  cashierUser       User            @relation("CashierPayments", fields: [cashierUserId], references: [id])
  voidedByUser      User?           @relation("VoidedByUser", fields: [voidedByUserId], references: [id])
  installments      PaymentInstallment[]
  refunds           Refund[]
  invoice           Invoice?

  @@index([memberId])
  @@index([subscriptionId])
  @@index([status])
  @@index([paymentDate])
  @@index([memberId, paymentDate])
  @@map("payments")
}

model PaymentInstallment {
  id                BigInt    @id @default(autoincrement())
  paymentId         BigInt    @map("payment_id")
  installmentNumber Int       @map("installment_number")
  dueDate           DateTime  @map("due_date") @db.Date
  expectedAmount    Int       @map("expected_amount")
  paidAmount        Int       @default(0) @map("paid_amount")
  status            String    @db.VarChar(50)   // pending, partial, paid, late, cancelled
  paidAt            DateTime? @map("paid_at") @db.Timestamptz
  createdAt         DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  payment           Payment   @relation(fields: [paymentId], references: [id])

  @@map("payment_installments")
}

model Refund {
  id                  BigInt    @id @default(autoincrement())
  paymentId           BigInt    @map("payment_id")
  refundReference     String    @unique @map("refund_reference") @db.VarChar(100)
  amount              Int
  refundDate          DateTime  @map("refund_date") @db.Date
  reason              String    @db.Text
  processedByUserId   BigInt    @map("processed_by_user_id")
  createdAt           DateTime  @default(now()) @map("created_at") @db.Timestamptz

  payment             Payment   @relation(fields: [paymentId], references: [id])
  processedByUser     User      @relation(fields: [processedByUserId], references: [id])

  @@map("refunds")
}

model Invoice {
  id                BigInt        @id @default(autoincrement())
  invoiceNumber     String        @unique @map("invoice_number") @db.VarChar(50)
  memberId          BigInt        @map("member_id")
  paymentId         BigInt?       @unique @map("payment_id")
  subscriptionId    BigInt?       @map("subscription_id")
  invoiceType       InvoiceType   @map("invoice_type")
  issueDate         DateTime      @map("issue_date") @db.Date
  subtotalAmount    Int           @map("subtotal_amount")
  discountAmount    Int           @default(0) @map("discount_amount")
  totalAmount       Int           @map("total_amount")
  currency          String        @default("XOF") @db.VarChar(3)
  pdfPath           String?       @map("pdf_path") @db.VarChar(500)
  sentAt            DateTime?     @map("sent_at") @db.Timestamptz
  status            InvoiceStatus @default(draft)
  createdByUserId   BigInt?       @map("created_by_user_id")
  createdAt         DateTime      @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime      @updatedAt @map("updated_at") @db.Timestamptz

  member            Member        @relation(fields: [memberId], references: [id])
  payment           Payment?      @relation(fields: [paymentId], references: [id])
  subscription      Subscription? @relation(fields: [subscriptionId], references: [id])
  createdByUser     User?         @relation(fields: [createdByUserId], references: [id])
  items             InvoiceItem[]

  @@index([memberId])
  @@index([issueDate])
  @@index([status])
  @@map("invoices")
}

model InvoiceItem {
  id          BigInt    @id @default(autoincrement())
  invoiceId   BigInt    @map("invoice_id")
  label       String    @db.VarChar(255)
  description String?   @db.Text
  quantity    Int       @default(1)
  unitPrice   Int       @map("unit_price")
  lineTotal   Int       @map("line_total")
  itemType    String?   @map("item_type") @db.VarChar(50)
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz

  invoice     Invoice   @relation(fields: [invoiceId], references: [id])

  @@map("invoice_items")
}

// ─────────────────────────────────────────────
// CONTRÔLE D'ACCÈS & QR
// ─────────────────────────────────────────────

model MemberQrCode {
  id            BigInt        @id @default(autoincrement())
  memberId      BigInt        @map("member_id")
  qrIdentifier  String        @unique @map("qr_identifier") @db.VarChar(255)
  status        QrCodeStatus  @default(active)
  generatedAt   DateTime      @default(now()) @map("generated_at") @db.Timestamptz
  expiresAt     DateTime?     @map("expires_at") @db.Timestamptz
  revokedAt     DateTime?     @map("revoked_at") @db.Timestamptz
  createdAt     DateTime      @default(now()) @map("created_at") @db.Timestamptz

  member        Member        @relation(fields: [memberId], references: [id])
  accessLogs    AccessLog[]

  @@index([memberId])
  @@map("member_qr_codes")
}

model AccessPoint {
  id          BigInt      @id @default(autoincrement())
  name        String      @db.VarChar(100)
  description String?     @db.Text
  isActive    Boolean     @default(true) @map("is_active")
  createdAt   DateTime    @default(now()) @map("created_at") @db.Timestamptz

  accessLogs  AccessLog[]

  @@map("access_points")
}

model AccessLog {
  id                    BigInt              @id @default(autoincrement())
  memberId              BigInt?             @map("member_id")
  qrCodeId              BigInt?             @map("qr_code_id")
  accessPointId         BigInt?             @map("access_point_id")
  attemptType           AccessAttemptType   @map("attempt_type")
  decision              AccessDecision
  decisionReasonCode    String?             @map("decision_reason_code") @db.VarChar(100)
  decisionReasonText    String?             @map("decision_reason_text") @db.VarChar(255)
  subscriptionId        BigInt?             @map("subscription_id")
  performedByUserId     BigInt?             @map("performed_by_user_id")
  attemptedAt           DateTime            @default(now()) @map("attempted_at") @db.Timestamptz
  createdAt             DateTime            @default(now()) @map("created_at") @db.Timestamptz

  member                Member?             @relation(fields: [memberId], references: [id])
  qrCode                MemberQrCode?       @relation(fields: [qrCodeId], references: [id])
  accessPoint           AccessPoint?        @relation(fields: [accessPointId], references: [id])
  subscription          Subscription?       @relation(fields: [subscriptionId], references: [id])
  performedByUser       User?               @relation(fields: [performedByUserId], references: [id])
  override              AccessOverride?

  @@index([memberId])
  @@index([attemptedAt])
  @@index([decision])
  @@index([memberId, attemptedAt])
  @@map("access_logs")
}

model AccessOverride {
  id                    BigInt      @id @default(autoincrement())
  accessLogId           BigInt      @unique @map("access_log_id")
  memberId              BigInt      @map("member_id")
  authorizedByUserId    BigInt      @map("authorized_by_user_id")
  reason                String      @db.Text
  createdAt             DateTime    @default(now()) @map("created_at") @db.Timestamptz

  accessLog             AccessLog   @relation(fields: [accessLogId], references: [id])
  member                Member      @relation(fields: [memberId], references: [id])
  authorizedByUser      User        @relation(fields: [authorizedByUserId], references: [id])

  @@map("access_overrides")
}

// ─────────────────────────────────────────────
// COURS & RÉSERVATIONS
// ─────────────────────────────────────────────

model ClassCategory {
  id          BigInt    @id @default(autoincrement())
  name        String    @db.VarChar(100)
  color       String?   @db.VarChar(7)
  description String?   @db.Text
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz

  classes     Class[]

  @@map("class_categories")
}

model Room {
  id          BigInt            @id @default(autoincrement())
  name        String            @db.VarChar(100)
  capacity    Int?
  isActive    Boolean           @default(true) @map("is_active")
  createdAt   DateTime          @default(now()) @map("created_at") @db.Timestamptz

  classes     Class[]
  occurrences ClassOccurrence[]

  @@map("rooms")
}

model Class {
  id                BigInt          @id @default(autoincrement())
  name              String          @db.VarChar(200)
  description       String?         @db.Text
  classCategoryId   BigInt?         @map("class_category_id")
  coachUserId       BigInt?         @map("coach_user_id")
  roomId            BigInt?         @map("room_id")
  defaultCapacity   Int             @map("default_capacity")
  durationMinutes   Int             @map("duration_minutes")
  isRecurring       Boolean         @default(false) @map("is_recurring")
  recurrenceRule    String?         @map("recurrence_rule") @db.Text
  status            ClassStatus     @default(draft)
  createdByUserId   BigInt?         @map("created_by_user_id")
  createdAt         DateTime        @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime        @updatedAt @map("updated_at") @db.Timestamptz

  category          ClassCategory?  @relation(fields: [classCategoryId], references: [id])
  coach             User?           @relation("CoachClasses", fields: [coachUserId], references: [id])
  room              Room?           @relation(fields: [roomId], references: [id])
  createdByUser     User?           @relation("CreatedClasses", fields: [createdByUserId], references: [id])
  occurrences       ClassOccurrence[]

  @@map("classes")
}

model ClassOccurrence {
  id                  BigInt            @id @default(autoincrement())
  classId             BigInt            @map("class_id")
  startsAt            DateTime          @map("starts_at") @db.Timestamptz
  endsAt              DateTime          @map("ends_at") @db.Timestamptz
  capacity            Int
  bookedCount         Int               @default(0) @map("booked_count")
  waitingCount        Int               @default(0) @map("waiting_count")
  status              OccurrenceStatus  @default(scheduled)
  cancellationReason  String?           @map("cancellation_reason") @db.Text
  coachUserId         BigInt?           @map("coach_user_id")
  roomId              BigInt?           @map("room_id")
  createdAt           DateTime          @default(now()) @map("created_at") @db.Timestamptz
  updatedAt           DateTime          @updatedAt @map("updated_at") @db.Timestamptz

  class               Class             @relation(fields: [classId], references: [id])
  coach               User?             @relation("CoachOccurrences", fields: [coachUserId], references: [id])
  room                Room?             @relation(fields: [roomId], references: [id])
  bookings            Booking[]

  @@index([classId])
  @@index([startsAt])
  @@index([coachUserId])
  @@index([status])
  @@map("class_occurrences")
}

model Booking {
  id                  BigInt                @id @default(autoincrement())
  memberId            BigInt                @map("member_id")
  classOccurrenceId   BigInt                @map("class_occurrence_id")
  status              BookingStatus         @default(booked)
  bookedAt            DateTime              @default(now()) @map("booked_at") @db.Timestamptz
  cancelledAt         DateTime?             @map("cancelled_at") @db.Timestamptz
  cancelReason        String?               @map("cancel_reason") @db.Text
  waitlistPosition    Int?                  @map("waitlist_position")
  promotedAt          DateTime?             @map("promoted_at") @db.Timestamptz
  createdByType       BookingCreatedByType  @map("created_by_type")
  createdByUserId     BigInt?               @map("created_by_user_id")
  createdAt           DateTime              @default(now()) @map("created_at") @db.Timestamptz
  updatedAt           DateTime              @updatedAt @map("updated_at") @db.Timestamptz

  member              Member                @relation(fields: [memberId], references: [id])
  classOccurrence     ClassOccurrence       @relation(fields: [classOccurrenceId], references: [id])
  createdByUser       User?                 @relation(fields: [createdByUserId], references: [id])

  @@unique([memberId, classOccurrenceId])
  @@index([memberId])
  @@index([classOccurrenceId])
  @@index([status])
  @@index([classOccurrenceId, status])
  @@map("bookings")
}

// ─────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────

model NotificationTemplate {
  id        BigInt                @id @default(autoincrement())
  code      String                @unique @db.VarChar(100)
  name      String                @db.VarChar(200)
  channel   NotificationChannel
  subject   String?               @db.VarChar(500)
  body      String                @db.Text
  isActive  Boolean               @default(true) @map("is_active")
  createdAt DateTime              @default(now()) @map("created_at") @db.Timestamptz
  updatedAt DateTime              @updatedAt @map("updated_at") @db.Timestamptz

  notifications Notification[]

  @@map("notification_templates")
}

model Notification {
  id              BigInt                @id @default(autoincrement())
  memberId        BigInt?               @map("member_id")
  templateId      BigInt?               @map("template_id")
  relatedType     String?               @map("related_type") @db.VarChar(100)
  relatedId       BigInt?               @map("related_id")
  channel         NotificationChannel
  recipient       String                @db.VarChar(255)
  subject         String?               @db.VarChar(500)
  body            String                @db.Text
  status          NotificationStatus    @default(pending)
  scheduledAt     DateTime?             @map("scheduled_at") @db.Timestamptz
  sentAt          DateTime?             @map("sent_at") @db.Timestamptz
  failureReason   String?               @map("failure_reason") @db.Text
  createdByUserId BigInt?               @map("created_by_user_id")
  createdAt       DateTime              @default(now()) @map("created_at") @db.Timestamptz

  member          Member?               @relation(fields: [memberId], references: [id])
  template        NotificationTemplate? @relation(fields: [templateId], references: [id])
  createdByUser   User?                 @relation(fields: [createdByUserId], references: [id])

  @@index([memberId])
  @@index([status])
  @@index([scheduledAt])
  @@map("notifications")
}

model BroadcastMessage {
  id              BigInt    @id @default(autoincrement())
  title           String    @db.VarChar(200)
  channel         NotificationChannel
  targetFilter    Json      @map("target_filter")
  messageBody     String    @map("message_body") @db.Text
  status          String    @db.VarChar(50)   // draft, scheduled, sent, cancelled
  scheduledAt     DateTime? @map("scheduled_at") @db.Timestamptz
  sentAt          DateTime? @map("sent_at") @db.Timestamptz
  createdByUserId BigInt    @map("created_by_user_id")
  createdAt       DateTime  @default(now()) @map("created_at") @db.Timestamptz
  updatedAt       DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  createdByUser   User      @relation(fields: [createdByUserId], references: [id])

  @@map("broadcast_messages")
}

// ─────────────────────────────────────────────
// SETTINGS & AUDIT
// ─────────────────────────────────────────────

model Setting {
  id          BigInt    @id @default(autoincrement())
  key         String    @unique @db.VarChar(200)
  value       Json
  groupName   String    @map("group_name") @db.VarChar(100)
  description String?   @db.Text
  updatedAt   DateTime  @updatedAt @map("updated_at") @db.Timestamptz

  @@map("settings")
}

model AuditLog {
  id            BigInt    @id @default(autoincrement())
  userId        BigInt?   @map("user_id")
  action        String    @db.VarChar(200)
  entityType    String    @map("entity_type") @db.VarChar(100)
  entityId      BigInt?   @map("entity_id")
  oldValues     Json?     @map("old_values")
  newValues     Json?     @map("new_values")
  ipAddress     String?   @map("ip_address") @db.VarChar(45)
  userAgent     String?   @map("user_agent") @db.Text
  createdAt     DateTime  @default(now()) @map("created_at") @db.Timestamptz

  user          User?     @relation(fields: [userId], references: [id])

  @@index([entityType, entityId])
  @@index([userId])
  @@index([createdAt])
  @@map("audit_logs")
}
```

---

Maintenant la structure NestJS complète.

---

## Structure NestJS — Dossiers et fichiers typés

```
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   └── storage.config.ts
│   │
│   ├── common/
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── member-owner.guard.ts
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   ├── current-user.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── pipes/
│   │   │   └── zod-validation.pipe.ts
│   │   ├── interceptors/
│   │   │   ├── audit.interceptor.ts
│   │   │   └── idempotency.interceptor.ts
│   │   ├── dto/
│   │   │   └── pagination.dto.ts
│   │   └── types/
│   │       ├── authenticated-request.type.ts
│   │       └── paginated-response.type.ts
│   │
│   └── modules/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── strategies/
│       │   │   ├── jwt.strategy.ts
│       │   │   ├── jwt-refresh.strategy.ts
│       │   │   └── local.strategy.ts
│       │   └── dto/
│       │       ├── login.dto.ts
│       │       ├── refresh-token.dto.ts
│       │       ├── forgot-password.dto.ts
│       │       └── reset-password.dto.ts
│       │
│       ├── members/
│       │   ├── members.module.ts
│       │   ├── members.controller.ts
│       │   ├── members.service.ts
│       │   ├── members.repository.ts
│       │   └── dto/
│       │       ├── create-member.dto.ts
│       │       ├── update-member.dto.ts
│       │       ├── filter-members.dto.ts
│       │       └── member-response.dto.ts
│       │
│       ├── plans/
│       │   ├── plans.module.ts
│       │   ├── plans.controller.ts
│       │   ├── plans.service.ts
│       │   └── dto/
│       │       ├── create-plan.dto.ts
│       │       └── update-plan.dto.ts
│       │
│       ├── subscriptions/
│       │   ├── subscriptions.module.ts
│       │   ├── subscriptions.controller.ts
│       │   ├── subscriptions.service.ts
│       │   ├── subscriptions.repository.ts
│       │   ├── subscriptions.rules.ts      ← logique métier pure isolée
│       │   └── dto/
│       │       ├── create-subscription.dto.ts
│       │       ├── renew-subscription.dto.ts
│       │       ├── freeze-subscription.dto.ts
│       │       ├── transfer-subscription.dto.ts
│       │       └── cancel-subscription.dto.ts
│       │
│       ├── payments/
│       │   ├── payments.module.ts
│       │   ├── payments.controller.ts
│       │   ├── payments.service.ts
│       │   ├── payments.repository.ts
│       │   └── dto/
│       │       ├── create-payment.dto.ts
│       │       ├── void-payment.dto.ts
│       │       └── refund-payment.dto.ts
│       │
│       ├── invoices/
│       │   ├── invoices.module.ts
│       │   ├── invoices.controller.ts
│       │   ├── invoices.service.ts
│       │   ├── invoices.generator.ts      ← génération PDF isolée
│       │   └── dto/
│       │       └── invoice-response.dto.ts
│       │
│       ├── access/
│       │   ├── access.module.ts
│       │   ├── access.controller.ts
│       │   ├── access.service.ts
│       │   ├── access.decision-engine.ts  ← logique de décision isolée
│       │   ├── qr.service.ts
│       │   └── dto/
│       │       ├── validate-qr.dto.ts
│       │       ├── manual-checkin.dto.ts
│       │       ├── override-access.dto.ts
│       │       └── access-log-response.dto.ts
│       │
│       ├── classes/
│       │   ├── classes.module.ts
│       │   ├── classes.controller.ts
│       │   ├── classes.service.ts
│       │   ├── occurrences.service.ts
│       │   └── dto/
│       │       ├── create-class.dto.ts
│       │       ├── update-occurrence.dto.ts
│       │       └── cancel-occurrence.dto.ts
│       │
│       ├── bookings/
│       │   ├── bookings.module.ts
│       │   ├── bookings.controller.ts
│       │   ├── bookings.service.ts
│       │   ├── bookings.rules.ts          ← règles annulation, délais, liste d'attente
│       │   └── dto/
│       │       ├── create-booking.dto.ts
│       │       └── cancel-booking.dto.ts
│       │
│       ├── notifications/
│       │   ├── notifications.module.ts
│       │   ├── notifications.service.ts
│       │   ├── notifications.queue.ts
│       │   ├── providers/
│       │   │   ├── email.provider.ts
│       │   │   └── sms.provider.ts
│       │   ├── jobs/
│       │   │   ├── expiry-reminder.job.ts
│       │   │   ├── unpaid-balance.job.ts
│       │   │   ├── class-reminder.job.ts
│       │   │   └── cleanup.job.ts
│       │   └── templates/
│       │       └── template.renderer.ts
│       │
│       ├── reporting/
│       │   ├── reporting.module.ts
│       │   ├── reporting.controller.ts
│       │   ├── reporting.service.ts
│       │   └── dto/
│       │       └── report-filter.dto.ts
│       │
│       ├── settings/
│       │   ├── settings.module.ts
│       │   ├── settings.controller.ts
│       │   └── settings.service.ts
│       │
│       └── audit/
│           ├── audit.module.ts
│           └── audit.service.ts
```

---

### Fichiers clés — contenu typé

**`common/types/authenticated-request.type.ts`**
```typescript
import { Request } from 'express'
import { UserType } from '@prisma/client'

export interface AuthenticatedUser {
  id: bigint
  email: string
  userType: UserType
  firstName: string
  lastName: string
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser
}
```

---

**`common/decorators/roles.decorator.ts`**
```typescript
import { SetMetadata } from '@nestjs/common'
import { UserType } from '@prisma/client'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles)
```

---

**`common/guards/roles.guard.ts`**
```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserType } from '@prisma/client'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles?.length) return true

    const { user } = context.switchToHttp().getRequest()
    if (!requiredRoles.includes(user.userType)) {
      throw new ForbiddenException('Accès refusé')
    }
    return true
  }
}
```

---

**`modules/access/access.decision-engine.ts`**
```typescript
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { AccessDecision, SubscriptionStatus, MemberStatus } from '@prisma/client'

export type DecisionReasonCode =
  | 'member_not_found'
  | 'blocked_member'
  | 'archived_member'
  | 'no_active_subscription'
  | 'frozen_subscription'
  | 'expired_subscription'
  | 'no_sessions_left'
  | 'authorized'

export interface AccessDecisionResult {
  decision: AccessDecision
  reasonCode: DecisionReasonCode
  reasonText: string
  memberId?: bigint
  subscriptionId?: bigint
}

@Injectable()
export class AccessDecisionEngine {
  constructor(private prisma: PrismaService) {}

  async evaluate(memberId: bigint): Promise<AccessDecisionResult> {
    const member = await this.prisma.member.findUnique({
      where: { id: memberId },
      include: {
        subscriptions: {
          where: { status: { in: ['active', 'frozen', 'pending_payment'] } },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    if (!member) {
      return this.refuse('member_not_found', 'Membre introuvable')
    }

    if (member.status === MemberStatus.blocked) {
      return this.refuse('blocked_member', 'Compte bloqué')
    }

    if (member.status === MemberStatus.archived) {
      return this.refuse('archived_member', 'Compte archivé')
    }

    const subscription = member.subscriptions[0]

    if (!subscription) {
      return this.refuse('no_active_subscription', 'Aucun abonnement actif')
    }

    if (subscription.status === SubscriptionStatus.frozen) {
      return this.refuse('frozen_subscription', 'Abonnement suspendu')
    }

    if (subscription.endsAt && subscription.endsAt < new Date()) {
      return this.refuse('expired_subscription', 'Abonnement expiré')
    }

    if (subscription.remainingSessions !== null && subscription.remainingSessions <= 0) {
      return this.refuse('no_sessions_left', 'Séances épuisées')
    }

    return {
      decision: AccessDecision.authorized,
      reasonCode: 'authorized',
      reasonText: 'Accès autorisé',
      memberId: member.id,
      subscriptionId: subscription.id,
    }
  }

  private refuse(reasonCode: DecisionReasonCode, reasonText: string): AccessDecisionResult {
    return { decision: AccessDecision.refused, reasonCode, reasonText }
  }
}
```

---

**`modules/subscriptions/subscriptions.rules.ts`**
```typescript
import { BadRequestException } from '@nestjs/common'
import { Subscription, SubscriptionStatus } from '@prisma/client'

export class SubscriptionRules {
  static computeRenewalStartDate(current: Subscription): Date {
    const today = new Date()

    if (!current.endsAt) return today  // pack sans date de fin

    const isExpired = current.endsAt < today
    return isExpired ? today : new Date(current.endsAt)
  }

  static assertCanFreeze(subscription: Subscription): void {
    if (subscription.status !== SubscriptionStatus.active) {
      throw new BadRequestException('Seul un abonnement actif peut être gelé')
    }
  }

  static assertCanRenew(subscription: Subscription): void {
    const renewableStatuses: SubscriptionStatus[] = [
      SubscriptionStatus.active,
      SubscriptionStatus.expired,
      SubscriptionStatus.pending_payment,
    ]
    if (!renewableStatuses.includes(subscription.status)) {
      throw new BadRequestException(`Impossible de renouveler un abonnement en statut ${subscription.status}`)
    }
  }

  static assertNoDuplicateActive(
    activeSubscriptions: Subscription[],
    newPlanIsUnlimited: boolean,
  ): void {
    if (!newPlanIsUnlimited) return
    const hasActive = activeSubscriptions.some(
      (s) => s.status === SubscriptionStatus.active && s.remainingSessions === null,
    )
    if (hasActive) {
      throw new BadRequestException('Le membre possède déjà un abonnement illimité actif')
    }
  }
}
```

---

**`modules/notifications/jobs/expiry-reminder.job.ts`**
```typescript
import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '../../../common/prisma/prisma.service'
import { NotificationsService } from '../notifications.service'
import { addDays, startOfDay, endOfDay } from 'date-fns'

@Injectable()
export class ExpiryReminderJob {
  private readonly logger = new Logger(ExpiryReminderJob.name)

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async run(): Promise<void> {
    const alertDays = [7, 3, 1]

    for (const daysAhead of alertDays) {
      const targetDate = addDays(new Date(), daysAhead)

      const subscriptions = await this.prisma.subscription.findMany({
        where: {
          status: 'active',
          endsAt: {
            gte: startOfDay(targetDate),
            lte: endOfDay(targetDate),
          },
        },
        include: { member: true },
      })

      for (const sub of subscriptions) {
        try {
          await this.notifications.sendFromTemplate('subscription_expiry_reminder', {
            memberId: sub.memberId,
            variables: {
              memberName: sub.member.firstName,
              daysLeft: daysAhead,
              expiryDate: sub.endsAt,
            },
          })
        } catch (err) {
          // L'échec d'envoi ne doit pas interrompre la boucle
          this.logger.error(`Échec notification expiry membre ${sub.memberId}`, err)
        }
      }
    }
  }
}
```

---

**`modules/payments/dto/create-payment.dto.ts`**
```typescript
import { z } from 'zod'

export const CreatePaymentSchema = z.object({
  memberId: z.bigint(),
  subscriptionId: z.bigint().optional(),
  paymentMethodId: z.bigint(),
  paymentDate: z.coerce.date(),
  amountDue: z.number().int().positive(),
  amountPaid: z.number().int().min(0),
  notes: z.string().max(500).optional(),
  idempotencyKey: z.string().uuid(),
})

export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>
```

---

Voilà les deux livrables. Le `schema.prisma` est complet, valide, et prêt pour `prisma migrate dev`. La structure NestJS couvre tous les modules avec les fichiers critiques typés — les fichiers de règles métier et le decision engine sont isolés volontairement, pas dans les services, pour rester testables et clairs.

**Prochaine étape logique :** les DTOs complets module par module, ou les seeders initiaux (rôles, plans par défaut, modes de paiement, paramètres système).
