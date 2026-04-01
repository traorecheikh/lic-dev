# AGENTS.md

This repository is DRY-first.

## Core Rule

- DRY is the highest-priority engineering rule in this codebase.
- If logic or contracts can be reused, centralize them in `packages/*`.
- Duplication across `apps/api` and `apps/web` is considered a defect.

## Shared Package Ownership

- `packages/types`:
  - Shared domain contracts, enums, route models, payload/response types.
  - Any type used by both API and Web must live here.
- `packages/utils`:
  - Pure reusable helpers (formatters, transformers, serializers, date/money helpers).
  - No app-specific framework code here.
- `packages/ui`:
  - Shared UI primitives, UI metadata, design tokens, shared presentation constants.

## App Boundaries

- `apps/api`:
  - Backend-only runtime concerns (Nest modules, DB, auth guards, side effects).
  - Consume shared contracts/utilities from `@gym/types` and `@gym/utils`.
- `apps/web`:
  - Frontend-only runtime concerns (Vue views, router composition, state stores).
  - Consume shared contracts/utilities/UI from `@gym/types`, `@gym/utils`, `@gym/ui`.

## Non-Negotiable DRY Checks Before Adding Code

1. Search existing shared packages first.
2. If the new artifact could be used by both apps, put it in `packages/*`.
3. If similar code already exists in one app, extract and move it to shared package.
4. Keep one source of truth for domain contracts and formatting logic.

## Import Convention

- Always import shared modules through workspace aliases:
  - `@gym/types`
  - `@gym/utils`
  - `@gym/ui`

## Feature Development Pattern

1. Add/extend shared contracts in `packages/types`.
2. Add/extend shared helpers in `packages/utils`.
3. Add/extend shared UI metadata/primitives in `packages/ui` (if relevant).
4. Use the shared exports in both API and Web.
5. Run `pnpm typecheck`.

## Anti-Patterns (Forbidden)

- Re-declaring the same type in both API and Web.
- Duplicating formatter/helper functions per app.
- App-local constants that represent global domain concepts.
- Introducing framework-specific code in shared utility packages.

## Quality Gate

A change is incomplete unless:

- shared opportunities were evaluated first,
- duplicate code was avoided or extracted,
- `pnpm typecheck` passes.
