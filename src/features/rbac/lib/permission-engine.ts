import { ROLE_PERMISSIONS } from "@/features/rbac/data/role-permissions";
import type {
  AccessCheckInput,
  PermissionId,
  PlatformRoleId,
} from "@/features/rbac/types";
import { PLATFORM_ROLE_IDS } from "@/features/rbac/types";

/**
 * Collect unique permissions for one or more roles.
 */
export function resolvePermissionsForRoles(
  roles: readonly PlatformRoleId[],
): Set<PermissionId> {
  const set = new Set<PermissionId>();
  for (const role of roles) {
    const grants = ROLE_PERMISSIONS[role] ?? [];
    for (const permission of grants) {
      set.add(permission);
    }
  }
  return set;
}

export function hasPermission(
  granted: ReadonlySet<PermissionId>,
  permission: PermissionId,
): boolean {
  return granted.has(permission);
}

export function checkAccess(
  granted: ReadonlySet<PermissionId>,
  input: AccessCheckInput,
): boolean {
  if (!input.permission) return true;

  const required = Array.isArray(input.permission)
    ? input.permission
    : [input.permission];

  if (required.length === 0) return true;

  const mode = input.mode ?? "all";
  if (mode === "any") {
    return required.some((p) => granted.has(p));
  }
  return required.every((p) => granted.has(p));
}

/**
 * Map legacy / auth provider role strings into platform roles.
 * Safe defaults: unknown roles → viewer.
 */
export function mapAuthRolesToPlatform(
  authRoles: readonly string[],
): PlatformRoleId[] {
  const mapped = new Set<PlatformRoleId>();

  for (const raw of authRoles) {
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, "_");

    if (normalized === "super_admin" || normalized === "superadmin") {
      mapped.add("super_admin");
      continue;
    }
    if (normalized === "admin") {
      mapped.add("admin");
      continue;
    }
    if (normalized === "editor") {
      mapped.add("editor");
      continue;
    }
    if (normalized === "author") {
      mapped.add("author");
      continue;
    }
    if (normalized === "viewer" || normalized === "user") {
      mapped.add("viewer");
      continue;
    }
    // Future auth roles (ai_operator, seo_manager, …) map to editor until refined.
    if (normalized === "ai_operator" || normalized === "seo_manager") {
      mapped.add("editor");
    }
  }

  if (mapped.size === 0) {
    mapped.add("viewer");
  }

  return PLATFORM_ROLE_IDS.filter((id) => mapped.has(id));
}
