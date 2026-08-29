# Roadmap — 16 items

This repo builds progressively a reference architecture for real-time
dashboards, 16 items grouped in ordered waves. Ordinal milestones, no
public date commitments (avoids drift traps).

## Status

- 🟢 done — item delivered with tests + docs
- 🟡 in-progress — active work
- ⚪ planned — not started

---

## V1 — Foundations (inaugural weekend)

Focus: monorepo, DS bootstrap, TDD infra, methodology.

| #   | Item                                                 | Status | ADR  |
| --- | ---------------------------------------------------- | ------ | ---- |
| 3   | Project skeleton (monorepo pnpm + Turborepo)         | 🟡     | 0002 |
| 2   | Documentation / ADR (method + templates)             | 🟡     | 0000 |
| 4   | Design system (semantic tokens + 5 components)       | 🟡     | 0003 |
| 10  | Testing strategy (Vitest + Playwright + Storybook)   | 🟡     | 0004 |
| 5   | CI/CD (GitHub Actions + Netlify + size-limit)        | 🟡     | 0005 |
| 15  | Team standards (CONTRIBUTING + Conventional Commits) | 🟡     | 0006 |

**V1 deliverable:** functional monorepo, 5-component DS on tokens,
app-shell live on Netlify, green CI, Storybook deployed, ADRs published.

---

## V1.1 — Compléments

Minor deferrals from V1: responsive Layout, DataTable extraction, mini
Leaflet map, useFreshnessTicker extraction to `packages/composables`,
Storybook a11y addon, Lighthouse CI, standalone DACI framework decision
document.

---

## V2 — Security & i18n (after RGAA exam)

RGAA (French accessibility certification) has priority.

| #   | Item                                              | Status |
| --- | ------------------------------------------------- | ------ |
| 6   | OIDC authentication (shell + dockerized Keycloak) | ⚪     |
| 12  | i18n (vue-i18n) from the skeleton                 | ⚪     |
| 11  | Accessibility by design (RGAA/EAA baked in DS)    | ⚪     |
| 13  | Observability (Sentry, RUM, correlated logs)      | ⚪     |
| —   | DS user documentation                             | ⚪     |

---

## V3a — Real-time & security (after V2)

| #   | Item                                              | Status |
| --- | ------------------------------------------------- | ------ |
| 9   | Real-time (SSE, backoff, resync snapshot)         | ⚪     |
| 14  | Front security (CSP, secrets, dependencies audit) | ⚪     |

---

## V3b — Production & team

| #   | Item                                                   | Status |
| --- | ------------------------------------------------------ | ------ |
| 7   | CI/CD portability (GitHub Actions, GitLab CI, Jenkins) | ⚪     |
| 8   | Automated multi-env deployment + rollback              | ⚪     |
| 16  | AI usage framework for teams (guidelines + safeguards) | ⚪     |
| 15+ | Deep team standards (SLA reviews, onboarding)          | ⚪     |

---

## Backlog / known deferrals

- **Style Dictionary** — V2 when tokens > 50 or 2nd product.
- **Turborepo Remote Cache** — V2 when > 1 dev.
- **Testing Library** — if unit test complexity grows.
- **Nuxt** — out of current scope (CSR assumed for auth-gated dashboards).

## Cadence estimations

Initial estimations — revised after each delivered wave.

- V1: single intense weekend.
- V1.1: incremental, evening sessions.
- V2 and beyond: sequential after V1.1, no calendar commitments.
