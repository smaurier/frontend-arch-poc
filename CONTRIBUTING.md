# Contributing

Thank you for your interest. This document is the operational contract for contributing.

## Table of contents

- [Setup](#setup)
- [Development workflow](#development-workflow)
- [Branch strategy](#branch-strategy)
- [Code review SLA](#code-review-sla)
- [Commit conventions](#commit-conventions)
- [Testing expectations](#testing-expectations)
- [Adding a component to `packages/ui`](#adding-a-component-to-packagesui)
- [ADR process](#adr-process)
- [Security](#security)
- [Code of conduct](#code-of-conduct)

## Setup

Requirements: Node 22 LTS, pnpm 9+ (10 recommended).

```bash
pnpm install
pnpm turbo run test
pnpm turbo run build
```

Full onboarding checklist: [`docs/onboarding.md`](docs/onboarding.md).

## Development workflow

1. Open an issue or reference an existing one.
2. Create a branch from `main` following the [branch strategy](#branch-strategy).
3. Write tests first when changing behavior (see [Testing expectations](#testing-expectations)).
4. Commit with [Conventional Commits](#commit-conventions).
5. Open a PR. Fill the template.
6. Reviewer responds within the [SLA](#code-review-sla).
7. Merge on green CI and one approval.

## Branch strategy

- **`main`**: production. Protected. All merges via PR with green CI and one approval.
- **`feat/<short-name>`**: new features.
- **`fix/<short-name>`**: bug fixes.
- **`chore/<short-name>`**: tooling, deps, docs unrelated to features.
- **`docs/<short-name>`**: documentation-only changes.
- **`refactor/<short-name>`**: internal restructuring without behavior change.

Rebase or merge is a per-team choice. Default recommended: rebase for a linear history, squash on merge to condense noisy WIP commits.

## Code review SLA

| Situation                               | First response SLA                      |
| --------------------------------------- | --------------------------------------- |
| PR opened, no draft                     | 24 business hours                       |
| PR marked "Ready for review" from draft | 24 business hours                       |
| Urgent fix (release-blocking)           | 4 business hours, escalate in team chat |
| Rework requested by reviewer            | 48 business hours from author           |

A "response" means either an approval, a comment thread, or an explicit deferral with a reason. Silence is not a response.

## Commit conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/) via commitlint. The subject must be lowercase after the prefix.

Valid:

- `feat(ui): button component with disabled state`
- `fix(shell): correct dark mode contrast`
- `docs(methodology): daci framework doc`

Invalid:

- `Feat(ui): Button component` (uppercase, hook rejects)
- `feat: button` (missing scope for a scoped change)

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`, `style`, `build`.

## Testing expectations

- Every behavior change ships with tests.
- Component tests (`Vitest` + `@vue/test-utils`) assert a11y from the RED step (roles, aria-label).
- Integration tests live in `apps/*/src/**/*.test.ts`.
- E2E tests live in `apps/shell/e2e/`.
- Coverage thresholds (in `packages/config/vitest.config.base.ts`): 80% lines, 80% functions, 75% branches.
- Retries in Playwright are 0. A flaky test is a bug.

## Adding a component to `packages/ui`

1. Create `packages/ui/src/<Name>/` with:
   - `<Name>.vue` (implementation)
   - `<Name>.test.ts` (tests, including a11y assertions in RED)
   - `<Name>.stories.ts` (Storybook)
   - `<Name>.types.ts` (props, emit types)
   - `index.ts` (barrel)
2. Add to `packages/ui/src/index.ts`.
3. Ship an update to the DS docs at `docs/ds/components/<name>.md`.
4. Open a PR. CI runs unit + Storybook build + Lighthouse.

## ADR process

- Every architectural decision that shapes the codebase gets a numbered ADR in `docs/adr/`.
- Format: MADR (see `docs/adr/template.md`).
- Ordering: incrementing integers. New ADRs never rewrite past ADRs. They supersede if needed and reference the superseded ADR.

## Security

See [`SECURITY.md`](SECURITY.md) at the repo root for the security policy and reporting instructions.

Do not commit secrets. `gitleaks` runs on every push and PR.

## Code of conduct

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
