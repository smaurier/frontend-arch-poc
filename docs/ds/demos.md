# Live demo scenarios

The public demo runs with feature flags off. This page shows how to unlock every scenario locally.

## 1. Vanilla demo (polling mock)

Zero setup beyond `pnpm install`.

```bash
pnpm install
pnpm dev
```

Opens on `http://localhost:5173`. Five trucks with mocked ping updates every two seconds. `TRUCK-04` stays permanently stale and triggers the alarm indicator.

## 2. Realtime SSE

Replace polling with real Server-Sent Events served by a Vite middleware.

```bash
cp apps/shell/.env.example apps/shell/.env.local
```

Edit `apps/shell/.env.local`:

```
VITE_SSE_ENABLED=true
VITE_SSE_URL=/api/events
VITE_SNAPSHOT_URL=/api/snapshot
```

Then:

```bash
pnpm dev
```

The middleware serves `/api/events` (event stream) and `/api/snapshot` (JSON current state). On (re)connect the client fetches the snapshot, then listens for delta events. Exponential backoff on disconnect.

Inspect the network tab: an EventSource stays open, receiving `event: trucks` frames every two seconds.

## 3. OIDC authentication with Keycloak

Boot a local Keycloak with the pre-imported realm.

```bash
docker compose -f docker/keycloak/docker-compose.yml up -d
```

Keycloak on `http://localhost:8085`. Admin console at `/admin` (login `admin` / `admin`). Demo user: `demo` / `demo`.

Edit `apps/shell/.env.local`:

```
VITE_AUTH_ENABLED=true
VITE_OIDC_AUTHORITY=http://localhost:8085/realms/frontend-arch-poc
VITE_OIDC_CLIENT_ID=shell-client
```

Then:

```bash
pnpm dev
```

The app now shows a Sign in view. Click through, log in as `demo` / `demo`, land back on the dashboard. Sign out clears the session.

Stop Keycloak later:

```bash
docker compose -f docker/keycloak/docker-compose.yml down
```

## 4. Observability with Sentry

Set a Sentry DSN in `apps/shell/.env.local`:

```
VITE_SENTRY_DSN=https://<your-dsn>@sentry.io/<project>
VITE_APP_VERSION=local
```

On next reload, Sentry initializes. Errors, transactions, and a per-session `session_id` tag start flowing. `sendDefaultPii: false` so profile beyond `sub` and `email` stays local.

Sampling: 20% traces, zero session replay. Adjust in `apps/shell/src/observability/sentry.ts` if needed.

GlitchTip is a drop-in DSN-compatible alternative if self-hosting matters.

## 5. All flags on

Combine SSE + Auth + Sentry:

```bash
docker compose -f docker/keycloak/docker-compose.yml up -d
```

`.env.local`:

```
VITE_AUTH_ENABLED=true
VITE_OIDC_AUTHORITY=http://localhost:8085/realms/frontend-arch-poc
VITE_OIDC_CLIENT_ID=shell-client
VITE_SSE_ENABLED=true
VITE_SSE_URL=/api/events
VITE_SNAPSHOT_URL=/api/snapshot
VITE_SENTRY_DSN=https://<your-dsn>@sentry.io/<project>
VITE_APP_VERSION=local-full
```

Then:

```bash
pnpm dev
```

Sign in flow (Keycloak) → dashboard with SSE-driven data → observability firing.

## 6. Storybook a11y in action

```bash
pnpm storybook
```

Open any component story. The Accessibility panel runs axe-core against the rendered component and reports violations, passes, and incomplete audits in real time.

## 7. Multi-tenant theming (concept)

Not built into the demo v0. To try the pattern:

Wrap the app in a `<div data-tenant="clientA">` and override tokens in a scoped block:

```css
[data-tenant='clientA'] {
  --color-status-critical: oklch(60% 0.24 30);
  --color-bg-canvas: oklch(97% 0.006 220);
}
```

All components adopt the new palette without a single line of code change. This is the semantic-tokens payoff.

## Troubleshooting

- Keycloak port 8085 already in use: `docker compose -f docker/keycloak/docker-compose.yml down` first.
- SSE not connecting: check the browser network tab for `/api/events`. If Vite dev server is not the one running, the middleware is not registered.
- Sentry not sending: verify the DSN is set and reload. Check `network` tab for `ingest.sentry.io` requests.

## Related

- [Getting started](./getting-started)
- [Tokens](./tokens)
- [Theming](./theming)
- [Components](./components/)
