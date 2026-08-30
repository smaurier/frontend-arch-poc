# Badge

Compact status indicator with semantic color mapping.

## Import

```ts
import { Badge } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<template>
  <Badge status="ok" label="Online" />
</template>
```

## Variants

```vue
<template>
  <Badge status="ok" label="Driving" />
  <Badge status="warning" label="Idle" />
  <Badge status="critical" label="Stopped" />
  <Badge status="neutral" label="Unknown" />
</template>
```

## API

| Prop     | Type                                           | Required | Description      |
| -------- | ---------------------------------------------- | -------- | ---------------- |
| `status` | `'ok' \| 'warning' \| 'critical' \| 'neutral'` | yes      | Semantic status  |
| `label`  | `string`                                       | yes      | User-facing text |

## Accessibility

- `role="status"` for polite screen-reader announcement (not `role="alert"`, which interrupts).
- `aria-label` combines status and label so screen readers hear both.
