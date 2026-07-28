"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AUTH_COOKIE,
  AUTH_STORAGE_KEYS,
} from "@/features/auth/constants/routes";
import { authService } from "@/features/auth/services";
import type {
  AuthError,
  AuthSession,
  AuthStatus,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/features/auth/types";

type AuthContextValue = {
  status: AuthStatus;
  session: AuthSession | null;
  user: AuthSession["user"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  lastError: AuthError | null;
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ ok: boolean; error?: AuthError }>;
  logout: () => Promise<void>;
  register: (
    payload: RegisterPayload,
  ) => Promise<{ ok: boolean; error?: AuthError; email?: string }>;
  forgotPassword: (
    payload: ForgotPasswordPayload,
  ) => Promise<{ ok: boolean; error?: AuthError; email?: string }>;
  resetPassword: (
    payload: ResetPasswordPayload,
  ) => Promise<{ ok: boolean; error?: AuthError }>;
  verifyEmail: (
    payload: VerifyEmailPayload,
  ) => Promise<{ ok: boolean; error?: AuthError }>;
  refreshSession: () => Promise<boolean>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persistSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;

  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEYS.session);
    document.cookie = `${AUTH_COOKIE.session}=; Max-Age=0; path=/; SameSite=Lax`;
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEYS.session,
    JSON.stringify(session),
  );
  const maxAge = Math.max(
    0,
    Math.floor((session.expiresAt - Date.now()) / 1000),
  );
  document.cookie = `${AUTH_COOKIE.session}=1; Max-Age=${maxAge}; path=/; SameSite=Lax`;
}

function readPersistedSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEYS.session);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.expiresAt || parsed.expiresAt <= Date.now()) {
      persistSession(null);
      return null;
    }
    return parsed;
  } catch {
    persistSession(null);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [lastError, setLastError] = useState<AuthError | null>(null);

  useEffect(() => {
    const existing = readPersistedSession();
    if (existing) {
      setSession(existing);
      setStatus("authenticated");
      return;
    }
    setStatus("unauthenticated");
  }, []);

  const clearError = useCallback(() => setLastError(null), []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLastError(null);
    const result = await authService.login(credentials);
    if (!result.success) {
      setLastError(result.error);
      return { ok: false, error: result.error };
    }
    setSession(result.data);
    persistSession(result.data);
    setStatus("authenticated");
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
    persistSession(null);
    setStatus("unauthenticated");
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setLastError(null);
    const result = await authService.register(payload);
    if (!result.success) {
      setLastError(result.error);
      return { ok: false, error: result.error };
    }
    return { ok: true, email: result.data.email };
  }, []);

  const forgotPassword = useCallback(async (payload: ForgotPasswordPayload) => {
    setLastError(null);
    const result = await authService.forgotPassword(payload);
    if (!result.success) {
      setLastError(result.error);
      return { ok: false, error: result.error };
    }
    return { ok: true, email: result.data.email };
  }, []);

  const resetPassword = useCallback(async (payload: ResetPasswordPayload) => {
    setLastError(null);
    const result = await authService.resetPassword(payload);
    if (!result.success) {
      setLastError(result.error);
      return { ok: false, error: result.error };
    }
    return { ok: true };
  }, []);

  const verifyEmail = useCallback(async (payload: VerifyEmailPayload) => {
    setLastError(null);
    const result = await authService.verifyEmail(payload);
    if (!result.success) {
      setLastError(result.error);
      return { ok: false, error: result.error };
    }
    return { ok: true };
  }, []);

  const refreshSession = useCallback(async () => {
    if (!session?.refreshToken) {
      setStatus("expired");
      setSession(null);
      persistSession(null);
      return false;
    }

    const result = await authService.refreshSession(session.refreshToken);
    if (!result.success) {
      setStatus("expired");
      setSession(null);
      persistSession(null);
      setLastError(result.error);
      return false;
    }

    setSession(result.data);
    persistSession(result.data);
    setStatus("authenticated");
    return true;
  }, [session?.refreshToken]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      user: session?.user ?? null,
      isAuthenticated: status === "authenticated" && Boolean(session),
      isLoading: status === "loading",
      lastError,
      login,
      logout,
      register,
      forgotPassword,
      resetPassword,
      verifyEmail,
      refreshSession,
      clearError,
    }),
    [
      status,
      session,
      lastError,
      login,
      logout,
      register,
      forgotPassword,
      resetPassword,
      verifyEmail,
      refreshSession,
      clearError,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
