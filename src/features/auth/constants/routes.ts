export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  emailSent: "/email-sent",
  sessionExpired: "/session-expired",
  accessDenied: "/access-denied",
} as const;

export const AUTH_COOKIE = {
  session: "azpps_session",
  csrf: "azpps_csrf",
  remember: "azpps_remember",
} as const;

export const AUTH_STORAGE_KEYS = {
  session: "azpps.auth.session",
  intent: "azpps.auth.intent",
} as const;

/** Guest-only routes: redirect authenticated users away. */
export const GUEST_ROUTES = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.register,
  AUTH_ROUTES.forgotPassword,
  AUTH_ROUTES.resetPassword,
] as const;

/** Always public (auth + marketing). */
export const PUBLIC_AUTH_ROUTES = [
  AUTH_ROUTES.verifyEmail,
  AUTH_ROUTES.emailSent,
  AUTH_ROUTES.sessionExpired,
  AUTH_ROUTES.accessDenied,
] as const;

/** Future protected app modules (middleware-ready). */
export const PROTECTED_ROUTE_PREFIXES = [
  "/app",
  "/calculators",
  "/ai-factory",
  "/content",
  "/seo",
  "/analytics",
  "/admin",
] as const;
