# Keycloak local IdP

Provides OIDC for the shell when `VITE_AUTH_ENABLED=true`.

## Start

```bash
docker compose -f docker/keycloak/docker-compose.yml up -d
```

Keycloak boots on `http://localhost:8085`. The `frontend-arch-poc` realm auto-imports on first start.

Demo user: `demo` / `demo`.

Admin console: `http://localhost:8085/admin` (credentials `admin` / `admin`).

## Stop

```bash
docker compose -f docker/keycloak/docker-compose.yml down
```

## Reset

```bash
docker compose -f docker/keycloak/docker-compose.yml down -v
```
