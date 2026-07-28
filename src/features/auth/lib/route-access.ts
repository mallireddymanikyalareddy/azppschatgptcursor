import {
  AUTH_COOKIE,
  AUTH_ROUTES,
  GUEST_ROUTES,
  PROTECTED_ROUTE_PREFIXES,
} from "@/features/auth/constants/routes";

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isGuestPath(pathname: string): boolean {
  return (GUEST_ROUTES as readonly string[]).includes(pathname);
}

export function hasSessionCookie(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  return cookieHeader
    .split(";")
    .some((part) => part.trim().startsWith(`${AUTH_COOKIE.session}=`));
}

export function resolveAuthRedirect(
  pathname: string,
  hasSession: boolean,
): string | null {
  if (isProtectedPath(pathname) && !hasSession) {
    return `${AUTH_ROUTES.login}?next=${encodeURIComponent(pathname)}`;
  }

  if (isGuestPath(pathname) && hasSession) {
    return "/";
  }

  return null;
}
