OK. Je génère tout ici directement, en blocs séquentiels. On commence.

---

# Dossier Produit Complet — Application Gestion Salle de Sport
**Stack : NestJS + Vue 3 + TypeScript | Monorepo | PostgreSQL | Redis**

---

## PARTIE 1 — ARCHITECTURE & STACK

### 1.1 Décisions figées

| Décision | Choix | Raison |
|---|---|---|
| Backend | NestJS | TypeScript natif, modules explicites, DI solide |
| Frontend | Vue 3 + TypeScript | Préférence équipe, Composition API mature |
| Pont SSR | Inertia.js | Évite une API REST artificielle pour le back-office |
| Base de données | PostgreSQL | Relations complexes, contraintes, audit |
| Cache / Queues | Redis + BullMQ | Jobs asynchrones, rappels, PDF, notifications |
| Auth | Passport.js (local + JWT) | Standard NestJS |
| ORM | Prisma | Typage bout-en-bout, migrations propres |
| Monorepo | pnpm workspaces | Un seul repo, un seul déploiement |
| Déploiement | Docker Compose sur VPS | Simple, suffisant pour 100–500 membres |
| Paiement V1 | Aucun provider externe | 100% caisse manuelle |

---

### 1.2 Structure monorepo

```
gym-app/
├── apps/
│   ├── api/                  # NestJS — moteur métier
│   └── web/                  # Vue 3 — deux shells
├── packages/
│   ├── types/                # Types partagés TS
│   ├── utils/                # Helpers communs
│   └── ui/                   # Composants Vue partagés
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

**Pourquoi ce découpage :**
- `api/` et `web/` partagent les types via `packages/types` → zéro désynchronisation de contrats
- Prisma à la racine → une seule source de vérité pour le schéma
- Un seul `docker-compose` → un seul déployable

---

### 1.3 Architecture NestJS — modules

```
api/src/
├── main.ts
├── app.module.ts
├── modules/
│   ├── auth/
│   ├── members/
│   ├── plans/
│   ├── subscriptions/
│   ├── payments/
│   ├── invoices/
│   ├── access/
│   ├── classes/
│   ├── bookings/
│   ├── notifications/
│   ├── reporting/
│   ├── settings/
│   └── audit/
├── common/
│   ├── guards/
│   ├── decorators/
│   ├── filters/
│   ├── pipes/
│   ├── interceptors/
│   └── prisma/
└── config/
```

---

### 1.4 Architecture Vue — deux shells

```
web/src/
├── main.ts
├── router/
├── stores/                   # Pinia
├── shells/
│   ├── admin/                # Back-office desktop-first
│   │   ├── layout/
│   │   └── pages/
│   ├── cashier/              # Caisse / réception
│   │   ├── layout/
│   │   └── pages/
│   ├── coach/
│   │   ├── layout/
│   │   └── pages/
│   └── member/               # Mobile-first app-like
│       ├── layout/
│       └── pages/
├── components/
│   ├── shared/               # Communs tous shells
│   ├── mobile/               # App-like mobile uniquement
│   └── business/             # Métier (abonnement, QR, etc.)
└── composables/
```

**Règle absolue :** le shell `member/` ne partage jamais de layout avec les autres. C'est une app mobile dans un wrapper web, pas une page responsive.

---

### 1.5 Inertia — comment ça marche ici

NestJS sert les pages Inertia. Chaque page Vue reçoit ses props depuis le controller NestJS. Pas d'API REST publique à inventer pour chaque écran back-office.

Pour le shell membre mobile, on a deux options selon la priorité :
- **Option A (plus simple)** : Inertia aussi, avec transitions configurées pour simuler le natif
- **Option B (plus correcte)** : API REST dédiée + Vue SPA standalone pour le membre

**Recommandation : Option B pour le membre.** Le shell admin/caisse/coach utilise Inertia. Le shell membre est une SPA Vue avec JWT stocké en mémoire (pas localStorage), appels API vers NestJS. Ça donne la liberté PWA complète et les transitions natives sans friction.

---

### 1.6 Déploiement

```yaml
# docker-compose.yml (simplifié)
services:
  api:
    build: ./apps/api
    depends_on: [db, redis]
  web:
    build: ./apps/web        # serve le dist Vue statique
    depends_on: [api]
  db:
    image: postgres:16
  redis:
    image: redis:7
  worker:
    build: ./apps/api        # même image, entrypoint différent pour BullMQ
  nginx:
    image: nginx:alpine
```

Un seul VPS, une seule commande `docker compose up`. L'image `api` et `worker` sont identiques, seul l'entrypoint change.

---

## PARTIE 2 — MODULES BACKEND NESTJS

### 2.1 Auth

**Responsabilités**
- Login email/password
- JWT access token + refresh token
- Guards par rôle (ADMIN, CASHIER, COACH, MEMBER)
- Session membre via JWT stocké côté client
- Reset mot de passe par email

**Guards**
```
JwtAuthGuard       → vérifie token
RolesGuard         → vérifie rôle(s) requis
MemberOwnerGuard   → membre ne peut voir que ses propres données
```

**Endpoints**
```
POST /auth/login
POST /auth/logout
POST /auth/refresh
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
```

---

### 2.2 Members

**Responsabilités**
- CRUD membre
- Photo upload (S3-compatible ou stockage local)
- Numéro membre unique auto-généré
- Recherche / filtres / export
- Notes internes (accès restreint)
- Notes médicales (accès admin seulement)
- Historique des modifications

**Endpoints**
```
GET    /members              → liste + filtres + pagination
POST   /members              → créer
GET    /members/:id          → fiche complète
PATCH  /members/:id          → modifier
DELETE /members/:id          → archiver (soft)
POST   /members/:id/photo    → upload photo
GET    /members/:id/timeline → historique complet
GET    /members/export       → CSV/Excel
```

---

### 2.3 Plans

**Responsabilités**
- Catalogue des abonnements vendus
- Types : mensuel, trimestriel, annuel, pack séances, cours spécifiques
- Gestion des remises configurables
- Archivage sans suppression (historique préservé)

**Endpoints**
```
GET    /plans
POST   /plans
PATCH  /plans/:id
DELETE /plans/:id   → archive uniquement
GET    /plans/:id/discounts
POST   /plans/:id/discounts
```

---

### 2.4 Subscriptions

**Responsabilités**
- Création abonnement
- Renouvellement (calcul date selon règle : anticipé = prolonge, expiré = repart d'aujourd'hui)
- Gel (freeze) avec durée
- Transfert vers autre membre
- Annulation
- Historique des statuts
- Vérification unicité (pas deux actifs simultanés de type illimité)

**Endpoints**
```
GET    /subscriptions                    → liste avec filtres
POST   /subscriptions                    → créer
GET    /subscriptions/:id
PATCH  /subscriptions/:id/renew
PATCH  /subscriptions/:id/freeze
PATCH  /subscriptions/:id/unfreeze
PATCH  /subscriptions/:id/transfer
PATCH  /subscriptions/:id/cancel
GET    /members/:id/subscriptions        → abonnements d'un membre
GET    /members/:id/subscriptions/active → abonnement actif courant
```

---

### 2.5 Payments

**Responsabilités**
- Saisie manuelle caisse uniquement
- Paiement complet ou partiel
- Calcul et stockage du reste à payer
- Modes de paiement configurables
- Protection anti double-soumission (idempotency key)
- Annulation / remboursement (admin seulement par défaut)
- Historique complet
- Aucun provider externe

**Endpoints**
```
GET    /payments
POST   /payments                 → saisir paiement
GET    /payments/:id
PATCH  /payments/:id/void        → annuler (admin)
POST   /payments/:id/refund      → rembourser (admin)
GET    /members/:id/payments
GET    /members/:id/balance      → solde impayé courant
```

---

### 2.6 Invoices

**Responsabilités**
- Génération PDF automatique à chaque paiement validé
- Numérotation séquentielle configurable (préfixe + année + numéro)
- Renvoi par email
- Téléchargement
- Statuts : brouillon, émise, annulée

**Endpoints**
```
GET    /invoices
GET    /invoices/:id
GET    /invoices/:id/pdf         → téléchargement
POST   /invoices/:id/resend      → renvoyer par email
GET    /members/:id/invoices
```

---

### 2.7 Access

**Responsabilités**
- Génération QR unique par membre (identifiant signé)
- Validation QR en temps réel
- Décision d'accès selon : statut membre + statut abonnement + règles métier
- Fallback saisie manuelle numéro membre
- Override manuel avec raison obligatoire
- Log de chaque tentative sans exception

**Logique de décision**
```
membre bloqué           → REFUS
abonnement inexistant   → REFUS
abonnement expiré       → REFUS
abonnement gelé         → REFUS
pack sans séances       → REFUS
abonnement actif        → AUTORISATION
override manuel         → AUTORISATION FORCÉE (loggée)
```

**Endpoints**
```
GET  /access/qr/:memberId        → obtenir le QR (membre ou caisse)
POST /access/validate            → valider un scan
POST /access/manual-checkin      → entrée manuelle par recherche
POST /access/override            → override forcé avec raison
GET  /access/logs                → historique (admin/caisse)
GET  /members/:id/access-logs    → historique d'un membre
```

---

### 2.8 Classes & Bookings

**Responsabilités**

Classes :
- Définition mère d'un cours (nom, catégorie, coach, salle, durée, récurrence)
- Génération d'occurrences concrètes
- Capacité maximale par occurrence
- Annulation d'une occurrence (notification aux inscrits)

Bookings :
- Réservation membre
- Liste d'attente automatique si cours complet
- Promotion liste d'attente sur annulation
- Annulation dans les délais vs hors délai
- Présence marquée par le coach

**Endpoints**
```
GET    /classes
POST   /classes
GET    /classes/:id
PATCH  /classes/:id
DELETE /classes/:id/occurrences/:occId   → annuler occurrence

