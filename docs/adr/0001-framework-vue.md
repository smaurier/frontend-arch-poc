# 0001 — Framework Vue 3

**Date:** 2026-08-30
**Status:** accepted

## Context

This PoC is a reference architecture for real-time dashboards. We need to pick
ONE frontend framework for consistency and to demonstrate a coherent stack.
Options considered: React, Vue 3, Angular.

## Decision

**Vue 3 with Composition API + `<script setup>`.**

## Consequences

- [+] Composition API is close to React hooks — patterns transfer.
- [+] Ecosystem mature: Pinia (state), TanStack Query Vue (server state),
  Reka UI / shadcn-vue (headless a11y), vue-i18n, VueUse.
- [+] Learning curve gentle for teams onboarding.
- [-] Slightly less mindshare than React in Anglo markets.
- [→] Enables a coherent DS in-framework (no need for web components v0).

## Alternatives considered

- **React** — most popular, richest ecosystem. Not picked here to demonstrate
  Vue viability for greenfield architecture. A parallel React version would
  be equally valid.
- **Angular** — enterprise-grade but heavier for a small reference PoC.

## References

- Vue 3 docs: https://vuejs.org/
- Related: ADR-0003 (styling), ADR-0004 (testing).
