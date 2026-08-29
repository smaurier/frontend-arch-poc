# 0005 — CI on GitHub Actions, deploy on Netlify (auto)

**Date:** 2026-08-30
**Status:** accepted

## Context

Need CI that enforces quality on every push/PR and continuous deployment for
demo visibility. Two hosting candidates in mind: Netlify, Vercel.

## Decision

- **CI:** GitHub Actions, single `ci.yml` workflow with DAG parallelism
  (lint + typecheck + test in parallel → build → e2e + size-limit in
  parallel).
- **Deploy:** Netlify native GitHub integration. Two sites:
  - `frontend-arch-poc-shell.netlify.app` (the app-shell demo)
  - `frontend-arch-poc-storybook.netlify.app` (the DS catalog)
- **PR previews:** Netlify Deploy Previews (automatic per PR).
- **Perf budget:** `size-limit` enforces bundle-size budgets in CI. A PR
  that exceeds a budget fails.

## Consequences

- [+] Every PR gets a live preview URL.
- [+] Perf regressions caught in CI, not in prod.
- [+] Zero custom deploy workflow — Netlify handles it.
- [-] Netlify auto-deploy = less demo of GitHub Actions deploy patterns.
- [→] Lighthouse CI (Core Web Vitals budgets) in V1.1.
- [→] GitLab CI patterns documented in V3 for portability.

## Alternatives considered

- **Vercel** — equally valid, better for Next.js. Netlify picked for
  familiarity.
- **Custom GitHub Actions deploy** — reinvents what Netlify provides free.

## References

- Netlify Deploy Previews: https://docs.netlify.com/site-deploys/deploy-previews/
- Related: ADR-0004 (tests run in CI).