GET    /classes/:id/occurrences
GET    /occurrences/:id/roster           → liste inscrits
POST   /occurrences/:id/attendance       → marquer présence bulk

POST   /bookings                         → réserver
DELETE /bookings/:id                     → annuler
GET    /members/:id/bookings
```

---

### 2.9 Notifications

**Responsabilités**
- Templates configurables (email / SMS)
- Rappels automatiques : expiration abonnement J-7 J-3 J-1
- Confirmation réservation
- Confirmation renouvellement
- Rappel cours J-1
- Impayés
- Communications groupées manuelles
- File BullMQ → envoi asynchrone
- Échec d'envoi non bloquant pour l'opération métier

**Jobs récurrents**
```
ExpiryReminderJob     → quotidien
UnpaidBalanceJob      → quotidien
ClassReminderJob      → quotidien H-24
CleanupJob            → hebdomadaire
```

---

### 2.10 Reporting

**Responsabilités**
- KPIs tableau de bord (membres actifs, revenus, entrées, cours)
- Rapports financiers (CA, impayés, remboursements)
- Rapports membres (nouveaux, perdus, rétention)
- Rapports cours (popularité, taux de présence)
- Exports CSV / Excel
- Génération asynchrone pour gros volumes

---

### 2.11 Settings

Table clé-valeur typée, groupée par module.

Clés importantes :
```
booking.cancel_cutoff_hours          → délai annulation cours
access.grace_days_after_expiry       → jours de grâce post-expiration
access.allow_partial_payment_access  → accès si paiement partiel
subscription.expiry_alert_days       → jours avant rappel
invoice.prefix                       → préfixe numérotation
invoice.next_number                  → compteur
gym.name / gym.email / gym.phone
member.require_email                 → email obligatoire ou non
```

---

### 2.12 Audit

Log immuable de toutes les actions sensibles.

Capturé automatiquement sur :
- Toute modification financière (paiement, remboursement, annulation)
- Changement de statut abonnement
- Modifications notes médicales
- Overrides d'accès
- Changements de rôles utilisateurs
- Modifications paramètres système

Champs : `actor_id`, `action`, `entity_type`, `entity_id`, `old_values`, `new_values`, `ip`, `timestamp`

---

## PARTIE 3 — SCHÉMA BASE DE DONNÉES POSTGRESQL

### users
```
id                  BIGSERIAL PK
first_name          VARCHAR(100) NOT NULL
last_name           VARCHAR(100) NOT NULL
email               VARCHAR(255) UNIQUE NOT NULL
phone               VARCHAR(20)
password_hash       VARCHAR(255) NOT NULL
user_type           ENUM(admin, cashier, coach, member) NOT NULL
status              ENUM(active, inactive, blocked) DEFAULT active
last_login_at       TIMESTAMPTZ
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()
```

---

### members
```
id                  BIGSERIAL PK
member_number       VARCHAR(20) UNIQUE NOT NULL
first_name          VARCHAR(100) NOT NULL
last_name           VARCHAR(100) NOT NULL
gender              ENUM(male, female, other)
date_of_birth       DATE
phone               VARCHAR(20)
email               VARCHAR(255)
status              ENUM(draft, active, inactive, blocked, archived) DEFAULT draft
photo_path          VARCHAR(500)
goal_notes          TEXT
medical_notes       TEXT          -- accès restreint admin
internal_notes      TEXT
joined_at           DATE
archived_at         TIMESTAMPTZ
linked_user_id      BIGINT FK users(id) UNIQUE
created_by_user_id  BIGINT FK users(id)
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()

INDEX: member_number, phone, email, status, last_name
```

---

### subscription_plans
```
id                  BIGSERIAL PK
code                VARCHAR(50) UNIQUE NOT NULL
name                VARCHAR(200) NOT NULL
description         TEXT
plan_type           ENUM(monthly, quarterly, annual, session_pack, class_only, custom)
duration_days       INTEGER          -- null pour packs séances
session_count       INTEGER          -- null pour plans durée
access_scope        ENUM(full_gym, classes_only, specific_classes)
price               INTEGER NOT NULL -- en FCFA entier
currency            VARCHAR(3) DEFAULT 'XOF'
is_active           BOOLEAN DEFAULT TRUE
allows_freeze       BOOLEAN DEFAULT TRUE
allows_transfer     BOOLEAN DEFAULT FALSE
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()
```

---

### subscriptions
```
id                      BIGSERIAL PK
member_id               BIGINT FK members(id) NOT NULL
subscription_plan_id    BIGINT FK subscription_plans(id) NOT NULL
status                  ENUM(draft, pending_payment, active, frozen, expired, cancelled, transferred)
source_type             ENUM(new_subscription, renewal, manual_admin, transfer)
started_at              DATE NOT NULL
ends_at                 DATE               -- null pour packs purs
original_price          INTEGER NOT NULL
discount_amount         INTEGER DEFAULT 0
final_price             INTEGER NOT NULL
remaining_sessions      INTEGER            -- null si plan durée
notes                   TEXT
previous_subscription_id BIGINT FK subscriptions(id)
transferred_to_member_id BIGINT FK members(id)
cancelled_at            TIMESTAMPTZ
created_by_user_id      BIGINT FK users(id)
created_at              TIMESTAMPTZ DEFAULT NOW()
updated_at              TIMESTAMPTZ DEFAULT NOW()

INDEX: (member_id, status), (started_at, ends_at), subscription_plan_id
```

---

### subscription_freezes
```
id                  BIGSERIAL PK
subscription_id     BIGINT FK subscriptions(id) NOT NULL
starts_at           DATE NOT NULL
ends_at             DATE NOT NULL
days_frozen         INTEGER NOT NULL
reason              TEXT
approved_by_user_id BIGINT FK users(id)
created_by_user_id  BIGINT FK users(id)
created_at          TIMESTAMPTZ DEFAULT NOW()
```

---

### subscription_status_logs
```
id                  BIGSERIAL PK
subscription_id     BIGINT FK subscriptions(id) NOT NULL
old_status          VARCHAR(50)
new_status          VARCHAR(50) NOT NULL
changed_by_user_id  BIGINT FK users(id)
reason              TEXT
created_at          TIMESTAMPTZ DEFAULT NOW()
```

---

### payment_methods
```
id          BIGSERIAL PK
code        VARCHAR(50) UNIQUE NOT NULL  -- cash, card, transfer, cheque
name        VARCHAR(100) NOT NULL
is_active   BOOLEAN DEFAULT TRUE
created_at  TIMESTAMPTZ DEFAULT NOW()
```

---

### payments
```
id                      BIGSERIAL PK
member_id               BIGINT FK members(id) NOT NULL
subscription_id         BIGINT FK subscriptions(id)
payment_reference       VARCHAR(100) UNIQUE NOT NULL
idempotency_key         VARCHAR(255) UNIQUE      -- anti double-soumission
status                  ENUM(draft, partial, paid, voided, refunded)
payment_method_id       BIGINT FK payment_methods(id) NOT NULL
payment_date            DATE NOT NULL
amount_due              INTEGER NOT NULL
amount_paid             INTEGER NOT NULL
remaining_balance       INTEGER DEFAULT 0
currency                VARCHAR(3) DEFAULT 'XOF'
cashier_user_id         BIGINT FK users(id) NOT NULL
voided_by_user_id       BIGINT FK users(id)
void_reason             TEXT
notes                   TEXT
receipt_number          VARCHAR(100) UNIQUE
created_at              TIMESTAMPTZ DEFAULT NOW()
updated_at              TIMESTAMPTZ DEFAULT NOW()

