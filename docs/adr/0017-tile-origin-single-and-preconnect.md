# 0017 — One tile origin, warmed by preconnect

**Date:** 2026-11-02
**Status:** accepted

## Context

The `lighthouse` CI job failed intermittently on `uses-rel-preconnect`, and the first
reading was wrong: it looked like a flaky audit, so the temptation was to downgrade the
assertion to `warn`. Reading the actual Lighthouse report of the failing run says
otherwise:

```
uses-rel-preconnect  expected: <=0   found: 1   all values: 1, 1, 2
items: [{ url: "https://a.tile.openstreetmap.org", wastedMs: 119.35 }]
```

All three runs flagged an origin, not one outlier — the intermittence only comes from the
measured saving sometimes falling under Lighthouse's reporting threshold. So there is a
real ~119 ms on the table.

Two further facts from the same report:

- The page contacts **two** tile origins in a single load (`a.` and `c.`), because
  `L.tileLayer` defaults to `subdomains: 'abc'`.
- Both are served over **`h2`**.

Domain sharding across `a`/`b`/`c` is an HTTP/1.1 workaround for the six-connections-per-
origin limit. Under HTTP/2 a single connection multiplexes every tile, so sharding stops
buying parallelism and starts costing an extra DNS lookup plus TLS handshake per extra
subdomain — which is precisely the latency the audit measured.

## Decision

Serve every tile from one origin and warm that connection in the document head:

- `L.tileLayer` is pinned to `subdomains: ['a']`, so a load touches exactly one tile origin.
- `apps/shell/index.html` gains a single
  `<link rel="preconnect" href="https://a.tile.openstreetmap.org" crossorigin>`.

The audit assertion is left at `error`, untouched. The defect is removed rather than
silenced.

## Consequences

- [+] One DNS lookup and one TLS handshake for tiles instead of two or three, started
  during document parse rather than when the map mounts.
- [+] `uses-rel-preconnect` becomes deterministic: exactly one external origin, always
  preconnected, so the assertion stops gating merges at random.
- [+] No unused preconnect — Lighthouse penalises those, which is why preconnecting all
  three subdomains was rejected.
- [-] Tiles lose HTTP/1.1 parallelism for any client that negotiates `h1` with OSM. Tile
  requests are small and the connection is warmed, so this is accepted.
- [-] One hardcoded subdomain to revisit if OSM ever retires per-letter hostnames in
  favour of a single `tile.openstreetmap.org` — at which point both the option and the
  preconnect collapse into that one host.
- [→] Establishes the pattern for any future third-party origin: one origin, preconnected,
  and the resource hint lives next to the CSP that already allows the host.

## Alternatives considered

- **A. Downgrade `uses-rel-preconnect` to `warn`.** — Rejected: the report shows a real
  measured cost, so this would hide a defect rather than fix it. It was the plan until the
  report was actually read.
- **B. Keep sharding, preconnect to `a`, `b` and `c`.** — Rejected: a single load uses only
  some of them, so the rest are unused preconnects, which Lighthouse flags in turn; and it
  keeps paying for handshakes that HTTP/2 makes pointless.
- **C. Proxy tiles through the app's own origin.** — Rejected: no measured need, and it
  would put our server on the path of every tile for a POC, plus OSM's usage policy.

## References

- [0012 — Security front](0012-security-front.md): `img-src` already allows
  `https://*.tile.openstreetmap.org`, so the hint needs no CSP change.
- Lighthouse audit: https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/
