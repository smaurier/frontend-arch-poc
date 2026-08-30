# FreshnessTimestamp

Displays a data timestamp with visible staleness thresholds. The signature component of this design system.

## Import

```ts
import { FreshnessTimestamp } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<script setup lang="ts">
const ping = Date.now();
</script>

<template>
  <FreshnessTimestamp :timestamp="ping" />
</template>
```

## Provide a shared `now` for centralized ticking

When rendering many timestamps in the same view, share one ticker via [useFreshnessTicker](https://github.com/smaurier/frontend-arch-poc/blob/main/packages/composables/src/useFreshnessTicker.ts) to avoid N concurrent intervals:

```vue
<script setup lang="ts">
import { useFreshnessTicker } from '@frontend-arch-poc/composables';
const { now } = useFreshnessTicker(1000);
</script>

<template>
  <FreshnessTimestamp v-for="row in rows" :key="row.id" :timestamp="row.lastPing" :now="now" />
</template>
```

## Freshness levels

| Level     | Threshold                               | Visual                           |
| --------- | --------------------------------------- | -------------------------------- |
| `fresh`   | age < `staleThreshold` (10s default)    | `status-ok` color                |
| `stale`   | between thresholds                      | `status-warning` color           |
| `expired` | age >= `expiredThreshold` (30s default) | `status-critical`, bolder weight |

## API

| Prop               | Type     | Default         | Description                            |
| ------------------ | -------- | --------------- | -------------------------------------- |
| `timestamp`        | `number` | required        | Unix ms of the last known update       |
| `now`              | `number` | internal ticker | Override `now` (tests, shared tickers) |
| `staleThreshold`   | `number` | `10_000`        | Age above which becomes `stale`        |
| `expiredThreshold` | `number` | `30_000`        | Age above which becomes `expired`      |

## Accessibility

- Renders a `<time>` element with `datetime` ISO attribute for machine readability.
- `aria-label` describes the state ("expired data, 45 seconds ago").
- `data-freshness` attribute available for styling hooks.
