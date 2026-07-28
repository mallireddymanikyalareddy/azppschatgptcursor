export const spacingTokens = {
  none: "0",
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
  "2xl": "var(--space-2xl)",
  "3xl": "var(--space-3xl)",
  "4xl": "var(--space-4xl)",
} as const;

export type SpacingToken = keyof typeof spacingTokens;
