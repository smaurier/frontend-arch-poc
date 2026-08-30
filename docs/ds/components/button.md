# Button

An accessible primary or secondary action button.

## Import

```ts
import { Button } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<template>
  <Button @click="handleClick">Save</Button>
</template>
```

## Variants

```vue
<template>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
</template>
```

## Disabled state

```vue
<template>
  <Button :disabled="isSubmitting">Submit</Button>
</template>
```

## Icon-only button

Provide an accessible name via `ariaLabel`:

```vue
<template>
  <Button aria-label="Close dialog">X</Button>
</template>
```

## API

| Prop        | Type                       | Default     | Description                         |
| ----------- | -------------------------- | ----------- | ----------------------------------- |
| `variant`   | `'primary' \| 'secondary'` | `'primary'` | Visual variant                      |
| `disabled`  | `boolean`                  | `false`     | Disables the button                 |
| `ariaLabel` | `string`                   | undefined   | Accessible name for icon-only usage |

| Event   | Payload | When                     |
| ------- | ------- | ------------------------ |
| `click` | none    | On click if not disabled |

## Accessibility

- Renders a native `<button>` element.
- When `disabled`, does not emit `click`.
- If the slot content is only an icon or symbol, always pass `ariaLabel`.
