# frontend-arch-poc

[![CI](https://github.com/smaurier/frontend-arch-poc/actions/workflows/ci.yml/badge.svg)](https://github.com/smaurier/frontend-arch-poc/actions)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://frontend-arch-poc-storybook.netlify.app)
[![Demo](https://img.shields.io/badge/demo-live-00c7b7)](https://frontend-arch-poc-shell.netlify.app)
[![DS docs](https://img.shields.io/badge/ds-docs-3178c6)](https://frontend-arch-poc-ds.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Reference architecture for real-time fleet tracking dashboards. Sixteen items delivered across five waves. AI-assisted implementation, human-encoded decisions.

## About this repository

- Sixteen roadmap items delivered.
- Seven design system components, tokenized OKLCH, a11y baked, tested.
- Vue 3 + Vite + Tailwind 4 + Storybook + Playwright + Vitest + Lighthouse CI.
- Feature-flagged auth (OIDC + Keycloak Docker), realtime (SSE), observability (Sentry).
- CSP, secrets scanning, dep audit, OSV scanner in CI.
- Portable CI pipelines: GitHub Actions primary, GitLab CI and Jenkins references.
- Multi-environment deploy on Netlify with rollback documentation.

**On implementation**: AI-assisted for velocity. Every architectural decision is human-encoded in `docs/adr/` (sixteen ADRs) and defended in commit messages. This project demonstrates architecture and methodology, not line-by-line craftsmanship.

## Live artifacts

| Artifact         | URL                                             | What it shows                                        |
| ---------------- | ----------------------------------------------- | ---------------------------------------------------- |
| App demo         | https://frontend-arch-poc-shell.netlify.app     | Realtime fleet dashboard with mock data              |
| Storybook        | https://frontend-arch-poc-storybook.netlify.app | Design system catalog (7 components, 20+ stories)    |
| DS docs          | https://frontend-arch-poc-ds.netlify.app        | Getting started, tokens, theming, component API      |
| ADRs             | [docs/adr/](docs/adr/)                          | Sixteen architectural decision records               |
| Roadmap          | [docs/roadmap.md](docs/roadmap.md)              | Original plan and delivery status                    |
| Methodology docs | [docs/methodology/](docs/methodology/)          | DACI framework, CI portability, AI usage, deployment |

## Stack

- Node 22 LTS, pnpm 10, TypeScript 5 strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Vue 3.5 (Composition API) + Vite 6 + Tailwind 4 (`@theme` directive)
- Semantic tokens (OKLCH) in `packages/tokens`
- Vitest + Vue Test Utils + Playwright + Storybook 8 + axe-core (a11y in Storybook and E2E)
- ESLint 9 flat + Prettier + Husky + lint-staged + commitlint
- vue-i18n (en, fr)
- oidc-client-ts + Keycloak Docker for local auth
- @sentry/vue for observability (feature-flagged)
- @tanstack/vue-virtual for DataTable virtualization
- Leaflet + OpenStreetMap for MapView
- GitHub Actions CI (10 parallel jobs) + Lighthouse CI + size-limit + gitleaks + pnpm audit + osv-scanner
- Netlify auto-deploy (3 sites, deploy previews per PR)
- VitePress for DS documentation

## Getting started

Requirements: Node 22 LTS, pnpm 10.

```bash
git clone https://github.com/smaurier/frontend-arch-poc
cd frontend-arch-poc
pnpm install
pnpm turbo run test
pnpm dev            # http://localhost:5173
pnpm storybook      # http://localhost:6006
pnpm docs:dev       # http://localhost:5174 (DS docs site)
```

Full onboarding checklist: [docs/onboarding.md](docs/onboarding.md).

## Feature flags

The demo runs with all opt-in features off by default. Enable per environment via `.env.local` (see [apps/shell/.env.example](apps/shell/.env.example)).

| Flag                  | Default                                          | Effect                                                                                                             |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `VITE_AUTH_ENABLED`   | false                                            | Gate the app behind an OIDC sign-in. Requires a running Keycloak or an OIDC-compliant IdP.                         |
| `VITE_SSE_ENABLED`    | false                                            | Replace polling mock with real Server-Sent Events. Vite dev middleware provides `/api/events` and `/api/snapshot`. |
| `VITE_SENTRY_DSN`     | empty                                            | Enable Sentry for errors, performance, session correlation. Empty = no telemetry.                                  |
| `VITE_OIDC_AUTHORITY` | `http://localhost:8085/realms/frontend-arch-poc` | OIDC provider URL.                                                                                                 |
| `VITE_OIDC_CLIENT_ID` | `shell-client`                                   | OIDC client id.                                                                                                    |
| `VITE_APP_VERSION`    | `dev`                                            | Release tag reported to Sentry. Set per Netlify context.                                                           |

## Structure

```
apps/shell/               Vue 3 + Vite demo application
packages/ui/              Design system (Button, Badge, FreshnessTimestamp,
                          AlarmIndicator, Layout, MapView, DataTable)
packages/tokens/          Semantic OKLCH tokens + light/dark themes
packages/composables/     useFreshnessTicker, useSSE
packages/config/          Shared ESLint, Prettier, Vitest, TypeScript configs
docs/adr/                 Sixteen Architecture Decision Records
docs/methodology/         DACI, CI portability, AI usage, deployment
docs/ds/                  VitePress documentation site
docs/onboarding.md        New contributor checklist
docker/keycloak/          Local IdP for OIDC development
.github/workflows/ci.yml  Ten-job pipeline (lint, typecheck, test, build,
                          e2e, size-limit, lighthouse, secrets, deps, osv)
.gitlab-ci.yml            Reference mirror for GitLab
Jenkinsfile               Reference mirror for Jenkins
netlify.toml              Multi-context env vars and security headers
```

## Local development scenarios

### Vanilla demo (no external services)

```bash
pnpm install
pnpm dev
```

Polling mock produces truck updates every two seconds. TRUCK-04 stays permanently stale to trigger the alarm indicator.

### Realtime SSE (no auth)

```bash
cp apps/shell/.env.example apps/shell/.env.local
# set VITE_SSE_ENABLED=true
pnpm dev
```

The Vite dev middleware serves `/api/events` and `/api/snapshot`. Snapshot on connect + delta events every two seconds. Reconnect uses exponential backoff.

### Auth OIDC with Keycloak

```bash
docker compose -f docker/keycloak/docker-compose.yml up -d
# set VITE_AUTH_ENABLED=true in apps/shell/.env.local
pnpm dev
```

Keycloak boots on port 8085. Realm `frontend-arch-poc` auto-imports. Demo user: `demo` / `demo`.

### Observability with Sentry

Set `VITE_SENTRY_DSN` in `apps/shell/.env.local` to any Sentry-compatible DSN (Sentry or GlitchTip). Errors, transactions, and a session id tag start flowing on next reload.

## Principles

See [CLAUDE.md](CLAUDE.md) for founding non-negotiable rules:

- Decision-first (ADRs before code).
- AI-assisted implementation, human-encoded decisions.
- Test coverage baked (Vitest + Playwright, a11y in RED).
- KISS + YAGNI.
- Semantic tokens, no hardcoded design values (ESLint enforces).
- A11y from day 1.

Also read [docs/methodology/ai-in-engineering-team.md](docs/methodology/ai-in-engineering-team.md) for the AI usage framework.

## Testing

- 65 unit tests (Vitest, `apps/*` + `packages/*`)
- 6 E2E tests (Playwright, `apps/shell/e2e/`)
- Axe a11y scans in Storybook + Playwright (three states: light, dark, French)
- Lighthouse CI budgets (LCP, CLS, TBT, category thresholds)
- Size-limit bundle budget (150 kB gzip)

Run everything:

```bash
pnpm turbo run lint typecheck test build
pnpm --filter @frontend-arch-poc/shell e2e
```

## Contributing

- [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow, branch strategy, SLA on reviews.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for expected behavior.
- [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## License

MIT © 2026 Sylvain Maurier
