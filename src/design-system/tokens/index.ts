import { colorTokens } from "./colors";
import { typographyTokens } from "./typography";
import { spacingTokens } from "./spacing";
import { radiusTokens } from "./radius";
import { shadowTokens } from "./shadows";
import { motionTokens } from "./motion";
import { zIndexTokens } from "./z-index";
import { breakpointTokens } from "./breakpoints";
import { iconSizeTokens } from "./icons";

export { colorTokens } from "./colors";
export type { ColorToken } from "./colors";
export { typographyTokens } from "./typography";
export type { TypographyRole } from "./typography";
export { spacingTokens } from "./spacing";
export type { SpacingToken } from "./spacing";
export { radiusTokens } from "./radius";
export type { RadiusToken } from "./radius";
export { shadowTokens } from "./shadows";
export type { ShadowToken } from "./shadows";
export { motionTokens, motionJs } from "./motion";
export { zIndexTokens } from "./z-index";
export type { ZIndexToken } from "./z-index";
export { breakpointTokens, mediaQueries } from "./breakpoints";
export type { BreakpointToken } from "./breakpoints";
export { iconSizeTokens, iconSizeClasses, iconGuidelines } from "./icons";
export type { IconSize } from "./icons";

export const designTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadows: shadowTokens,
  motion: motionTokens,
  zIndex: zIndexTokens,
  breakpoints: breakpointTokens,
  icons: iconSizeTokens,
} as const;

export type DesignTokens = typeof designTokens;
