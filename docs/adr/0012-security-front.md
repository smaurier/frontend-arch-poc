# 0012 · Security posture (front)

**Date:** 2026-08-30
**Status:** accepted

## Context

Before opening the shell to real users, the front needs a defensible baseline: strict CSP, sane HTTP security headers, secret scanning on every push, and a lightweight dependency audit. This ADR captures the v0 posture.

## Decision

### Content Security Policy

Served via `netlify.toml` on the production shell. A slightly looser meta CSP lives in `index.html` for local dev needs (HMR websocket, theme init script). Notable directives:

- `default-src 'self'` denies everything by default.
- `script-src 'self'` in production. No inline scripts in the built bundle.
- `img-src 'self' data: https://*.tile.openstreetmap.org` allows Leaflet tiles.
- `connect-src` allows `self`, local Keycloak (dev only), and Sentry telemetry (`*.sentry.io`).
- `frame-ancestors 'none'` forbids embedding.
- `object-src 'none'` kills Flash and legacy embed vectors.

### Other headers

`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=()`.

### CI jobs

- `secrets-scan` runs `gitleaks` on every push and PR.
- `deps-audit` runs `pnpm audit --prod --audit-level high`. Non-blocking v0 (documented). Blocking becomes an ADR-level opt-in when the noise decreases.
- `osv-scan` runs the OSV scanner action on the lockfile. Informational v0.

## Consequences

- Positive: shell is not embeddable, third-party origins are opt-in only.
- Positive: any accidental secret commit is flagged in seconds.
- Negative: adding a new third-party CDN or telemetry endpoint now requires a CSP update.
- Follow-up: Subresource Integrity for external assets (when any are added), Trusted Types, and blocking-mode audit when the ecosystem stabilizes.

## Alternatives considered

- **Report-only CSP first**: valid conservative rollout. Skipped because the app is small enough that a strict CSP is testable end to end today.
- **Snyk / Socket**: paid or heavier tooling. `gitleaks` + `pnpm audit` + OSV cover v0.

## References

- MDN CSP: https://developer.mozilla.org/docs/Web/HTTP/CSP
- gitleaks: https://github.com/gitleaks/gitleaks
- OSV: https://osv.dev
- Related: ADR-0009 (auth), ADR-0010 (observability).