CHECK: amount_due >= 0, amount_paid >= 0, remaining_balance >= 0
INDEX: member_id, subscription_id, status, payment_date, (member_id, payment_date)
```

---

### refunds
```
id                  BIGSERIAL PK
payment_id          BIGINT FK payments(id) NOT NULL
refund_reference    VARCHAR(100) UNIQUE NOT NULL
amount              INTEGER NOT NULL
refund_date         DATE NOT NULL
reason              TEXT NOT NULL
processed_by_user_id BIGINT FK users(id) NOT NULL
created_at          TIMESTAMPTZ DEFAULT NOW()
```

---

### invoices
```
id                  BIGSERIAL PK
invoice_number      VARCHAR(50) UNIQUE NOT NULL
member_id           BIGINT FK members(id) NOT NULL
payment_id          BIGINT FK payments(id)
subscription_id     BIGINT FK subscriptions(id)
invoice_type        ENUM(invoice, receipt, credit_note)
issue_date          DATE NOT NULL
subtotal_amount     INTEGER NOT NULL
discount_amount     INTEGER DEFAULT 0
total_amount        INTEGER NOT NULL
currency            VARCHAR(3) DEFAULT 'XOF'
pdf_path            VARCHAR(500)
sent_at             TIMESTAMPTZ
status              ENUM(draft, issued, cancelled)
created_by_user_id  BIGINT FK users(id)
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()

INDEX: member_id, payment_id, issue_date, status
```

---

### invoice_items
```
id              BIGSERIAL PK
invoice_id      BIGINT FK invoices(id) NOT NULL
label           VARCHAR(255) NOT NULL
description     TEXT
quantity        INTEGER DEFAULT 1
unit_price      INTEGER NOT NULL
line_total      INTEGER NOT NULL
item_type       VARCHAR(50)    -- subscription, discount, adjustment
created_at      TIMESTAMPTZ DEFAULT NOW()
```

---

### member_qr_codes
```
id              BIGSERIAL PK
member_id       BIGINT FK members(id) NOT NULL
qr_identifier   VARCHAR(255) UNIQUE NOT NULL
status          ENUM(active, revoked, rotated)
generated_at    TIMESTAMPTZ DEFAULT NOW()
expires_at      TIMESTAMPTZ
revoked_at      TIMESTAMPTZ
created_at      TIMESTAMPTZ DEFAULT NOW()

INDEX: member_id, qr_identifier
```

---

### access_points
```
id          BIGSERIAL PK
name        VARCHAR(100) NOT NULL
description TEXT
is_active   BOOLEAN DEFAULT TRUE
created_at  TIMESTAMPTZ DEFAULT NOW()
```

---

### access_logs
```
id                      BIGSERIAL PK
member_id               BIGINT FK members(id)
qr_code_id              BIGINT FK member_qr_codes(id)
access_point_id         BIGINT FK access_points(id)
attempt_type            ENUM(qr_scan, manual_lookup, manual_override)
decision                ENUM(authorized, refused, overridden)
decision_reason_code    VARCHAR(100)
decision_reason_text    VARCHAR(255)
subscription_id         BIGINT FK subscriptions(id)
performed_by_user_id    BIGINT FK users(id)
attempted_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
created_at              TIMESTAMPTZ DEFAULT NOW()

INDEX: member_id, attempted_at, decision, (member_id, attempted_at)
```

---

### access_overrides
```
id                      BIGSERIAL PK
access_log_id           BIGINT FK access_logs(id) NOT NULL
member_id               BIGINT FK members(id) NOT NULL
authorized_by_user_id   BIGINT FK users(id) NOT NULL
reason                  TEXT NOT NULL
created_at              TIMESTAMPTZ DEFAULT NOW()
```

---

### class_categories
```
id          BIGSERIAL PK
name        VARCHAR(100) NOT NULL
color       VARCHAR(7)
description TEXT
created_at  TIMESTAMPTZ DEFAULT NOW()
```

---

### rooms
```
id          BIGSERIAL PK
name        VARCHAR(100) NOT NULL
capacity    INTEGER
is_active   BOOLEAN DEFAULT TRUE
created_at  TIMESTAMPTZ DEFAULT NOW()
```

---

### classes
```
id                  BIGSERIAL PK
name                VARCHAR(200) NOT NULL
description         TEXT
class_category_id   BIGINT FK class_categories(id)
coach_user_id       BIGINT FK users(id)
room_id             BIGINT FK rooms(id)
default_capacity    INTEGER NOT NULL
duration_minutes    INTEGER NOT NULL
is_recurring        BOOLEAN DEFAULT FALSE
recurrence_rule     TEXT          -- RRULE format
status              ENUM(draft, active, inactive, cancelled)
created_by_user_id  BIGINT FK users(id)
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()
```

---

### class_occurrences
```
id                  BIGSERIAL PK
class_id            BIGINT FK classes(id) NOT NULL
starts_at           TIMESTAMPTZ NOT NULL
ends_at             TIMESTAMPTZ NOT NULL
capacity            INTEGER NOT NULL
booked_count        INTEGER DEFAULT 0
waiting_count       INTEGER DEFAULT 0
status              ENUM(scheduled, completed, cancelled)
cancellation_reason TEXT
coach_user_id       BIGINT FK users(id)   -- peut différer du cours parent
room_id             BIGINT FK rooms(id)
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()

INDEX: class_id, starts_at, coach_user_id, room_id, status
```

---

### bookings
```
id                  BIGSERIAL PK
member_id           BIGINT FK members(id) NOT NULL
class_occurrence_id BIGINT FK class_occurrences(id) NOT NULL
status              ENUM(booked, waiting_list, cancelled, late_cancelled, attended, absent)
booked_at           TIMESTAMPTZ DEFAULT NOW()
cancelled_at        TIMESTAMPTZ
cancel_reason       TEXT
waitlist_position   INTEGER
promoted_at         TIMESTAMPTZ
created_by_type     ENUM(member, cashier, admin)
created_by_user_id  BIGINT FK users(id)
created_at          TIMESTAMPTZ DEFAULT NOW()
updated_at          TIMESTAMPTZ DEFAULT NOW()

UNIQUE: (member_id, class_occurrence_id)
INDEX: member_id, class_occurrence_id, status, (class_occurrence_id, status)
```

---

### notification_templates
```
id          BIGSERIAL PK
code        VARCHAR(100) UNIQUE NOT NULL
name        VARCHAR(200) NOT NULL
channel     ENUM(email, sms)
subject     VARCHAR(500)
body        TEXT NOT NULL
is_active   BOOLEAN DEFAULT TRUE
created_at  TIMESTAMPTZ DEFAULT NOW()
updated_at  TIMESTAMPTZ DEFAULT NOW()
```

---

### notifications
```
id              BIGSERIAL PK
member_id       BIGINT FK members(id)
template_id     BIGINT FK notification_templates(id)
related_type    VARCHAR(100)
related_id      BIGINT
channel         ENUM(email, sms)
recipient       VARCHAR(255) NOT NULL
subject         VARCHAR(500)
body            TEXT NOT NULL
status          ENUM(pending, sent, failed, cancelled)
scheduled_at    TIMESTAMPTZ
sent_at         TIMESTAMPTZ
failure_reason  TEXT
created_at      TIMESTAMPTZ DEFAULT NOW()

