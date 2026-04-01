# Gym App Scaffold

Initial monorepo scaffold generated from `gym.md` and `gym-schema.md`.

## DRY-First Rule (Most Important)

- DRY is mandatory in this codebase.
- If code, types, constants, or formatting logic can be reused across API and Web, put it in `packages/*`.
- Do not duplicate domain contracts in `apps/api` and `apps/web`.
- Before adding code to an app, check whether it belongs in shared packages first.

## Structure

- `apps/api`: NestJS API baseline with module stubs and Prisma seed script.
- `apps/web`: Vue 3 shell baseline (admin, cashier, coach, member).
- `packages/*`: shared workspace packages (`types`, `utils`, `ui`).
- `prisma/schema.prisma`: schema extracted from `gym-schema.md`.

## Shared code used by API and Web

- `@gym/types`: shared contracts (`HealthResponse`, shell route types, payment method codes).
- `@gym/utils`: shared helpers (`formatMoney`, `toIsoTimestamp`) used in web.
- `@gym/ui`: shared UI metadata (`brand`) used in web.

## Quick start

1. Copy environment file.

```bash
cp .env.example .env
```

2. Install dependencies.

```bash
pnpm install
```

3. Start infrastructure (Postgres + Redis + apps).

```bash
docker compose up --build
```

4. Generate Prisma client, run migration, and seed.

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## API health

- URL: `http://localhost:3000/api/health`
- Expected shape: `{ "status": "ok", "service": "api", "timestamp": "..." }`
