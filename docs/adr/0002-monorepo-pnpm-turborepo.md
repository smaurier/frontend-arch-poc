# 0002 — Monorepo with pnpm workspaces + Turborepo

**Date:** 2026-08-30
**Status:** accepted

## Context

3 packages + 1 app share configs, tokens, and UI. Need workspace management
and cached builds/tests.

## Decision

**pnpm workspaces + Turborepo.**

- pnpm workspaces: fast symlinks, disk-efficient.
- Turborepo: content-hash cache for build/test/lint/typecheck. Only re-runs
  what changed.

## Consequences

- [+] `pnpm turbo run test` re-runs only affected packages after cache warm.
- [+] Setup ~15 min. Simple mental model.
- [-] No enforced module boundaries out-of-the-box (TS paths + ESLint fill
  the gap).
- [→] Nx migration remains possible if team grows and boundaries need
  tooling.

## Alternatives considered

- **Nx** — richer (generators, module boundaries, affected). Overkill v0
  (2-3 packages, 1 dev). Consider V3 if team scales.
- **pnpm alone** — no cache = full rebuild every tick, painful in TDD.

## References

- Turborepo: https://turborepo.com
- Related: ADR-0004 (testing).
