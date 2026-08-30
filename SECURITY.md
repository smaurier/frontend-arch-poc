# Security policy

## Supported versions

The `main` branch is the only supported version. Tags exist for reference only.

## Reporting a vulnerability

If you find a security issue, please do not open a public issue. Instead:

1. Email the maintainer at the address listed on the GitHub profile.
2. Include a description of the vulnerability, steps to reproduce, and the affected commit or version.
3. Expect an acknowledgment within 72 hours.

Coordinated disclosure preferred. Fix will be released as soon as reasonably possible.

## Scope

- Web application security in this repository (`apps/*`, `packages/*`).
- Third-party dependencies with known CVEs affecting this project.

## Out of scope

- Vulnerabilities in third-party services this project integrates with (Keycloak, Sentry, Netlify). Report to the vendor.
