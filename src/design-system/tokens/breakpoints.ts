export const breakpointTokens = {
  mobile: "640px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  largeDesktop: "1536px",
} as const;

export type BreakpointToken = keyof typeof breakpointTokens;

export const mediaQueries = {
  mobile: `(min-width: ${breakpointTokens.mobile})`,
  tablet: `(min-width: ${breakpointTokens.tablet})`,
  laptop: `(min-width: ${breakpointTokens.laptop})`,
  desktop: `(min-width: ${breakpointTokens.desktop})`,
  largeDesktop: `(min-width: ${breakpointTokens.largeDesktop})`,
} as const;
