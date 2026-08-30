# 0009 · Authentication with OIDC and Keycloak

**Date:** 2026-08-30
**Status:** accepted

## Context

The application needs authentication before production. In V2 we introduce it with a feature flag so demo modes stay open and CI does not require a running IdP.

## Decision

- **Protocol:** OpenID Connect (OIDC), Authorization Code + PKCE, no client secret. Standard for browser SPAs.
- **IdP local:** Keycloak 26 in Docker for development, with a pre-imported realm (`frontend-arch-poc`) and a public client (`shell-client`). Demo user seeded.
- **IdP production:** any OIDC-conformant provider (Entra ID, Auth0, Cognito, self-hosted Keycloak). Only `VITE_OIDC_AUTHORITY` and `VITE_OIDC_CLIENT_ID` change.
- **Client library:** `oidc-client-ts` v3 (framework-agnostic, well-typed, active maintenance).
- **Feature flag:** `VITE_AUTH_ENABLED`. Default false. When false the app renders as it does today (public demo). When true the shell gates FleetTrackingView behind a Sign in button.
- **Token storage v0:** default sessionStorage via UserManager. Documented risk. V3 target: HttpOnly cookies via a BFF.
- **No router yet:** conditional `v-if` on `App.vue`. Callback route detected by `window.location.pathname === '/callback'`. When we add a real router (V3), we replace the pathname check with a route guard.
- **Silent renew:** enabled via `oidc-client-ts` default automatic silent renewal.

## Consequences

- Positive: real auth ready for use with any OIDC provider, without changing the app.
- Positive: demo stays open on Netlify (flag off).
- Negative: sessionStorage tokens are XSS-reachable. Migrate to BFF-cookie in V3.
- Follow-up: route guards, refresh handling on 401, logout across tabs.

## Alternatives considered

- **Auth0 SDK direct**: vendor lock, weaker for portability. Rejected.
- **@azure/msal-browser**: excellent for Entra ID but locks the local dev story. Keycloak in Docker plays with any provider later.
- **Implicit flow**: deprecated by OAuth 2.1. Rejected.

## References

- oidc-client-ts: https://github.com/authts/oidc-client-ts
- Keycloak import: https://www.keycloak.org/server/importExport
- OAuth 2.1 draft: https://oauth.net/2.1/
- Related: ADR-0005 (CI/CD), ADR-0007 (i18n).
