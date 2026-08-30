# Security posture

This project ships with a defensible baseline. This document explains what is enforced and how to report a vulnerability.

## Content Security Policy

Strict CSP is served via `netlify.toml`. Notable:

- Same-origin only for scripts and default fetches.
- Third-party origins explicitly allowed: OpenStreetMap tiles, Sentry (when a DSN is configured), local Keycloak (dev only).
- No embedding (`frame-ancestors 'none'`).
- Legacy plugins disabled (`object-src 'none'`).

## Additional headers

`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denies geolocation, microphone, and camera by default.

## Continuous checks

Every push and PR triggers:

- `gitleaks` scans the diff and the history for secrets.
- `pnpm audit --prod --audit-level high` on the production dependency graph.
- `osv-scanner` on the lockfile.

## Reporting a vulnerability

See `SECURITY.md` at the repository root.

## Authentication

OIDC via Keycloak (dev) or any OIDC-compliant provider (prod). Feature-flagged. See ADR-0009.

## Related

- ADR-0009 · Authentication OIDC
- ADR-0010 · Observability Sentry
- ADR-0012 · Security posture (front)