INDEX: member_id, status, scheduled_at
```

---

### settings
```
id          BIGSERIAL PK
key         VARCHAR(200) UNIQUE NOT NULL
value       JSONB NOT NULL
group_name  VARCHAR(100) NOT NULL
description TEXT
updated_at  TIMESTAMPTZ DEFAULT NOW()
```

---

### audit_logs
```
id              BIGSERIAL PK
user_id         BIGINT FK users(id)
action          VARCHAR(200) NOT NULL
entity_type     VARCHAR(100) NOT NULL
entity_id       BIGINT
old_values      JSONB
new_values      JSONB
ip_address      VARCHAR(45)
user_agent      TEXT
created_at      TIMESTAMPTZ DEFAULT NOW()

INDEX: (entity_type, entity_id), user_id, created_at
```

---

## PARTIE 4 — RÔLES, PERMISSIONS, MACHINES À ÉTATS

### 4.1 Matrice des rôles

| Action | ADMIN | CASHIER | COACH | MEMBER |
|---|:---:|:---:|:---:|:---:|
| Créer membre | ✅ | ✅ | ❌ | ❌ |
| Voir notes médicales | ✅ | ❌ | ❌ | ❌ |
| Créer abonnement | ✅ | ✅ | ❌ | ❌ |
| Renouveler | ✅ | ✅ | ❌ | ❌ |
| Geler abonnement | ✅ | ❌ | ❌ | ❌ |
| Annuler abonnement | ✅ | ❌ | ❌ | ❌ |
| Saisir paiement | ✅ | ✅ | ❌ | ❌ |
| Appliquer remise | ✅ | ✅* | ❌ | ❌ |
| Annuler paiement validé | ✅ | ❌ | ❌ | ❌ |
| Rembourser | ✅ | ❌ | ❌ | ❌ |
| Scanner QR | ✅ | ✅ | ❌ | ❌ |
| Override accès | ✅ | ✅ | ❌ | ❌ |
| Créer cours | ✅ | ❌ | ❌ | ❌ |
| Marquer présence | ✅ | ❌ | ✅ | ❌ |
| Voir planning | ✅ | ✅ | ✅ | ✅ |
| Réserver cours | ✅ | ✅ | ❌ | ✅ |
| Voir tableau de bord financier | ✅ | ❌ | ❌ | ❌ |
| Voir dashboard opérationnel | ✅ | ✅ | ✅* | ❌ |
| Gérer rôles/utilisateurs | ✅ | ❌ | ❌ | ❌ |
| Configurer paramètres | ✅ | ❌ | ❌ | ❌ |
| Voir audit log | ✅ | ❌ | ❌ | ❌ |
| Exports | ✅ | ✅* | ❌ | ❌ |
| Voir ses propres données | ✅ | ✅ | ✅ | ✅ |

*CASHIER : remises seulement si permission activée / exports limités aux opérations courantes / COACH : dashboard limité à ses cours

---

### 4.2 Machine à états — Member

```
         ┌─────────┐
   ──────▶│  draft  │
         └────┬────┘
              │ profile complet + abonnement
              ▼
         ┌─────────┐
    ┌────▶│ active  │◀────┐
    │    └────┬────┘      │
    │         │ blocage   │ déblocage
    │         ▼           │
    │    ┌─────────┐      │
    │    │ blocked │──────┘
    │    └─────────┘
    │
    │ réactivation
    │    ┌──────────┐
    └────│ inactive │
         └────┬─────┘
              │ archivage admin
              ▼
         ┌──────────┐
         │ archived │  (terminal)
         └──────────┘
```

**Règles :**
- `blocked` → refus accès systématique quelle que soit la valeur de l'abonnement
- `archived` → profil lisible, toutes opérations impossibles
- `inactive` → pas d'abonnement actif, peut en créer un nouveau

---

### 4.3 Machine à états — Subscription

```
         ┌─────────┐
   ──────▶│  draft  │
         └────┬────┘
              │
       ┌──────┴──────┐
       ▼             ▼
┌─────────────┐  ┌────────┐
│pending_paym.│  │ active │◀──────────────┐
└──────┬──────┘  └───┬────┘               │
       │ paiement    │                    │
       │ validé      ├──── gel ──────▶ ┌────────┐
       └─────────────▶                  │ frozen │
                     │ dégel ◀──────── └────────┘
                     │
                     ├──── fin date/séances ──▶ ┌─────────┐
                     │                           │ expired │
                     │                           └─────────┘
                     │
                     ├──── transfert ──▶ ┌─────────────┐
                     │                   │ transferred │
                     │                   └─────────────┘
                     │
                     └──── annulation ──▶ ┌───────────┐
                                          │ cancelled │
                                          └───────────┘
```

**Règles :**
- `expired` + `frozen` + `cancelled` + `transferred` → refus accès
- `pending_payment` → accès selon paramètre `access.allow_partial_payment_access`
- Renouvellement anticipé : `ends_at` prolongé depuis `ends_at` actuel
- Renouvellement expiré : nouvelle période depuis `TODAY()`

---

### 4.4 Machine à états — Payment

```
   ┌───────┐
──▶│ draft │
   └───┬───┘
       │
   ┌───┴────┐
   ▼        ▼
┌───────┐ ┌─────┐
│partial│ │ paid│
└───┬───┘ └──┬──┘
    │ solde   │
    │ réglé   │
    └────┬────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│ voided │ │ refunded │
└────────┘ └──────────┘
```

**Règles :**
- `voided` et `refunded` : admin uniquement, raison obligatoire, audit obligatoire
- `voided` n'entre pas dans le CA
- Protection idempotency key sur la création

---

### 4.5 Machine à états — Booking

```
              ┌──────────────┐
         ┌───▶│ waiting_list │
         │    └──────┬───────┘
cours    │           │ promotion auto/manuelle
complet  │           ▼
         │    ┌────────┐
   ──────────▶│ booked │
              └───┬────┘
                  │
        ┌─────────┼──────────────┐
        ▼         ▼              ▼
  ┌──────────┐ ┌──────────────┐ ┌────────┐
  │cancelled │ │late_cancelled│ │attended│
  └──────────┘ └──────────────┘ └────────┘
                                ┌────────┐
                                │ absent │
                                └────────┘
```

**Règles :**
- `cancelled` : annulation avant délai configuré
- `late_cancelled` : annulation après délai → pénalité éventuelle V2
- `attended` / `absent` : marqués par le coach après le cours

---

### 4.6 Machine à états — Access Decision (pas un statut stocké, logique temps réel)

```
Scan QR
    │
    ▼
membre trouvé ?
    │ non ──────────────────────────────▶ REFUS (membre_not_found)
    │ oui
    ▼
membre bloqué ?
    │ oui ──────────────────────────────▶ REFUS (blocked_member)
    │ non
    ▼
membre archivé ?
    │ oui ──────────────────────────────▶ REFUS (archived_member)
    │ non
    ▼
abonnement actif ?
    │ non ──────────────────────────────▶ REFUS (no_active_subscription)
    │ oui
    ▼
abonnement gelé ?
    │ oui ──────────────────────────────▶ REFUS (frozen_subscription)
    │ non
    ▼
abonnement expiré ?
    │ oui ──────────────────────────────▶ REFUS (expired_subscription)
    │ non
    ▼
pack séances + remaining = 0 ?
    │ oui ──────────────────────────────▶ REFUS (no_sessions_left)
    │ non
    ▼
                                     AUTORISATION → log → décrément si pack
