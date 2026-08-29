# 0004 — Testing pyramid: Vitest + Vue Test Utils + Playwright + Storybook

**Date:** 2026-08-30
**Status:** accepted

## Context

Need fast feedback (unit), visual doc + interaction (Storybook), end-to-end
critical paths (E2E). And enforcement of a11y and semantic tokens as
first-class citizens.

## Decision

- **Unit + integration:** Vitest + Vue Test Utils. `happy-dom` for speed.
- **Visual + interaction:** Storybook 8, config in `apps/shell/.storybook/`,
  multi-package stories glob.
- **E2E:** Playwright, `retries: 0` (a flaky test is a bug to fix, not to
  hide), single worker in CI.
- **A11y in RED:** every component's test file includes accessibility
  assertions from the first RED step, not as a refactor.
- **Semantic tokens enforced by lint:** `no-restricted-syntax` blocks
  hardcoded hex and px values in Vue templates.

## Consequences

- [+] Fast local feedback (Vitest ms).
- [+] Visual regression catchable (Storybook + future Chromatic).
- [+] A11y not a retrofit.
- [-] Test-writing discipline required from day 1.
- [→] Chromatic (visual regression) and Storybook a11y addon in V1.1.

## Alternatives considered

- **Testing Library** (semantics-first) — good philosophy but Vue Test Utils
  is official and less abstract for v0. Reconsider if unit tests get complex.
- **Jest** — slower, no native ESM. Vitest wins.
- **Cypress** — slower than Playwright in CI, less parallel-friendly.

## References

- Vitest: https://vitest.dev
- Playwright: https://playwright.dev
- Related: ADR-0003 (tokens enforced by lint).
