/**
 * Lucide React icon sizing guidelines for AZPPS.
 * Prefer Lucide icons; size via these tokens for consistency.
 */
export const iconSizeTokens = {
  xs: "var(--icon-xs)",
  sm: "var(--icon-sm)",
  md: "var(--icon-md)",
  lg: "var(--icon-lg)",
  xl: "var(--icon-xl)",
} as const;

/** Tailwind-friendly class map for Lucide icons. */
export const iconSizeClasses = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const;

export type IconSize = keyof typeof iconSizeTokens;

export const iconGuidelines = {
  library: "lucide-react",
  strokeWidth: 1.75,
  defaultSize: "sm" as IconSize,
  accessibility:
    "Decorative icons should set aria-hidden. Interactive icons need an accessible name.",
} as const;
