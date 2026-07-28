export const typographyTokens = {
  fontFamily: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  display: {
    fontSize: "var(--text-display)",
    lineHeight: "var(--leading-display)",
    fontWeight: "var(--font-weight-bold)",
    letterSpacing: "var(--tracking-display)",
  },
  h1: {
    fontSize: "var(--text-h1)",
    lineHeight: "var(--leading-h1)",
    fontWeight: "var(--font-weight-bold)",
    letterSpacing: "var(--tracking-tight)",
  },
  h2: {
    fontSize: "var(--text-h2)",
    lineHeight: "var(--leading-h2)",
    fontWeight: "var(--font-weight-semibold)",
    letterSpacing: "var(--tracking-tight)",
  },
  h3: {
    fontSize: "var(--text-h3)",
    lineHeight: "var(--leading-h3)",
    fontWeight: "var(--font-weight-semibold)",
    letterSpacing: "var(--tracking-normal)",
  },
  h4: {
    fontSize: "var(--text-h4)",
    lineHeight: "var(--leading-h4)",
    fontWeight: "var(--font-weight-semibold)",
    letterSpacing: "var(--tracking-normal)",
  },
  h5: {
    fontSize: "var(--text-h5)",
    lineHeight: "var(--leading-h5)",
    fontWeight: "var(--font-weight-medium)",
    letterSpacing: "var(--tracking-normal)",
  },
  h6: {
    fontSize: "var(--text-h6)",
    lineHeight: "var(--leading-h6)",
    fontWeight: "var(--font-weight-medium)",
    letterSpacing: "var(--tracking-normal)",
  },
  bodyLarge: {
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--leading-body-lg)",
    fontWeight: "var(--font-weight-normal)",
    letterSpacing: "var(--tracking-normal)",
  },
  body: {
    fontSize: "var(--text-body)",
    lineHeight: "var(--leading-body)",
    fontWeight: "var(--font-weight-normal)",
    letterSpacing: "var(--tracking-normal)",
  },
  bodySmall: {
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--leading-body-sm)",
    fontWeight: "var(--font-weight-normal)",
    letterSpacing: "var(--tracking-normal)",
  },
  caption: {
    fontSize: "var(--text-caption)",
    lineHeight: "var(--leading-caption)",
    fontWeight: "var(--font-weight-normal)",
    letterSpacing: "var(--tracking-wide)",
  },
  label: {
    fontSize: "var(--text-label)",
    lineHeight: "var(--leading-label)",
    fontWeight: "var(--font-weight-medium)",
    letterSpacing: "var(--tracking-normal)",
  },
  button: {
    fontSize: "var(--text-button)",
    lineHeight: "var(--leading-button)",
    fontWeight: "var(--font-weight-medium)",
    letterSpacing: "var(--tracking-normal)",
  },
  code: {
    fontSize: "var(--text-code)",
    lineHeight: "var(--leading-code)",
    fontWeight: "var(--font-weight-normal)",
    letterSpacing: "var(--tracking-normal)",
    fontFamily: "var(--font-mono)",
  },
} as const;

export type TypographyRole = keyof Omit<typeof typographyTokens, "fontFamily">;
