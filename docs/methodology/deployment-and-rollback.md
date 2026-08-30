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

## When to add a permanent staging site

- Team size grows past a few contributors and Deploy Preview URLs become hard to communicate.
- A dedicated QA workflow requires a stable URL for automation.
- Any of these apply: switch to `staging.<domain>` on a `staging` branch, with the same netlify.toml context pattern.

Until then, Deploy Previews are the staging environment.
