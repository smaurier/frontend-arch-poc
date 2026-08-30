# Getting started

## Install

The design system lives in this monorepo. To consume it in a new app, add workspace references:

```json
{
  "dependencies": {
    "@frontend-arch-poc/ui": "workspace:*",
    "@frontend-arch-poc/tokens": "workspace:*",
    "@frontend-arch-poc/composables": "workspace:*",
    "vue": "^3.5.13"
  }
}
```

Then run `pnpm install`.

## Bootstrap in a Vue 3 app

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');
```

The tokens are exposed via CSS custom properties. Import them in your `style.css`:

```css
@import 'tailwindcss';

@theme {
  --color-bg-canvas: oklch(98% 0.005 260);
  /* ...see the Tokens reference for the full list */
}
```

## Use a component

```vue
<script setup lang="ts">
import { Button, Badge } from '@frontend-arch-poc/ui';
</script>

<template>
  <div class="p-md">
    <Badge status="ok" label="Online" />
    <Button variant="primary">Save</Button>
  </div>
</template>
```

## What next

- Read the [Tokens reference](/tokens) for the full set of design tokens.
- Read [Theming](/theming) to understand dark mode and multi-tenant styling.
- Browse [Components](/components/) for API details of every component.