```

Chaque nœud de refus crée un `access_log` avec le `decision_reason_code` correspondant.

---

## PARTIE 5 — RÈGLES MÉTIER CATALOGUE

**BR-001** Un membre possède un numéro unique généré automatiquement (format configurable, ex. `GYM-2025-0001`).

**BR-002** Un membre peut exister sans abonnement actif.

**BR-003** Un membre bloqué est toujours refusé à l'accès, quelle que soit l'état de son abonnement.

**BR-004** Un membre archivé conserve tout son historique (paiements, factures, accès) en lecture seule.

**BR-005** Les notes médicales sont accessibles uniquement au rôle ADMIN.

**BR-006** Un membre ne peut pas avoir deux abonnements de type illimité actifs sur une même période.

**BR-007** Renouvellement anticipé : la nouvelle période démarre à la date de fin de l'abonnement courant.

**BR-008** Renouvellement post-expiration : la nouvelle période démarre à la date du jour.

**BR-009** Le changement de plan au renouvellement est autorisé selon les permissions du caissier.

**BR-010** Un abonnement gelé suspend la période : la date de fin est reportée de la durée du gel.

**BR-011** Un transfert d'abonnement clôture l'abonnement source et crée un nouvel abonnement pour le destinataire, avec traçabilité complète.

**BR-012** Tous les paiements sont saisis manuellement à la caisse. Aucun paiement automatisé ou en ligne en V1.

**BR-013** Un paiement peut être complet ou partiel. Le reste à payer est stocké dans `remaining_balance`.

**BR-014** Seul l'ADMIN peut annuler ou rembourser un paiement validé. La raison est obligatoire.

**BR-015** Toute annulation ou remboursement crée une entrée dans `audit_logs`.

**BR-016** La création de paiement est protégée par une `idempotency_key` pour éviter la double saisie.

**BR-017** Un paiement annulé (`voided`) n'est pas comptabilisé dans le chiffre d'affaires.

**BR-018** Chaque paiement validé génère automatiquement une facture avec numéro séquentiel.

**BR-019** Le QR code d'un membre encode un identifiant signé, pas directement son ID en base.

**BR-020** Chaque tentative d'accès est loguée, qu'elle soit autorisée, refusée ou overridée.

**BR-021** Un override d'accès manuel exige une raison saisie par l'opérateur et son identité.

**BR-022** Un cours a une capacité maximale par occurrence. Au-delà, les demandes vont en liste d'attente.

**BR-023** La promotion depuis la liste d'attente peut être automatique (sur annulation) ou manuelle selon le paramètre configuré.

**BR-024** Un membre ne peut annuler une réservation que jusqu'à `booking.cancel_cutoff_hours` avant le début du cours.

**BR-025** Les échecs d'envoi de notifications ne bloquent pas l'opération métier qui les a déclenchées.

**BR-026** Les rappels d'expiration sont envoyés à J-7, J-3, J-1 (configurable).

**BR-027** Un abonnement de type pack décrémente `remaining_sessions` à chaque accès autorisé si le paramètre de consommation par entrée est activé.

---

## PARTIE 6 — FLOWS UX PAR RÔLE

### 6.1 Caissier — Création nouveau membre

```
1. Ouvrir "Nouveau membre"
2. Recherche préalable (téléphone / email) → vérifier doublon
   └── doublon trouvé → afficher alerte + lien vers fiche existante → STOP
3. Saisir : prénom, nom, téléphone, email (optionnel), date de naissance (optionnel)
4. Uploader photo (optionnel, peut être fait plus tard)
5. Sélectionner abonnement
   └── aucun abonnement voulu → créer membre sans abonnement → FIN
6. Voir résumé de l'abonnement (nom plan, durée, prix)
7. Appliquer remise si autorisé
8. Saisir paiement
   └── complet → statut PAID
   └── partiel → saisir montant reçu → reste à payer calculé automatiquement
   └── sans paiement aujourd'hui → statut PENDING_PAYMENT
9. Sélectionner mode de paiement
10. Valider
11. Système génère : numéro membre, QR code, facture/reçu PDF
12. Afficher confirmation + bouton imprimer reçu + bouton envoyer par email
```

**Edge cases :**
- Même téléphone : alerte blocante, oblige la vérification
- Photo absente : allowed, rappel affiché sans blocage
- Abandon en cours : draft sauvegardé si profile partiellement rempli
- Double-clic sur Valider : idempotency key absorbe la double soumission

---

### 6.2 Caissier — Renouvellement

```
1. Rechercher membre (nom / téléphone / numéro / scan QR)
2. Ouvrir fiche membre
3. Voir encadré abonnement actuel + statut + date d'expiration
4. Cliquer "Renouveler"
5. Système calcule et affiche :
   └── si actif → prolongation depuis ends_at actuel
   └── si expiré → nouvelle période depuis aujourd'hui
6. Sélectionner plan (peut changer ou garder le même)
7. Voir résumé nouvelle période + prix
8. Appliquer remise si autorisé
9. Saisir paiement (même logique que création)
10. Valider
11. Nouveau statut ACTIVE, dates mises à jour
12. Facture générée, confirmation affichée

Edge cases :
- Renouvellement avec reste à payer sur l'ancien → afficher alerte solde en attente
- Changement de plan : confirmer le changement explicitement
- Gel en cours → impossible de renouveler → afficher message clair
```

---

### 6.3 Caissier — Scan QR et contrôle d'accès

```
1. Ouvrir écran Scan (dédié, plein écran)
2. Caméra active automatiquement
3. Scanner QR membre
   └── QR illisible → message + activer saisie manuelle
   └── réseau instable → afficher erreur + activer saisie manuelle
4. Résultat affiché en < 500ms idéalement
   └── AUTORISÉ → fond vert, photo membre, nom, plan, son optionnel
   └── REFUSÉ → fond rouge, raison explicite (expiré / bloqué / gelé / séances épuisées)
5. Sur refus : options disponibles
   └── Voir fiche membre
   └── Override manuel (avec saisie raison obligatoire)
   └── Renouveler directement
6. Chaque scan est loggé automatiquement

Saisie manuelle :
1. Saisir numéro membre ou nom + prénom
2. Sélectionner le bon profil si plusieurs résultats
3. Même logique de validation côté serveur
4. Même affichage résultat
```

---

### 6.4 Coach — Gestion présence

```
1. Ouvrir tableau de bord coach
2. Voir liste des cours du jour avec statuts (à venir, en cours, terminé)
3. Cliquer sur un cours
4. Voir liste des inscrits (booked + waiting_list séparés)
5. Pour chaque inscrit : bouton Présent / Absent
6. Action rapide "Tout présent" si groupe complet
7. Sauvegarder → statuts mis à jour dans bookings + attendance_records
8. Cours marqué comme "completed" automatiquement ou manuellement

Edge cases :
- Coach accède à un cours qui n'est pas le sien → accès refusé
- Cours annulé → lecture seule, message informatif
- Participant en liste d'attente non promu → affiché séparément, pas de marquage présence
```

---

### 6.5 Membre — Réservation cours (mobile)

```
1. Ouvrir onglet "Planning"
2. Vue liste ou calendrier (défaut : liste)
3. Filtres optionnels : catégorie, coach, date
4. Cours affichés avec : nom, horaire, coach, places restantes, statut
   └── "Complet" → bouton Liste d'attente
   └── "Presque complet" → indication visuelle urgence
   └── "Disponible" → bouton Réserver
5. Appuyer Réserver
6. Confirmation résumé (nom cours, heure, coach)
7. Confirmer → réservation créée
8. Notification de confirmation envoyée
9. Cours apparaît dans "Mes réservations"

Edge cases :
- Cours devient complet entre affichage et confirmation → erreur gracieuse + proposer liste d'attente
- Abonnement n'autorise pas ce type de cours → message explicatif
- Même cours déjà réservé → message dédié
- Annulation tardive → avertissement avant confirmation
```

---

### 6.6 Membre — Affichage QR (mobile)

```
1. Appuyer sur onglet QR ou CTA depuis home
2. QR affiché plein écran immédiatement (pas de délai)
   └── si token en cache valide → affichage offline possible
   └── si token expiré ou absent → fetch API
3. Luminosité maximale automatique (si PWA installée)
4. Nom + numéro membre affiché sous le QR
5. Aucun autre contenu parasite

