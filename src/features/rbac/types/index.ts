/**
 * Platform RBAC types — independent of auth provider roles.
 * Auth roles map into these via the RBAC provider adapter.
 */

export const PLATFORM_ROLE_IDS = [
  "super_admin",
  "admin",
  "editor",
  "author",
  "viewer",
] as const;

export type PlatformRoleId = (typeof PLATFORM_ROLE_IDS)[number];

export type PlatformRole = {
  id: PlatformRoleId;
  name: string;
  description: string;
  /** Higher = more privileged. Used for hierarchy checks. */
  level: number;
};

export const PERMISSION_IDS = [
  "calculator.create",
  "calculator.edit",
  "calculator.delete",
  "calculator.publish",
  "calculator.view",
  "category.manage",
  "content.manage",
  "content.view",
  "seo.manage",
  "seo.view",
  "marketing.manage",
  "marketing.view",
  "analytics.view",
  "settings.manage",
  "settings.view",
  "users.manage",
  "users.view",
  "roles.manage",
  "permissions.manage",
  "audit.view",
  "ai.view",
  "ai.generate",
  "integrations.manage",
  "dashboard.view",
] as const;

export type PermissionId = (typeof PERMISSION_IDS)[number];

export type Permission = {
  id: PermissionId;
  label: string;
  description: string;
  /** Feature domain for grouping (calculators, content, …). */
  feature: string;
};

export type PermissionScope = "feature" | "page" | "navigation" | "action";

export type RolePermissionGrant = {
  roleId: PlatformRoleId;
  permissions: readonly PermissionId[];
};

export type AccessCheckInput = {
  permission?: PermissionId | PermissionId[];
  /** Require every listed permission when array. */
  mode?: "all" | "any";
};
