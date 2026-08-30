# Onboarding

Welcome. This checklist gets a new contributor productive in one day.

## Day 0 (before first commit)

- [ ] Install Node 22 LTS.
- [ ] Install pnpm 10 (`corepack enable && corepack prepare pnpm@10.28.2 --activate`).
- [ ] Clone the repo.
- [ ] `pnpm install`.
- [ ] `pnpm turbo run lint typecheck test build` completes green.
- [ ] `pnpm dev` opens the shell on http://localhost:5173.
- [ ] `pnpm storybook` opens Storybook on http://localhost:6006.
- [ ] Read `CLAUDE.md` (founding principles).
- [ ] Read `CONTRIBUTING.md` (workflow, branch strategy, SLA).
- [ ] Read `docs/adr/0000-record-architecture-decisions.md` (why ADRs).
- [ ] Skim `docs/adr/` (accepted ADRs form the current shape of the codebase).
- [ ] Read `docs/security.md` and `SECURITY.md`.
- [ ] Read `docs/methodology/ai-in-engineering-team.md` if the team uses AI-assisted development.

## Day 1

- [ ] Open a starter issue (marked "good first issue") or ask the team.
- [ ] Create a branch: `feat/<short-name>`.
- [ ] Write a failing test first (a11y test in RED for component work).
- [ ] Implement.
- [ ] `pnpm turbo run lint typecheck test build` locally.
- [ ] Open a PR. Fill the template. Request review.
- [ ] Iterate on review feedback.

## Week 1

- [ ] Pair on at least 2 code reviews with an experienced contributor.
- [ ] Attend the team's regular sync.
- [ ] Set up local Keycloak if the work touches auth:
  ```bash
  docker compose -f docker/keycloak/docker-compose.yml up -d
  ```
  Copy `apps/shell/.env.example` to `apps/shell/.env.local` and set `VITE_AUTH_ENABLED=true`.
- [ ] Set up Sentry DSN in `apps/shell/.env.local` if working on observability.
- [ ] Read `docs/methodology/framework-decision-daci.md` if participating in tech decisions.

## Month 1

- [ ] Own an area of the codebase (one package, one feature).
- [ ] Author at least one ADR for a decision you drive.
- [ ] Complete a rotation as primary reviewer.

## Escalation

Blocked more than a day on setup or a decision: ask in the team channel or open a discussion issue. Silence is not a strategy.
