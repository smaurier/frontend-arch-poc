# 0013 · CI/CD portability

**Date:** 2026-08-30
**Status:** accepted

## Context

The primary CI is GitHub Actions. Teams that adopt this architecture may run on GitLab CI or Jenkins. To avoid rewriting the pipeline from scratch, we keep reference pipelines for both alternatives in the repo, and document the mapping.

## Decision

- **Primary**: GitHub Actions (`.github/workflows/ci.yml`). Actively executed.
- **Mirrors**: `.gitlab-ci.yml` and `Jenkinsfile` at repo root. Kept as reference. Not enforced to run.
- **Principles**: pipeline logic lives in `pnpm turbo run` and `pnpm --filter` scripts. CI YAML only wraps them. No CI-specific SDKs in the code.
- **Portability doc**: `docs/methodology/ci-portability.md` explains the mapping and divergences.

## Consequences

- Positive: adopting teams port to their CI in hours, not days.
- Positive: no vendor lock at the pipeline layer.
- Negative: mirrors can drift. Reviewer discipline needed on any change to `.github/workflows/ci.yml`.
- Follow-up: add a `pipelines-parity` doc when the primary changes structurally, so mirrors stay updated.

## Alternatives considered

- **Only GitHub Actions, no mirrors**: rejected. Portability is a promise, not an incantation.
- **CI-agnostic orchestrator (Dagger, Earthly)**: interesting for future. Rejected v0 because it adds a dependency without proven need.

## References

- Turborepo: https://turborepo.com
- GitLab CI docs: https://docs.gitlab.com/ci/
- Jenkins declarative pipeline: https://www.jenkins.io/doc/book/pipeline/syntax/
- Related: ADR-0005 (CI/CD), roadmap V3b item 7.
