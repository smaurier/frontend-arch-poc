# Deployment and rollback

## Environments

Three deploy contexts exist for the shell site (and the storybook site, and the ds docs site):

| Context       | Trigger                   | URL pattern                               | Purpose                                                            |
| ------------- | ------------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| Preview       | Every pull request        | `deploy-preview-<pr>--<site>.netlify.app` | Reviewer sees the change live before merge. Unique URL per commit. |
| Production    | Push to `main`            | `<site>.netlify.app` (canonical)          | User-facing.                                                       |
| Branch deploy | Push to any linked branch | `<branch>--<site>.netlify.app`            | Rare v0. Kept as escape hatch.                                     |

Staging as a separate long-lived environment is not used. Deploy Previews give the same guarantee (fresh per commit, isolated URL) without a permanent staging site to maintain.

## Environment variables per context

Configured in `netlify.toml`:

- `VITE_APP_VERSION` differs per context (`prod`, `preview`, `branch`).
- Feature flags (`VITE_AUTH_ENABLED`, `VITE_SSE_ENABLED`, `VITE_SENTRY_DSN`) stay off in the file. They can be enabled per context via the Netlify UI without a code change.

## Deploy flow

1. Open a PR. Netlify auto-builds the preview.
2. Reviewer opens the preview URL. Verifies behavior end to end.
3. Merge to `main`. Netlify auto-deploys production.
4. Optional: sanity-check the production URL.

CI must be green before merge. GitHub branch protection can enforce it.

## Rollback

Two paths, choose based on urgency.

### Fast rollback (10 seconds)

Use when a bad deploy is on production and needs immediate rollback while the fix is drafted.

1. Netlify Dashboard > Site > Deploys.
2. Find a known-good past deploy.
3. Click "Publish deploy".
4. The old deploy is now live. No git history change.

Use this to stop the bleeding. Then fix the cause and push a clean commit.

### Auditable rollback (2 minutes)

Use when the rollback should stay in git history.

```bash
git revert <bad-commit-sha>
git push
```

Netlify builds and deploys the revert. History shows the revert commit and the reason.

## Pre-deploy checklist

- CI green (all 10 jobs).
- Preview URL manually verified.
- Feature flags in the intended state for the target environment.
- Sentry DSN set (in prod) if error tracking matters for this release.

## Post-deploy checklist

- Open the production URL. Verify home renders.
- Check Sentry dashboard (if configured) for a spike in errors within 5 minutes.
- Check Lighthouse CI trend if the change touched perf-critical paths.

## Branching strategy comparison

Four industry patterns exist. This project uses GitHub Flow v0. Switch triggers documented below.

| Pattern                      | Structure                                                                                             | Fits                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **GitHub Flow**              | `main` = prod. Short-lived `feat/*`, `fix/*`, `chore/*` branches. PR = Deploy Preview. Merge = prod.  | Most SaaS teams 2026. Simple mental model. Deploy Previews replace staging.   |
| **Trunk-based**              | `main` = prod. Direct commits or branches < 24 h. Feature flags gate incomplete work.                 | Very large scale (Google, Meta). Requires mature CI plus feature flag infra.  |
| **GitLab Flow**              | `main` + long-lived environment branches (`staging`, `pre-production`, `production`). Merge cascades. | Corporate compliance, non-dev QA, PCI/SOX audits. Needs a stable staging URL. |
| **Git Flow** (Driessen 2010) | `main` + `develop` + `release/*` + `hotfix/*`.                                                        | Legacy. Mostly abandoned in 2026 outside versioned npm libraries.             |

## Current choice: GitHub Flow

- `main` = production.
- Branch prefixes: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`.
- Every PR triggers a Deploy Preview on all three Netlify sites (shell, storybook, DS docs).
- Deploy Preview serves as pre-prod: fresh per commit, unique URL, no maintenance.
- Merge to `main` triggers production deploy automatically.
- Rollback paths documented above.

Rationale: at the current team size, a permanent staging site would add maintenance cost without matching the guarantee already provided by Deploy Previews (fresh, isolated, per-commit).

## Switching to GitLab Flow (staging + prod)

Trigger this switch when at least one of the following becomes true:

- Non-dev QA team needs a stable URL to run scripted acceptance tests.
- Compliance (PCI, SOX, ISO 27001) requires an audited pre-production environment separate from CI-driven ephemeral URLs.
- Multiple parallel features need integration testing on a shared branch before hitting prod.
- Team scales past a handful of contributors and coordinating Deploy Preview URLs becomes noisy.

### Concrete setup (when the trigger fires)

1. Create a protected `staging` branch from `main`:
   ```bash
   git switch -c staging
   git push -u origin staging
   gh api -X PUT repos/smaurier/frontend-arch-poc/branches/staging/protection --input branch-protection-staging.json
   ```
2. Create a dedicated Netlify site linked to `staging`:
   ```bash
   netlify api createSite --data '{"name":"frontend-arch-poc-shell-staging"}'
   # then set the repo config with repo_branch: "staging"
   netlify api updateSite --data '{"site_id":"<staging-site-id>","body":{"repo":{"provider":"github","repo":"smaurier/frontend-arch-poc","repo_path":"smaurier/frontend-arch-poc","repo_branch":"staging","installation_id":<id>,"cmd":"pnpm install --frozen-lockfile && pnpm --filter @frontend-arch-poc/shell build","dir":"apps/shell/dist"}}}'
   ```
3. Add a `[context.branch-deploy.environment]` block per environment in `netlify.toml`. Staging gets `VITE_APP_VERSION=staging`. Production keeps `VITE_APP_VERSION=prod`.
4. Promotion flow becomes:
   - `feat/*` PR into `staging`. Merge deploys pre-prod.
   - QA validates on `frontend-arch-poc-shell-staging.netlify.app`.
   - PR `staging` into `main`. Merge deploys production.
   - Hotfix: PR directly into `main`, then merge back into `staging` to keep branches aligned.
5. Update the branching section above to reflect the new workflow.

### Do not adopt prematurely

Two sites to keep in sync (shell + shell-staging), two sets of env variables, one extra branch to maintain, plus the discipline to keep `staging` and `main` from drifting. All that cost pays off only when the switch triggers actually apply. Otherwise it is ceremony without benefit.

## Legacy patterns to avoid

- **Manual FTP or rsync deploys**: no rollback story, no immutable deploys. Rejected.
- **One big `develop` branch that never merges cleanly to `main`**: symptom of Git Flow that has drifted. Adopt trunk-based instead.
- **`main` = latest CI green and nothing else**: unpredictable. Deploys should be intentional, not incidental.

## Summary

Today: GitHub Flow with Deploy Previews as pre-prod. Documented, low-maintenance, sufficient at current scale.

Tomorrow (if the switch triggers fire): GitLab Flow with a permanent `staging` branch and site, promotion flow `feat/*` → `staging` → `main`. The setup instructions above are the executable plan.

Do not switch on aesthetics. Switch when a concrete need justifies the maintenance cost.
