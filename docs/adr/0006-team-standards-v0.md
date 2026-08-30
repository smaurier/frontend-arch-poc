# 0006 — Team standards v0 (minimal)

**Date:** 2026-08-30
**Status:** accepted

## Context

Standards written for an actual team don't yet apply (1 dev). But
foundational conventions must be present from day 1 to enable future
contributors without renegotiation.

## Decision

v0 covers:

- **Conventional Commits** enforced by commitlint.
- **Husky pre-commit** runs lint-staged (prettier + eslint).
- **`CONTRIBUTING.md`** documents: setup, conventions, how to add a
  component to `packages/ui`.
- **`CLAUDE.md`** documents founding principles (non-negotiable rules).

Deferred to V3 (when a team exists):

- SLA on code review turnaround.
- Onboarding checklist.
- Code of conduct.
- Meeting cadence, decision governance.

## Consequences

- [+] Minimal friction v0, no premature ceremony.
- [+] Foundations in place for team scale-up.
- [-] Deferred items = a note, not code.
- [→] V3 = expand standards when relevant.

## Alternatives considered

- **Full team standards v0** — would be ceremony without users. YAGNI.
- **No standards v0** — every future contributor would renegotiate.

## References

- Conventional Commits: https://www.conventionalcommits.org/
- CONTRIBUTING.md, CLAUDE.md.

## 2026-08-30 addendum

Team-scale sections deferred in this ADR are now covered by ADR-0016 (deep standards): SLA on reviews (24 business hours first response), onboarding checklist (`docs/onboarding.md`), full Code of Conduct (Contributor Covenant 2.1), branch strategy, PR + issue templates.

This ADR remains accepted for the v0 principles it captured (Conventional Commits, Husky pre-commit, `CONTRIBUTING.md` minimal). It is not superseded, only augmented.
