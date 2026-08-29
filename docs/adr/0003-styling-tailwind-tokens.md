# 0003 — Styling with Tailwind 4 and semantic OKLCH tokens

**Date:** 2026-08-30
**Status:** accepted

## Context

DS needs consistent styling across all consumers, theming (dark mode +
future multi-tenant), and accessibility by construction. Two families:
utility-first (Tailwind), from-scratch CSS.

## Decision

**Tailwind 4 + semantic tokens (OKLCH), hand-crafted in `packages/tokens`.**

- Tokens exposed via `@theme` directive in `apps/shell/src/style.css`.
- Components use utility classes bound to tokens (`bg-bg-surface`,
  `text-status-critical`).
- OKLCH color space for perceptual luminosity → predictable contrasts,
  a11y-by-construction.
- Semantic naming (`status-critical`), never raw (`red-500`).

## Consequences

- [+] Zero hardcoded design values — ESLint enforces (`no-restricted-syntax`).
- [+] Dark mode = swap CSS custom property values under `[data-theme=dark]`.
- [+] Multi-tenant theming (V2+) = swap token set, no code changes.
- [-] Tailwind 4 is newer, community answers less dense than Tailwind 3.
- [→] Migration to Style Dictionary (V2) when tokens > 50 or 2nd product joins.

## Alternatives considered

- **CSS variables pure** — max control but slower velocity, no utility DX.
- **shadcn-vue / Reka UI** — great primitives but adds abstraction we don't
  fully control v0. Consider as V2 base for complex primitives.

## References

- Tailwind 4 `@theme`: https://tailwindcss.com/docs/theme
- OKLCH: https://oklch.com/
- Related: ADR-0004 (a11y via tests).
