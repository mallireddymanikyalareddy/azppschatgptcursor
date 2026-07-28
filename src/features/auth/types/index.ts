export type AuthUserRole =
  "user" | "admin" | "editor" | "viewer" | "ai_operator" | "seo_manager";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  roles: AuthUserRole[];
  createdAt: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
};

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type VerifyEmailPayload = {
  token: string;
};

export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "EXPIRED_SESSION"
  | "EMAIL_NOT_VERIFIED"
  | "TOO_MANY_ATTEMPTS"
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_TOKEN"
  | "WEAK_PASSWORD"
  | "UNKNOWN";

export type AuthError = {
  code: AuthErrorCode;
  message: string;
};

export type AuthResult<T> =
  { success: true; data: T } | { success: false; error: AuthError };

export type AuthStatus =
  "loading" | "authenticated" | "unauthenticated" | "expired";

export type RouteAccess = "public" | "guest" | "protected";
