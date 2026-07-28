import type { PermissionId } from "@/features/rbac/types";
import { checkAccess } from "@/features/rbac/lib/permission-engine";
import type {
  AdminBreadcrumbMeta,
  AdminNavGroup,
  AdminNavItem,
} from "@/features/admin/constants/navigation";
import { ADMIN_BREADCRUMB_META } from "@/features/admin/constants/navigation";

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function filterNavGroupsByPermission(
  groups: readonly AdminNavGroup[],
  granted: ReadonlySet<PermissionId>,
): AdminNavGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => canSeeNavItem(item, granted)),
    }))
    .filter((group) => group.items.length > 0);
}

function canSeeNavItem(
  item: AdminNavItem,
  granted: ReadonlySet<PermissionId>,
): boolean {
  if (!item.permission) return true;
  return checkAccess(granted, {
    permission: item.permission,
    mode: item.permissionMode ?? "all",
  });
}

export function buildBreadcrumbs(
  pathname: string,
): Array<{ href: string; title: string; current: boolean }> {
  const exact =
    ADMIN_BREADCRUMB_META.find((m) => m.href === pathname) ??
    findClosestMeta(pathname);

  if (!exact) {
    return [{ href: "/admin", title: "Dashboard", current: true }];
  }

  const crumbs: AdminBreadcrumbMeta[] = [];
  let cursor: AdminBreadcrumbMeta | undefined = exact;

  while (cursor) {
    crumbs.unshift(cursor);
    cursor = cursor.parentHref
      ? ADMIN_BREADCRUMB_META.find((m) => m.href === cursor!.parentHref)
      : undefined;
  }

  if (crumbs[0]?.href !== "/admin" && pathname !== "/admin") {
    crumbs.unshift({ href: "/admin", title: "Dashboard" });
  }

  return crumbs.map((c, index) => ({
    href: c.href,
    title: c.title,
    current: index === crumbs.length - 1,
  }));
}

function findClosestMeta(pathname: string): AdminBreadcrumbMeta | undefined {
  const candidates = ADMIN_BREADCRUMB_META.filter(
    (m) => pathname === m.href || pathname.startsWith(`${m.href}/`),
  ).sort((a, b) => b.href.length - a.href.length);
  return candidates[0];
}
