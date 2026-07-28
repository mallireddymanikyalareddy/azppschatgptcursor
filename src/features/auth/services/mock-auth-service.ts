import { AUTH_ERROR_MESSAGES } from "@/features/auth/constants/errors";
import { SECURITY_CONFIG } from "@/features/auth/constants/security";
import type { AuthService } from "@/features/auth/services/auth-service";
import type {
  AuthErrorCode,
  AuthResult,
  AuthSession,
  AuthUser,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/features/auth/types";

const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: "user_demo_001",
    email: "demo@azpps.com",
    name: "Demo User",
    password: "Password1!",
    emailVerified: true,
    roles: ["user", "editor"],
    createdAt: new Date("2026-01-01").toISOString(),
  },
  {
    id: "user_unverified_001",
    email: "unverified@azpps.com",
    name: "Unverified User",
    password: "Password1!",
    emailVerified: false,
    roles: ["user"],
    createdAt: new Date("2026-01-02").toISOString(),
  },
];

const attemptBuckets = new Map<string, { count: number; resetAt: number }>();

function delay(ms = 650) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function failure(code: AuthErrorCode): AuthResult<never> {
  return {
    success: false,
    error: { code, message: AUTH_ERROR_MESSAGES[code] },
  };
}

function createSession(user: AuthUser, rememberMe = false): AuthSession {
  const ttl = rememberMe
    ? SECURITY_CONFIG.rememberMe.ttlSeconds
    : SECURITY_CONFIG.session.accessTokenTtlSeconds;

  return {
    accessToken: `mock_access_${user.id}_${Date.now()}`,
    refreshToken: `mock_refresh_${user.id}_${Date.now()}`,
    expiresAt: Date.now() + ttl * 1000,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      roles: user.roles,
      createdAt: user.createdAt,
    },
  };
}

function trackAttempt(key: string, maxAttempts: number, windowMs: number) {
  const now = Date.now();
  const bucket = attemptBuckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    attemptBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false };
  }

  bucket.count += 1;
  attemptBuckets.set(key, bucket);
  return { limited: bucket.count > maxAttempts };
}

export const mockAuthService: AuthService = {
  async login(credentials: LoginCredentials) {
    await delay();

    const limit = trackAttempt(
      `login:${credentials.email.toLowerCase()}`,
      SECURITY_CONFIG.rateLimit.login.maxAttempts,
      SECURITY_CONFIG.rateLimit.login.windowMs,
    );

    if (limit.limited) {
      return failure("TOO_MANY_ATTEMPTS");
    }

    if (credentials.email === "network@error.com") {
      return failure("NETWORK_ERROR");
    }

    if (credentials.email === "server@error.com") {
      return failure("SERVER_ERROR");
    }

    const user = MOCK_USERS.find(
      (entry) =>
        entry.email.toLowerCase() === credentials.email.toLowerCase() &&
        entry.password === credentials.password,
    );

    if (!user) {
      return failure("INVALID_CREDENTIALS");
    }

    if (!user.emailVerified) {
      return failure("EMAIL_NOT_VERIFIED");
    }

    return {
      success: true,
      data: createSession(user, credentials.rememberMe),
    };
  },

  async logout() {
    await delay(300);
    return { success: true, data: null };
  },

  async register(payload: RegisterPayload) {
    await delay();

    const limit = trackAttempt(
      `register:${payload.email.toLowerCase()}`,
      SECURITY_CONFIG.rateLimit.register.maxAttempts,
      SECURITY_CONFIG.rateLimit.register.windowMs,
    );

    if (limit.limited) {
      return failure("TOO_MANY_ATTEMPTS");
    }

    const exists = MOCK_USERS.some(
      (entry) => entry.email.toLowerCase() === payload.email.toLowerCase(),
    );

    if (exists) {
      return failure("EMAIL_ALREADY_EXISTS");
    }

    return { success: true, data: { email: payload.email } };
  },

  async refreshSession(refreshToken: string) {
    await delay(400);

    if (!refreshToken.startsWith("mock_refresh_")) {
      return failure("EXPIRED_SESSION");
    }

    const user = MOCK_USERS[0];
    if (!user) {
      return failure("EXPIRED_SESSION");
    }

    return { success: true, data: createSession(user) };
  },

  async forgotPassword(payload: ForgotPasswordPayload) {
    await delay();

    const limit = trackAttempt(
      `forgot:${payload.email.toLowerCase()}`,
      SECURITY_CONFIG.rateLimit.forgotPassword.maxAttempts,
      SECURITY_CONFIG.rateLimit.forgotPassword.windowMs,
    );

    if (limit.limited) {
      return failure("TOO_MANY_ATTEMPTS");
    }

    // Always succeed to avoid email enumeration in foundation UX.
    return { success: true, data: { email: payload.email } };
  },

  async resetPassword(payload: ResetPasswordPayload) {
    await delay();

    if (!payload.token || payload.token === "invalid") {
      return failure("INVALID_TOKEN");
    }

    if (payload.password !== payload.confirmPassword) {
      return failure("WEAK_PASSWORD");
    }

    return { success: true, data: null };
  },

  async verifyEmail(payload: VerifyEmailPayload) {
    await delay();

    if (!payload.token || payload.token === "invalid") {
      return failure("INVALID_TOKEN");
    }

    return { success: true, data: null };
  },

  async getSession() {
    await delay(200);
    return { success: true, data: null };
  },
};
