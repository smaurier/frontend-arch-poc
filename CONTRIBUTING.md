# Contributing

## Setup

Requirements: Node 22 LTS, pnpm 9+.

```bash
pnpm install
pnpm turbo run test
pnpm turbo run build
```

## Conventions

- Commits: [Conventional Commits](https://www.conventionalcommits.org/).
- Branches: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`.
- Every PR: green CI (lint, typecheck, test, build, e2e, size-limit).

## Adding a component to `packages/ui`

1. Create `packages/ui/src/<Name>/` with `<Name>.vue`, `<Name>.test.ts`,
   `<Name>.stories.ts`, `<Name>.types.ts`, `index.ts`.
2. Tests first (behavior + a11y in RED step).
3. Storybook story with Default + variants.
4. Barrel export in `packages/ui/src/index.ts`.

## Architecture Decision Records

Every decision that shapes the codebase goes into `docs/adr/`. Format: MADR.
See `docs/adr/template.md`.
