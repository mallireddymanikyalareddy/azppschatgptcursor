import type { AuthErrorCode } from "@/features/auth/types";

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
  NETWORK_ERROR: "Network error. Check your connection and try again.",
  SERVER_ERROR: "Something went wrong on our side. Please try again later.",
  EXPIRED_SESSION: "Your session has expired. Please sign in again.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
  TOO_MANY_ATTEMPTS: "Too many attempts. Please wait and try again.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  INVALID_TOKEN: "This link is invalid or has expired.",
  WEAK_PASSWORD: "Password does not meet security requirements.",
  UNKNOWN: "An unexpected error occurred. Please try again.",
};
