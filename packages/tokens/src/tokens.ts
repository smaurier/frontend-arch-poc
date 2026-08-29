/**
 * Semantic design tokens.
 *
 * Named by INTENT (color-status-critical), not by VALUE (red-500).
 * OKLCH color space for perceptual luminosity → predictable contrasts.
 */

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;

export const radius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
} as const;

export const typography = {
  fontFamilyBase: 'system-ui, -apple-system, sans-serif',
  fontFamilyMono: 'ui-monospace, "Cascadia Code", monospace',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.25rem',
} as const;

export const status = {
  ok: 'oklch(65% 0.15 145)',       // green, perceptual
  warning: 'oklch(75% 0.15 85)',   // amber
  critical: 'oklch(55% 0.22 25)',  // red
} as const;

export const durations = {
  fresh: 10_000,   // < 10s = fresh
  stale: 30_000,   // 10-30s = stale (warning)
  // > 30s = critical (ping lost)
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type StatusToken = keyof typeof status;