Edge cases :
- Session expirée → redirect login discret
- Pas de réseau → afficher QR depuis cache si disponible
- QR révoqué → message + contact réception
```

---

## PARTIE 7 — ÉCRANS COMPLETS

### ADMIN

---

**Dashboard Admin**
- Rôle : ADMIN
- Objectif : vue globale instantanée de la santé de la salle
- Contenu : KPIs (membres actifs, nouveaux ce mois, expirant dans 7j, CA du jour, CA du mois, entrées du jour), graphique revenus 30j, alertes impayés, cours du jour avec taux de remplissage
- Actions : drill-down vers chaque module depuis les KPIs
- États : skeleton loading, erreur widget partielle (les autres widgets restent visibles), vide si aucune donnée

---

**Liste membres**
- Rôle : ADMIN, CASHIER
- Objectif : trouver et gérer n'importe quel membre
- Contenu : tableau avec colonnes (photo miniature, numéro, nom, téléphone, statut abonnement, statut membre, date adhésion), barre recherche, filtres (statut, plan, date), pagination, bouton export
- Actions : ouvrir fiche, créer membre, exporter
- États : loading, aucun résultat, erreur réseau

---

**Fiche membre**
- Rôle : ADMIN, CASHIER (vue partielle), COACH (vue minimale)
- Objectif : vision complète d'un membre
- Contenu : colonne gauche (photo, nom, numéro, statut, contacts), colonne droite en onglets : Abonnement / Paiements / Factures / Accès / Réservations / Notes internes / Notes médicales (admin only)
- Actions : modifier, renouveler, geler, transférer, bloquer, archiver, générer nouveau QR, imprimer fiche
- États : loading, membre archivé (lecture seule + bannière), données incomplètes (warnings)

---

**Création / édition membre**
- Rôle : ADMIN, CASHIER
- Objectif : enregistrer un nouveau membre rapidement
- Contenu : champs personnels, upload photo, abonnement optionnel, paiement optionnel
- Actions : sauvegarder, créer
- États : validation inline, alerte doublon téléphone/email, succès

---

**Plans & tarification**
- Rôle : ADMIN
- Objectif : gérer le catalogue produit
- Contenu : liste des plans avec type, durée, prix, statut actif/archivé
- Actions : créer, modifier, archiver
- États : vide (premier lancement), validation erreurs

---

**Paiements**
- Rôle : ADMIN, CASHIER
- Objectif : liste et gestion des transactions
- Contenu : table avec filtres (date, statut, mode, caissier), totaux en bas, export
- Actions : ouvrir détail, rembourser (admin), annuler (admin)
- États : loading, vide, erreur

---

**Saisie paiement**
- Rôle : ADMIN, CASHIER
- Objectif : encaisser rapidement en caisse
- Contenu : résumé membre, montant dû, champ montant reçu, reste à payer calculé en temps réel, sélecteur mode paiement, notes optionnelles
- Actions : valider, imprimer reçu, envoyer par email
- États : protection double clic, erreur validation, succès + redirect

---

**Factures**
- Rôle : ADMIN, CASHIER
- Objectif : accès aux documents comptables
- Contenu : liste factures, numéro, membre, date, montant, statut, lien PDF
- Actions : télécharger, renvoyer par email
- États : génération PDF en cours, erreur génération

---

**Calendrier cours**
- Rôle : ADMIN
- Objectif : gérer le planning
- Contenu : vue semaine par défaut, toggle jour/semaine/mois, filtres coach/salle/catégorie, cartes cours avec taux remplissage
- Actions : créer cours, modifier occurrence, annuler occurrence
- États : vide, conflit salle/coach (alerte), loading

---

**Détail cours / roster**
- Rôle : ADMIN, COACH
- Objectif : gérer une occurrence précise
- Contenu : infos cours, coach, salle, liste inscrits avec statut, liste d'attente, capacité
- Actions : marquer présence, annuler cours, notifier les inscrits
- États : cours annulé (lecture seule), présences verrouillées après X heures

---

**Logs d'accès**
- Rôle : ADMIN, CASHIER
- Objectif : audit des entrées
- Contenu : timeline/table, filtres date/membre/décision/point d'accès
- Actions : exporter
- États : vide, loading

---

**Paramètres**
- Rôle : ADMIN
- Objectif : configurer les règles métier
- Contenu : sections (Salle, Abonnements, Réservations, Accès, Notifications, Facturation)
- Actions : modifier, sauvegarder par section
- États : erreur validation, succès, confirmation avant modification sensible

---

**Gestion utilisateurs / rôles**
- Rôle : ADMIN
- Objectif : gérer les comptes staff
- Contenu : liste utilisateurs, rôle, statut, dernière connexion
- Actions : créer, modifier rôle, désactiver
- États : confirmation avant désactivation

---

**Audit log**
- Rôle : ADMIN
- Objectif : traçabilité complète
- Contenu : table immuable, acteur, action, entité, valeurs avant/après, timestamp
- Actions : consulter uniquement (lecture seule)
- États : loading, vide

---

### CAISSE / RÉCEPTION

---

**Accueil caisse**
- Rôle : CASHIER
- Objectif : toutes les actions critiques du quotidien accessibles en 2 clics maximum
- Contenu : recherche membre (prominent), bouton Scan QR, cartes résumé (expirations aujourd'hui, impayés actifs, entrées du jour), liste des renouvellements urgents
- Actions : rechercher, scanner, créer membre

---

**Écran scan QR**
- Rôle : CASHIER, ADMIN
- Objectif : valider l'accès d'un membre aussi vite que possible
- Contenu : viewport caméra dominant, panneau résultat avec photo + nom + statut + couleur, saisie manuelle toujours visible, liste derniers scans
- Actions : scanner, recherche manuelle, override, voir fiche
- États : caméra refusée (fallback manuel automatique), hors ligne (message + fallback), AUTORISÉ (vert), REFUSÉ (rouge + raison + actions disponibles)

---

**Détail abonnement caisse**
- Rôle : CASHIER
- Objectif : vue rapide opérationnelle
- Contenu : statut, dates, séances restantes, impayés, dernier accès
- Actions : renouveler, saisir paiement, imprimer QR

---

### COACH

---

**Dashboard coach**
- Rôle : COACH
- Objectif : vue du jour
- Contenu : cours du jour avec heure, salle, nombre d'inscrits, statut
- Actions : ouvrir roster

---

**Planning coach**
- Rôle : COACH
- Objectif : voir son planning
- Contenu : vue semaine, cours assignés uniquement
- Actions : ouvrir détail cours

---

**Roster + présence**
- Rôle : COACH
- Objectif : marquer la présence rapidement
- Contenu : liste inscrits, statut par défaut "booked", boutons Présent / Absent, action globale "Tous présents"
- Actions : marquer présence individuelle ou en masse, sauvegarder
- États : succès sauvegarde, erreur réseau, cours déjà traité

---

### MEMBRE (MOBILE — APP-LIKE)

---

**Home membre**
- Rôle : MEMBER
- Objectif : tout ce qui est urgent accessible immédiatement
- Layout : shell mobile, bottom nav fixe, header compact
- Contenu : carte abonnement (type, expiration, séances restantes), deux CTA dominants (Afficher QR / Réserver), prochain cours réservé, alertes (impayé, expiration proche)
- États : loading skeleton, pas d'abonnement (CTA contact réception), alerte impayé (bannière orange)

---

**Mon abonnement**
- Rôle : MEMBER
- Objectif : comprendre sa situation
- Contenu : plan, dates, séances restantes, historique des abonnements passés
- États : actif, expiré (avec CTA "Contacter la réception"), gelé (avec dates de gel)

---

**Planning / réserver**
- Rôle : MEMBER
- Objectif : trouver et réserver un cours
- Layout : liste scrollable, filtres discrets en chips
- Contenu : carte cours (nom, heure, coach, places, catégorie colorée)
- Actions : réserver, rejoindre liste d'attente
- États : complet, indisponible pour cet abonnement, déjà réservé

---

**Mes réservations**
- Rôle : MEMBER
- Objectif : gérer ses cours
- Contenu : onglets À venir / Passées, cartes cours avec statut (réservé, liste d'attente, présent, absent)
- Actions : annuler (si dans les délais)
- États : vide, annulation bloquée (hors délai, message explicatif)

---

**Mon QR code**
- Rôle : MEMBER
- Objectif : montrer son accès à la réception
- Layout : full-screen, aucun bruit visuel
- Contenu : QR grand format, nom membre, numéro membre, CTA luminosité
- États : loading, offline (cached), session expirée (redirect discret login)

---

**Paiements & factures**
- Rôle : MEMBER
- Objectif : historique et justificatifs
- Contenu : liste chronologique, statut paiement, montant, bouton télécharger facture
- États : vide, génération PDF en cours

---

**Profil**
- Rôle : MEMBER
- Objectif : gérer ses informations personnelles
- Contenu : photo, nom, téléphone, email, mot de passe
- Actions : modifier, changer mot de passe
- États : validation erreurs, succès

---

**Login / reset**
- Rôle : TOUS
- Objectif : accès au compte
- Shell membre : design app-like, plein écran, logo salle, fond de marque
- Shell admin/caisse/coach : design web classique sobre
- États : identifiants incorrects, compte bloqué, lien reset expiré

---

## PARTIE 8 — WIREFRAMES TEXTUELS

### 8.1 Home membre mobile

```
┌──────────────────────────────┐
│ ☰  GYM NAME          👤     │  ← header fixe
├──────────────────────────────┤
│                              │
│  ┌────────────────────────┐  │
│  │  🟢 ABONNEMENT ACTIF   │  │  ← carte statut, couleur selon état
│  │  Premium mensuel       │  │
│  │  Expire le 28 fév 2026 │  │
│  └────────────────────────┘  │
│                              │
│  ┌──────────┐ ┌───────────┐  │
│  │  📱      │ │    📅     │  │  ← deux CTA dominants, moitié écran chacun
│  │ Mon QR   │ │  Réserver │  │
│  └──────────┘ └───────────┘  │
│                              │
│  PROCHAIN COURS              │
│  ┌────────────────────────┐  │
│  │ Yoga  •  Lun 18h       │  │
│  │ Coach Fatou  •  3 pl.  │  │
│  └────────────────────────┘  │
│                              │
│  PAIEMENTS RÉCENTS           │
│  ✅ 25 000 FCFA  •  jan.   │  │
│                              │
├──────────────────────────────┤
│  🏠      📅    📱    💳  👤 │  ← bottom nav fixe
└──────────────────────────────┘
```

---

### 8.2 QR code mobile

```
┌──────────────────────────────┐
│ ←   Mon QR code         ☀️  │  ← header minimal, CTA luminosité
├──────────────────────────────┤
│                              │
│                              │
│    ┌──────────────────┐      │
│    │                  │      │
│    │   ██████████     │      │
│    │   █  QR CODE  █  │      │  ← QR dominant, minimum 280x280
│    │   ██████████     │      │
│    │                  │      │
│    └──────────────────┘      │
│                              │
│       Mamadou Diallo         │  ← nom complet
│       N° GYM-2025-0042       │  ← numéro membre lisible
│                              │
│                              │
└──────────────────────────────┘
         (pas de bottom nav sur cet écran)
