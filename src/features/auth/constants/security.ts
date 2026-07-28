export const PASSWORD_POLICY = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
  specialCharset: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

export const passwordPolicyDescription = [
  `At least ${PASSWORD_POLICY.minLength} characters`,
  "One uppercase letter",
  "One lowercase letter",
  "One number",
  "One special character",
].join(", ");

/**
 * Security architecture placeholders for future provider integration.
 * No real crypto/network enforcement is applied in this foundation layer.
 */
export const SECURITY_CONFIG = {
  csrf: {
    enabled: true,
    headerName: "x-csrf-token",
    cookieName: "azpps_csrf",
  },
  rateLimit: {
    login: { windowMs: 15 * 60 * 1000, maxAttempts: 5 },
    forgotPassword: { windowMs: 60 * 60 * 1000, maxAttempts: 3 },
    register: { windowMs: 60 * 60 * 1000, maxAttempts: 5 },
  },
  cookies: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
  session: {
    accessTokenTtlSeconds: 15 * 60,
    refreshTokenTtlSeconds: 7 * 24 * 60 * 60,
    idleTimeoutSeconds: 30 * 60,
    absoluteTimeoutSeconds: 12 * 60 * 60,
  },
  rememberMe: {
    enabled: true,
    ttlSeconds: 30 * 24 * 60 * 60,
  },
  tokenRefresh: {
    enabled: true,
    refreshSkewSeconds: 60,
  },
} as const;
