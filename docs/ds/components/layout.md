# Layout

Responsive application shell with header, nav, and main slots.

## Import

```ts
import { Layout } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<template>
  <Layout>
    <template #header>
      <h1>My app</h1>
    </template>
    <template #nav>
      <ul>
        <li>Home</li>
        <li>Settings</li>
      </ul>
    </template>
    <p>Main content goes here</p>
  </Layout>
</template>
```

## Responsive behavior

- Desktop (>= 768px): sidebar always visible.
- Mobile (< 768px): sidebar collapses behind a burger button. Tap the backdrop or press ESC to close.

## Accessibility

- Uses native landmark elements: `<header>`, `<nav>`, `<main>`.
- Burger button exposes `aria-expanded` and `aria-controls`.
- Sidebar `<nav>` is aria-hidden when closed on mobile.
