# frontend-arch-poc

[![CI](https://github.com/smaurier/frontend-arch-poc/actions/workflows/ci.yml/badge.svg)](https://github.com/smaurier/frontend-arch-poc/actions)
[![Storybook](https://img.shields.io/badge/storybook-live-ff4785)](https://frontend-arch-poc-storybook.netlify.app)
[![Demo](https://img.shields.io/badge/demo-live-00c7b7)](https://frontend-arch-poc-shell.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Reference architecture for real-time fleet tracking dashboards.

## About this repository

Primary artifacts:

- **ADRs** in `docs/adr/`. Each architectural decision with alternatives considered.
- **Design system** with semantic tokens, tested, live in Storybook.
- **App-shell** demonstrating the architecture in action with mocked realtime data.

**On implementation**: components are AI-assisted for velocity. Every architectural decision, tradeoff, and pattern is human-encoded and defended in `docs/adr/`. This project demonstrates **architecture and methodology**, not line-by-line craftsmanship.

## Quick links

- Storybook: https://frontend-arch-poc-storybook.netlify.app
- Demo: https://frontend-arch-poc-shell.netlify.app
- ADRs: [`docs/adr/`](docs/adr/)
- Roadmap: [`docs/roadmap.md`](docs/roadmap.md)
- Contributing: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Stack

- Node 22 LTS, pnpm 10, TypeScript 5 strict
- Vue 3.5 (Composition API) + Vite 6
- Tailwind 4 with `@theme` directive
- Semantic tokens (OKLCH) in `packages/tokens`
- Vitest + Vue Test Utils + Playwright + Storybook 8
- ESLint 9 flat config + Prettier + Husky + lint-staged
- Conventional Commits + commitlint
- GitHub Actions (DAG parallelized CI) + Netlify auto-deploy

## Getting started

```bash
pnpm install
pnpm turbo run test
pnpm dev            # http://localhost:5173
pnpm storybook      # http://localhost:6006
```

## Structure

```
apps/shell/         # Demo application (Vue 3 + Vite)
packages/ui/        # Design system components
packages/tokens/    # Semantic design tokens
packages/config/    # Shared ESLint, Prettier, Vitest, TS configs
docs/adr/           # Architecture Decision Records
docs/roadmap.md     # 16-item roadmap (V1 to V3b)
```

## Principles

See [`CLAUDE.md`](CLAUDE.md) for founding principles (non-negotiable rules).

## License

MIT © 2026 Sylvain Maurier
