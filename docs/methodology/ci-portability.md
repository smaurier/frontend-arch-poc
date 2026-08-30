# CI portability

This project runs on GitHub Actions today. It is architected so the pipeline is portable to GitLab CI or Jenkins with minimal work. Reference pipelines live at the repo root:

- `.github/workflows/ci.yml` (primary, actively executed)
- `.gitlab-ci.yml` (reference mirror)
- `Jenkinsfile` (reference mirror)

## Portability principles

1. **Runtime is standardized**: Node 22, pnpm 10.28.2, `corepack` activation. Any CI that can boot a container of `node:22` runs the pipeline.
2. **Task orchestration lives in Turborepo**: `pnpm turbo run lint typecheck test build` is the single command. CI is a shell caller.
3. **No CI-specific scripts in the code**: everything a CI job invokes exists as a workspace script (`pnpm --filter @frontend-arch-poc/shell exec ...`).
4. **Environment via env vars**: `CI=true`, `VITE_*` feature flags. No hidden CI SDK dependencies.
5. **Artifacts are files**: `apps/shell/dist/`, `apps/shell/storybook-static/`, `apps/shell/playwright-report/`. All CIs handle files.

## Stage mapping

| Concern      | GitHub Actions              | GitLab CI           | Jenkins                   |
| ------------ | --------------------------- | ------------------- | ------------------------- |
| Install      | job step                    | `install` stage     | `setup` stage             |
| Lint         | parallel job                | `quality` stage     | `parallel { lint }`       |
| Typecheck    | parallel job                | `quality` stage     | `parallel { typecheck }`  |
| Test         | parallel job                | `quality` stage     | `parallel { test }`       |
| Build        | needs [lint,typecheck,test] | `build` stage       | `build` stage             |
| E2E          | needs [build]               | `integration` stage | `parallel { e2e }`        |
| Size limit   | needs [build]               | `integration` stage | `parallel { size-limit }` |
| Lighthouse   | needs [build]               | `integration` stage | `parallel { lighthouse }` |
| Secrets scan | dedicated job               | `security` stage    | `parallel { secrets }`    |
| Deps audit   | dedicated job               | `security` stage    | `parallel { deps }`       |
| OSV scan     | dedicated job               | `security` stage    | `parallel { osv }`        |

## Deployment portability

The GitHub reference does not include deploy jobs. Netlify handles deployment via GitHub integration. When porting to GitLab or Jenkins, add a deploy stage per environment (staging, prod). Prefer platform-native deploy (Netlify auto, Cloudflare Pages, GitHub Pages, etc.) over pipeline-managed rsync.

## Divergences to know

- **Secrets scanning**: GitHub uses `gitleaks-action`. GitLab has built-in Secret Detection. Jenkins expects `gitleaks` installed on the agent.
- **Caching**: each CI has a different cache model. All accept `pnpm-store` and `node_modules` paths.
- **Parallelism model**: GitHub uses `jobs` at top level with `needs:`. GitLab uses `stages` for order plus `needs:` for override. Jenkins uses `parallel { }` inside `stage { }`.

## Choosing a CI

- **Public open source repos**: GitHub Actions. Free tier is generous, native.
- **Enterprise GitLab**: GitLab CI. Native integration, built-in secret detection.
- **Existing Jenkins infrastructure**: Jenkins. Reuse existing agents and secrets.

The pipeline logic (what to run, in what order) stays the same. Only the YAML/Groovy syntax changes.
