import { motionJs } from "@/design-system/tokens/motion";

export const APP_ROUTES = {
  home: "/",
  designSystem: "/design-system",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  emailSent: "/email-sent",
  sessionExpired: "/session-expired",
  accessDenied: "/access-denied",
} as const;

export const ANIMATION = {
  duration: motionJs.duration,
  ease: motionJs.ease.standard,
} as const;
