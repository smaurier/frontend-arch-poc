# 0000 — Record architecture decisions

**Date:** 2026-08-30
**Status:** accepted

## Context

We need a lightweight way to track WHY the codebase looks the way it does.
Without it, decisions get relitigated every time a new contributor joins.

## Decision

Use MADR-style (Markdown Any Decision Records) files in `docs/adr/`. Every
architectural decision that shapes the codebase gets a numbered ADR.

## Consequences

- [+] Onboarding = read the ADRs, understand the WHY.
- [+] Decisions are searchable and dated.
- [-] Small overhead per decision (~15 min).
- [→] Enables `disagree and commit` culture — the trace exists.

## Alternatives considered

- **A.** Inline comments — die with the code, invisible to newcomers.
- **B.** Wiki (Notion, Confluence) — lives outside the repo, gets stale.

## References

- [MADR](https://adr.github.io/madr/)
- Template: `docs/adr/template.md`
