# 0014 · Deployment multi-environment and rollback

**Date:** 2026-08-30
**Status:** accepted

## Context

The app deploys to Netlify. V3b formalizes the multi-environment story: preview per PR, production on `main`, and a documented rollback path for both fast recovery and auditable reversion.

## Decision

- **Preview**: automatic on every PR via Netlify Deploy Previews. Serves as the staging environment for v0.
- **Production**: `main` branch, canonical Netlify site URL.
- **Branch deploy**: available as fallback for uncommon workflows.
- **No dedicated long-lived staging site v0**: Deploy Previews cover the review need at zero maintenance cost.
- **Env vars per context**: managed in `netlify.toml` `[context.*]` blocks. `VITE_APP_VERSION` differs per context. Feature flags stay off in code and are toggled per context in the Netlify UI.
- **Rollback fast path**: Netlify UI "Publish deploy" on any past deploy. Under 10 seconds.
- **Rollback auditable path**: `git revert` + push. Regenerates a clean deploy with git history showing the revert.

## Consequences

- Positive: zero cost staging via Deploy Previews.
- Positive: two rollback paths matching urgency vs auditability.
- Positive: per-context env vars keep secrets out of the repo.
- Negative: Deploy Previews are ephemeral, so no persistent staging URL to bookmark.
- Follow-up: add a dedicated `staging` site if the team scales past a few contributors or QA needs a stable URL.

## Alternatives considered

- **Persistent staging site**: heavier. Justified only when team scale demands it.
- **Blue/green with two prod sites and a load balancer**: overkill for a static shell.
- **Feature flags managed by a SaaS (LaunchDarkly, ConfigCat)**: valid future direction. `netlify.toml` env vars suffice v0.

## References

- Netlify Deploy Previews: https://docs.netlify.com/site-deploys/deploy-previews/
- Netlify contexts: https://docs.netlify.com/build/configure-builds/file-based-configuration/#deploy-contexts
- Related: ADR-0005 (CI/CD), ADR-0012 (security).

## 2026-08-30 addendum · branching strategy patterns

Documented four industry patterns (GitHub Flow, Trunk-based, GitLab Flow, Git Flow) with fit criteria, plus concrete setup instructions to switch from GitHub Flow (current) to GitLab Flow (staging + prod) if triggers fire. Details in `docs/methodology/deployment-and-rollback.md` sections "Branching strategy comparison" and "Switching to GitLab Flow".

Rationale for the current choice restated: at present team size, Deploy Previews match every guarantee a permanent staging site would provide, at zero maintenance cost. Do not switch on aesthetics.
