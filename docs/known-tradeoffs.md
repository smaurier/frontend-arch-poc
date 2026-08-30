# Known trade-offs

The current build ships with deliberate v0 trade-offs. Each is documented, reversible, and has a target milestone. This page is the single view.

The intent: adopters and reviewers can see what is compromised and what would be needed to harden it.

## Auth: token in sessionStorage

- **Where**: `apps/shell/src/auth/oidc-manager.ts`
- **Trade-off**: `oidc-client-ts` default `WebStorageStateStore` on `sessionStorage`. Reachable from any script running in the browser, so vulnerable if the app suffers an XSS.
- **Rationale v0**: zero backend requirement, works with any OIDC provider out of the box.
- **Target**: BFF pattern with HttpOnly cookies. Backend proxy holds the tokens, browser only sees a session cookie.
- **Effort to switch**: 3-5 days. Needs a small backend (Node or any). Auth flow unchanged from the user perspective.
- **ADR**: [ADR-0009](adr/0009-authentication-oidc-keycloak.md).

## Realtime: full-state SSE payload per tick

- **Where**: `apps/shell/src/dev/sse-middleware.ts` and consumers.
- **Trade-off**: every SSE event sends the whole truck array. Bandwidth grows linearly with dataset size.
- **Rationale v0**: simplest possible replayable snapshot. Works up to a few hundred rows.
- **Target**: per-row delta events with `Last-Event-ID` for replay after reconnect. Snapshot only on first connect.
- **Effort to switch**: 2-3 days. Requires a stable id and versioning per row.
- **ADR**: [ADR-0011](adr/0011-realtime-sse.md).

## Observability: 20% traces sample, no session replay

- **Where**: `apps/shell/src/observability/sentry.ts`
- **Trade-off**: `tracesSampleRate: 0.2`. Session replay disabled entirely.
- **Rationale v0**: cost control on the Sentry free tier plus privacy defaults.
- **Target**: tune per environment. Prod may go to 1.0 traces on critical routes, session replay opt-in with masking.
- **Effort to switch**: minutes. Change constants or expose them as env variables.
- **ADR**: [ADR-0010](adr/0010-observability-sentry.md).

## CSP: `style-src 'unsafe-inline'`

- **Where**: `netlify.toml` and `apps/shell/index.html`
- **Trade-off**: inline styles are allowed. Some Tailwind utilities and the anti-FOUC theme init depend on this. Slight XSS surface via style injection.
- **Rationale v0**: hardening this needs Trusted Types plus a review of Tailwind runtime behavior.
- **Target**: switch to nonce-based CSP for inline blocks, or eliminate inline styles entirely with build-time hashing. Adopt Trusted Types.
- **Effort to switch**: 1-2 days.
- **ADR**: [ADR-0012](adr/0012-security-front.md).

## Design tokens: hand-crafted v0, no Style Dictionary

- **Where**: `packages/tokens/src/tokens.ts`
- **Trade-off**: adding a token means editing TypeScript by hand. No multi-platform generation.
- **Rationale v0**: fifteen tokens, one product, KISS. Overhead of a token pipeline not justified yet.
- **Target**: Style Dictionary pipeline. JSON source of truth, generated outputs for CSS variables, TypeScript, Figma variables, iOS, Android.
- **Trigger**: 50+ tokens or a second product consumes the same design system.
- **Effort to switch**: 1 day.

## DataTable: virtualization but no server pagination

- **Where**: `packages/ui/src/DataTable/DataTable.vue`
- **Trade-off**: the whole dataset must fit in memory. `useVirtualizer` renders only the viewport, but arrays of 100 000+ rows still cost memory and JSON parse time.
- **Rationale v0**: demo dataset fits easily. No backend to paginate from.
- **Target**: cursor-based pagination or virtual scroll bound to a fetch-on-demand API.
- **Effort to switch**: 2-3 days per dataset.

## MapView: OSM tiles, no vector rendering

- **Where**: `packages/ui/src/MapView/MapView.vue`
- **Trade-off**: OpenStreetMap raster tiles at Leaflet default zoom. Fine for a few hundred markers. Struggles above.
- **Rationale v0**: five markers, KISS.
- **Target**: MapLibre GL with vector tiles, GPU rendering, clustering server-side or WebGL-based on the client for high volumes.
- **Trigger**: markers pass ~1 000 or theming needs runtime style updates driven by design tokens.
- **Effort to switch**: 3-5 days.
- **Reference**: the component API stays the same; only the internal renderer changes.

## Branch strategy: GitHub Flow (Deploy Previews as pre-prod)

- **Where**: current workflow.
- **Trade-off**: no permanent staging URL. Reviewer relies on Deploy Preview per PR.
- **Rationale v0**: one dev, Deploy Previews are fresh per commit and cost nothing to maintain.
- **Target**: GitLab Flow with a `staging` branch and a dedicated Netlify site when the team scales or QA needs a stable URL.
- **Effort to switch**: 10 minutes for the branch and site. See `docs/methodology/deployment-and-rollback.md` "Switching to GitLab Flow" for the concrete commands.

## Team standards: SLA and templates in place, review count required = 0

- **Where**: GitHub branch protection on `main`.
- **Trade-off**: `required_approving_review_count: 0`. One dev cannot self-approve their own PR, so setting it to 1 would block merges.
- **Rationale v0**: single contributor.
- **Target**: bump to 1 when a second reviewer exists.
- **Effort to switch**: one API call.
- **Reference**: [ADR-0016](adr/0016-team-standards-deep.md).

## Where a Staff Front engineer starts if hired to harden this

Rough priority for a 90-day plan, assuming a real backend exists to build against:

1. **Week 1-2** · BFF for auth tokens (highest impact security).
2. **Week 3** · CSP tightening: nonces + Trusted Types.
3. **Week 4** · SSE deltas + `Last-Event-ID`.
4. **Week 5** · DataTable server pagination + real API contract.
5. **Week 6-8** · Style Dictionary migration if the design system scales.
6. **Week 9** · Sentry sampling per route + session replay opt-in with masking.
7. **Week 10** · MapView vector tiles migration if volume demands.
8. **Week 11-12** · GitLab Flow staging + dedicated Netlify site if the team has grown.

Every step is a small, reversible change. The architecture was intentionally built so these switches touch one file or one composable, not the whole app.
