# 0010 · Observability with Sentry

**Date:** 2026-08-30
**Status:** accepted

## Context

Production visibility of client-side errors, performance, and correlated logs is a V2 requirement. Sentry is the industry default for browser JS observability with a proven Vue SDK.

## Decision

- **SDK**: `@sentry/vue` v8, bundled tracing + profiling integrations.
- **Feature flag**: `VITE_SENTRY_DSN`. When empty, Sentry does not initialize. This keeps demo builds free of external calls.
- **Sampling v0**: `tracesSampleRate: 0.2`. No session replay (`replaysSessionSampleRate: 0`) for privacy + cost. Reevaluate in V3.
- **Session correlation**: a UUID `sessionId` (from `crypto.randomUUID` when available) is set as a Sentry tag and exposed via `useObservability`. Backend logs can attach the same tag from a header on API calls for cross-tier correlation.
- **User context**: automatically populated on OIDC sign-in with the JWT `sub` and `email`. Cleared on sign-out. `sendDefaultPii: false` to avoid leaking additional profile data.
- **Logger**: `logger.info/warn/error` is a thin wrapper that both writes to console and forwards to Sentry when initialized. Encourages consistent structured logging.
- **Release tracking**: `VITE_APP_VERSION` build env, defaults to `dev`.
- **tracePropagationTargets**: only `/api/*` so traces are not attached to third-party requests.

## Consequences

- Positive: production incidents surfaced in a single dashboard, correlated per session and per user.
- Positive: zero-cost when disabled.
- Negative: sampling drops 80% of transactions. Increase if visibility is required.
- Follow-up: session replay when it fits privacy story. Custom breadcrumbs on realtime SSE events (V3a).

## Alternatives considered

- **GlitchTip** (Sentry-compatible OSS): valid alternative for hosting privacy. Same SDK works. Left as a runtime choice (any DSN).
- **OpenTelemetry web**: more portable long-term but heavier setup. Consider for V3.

## References

- @sentry/vue: https://docs.sentry.io/platforms/javascript/guides/vue/
- Related: ADR-0004 (testing), ADR-0009 (auth).
