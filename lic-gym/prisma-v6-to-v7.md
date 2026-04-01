# Prisma v6 to v7 Migration (lic-gym)

This project now uses Prisma `7.x` and TypeScript `6.x`.

## Why this file exists

Prisma 7 introduces breaking changes that affect this repository directly:

- datasource URL is no longer read from `schema.prisma`
- Prisma CLI reads connection configuration from `prisma.config.ts`
- client generation must run before Nest build in fresh environments

## Changes applied in this repo

1. Added root config file: `prisma.config.ts`
   - Uses `defineConfig` from `prisma/config`
   - Loads env vars from root `.env`
   - Defines schema path (`prisma/schema.prisma`)
   - Defines migrations path (`prisma/migrations`)
   - Defines datasource URL from `DATABASE_URL`

2. Updated schema file: `prisma/schema.prisma`
   - Removed datasource `url = env("DATABASE_URL")`
   - Kept datasource `provider = "postgresql"`

3. Updated Prisma scripts in `apps/api/package.json`
   - `prisma:generate` now uses `--config ../../prisma.config.ts`
   - `prisma:migrate` now uses `--config ../../prisma.config.ts`
   - Added `prebuild` hook to run client generation before `nest build`

## Build reliability adjustments (TS6 + monorepo)

To keep `pnpm run build` stable with shared workspace packages:

- API build (`apps/api/tsconfig.build.json`) resolves `@gym/types` from built declarations
- Shared packages now have build scripts and declaration output
- Base tsconfig silences TS6 deprecation hard-errors via `ignoreDeprecations: "6.0"`

## Commands

Generate Prisma client:

```bash
pnpm --filter @gym/api prisma:generate
```

Run migrations:

```bash
pnpm --filter @gym/api prisma:migrate
```

Full monorepo build:

```bash
pnpm run build
```

## Notes

- Ensure root `.env` exists before Prisma commands.
- `DATABASE_URL` must be defined in root `.env`.
