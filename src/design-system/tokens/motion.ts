export const motionTokens = {
  duration: {
    fast: "var(--duration-fast)",
    normal: "var(--duration-normal)",
    slow: "var(--duration-slow)",
  },
  easing: {
    standard: "var(--ease-standard)",
    emphasized: "var(--ease-emphasized)",
    entrance: "var(--ease-entrance)",
    exit: "var(--ease-exit)",
  },
} as const;

/** Framer Motion / JS-friendly values (seconds + cubic-bezier arrays). */
export const motionJs = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    standard: [0.25, 0.1, 0.25, 1] as const,
    emphasized: [0.2, 0, 0, 1] as const,
    entrance: [0, 0, 0.2, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
  },
} as const;
