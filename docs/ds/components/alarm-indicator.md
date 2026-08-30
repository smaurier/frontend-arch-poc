# AlarmIndicator

An attention-grabbing alert composed of severity styling and optional freshness.

## Import

```ts
import { AlarmIndicator } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<template>
  <AlarmIndicator severity="critical" label="Ping lost" />
</template>
```

## With freshness

Show how long the alarm has been active:

```vue
<template>
  <AlarmIndicator severity="critical" label="Ping lost" :since="alarmStartedAt" :now="now" />
</template>
```

## API

| Prop       | Type                      | Required | Description                                        |
| ---------- | ------------------------- | -------- | -------------------------------------------------- |
| `severity` | `'warning' \| 'critical'` | yes      | Level                                              |
| `label`    | `string`                  | yes      | User-facing text                                   |
| `since`    | `number`                  | no       | Unix ms when the alarm started                     |
| `now`      | `number`                  | no       | Override `now` for the embedded FreshnessTimestamp |

## Accessibility

- `role="alert"` (interrupts screen readers). Use only for real critical events.
- For non-urgent statuses, use `Badge` instead.