```

---

### 8.3 Écran scan caissier (desktop)

```
┌─────────────────────────────────────────────────────┐
│  SCAN D'ACCÈS                    [Recherche manuelle]│
├──────────────────────────────┬──────────────────────┤
│                              │                      │
│                              │  EN ATTENTE          │
│       [VIEWPORT CAMÉRA]      │  de scan...          │
│                              │                      │
│         (grande zone)        │  ────────────────    │
│                              │                      │
│                              │  Derniers accès :    │
│                              │  ✅ Awa Ba   10:32   │
│                              │  ✅ Omar S.  10:28   │
│                              │  ❌ Lamine D. 10:15  │
│                              │                      │
└──────────────────────────────┴──────────────────────┘
│  [🔍 Saisir numéro ou nom membre...]                 │
└─────────────────────────────────────────────────────┘
```

**État AUTORISÉ :**
```
│                              │  ████████████████    │
│       [VIEWPORT CAMÉRA]      │  ██  AUTORISÉ  ██    │  ← fond vert
│                              │  ████████████████    │
│                              │  [PHOTO]  Awa Ba     │
│                              │  Premium mensuel     │
│                              │  Expire 28 fév       │
```

**État REFUSÉ :**
```
│                              │  ████████████████    │
│       [VIEWPORT CAMÉRA]      │  ██   REFUSÉ   ██    │  ← fond rouge
│                              │  ████████████████    │
│                              │  Abonnement expiré   │
│                              │  [Renouveler] [Fiche]│
│                              │  [Override + raison] │
```

---

### 8.4 Dashboard admin (desktop)

```
┌──────┬──────────────────────────────────────────────┐
│      │  TABLEAU DE BORD          📅 Ce mois  ▼      │
│ NAV  ├──────────┬──────────┬──────────┬─────────────┤
│      │  247     │  +12     │  18      │  1 250 000  │
│ • D  │ Membres  │ Nouveaux │ Expirant │ CA FCFA     │
│ • M  │ actifs   │ ce mois  │ dans 7j  │ ce mois     │
│ • A  ├──────────┴──────────┴──────────┴─────────────┤
│ • P  │  [GRAPHIQUE REVENUS 30 JOURS - LINE CHART]   │
│ • C  │                                              │
│ • R  ├──────────────────┬───────────────────────────┤
│ • Pa │  COURS DU JOUR   │  RENOUVELLEMENTS URGENTS  │
│ • Co │  09h - Yoga ✅   │  • Awa Ba - expire demain │
│ • S  │  11h - Cross 🔴  │  • Omar S - expiré hier   │
│ • Au │  18h - Pilates ✅│  • Fatou D - 3j restants  │
└──────┴──────────────────┴───────────────────────────┘
```

---

### 8.5 Fiche membre admin

```
┌──────┬──────────────────────────────────────────────┐
│ NAV  │  ← Retour membres                            │
│      │  Mamadou Diallo          🟢 ACTIF             │
│      ├──────────┬───────────────────────────────────┤
│      │ [PHOTO]  │ N° GYM-2025-0042                  │
│      │          │ 📱 +221 77 XXX XX XX              │
│      │          │ ✉️  mamadou@email.com              │
│      │          │ 🎂 12/03/1990                     │
│      │          │                                   │
│      │          │ [Modifier] [Bloquer] [Archiver]    │
│      ├──────────┴───────────────────────────────────┤
│      │ [Abonnement][Paiements][Factures][Accès][...]│
│      ├──────────────────────────────────────────────┤
│      │ ABONNEMENT ACTUEL                            │
│      │ Premium mensuel • Actif                      │
│      │ Du 01 jan 2026 → 31 jan 2026                 │
│      │ [Renouveler] [Geler] [Transférer] [Annuler]  │
└──────┴──────────────────────────────────────────────┘
```

---

## PARTIE 9 — DESIGN SYSTEM

### 9.1 Tokens de couleur

```
-- Primaires
--color-primary-500: #2563EB      /* Bleu principal */
--color-primary-600: #1D4ED8      /* Hover */
--color-primary-100: #DBEAFE      /* Fond léger */

-- Accents
--color-accent-500: #10B981       /* Vert succès / énergie */
--color-accent-100: #D1FAE5

-- Sémantiques
--color-success: #10B981
--color-warning: #F59E0B
--color-danger:  #EF4444
--color-info:    #3B82F6

-- Accès (fort contraste obligatoire)
--color-access-ok:      #16A34A  /* Vert foncé lisible */
--color-access-refused: #DC2626  /* Rouge foncé lisible */
--color-access-override:#7C3AED  /* Violet override */

-- Statuts abonnement
--color-status-active:  #16A34A
--color-status-expired: #DC2626
--color-status-frozen:  #6B7280
--color-status-pending: #D97706

-- Neutres
--color-gray-50:  #F9FAFB
--color-gray-100: #F3F4F6
--color-gray-200: #E5E7EB
--color-gray-500: #6B7280
--color-gray-700: #374151
--color-gray-900: #111827
```

---

### 9.2 Typographie

```
Font stack : Inter, system-ui, sans-serif
Font chiffres : Inter (tabular-nums pour les montants)

Échelle :
--text-xs:   12px / 16px
--text-sm:   14px / 20px
--text-base: 16px / 24px
--text-lg:   18px / 28px
--text-xl:   20px / 28px
--text-2xl:  24px / 32px
--text-3xl:  30px / 36px

Poids utilisés :
400 — corps de texte
500 — labels, sous-titres
600 — boutons, KPIs
700 — titres, montants financiers
```

---

### 9.3 Espacements

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px

Rayon de bordure :
--radius-sm:  4px
--radius-md:  8px
--radius-lg:  12px
--radius-xl:  16px
--radius-full: 9999px
```

---

### 9.4 Composants — Règles visuelles

**Boutons**
```
Primary   : bg-primary-500, text-white, h-44px mobile / h-40px desktop
Secondary : bg-white, border-gray-200, text-gray-700
Danger    : bg-danger, text-white (confirmation toujours requise)
Ghost     : transparent, text-primary-500
Taille minimale mobile : 44x44px (accessibilité tactile)
```

**Cartes**
```
Fond blanc, shadow-sm (0 1px 3px rgba(0,0,0,0.1))
Radius-lg (12px)
Padding-4 (16px) mobile / Padding-6 (24px) desktop
Pas de border par défaut
```

**Badges statut**
```
Pill shape (radius-full)
active   : bg-accent-100, text-accent-700
expired  : bg-red-100, text-red-700
frozen   : bg-gray-100, text-gray-600
pending  : bg-yellow-100, text-yellow-700
blocked  : bg-red-200, text-red-800
```

