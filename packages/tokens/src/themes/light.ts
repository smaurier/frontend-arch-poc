export const lightTheme = {
  bgCanvas: 'oklch(98% 0.005 260)',
  bgSurface: 'oklch(96% 0.008 260)',
  textPrimary: 'oklch(20% 0.02 260)',
  textMuted: 'oklch(50% 0.02 260)',
  border: 'oklch(85% 0.01 260)',
} as const;

export type ThemeColorToken = keyof typeof lightTheme;
