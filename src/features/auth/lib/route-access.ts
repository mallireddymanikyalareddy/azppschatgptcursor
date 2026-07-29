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
  return cookieHeader.split(";").some((part) => {
    const trimmed = part.trim();
    if (!trimmed.startsWith(`${AUTH_COOKIE.session}=`)) return false;
    const value = trimmed.slice(`${AUTH_COOKIE.session}=`.length).trim();
    // Ignore empty / cleared cookies so guest pages stay reachable.
    return value.length > 0;
  });
}

/**
 * Middleware redirects for protected routes only.
 * Guest routes (/login, /register, …) are handled client-side by GuestRoute so a
 * stale session cookie cannot permanently bounce users away from auth pages.
 */
export function resolveAuthRedirect(
  pathname: string,
  hasSession: boolean,
): string | null {
  if (isProtectedPath(pathname) && !hasSession) {
    return `${AUTH_ROUTES.login}?next=${encodeURIComponent(pathname)}`;
  }

  return null;
}