**Tableaux (desktop)**
```
Header : bg-gray-50, text-gray-500, text-sm, uppercase, font-500
Rows   : bg-white, hover:bg-gray-50
Dividers : border-b border-gray-100
Cells  : padding-3 horizontal, padding-4 vertical
```

**Formulaires**
```
Input height  : 44px mobile / 40px desktop
Border        : 1px solid gray-200
Focus         : border-primary-500 + ring-2 ring-primary-100
Error         : border-danger + message rouge sous le champ
Label         : text-sm, font-500, gray-700, mb-1
```

**Bottom navigation (membre mobile uniquement)**
```
Height : 56px + safe-area-inset-bottom
BG     : white, shadow top
Items  : 5 max, icône + label text-xs
Active : color-primary-500, fond pill léger
```

---

### 9.5 Univers membre mobile vs univers métier

| Élément | Membre mobile | Admin/Caisse/Coach |
|---|---|---|
| Espacement | Généreux (space-6+) | Compact (space-3/4) |
| Cards | Grandes, aérées | Denses, informationnelles |
| Typography | Taille plus grande | Standard web |
| Couleurs | Plus vives | Plus neutres |
| Actions | 1 action principale/écran | Multiples actions simultanées |
| Navigation | Bottom tabs | Sidebar + top nav |
| Tableaux | Absent | Central |
| Densité | Faible | Élevée |

---

## PARTIE 10 — MOTION DESIGN & INTERACTIONS

### 10.1 Principes

1. **Animer pour expliquer, pas pour décorer.** Chaque animation a une fonction.
2. **Le résultat de scan doit être perçu comme instantané.** < 300ms retour visuel.
3. **Le QR doit s'ouvrir immédiatement.** Pas de spinner sur cet écran.
4. **Zéro animation parasite dans les workflows caisse.** La rapidité prime.

---

### 10.2 Timings

```
Tap feedback (ripple, scale)  : 80ms
Transitions de route mobile   : 220ms (slide)
Modales / drawers             : 200ms (ease-out)
Toast / notifications         : apparition 150ms, disparition 300ms, durée 3s
Skeleton → contenu            : 200ms fade
Résultat scan                 : < 300ms (réseau) + 100ms animation
Couleur accès (vert/rouge)    : 100ms flash
```

---

### 10.3 Transitions par contexte

**Shell membre mobile**
```
Navigation entre onglets     : slide horizontal (direction logique)
Ouverture détail depuis liste: slide up
Retour                       : slide down
Modales / sheets             : slide up depuis bas
Fermeture sheet              : slide down
```

**Shell admin / caisse**
```
Navigation sidebar           : aucune animation, changement direct
Ouverture modal              : fade + scale 95%→100%, 200ms
Fermeture modal              : fade + scale 100%→95%, 150ms
Row table hover              : bg transition 100ms
Toast                        : slide depuis coin supérieur droit
```

---

### 10.4 Micro-interactions

**Scan accès**
- AUTORISÉ : fond passe au vert en 100ms + icône check animée + son discret si activé
- REFUSÉ : fond passe au rouge en 100ms + icône X + légère vibration si PWA

**Bouton de validation**
- Scale down à 0.96 au press (80ms), retour 80ms
- Loading state : spinner inline, bouton désactivé (protection double clic)

**Formulaires**
- Validation inline : icône check vert apparaît à droite du champ valide
- Erreur : champ passe en rouge + message glisse sous le champ (100ms)

**Réservation cours**
- Le bouton "Réserver" passe en loading → check → état "Réservé" (pas de redirect, confirmation inline)

**QR code**
- Pas d'animation. Affichage direct. La rapidité EST le design.

---

### 10.5 Règles "ne pas faire"

- Pas de skeleton > 1.5s (si plus long, quelque chose ne va pas côté API)
- Pas d'animation sur des actions répétitives (chaque ligne de tableau ne doit pas animer individuellement)
- Pas de transitions entre écrans admin (perte de temps opérationnel)
- Pas de loaders sur le QR code (cache obligatoire)
- Pas d'animation shake sur chaque champ invalide (seulement sur submit bloqué)

---

## PARTIE 11 — ÉVALUATION USABILITÉ & RISQUES

### 11.1 Risques identifiés et corrections

**Risque 1 : Écran scan trop lent**
Cause : trop d'éléments chargés, pas de démarrage caméra automatique.
Correction : écran scan = route dédiée, caméra démarre au mount, aucun widget non essentiel, réponse API < 200ms visée.

**Risque 2 : Expérience membre trop "site web"**
Cause : réutiliser le layout admin pour les membres.
Correction : deux shells physiquement séparés dans le code, zéro partage de layout.

**Risque 3 : Double saisie paiement**
Cause : caissier clique deux fois sur Valider en cas de lenteur réseau.
Correction : idempotency key obligatoire + bouton désactivé après premier clic + spinner immédiat.

**Risque 4 : Override accès sans traçabilité**
Cause : permettre l'override sans frein.
Correction : modal obligatoire avec saisie raison libre (min. 10 caractères), identité opérateur loggée, audit_log créé.

**Risque 5 : Réservation simultanée sur dernier créneau**
Cause : deux membres réservent en même temps la dernière place.
Correction : transaction PostgreSQL + lock sur `booked_count`, celui qui perd est mis en liste d'attente avec message explicatif.

**Risque 6 : QR indisponible offline**
Cause : pas de cache côté PWA.
Correction : cacher le QR (identifiant + données visuelles) dans le state Pinia persisté, rechargement au login suivant.

**Risque 7 : Archivage membre avec données liées**
Cause : archiver un membre qui a des réservations futures actives.
Correction : avant archivage, avertissement listant les réservations à venir + confirmation explicite + annulation automatique avec notification.

**Risque 8 : Perte d'accès staff**
Cause : admin désactive son propre compte ou son propre rôle.
Correction : guard serveur empêchant un user de modifier ses propres rôles ou de se désactiver.

**Risque 9 : Remise appliquée sans permission**
Cause : caissier applique une remise alors que sa permission est désactivée.
Correction : champ remise masqué si permission absente, validation serveur en plus.

**Risque 10 : Cours supprimé avec réservations**
Cause : suppression d'une occurrence déjà bookée.
Correction : annulation d'occurrence = workflow dédié → annulation automatique toutes réservations → notification aux membres → log.

---

### 11.2 Simplifications recommandées

- **Formulaire création membre** : minimum vital d'abord (prénom, nom, téléphone), le reste modifiable après. Éviter un long formulaire bloquant.
- **Scan** : une seule action visible, pas de menu parasite sur cet écran.
- **Dashboard membre** : maximum 5 éléments visibles sans scroll. Tout le reste dans les onglets.
- **Notifications** : ne jamais afficher plus d'une alerte critique à la fois sur le home membre. Grouper les secondaires.

---

## PARTIE 12 — ORDRE DE CONSTRUCTION

### Phase 1 — Cœur opérationnel
Auth + RBAC → Membres → Plans → Abonnements → Paiements caisse → Factures → Audit de base

### Phase 2 — Contrôle d'accès
QR génération → Validation scan → Logs → Override → Écran scan caissier

### Phase 3 — Cours & réservations
Calendrier → Occurrences → Réservations → Liste d'attente → Présence → Coach dashboard

### Phase 4 — Espace membre mobile
Shell membre → Home → QR → Abonnement → Planning → Réservations → Factures → Profil

### Phase 5 — Intelligence & finitions
Dashboards → Reporting → Exports → Notifications automatiques → Communications groupées → PWA polish

---

## CONCLUSION

Le produit est un moteur opérationnel d'abord, une app membre ensuite. NestJS gère la complexité métier avec la rigueur TypeScript. Vue 3 sert deux expériences radicalement différentes depuis le même monorepo. PostgreSQL tient la cohérence des données. Redis absorbe les tâches asynchrones. Tout est déployable sur un seul VPS en phase 1.

Ce dossier couvre sans trou : stack, modules backend, schéma complet, rôles, permissions, machines à états, règles métier numérotées, flows UX par rôle avec edge cases, tous les écrans par rôle, wireframes textuels utiles, design tokens réels, motion design avec timings, évaluation usabilité avec corrections concrètes, et ordre de build.

**Prochaine étape logique :** schéma Prisma complet (`schema.prisma`) prêt à utiliser, ou structure de dossiers NestJS avec les modules vides typés.
