# Theming

## Light and dark

The app reads `document.documentElement.dataset.theme` (`light` or `dark`). CSS custom properties are overridden under `[data-theme="dark"]`.

Toggle programmatically:

```ts
import { useTheme } from '@frontend-arch-poc/composables';
const { theme, toggle } = useTheme();
```

Anti-FOUC: inline script in `index.html` reads `localStorage.theme` before the first paint so a dark-mode reload does not flash white.

## Multi-tenant theming

Semantic tokens (`status-critical`) make multi-tenant themes trivial: swap a set of custom-property values. No component code changes.

Example tenant switch:

```css
[data-tenant='clientA'] {
  --color-status-critical: oklch(60% 0.24 30); /* slightly different red */
  --color-bg-canvas: oklch(97% 0.006 220);
}
```

Wrap your app in `<html data-tenant="clientA">` (or via a wrapping `<div>` if the whole app is not tenant-specific) and the entire design applies.

## Status colors do not flip

Status colors (`ok`, `warning`, `critical`) keep their meaning across themes. A critical alarm is red in light mode and in dark mode. This is intentional: semantic weight beats aesthetic consistency for safety-critical UIs.
