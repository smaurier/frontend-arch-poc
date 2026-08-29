# CLAUDE.md — Founding principles

Read before making changes.

## Non-negotiable

- **Decision-first**: every architectural decision is documented in `docs/adr/`
  BEFORE code is written.
- **AI-assisted implementation**: components are AI-drafted for velocity;
  every decision, tradeoff, and pattern is human-encoded (see private notes
  repo).
- **Test coverage baked**: Vitest + Playwright, CI enforces even AI-generated
  tests.
- **KISS + YAGNI**: no premature abstraction. No code "just in case".
  Delete unused code.
- **Semantic tokens**: NO hardcoded design values (colors, spacing, radii)
  in components. Enforced by ESLint. Tokens live in `packages/tokens/`.
- **A11y from day 1**: not a retrofit. Every component has a11y tests in
  the RED step of TDD.

## Guidelines

- **Conventional Commits** for every commit (`feat:`, `fix:`, `docs:`,
  `chore:`, `refactor:`, `test:`, `perf:`, `ci:`).
- **Vue 3 Composition API + `<script setup>`** — no Options API in new code.
- **TypeScript strict** — `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`.
- **Playwright retries: 0** — a flaky test is a bug, not something to hide.
- **Import boundaries**: `apps/*` → `packages/*` only. `packages/ui` →
  `packages/tokens` only. Never inverse.
