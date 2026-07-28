/**
 * Semantic color tokens for AZPPS.
 * CSS variables are the source of truth; these constants document the API.
 */
export const colorTokens = {
  background: "var(--background)",
  foreground: "var(--foreground)",
  surface: "var(--surface)",
  surfaceForeground: "var(--surface-foreground)",
  primary: "var(--primary)",
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)",
  secondaryForeground: "var(--secondary-foreground)",
  accent: "var(--accent)",
  accentForeground: "var(--accent-foreground)",
  success: "var(--success)",
  successForeground: "var(--success-foreground)",
  warning: "var(--warning)",
  warningForeground: "var(--warning-foreground)",
  error: "var(--destructive)",
  errorForeground: "var(--destructive-foreground)",
  info: "var(--info)",
  infoForeground: "var(--info-foreground)",
  muted: "var(--muted)",
  mutedForeground: "var(--muted-foreground)",
  border: "var(--border)",
  input: "var(--input)",
  ring: "var(--ring)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)",
  popoverForeground: "var(--popover-foreground)",
  neutral: {
    50: "var(--neutral-50)",
    100: "var(--neutral-100)",
    200: "var(--neutral-200)",
    300: "var(--neutral-300)",
    400: "var(--neutral-400)",
    500: "var(--neutral-500)",
    600: "var(--neutral-600)",
    700: "var(--neutral-700)",
    800: "var(--neutral-800)",
    900: "var(--neutral-900)",
    950: "var(--neutral-950)",
  },
} as const;

export type ColorToken = keyof typeof colorTokens;
