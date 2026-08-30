# 0007 · Internationalization with vue-i18n

**Date:** 2026-08-30
**Status:** accepted

## Context

The application must support at least English and French from V2. Team members may be distributed. Translation strategy must not couple the design system to i18n (DS should stay portable).

## Decision

- **Library:** `vue-i18n` v10 with the composition API (legacy off).
- **Locales v0:** `en` (default) + `fr`.
- **Format:** JSON per locale in `apps/shell/src/i18n/messages/`.
- **Namespacing:** dotted flat keys grouped by context (`app.title`, `fleet.columns.id`).
- **Persistence:** `localStorage.locale` (mirror of theme pattern).
- **DS strings:** components in `packages/ui/` do NOT depend on i18n. They accept text via props. The shell holds i18n and passes translated strings down.

## Consequences

- Positive: DS stays portable across products and locales.
- Positive: switching language does not require reloading.
- Negative: shell has to translate before passing to DS, no auto-translation of a `Badge` label.
- Follow-up: add more locales as needed. Consider a lazy-load pattern with async imports when locale count grows.

## Alternatives considered

- **i18n inside packages/ui**: rejected. Would tie DS to a single i18n solution and to specific string keys, hurting reuse.
- **@intlify/unplugin-vue-i18n**: could be added later for message compilation and single-file components. Not needed v0.

## References

- vue-i18n docs: https://vue-i18n.intlify.dev/
- Related: ADR-0003 (styling, tokens), ADR-0004 (testing).
