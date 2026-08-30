# Design tokens

Tokens live in `packages/tokens/` and are exposed both as TypeScript constants and CSS custom properties.

## Naming philosophy

Tokens are named by **intent**, not by value. A `status-critical` color is red today. Tomorrow, in a different tenant palette, it may be orange. The intent (critical) stays. The value moves. Consumer code never needs to change.

## Color tokens

### Background

| Token        | Light                  | Dark                  |
| ------------ | ---------------------- | --------------------- |
| `bg-canvas`  | `oklch(98% 0.005 260)` | `oklch(15% 0.02 260)` |
| `bg-surface` | `oklch(96% 0.008 260)` | `oklch(22% 0.02 260)` |

### Text

| Token          | Light                 | Dark                   |
| -------------- | --------------------- | ---------------------- |
| `text-primary` | `oklch(20% 0.02 260)` | `oklch(95% 0.005 260)` |
| `text-muted`   | `oklch(50% 0.02 260)` | `oklch(70% 0.02 260)`  |

### Border

| Token    | Light                 | Dark                  |
| -------- | --------------------- | --------------------- |
| `border` | `oklch(85% 0.01 260)` | `oklch(35% 0.01 260)` |

### Status (theme-invariant)

| Token             | Value                 | Semantic use     |
| ----------------- | --------------------- | ---------------- |
| `status-ok`       | `oklch(65% 0.15 145)` | Nominal state    |
| `status-warning`  | `oklch(75% 0.15 85)`  | Attention        |
| `status-critical` | `oklch(55% 0.22 25)`  | Alarm or failure |

## Spacing tokens

| Token        | Value  |
| ------------ | ------ |
| `spacing-xs` | `4px`  |
| `spacing-sm` | `8px`  |
| `spacing-md` | `16px` |
| `spacing-lg` | `24px` |
| `spacing-xl` | `32px` |

## Radius tokens

| Token         | Value  |
| ------------- | ------ |
| `radius-none` | `0`    |
| `radius-sm`   | `4px`  |
| `radius-md`   | `8px`  |
| `radius-lg`   | `12px` |

## Typography

| Token              | Value                                      |
| ------------------ | ------------------------------------------ |
| `font-family-base` | `system-ui, -apple-system, sans-serif`     |
| `font-family-mono` | `ui-monospace, "Cascadia Code", monospace` |
| `font-size-sm`     | `0.875rem`                                 |
| `font-size-md`     | `1rem`                                     |
| `font-size-lg`     | `1.25rem`                                  |

## Duration tokens

| Token             | Value       | Purpose                              |
| ----------------- | ----------- | ------------------------------------ |
| `durations.fresh` | `10_000` ms | Timestamp less than 10s old is fresh |
| `durations.stale` | `30_000` ms | 10-30s stale, over 30s expired       |

## Why OKLCH

- Perceptually uniform: lightness values map to the eye, not to RGB math.
- Predictable contrast: a token at `65%` L reliably has similar perceived brightness as another token at `65%` L.
- Contrast checks pass by construction when you follow the L-value pairs.

## Where these come from

Source of truth: `packages/tokens/src/tokens.ts` and `packages/tokens/src/themes/{light,dark}.ts`.

Style Dictionary is on the roadmap (V2) when the token count grows past 50 or a second product joins.
