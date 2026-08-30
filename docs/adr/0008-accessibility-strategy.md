# 0008 · Accessibility strategy (a11y baked in)

**Date:** 2026-08-30
**Status:** accepted

## Context

Accessibility is a first-class requirement: EU EAA legally mandates it from June 2025, and the app targets professional dashboards where operators depend on it. We already have a11y tests in Vitest per component (roles, aria-label) and axe-core in Storybook (V1.1 T3). This ADR formalizes the strategy end to end.

## Decision

- **Unit tests:** every DS component has assertions on roles and accessible names in the RED step of TDD (see ADR-0004).
- **Storybook a11y addon:** axe-core panel visible on every story (V1.1 T3).
- **E2E a11y suite:** `@axe-core/playwright` scans the built app in three states: default (light), dark, French locale. Critical + serious violations fail CI.
- **Lighthouse CI a11y category:** minimum score 0.95 (already asserted).
- **Language attribute:** `document.documentElement.lang` reflects the current locale, updated by `useLocale` on switch and by `watchEffect` in `App.vue` on initial mount.
- **Third-party exclusions:** Leaflet controls (`.leaflet-control-*`) may generate false positives; exclude specific selectors, never disable whole rules.

## Consequences

- Positive: 4-layer defense (unit + Storybook + E2E axe + Lighthouse).
- Positive: regressions blocked by CI before merge.
- Negative: E2E runtime slightly longer.
- Follow-up V3: WCAG 2.2 AAA where relevant, focus trap for modal dialogs when introduced, live regions for realtime updates.

## Alternatives considered

- **Axe-core in Vitest via jsdom**: possible but happy-dom does not compute layout, so contrast checks are unreliable. Playwright with a real headless browser is the reliable path.
- **Manual audits only**: rejected. Non-scalable, misses regressions.

## References

- @axe-core/playwright: https://www.npmjs.com/package/@axe-core/playwright
- RGAA: https://accessibilite.numerique.gouv.fr/
- EU EAA (2019/882): https://eur-lex.europa.eu/eli/dir/2019/882/oj
- Related: ADR-0004 (testing pyramid), ADR-0007 (i18n).
