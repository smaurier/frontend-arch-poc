# 0011 · Real-time transport: Server-Sent Events

**Date:** 2026-08-30
**Status:** accepted

## Context

The demo used a polling mock that mutated a shared ref. V3a introduces a real-time transport so the shell reflects real backend behavior when needed, without breaking the demo.

## Decision

- **Transport**: Server-Sent Events (SSE). Consumption-only, HTTP-friendly, native browser reconnect. Best fit for dashboards that receive updates. WebSockets kept for later if bidirectional messaging appears.
- **Feature flag**: `VITE_SSE_ENABLED`. Default off. Polling mock remains for zero-backend demos.
- **Dev backend**: Vite middleware in `apps/shell/src/dev/sse-middleware.ts` exposes `/api/events` (event stream) and `/api/snapshot` (JSON current state). Same in-memory truck data as the polling mock.
- **Client**: generic composable `useSSE` in `packages/composables/`. Handles snapshot fetch on connect, event dispatch, exponential backoff reconnect (1s to 30s), and clean unmount.
- **Snapshot semantics**: on every (re)connect, fetch `/api/snapshot`. Any partial-update semantics (deltas, per-truck event) are V3+.
- **Freshness**: unchanged. `FreshnessTimestamp` still consumes `lastPing` per row.

## Consequences

- Positive: dev experience close to prod behavior when flag is on.
- Positive: switching to a real backend means pointing `VITE_SSE_URL` at it. No client changes.
- Positive: the DS composable is generic, usable in any app.
- Negative: added complexity in vite.config.ts (dev middleware).
- Follow-up: delta events, backpressure, replay from `Last-Event-ID`, WebSocket if bidirectional needed.

## Alternatives considered

- **WebSockets**: rejected v0. Overkill for read-only. Heavier to operate (sticky, heartbeat, custom reconnect).
- **HTTP long polling**: rejected. Worse UX than SSE, more server load.
- **GraphQL subscriptions**: rejected. Needs a whole GraphQL stack.

## References

- MDN Server-Sent Events: https://developer.mozilla.org/docs/Web/API/Server-sent_events
- Related: ADR-0009 (auth), roadmap V3a item 9.
