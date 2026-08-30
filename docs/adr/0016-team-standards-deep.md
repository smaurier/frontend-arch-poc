# 0016 · Team standards deep

**Date:** 2026-08-30
**Status:** accepted

## Context

ADR-0006 established v0 team standards (Conventional Commits, pre-commit hooks, minimal CONTRIBUTING) and deferred the team-scale content until it became relevant. V3b closes that gap.

## Decision

- **SLA on reviews**: first response within 24 business hours for standard PRs, 4 business hours for urgent, 48 for author rework. Silence is not a response.
- **Branch strategy**: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`. `main` protected, merges via PR with green CI and one approval.
- **Onboarding**: checklist in `docs/onboarding.md` covering day 0, day 1, week 1, month 1.
- **Code of Conduct**: Contributor Covenant 2.1 at `CODE_OF_CONDUCT.md`.
- **PR template**: `.github/PULL_REQUEST_TEMPLATE.md` with type-of-change, checklist, preview URL section.
- **Issue templates**: bug report + feature request + config.yml pointing to security policy and DS docs.

## Consequences

- Positive: onboarding a new contributor is a checklist, not a folklore session.
- Positive: review SLA aligns expectations.
- Positive: PR template makes reviewers' job easier.
- Negative: more surface to maintain.
- Follow-up: adjust SLAs when the team size changes. Keep the onboarding doc current with any new mandatory setup.

## Alternatives considered

- **Leave standards implicit**: works at one dev, fails at three. Rejected.
- **Wall-of-text contributing doc without a template**: gets ignored. Templates get filled.

## References

- Contributor Covenant 2.1: https://www.contributor-covenant.org/version/2/1/code_of_conduct/
- Related: ADR-0006 (team standards v0), ADR-0015 (AI usage), CONTRIBUTING.md.
