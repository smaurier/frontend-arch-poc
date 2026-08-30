# Changelog

All notable changes to this project are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.0] · 2026-08-30 · V3b (final wave)

### Added

- SSE realtime transport with exponential backoff reconnect and snapshot resync (feature-flagged via `VITE_SSE_ENABLED`).
- Vite dev middleware exposing `/api/events` (SSE) and `/api/snapshot` (JSON).
- Generic `useSSE<T>` composable in `packages/composables`.
- Content Security Policy served via `netlify.toml` (default-src 'self', frame-ancestors 'none', OSM + Sentry allowlisted).
- Security headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy denies geolocation/mic/camera.
- Meta CSP fallback in `index.html` for dev.
- `secrets-scan` job (gitleaks, blocking).
- `deps-audit` job (pnpm audit high+, non-blocking v0).
- `osv-scan` job (osv-scanner, informational).
- `.gitlab-ci.yml` and `Jenkinsfile` reference mirrors of the GitHub Actions pipeline.
- `docs/methodology/ci-portability.md` with stage mapping across GitHub, GitLab, Jenkins.
- `netlify.toml` multi-context env blocks (production, deploy-preview, branch-deploy).
- `docs/methodology/deployment-and-rollback.md` with two rollback paths (Netlify UI fast path, git revert auditable path).
- `docs/methodology/ai-in-engineering-team.md` with the AI usage framework (4 quadrants, non-negotiables, trust ladder, anti-patterns).
- Expanded `CONTRIBUTING.md` (SLA on reviews, branch strategy, ADR process).
- `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1).
- `docs/onboarding.md` (day 0 / day 1 / week 1 / month 1 checklist).
- `.github/PULL_REQUEST_TEMPLATE.md` with type-of-change + checklist.
- `.github/ISSUE_TEMPLATE/{bug_report,feature_request,config}.yml`.
- ADRs 0011 (SSE), 0012 (security), 0013 (CI portability), 0014 (deployment), 0015 (AI usage), 0016 (deep standards).

## [0.4.0] · 2026-08-30 · V3a

### Added

- Groundwork for SSE and security (see 0.5.0 for shipped items).

### Changed

- Raised status colors brightness in dark theme for WCAG AA contrast on dark backgrounds.

## [0.3.0] · 2026-08-30 · V2

### Added

- `vue-i18n` composition API with `en` and `fr` locales.
- Locale switcher in the header with localStorage persistence.
- Dynamic `document.documentElement.lang` synchronized with the current locale.
- `useLocale` composable.
- `@axe-core/playwright` E2E accessibility suite scanning three states (light, dark, French).
- VitePress documentation site under `docs/ds/` (13 pages: home, getting started, tokens, theming, 7 components).
- OIDC authentication with `oidc-client-ts` v3 and Keycloak 26 in Docker (feature-flagged via `VITE_AUTH_ENABLED`).
- `useAuth` composable with sign-in, sign-out, callback handling, silent renew.
- `LoginView` and `CallbackView`.
- `docker/keycloak/docker-compose.yml` and pre-imported realm.
- `@sentry/vue` for observability (errors, transactions, profiling), feature-flagged via `VITE_SENTRY_DSN`.
- `useObservability` composable exposing a session id tag for cross-tier log correlation.
- Auth user context automatically set/cleared in Sentry on sign-in/out.
- ADRs 0007 (i18n), 0008 (a11y strategy), 0009 (auth), 0010 (observability).

### Fixed

- French translations now include proper accents.

## [0.2.0] · 2026-08-30 · V1.1

### Added

- DACI framework standalone methodology doc: `docs/methodology/framework-decision-daci.md`.
- `packages/composables` workspace package.
- Extracted `useFreshnessTicker` from `apps/shell` to `packages/composables`.
- `FreshnessTimestamp` refactored to consume the shared composable.
- Storybook a11y addon (axe-core panel on every story).
- Lighthouse CI with Core Web Vitals budgets (LCP, CLS, TBT), category thresholds (perf, a11y, best-practices).
- `MapView` component using Leaflet + OpenStreetMap with 5 truck markers.
- Truck lat/lng added to the mock data set.
- `DataTable<T>` generic component with `@tanstack/vue-virtual` virtualization.
- Layout responsive: burger menu, backdrop, ESC to close on mobile.
- Learnings doc in the private notes repo covering 16 workarounds accumulated during V1.

### Changed

- FleetTrackingView switched to split layout (list + map).

## [0.1.0] · 2026-08-30 · V1 (foundations)

### Added

- Initial monorepo: pnpm workspaces + Turborepo.
- Packages: `@frontend-arch-poc/{tokens,ui,config}`.
- App: `@frontend-arch-poc/shell` (Vue 3 + Vite + Tailwind 4).
- Semantic OKLCH tokens: color (bg, text, border, status), spacing, radius, typography.
- Light and dark themes with anti-FOUC init script.
- Design system components: Button, Badge, FreshnessTimestamp, AlarmIndicator, Layout.
- FleetTrackingView demonstrating the DS with mocked realtime data (polling).
- `useFreshnessTicker` composable (initially in apps/shell).
- Vitest + Vue Test Utils + happy-dom (unit).
- Playwright configuration (E2E, retries 0, workers 1 in CI).
- Storybook 8 with multi-package stories glob.
- ESLint 9 flat + Prettier + Husky + lint-staged + commitlint (Conventional Commits).
- GitHub Actions CI (lint, typecheck, test, build, e2e, size-limit, lighthouse).
- Netlify auto-deploy (shell + Storybook).
- ADRs 0000 through 0006 (record decisions, framework, monorepo, styling, testing, ci-cd, standards v0).
- Roadmap of sixteen items.
- README, CONTRIBUTING v0, CLAUDE.md, LICENSE MIT.

[Unreleased]: https://github.com/smaurier/frontend-arch-poc/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/smaurier/frontend-arch-poc/releases/tag/v0.5.0
[0.4.0]: https://github.com/smaurier/frontend-arch-poc/releases/tag/v0.4.0
[0.3.0]: https://github.com/smaurier/frontend-arch-poc/releases/tag/v0.3.0
[0.2.0]: https://github.com/smaurier/frontend-arch-poc/releases/tag/v0.2.0
[0.1.0]: https://github.com/smaurier/frontend-arch-poc/releases/tag/v0.1.0
