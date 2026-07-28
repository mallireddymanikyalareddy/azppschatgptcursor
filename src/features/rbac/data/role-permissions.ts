import {
  PERMISSION_IDS,
  type PermissionId,
  type PlatformRoleId,
} from "@/features/rbac/types";

const ALL = PERMISSION_IDS;

const VIEWER: PermissionId[] = [
  "dashboard.view",
  "calculator.view",
  "content.view",
  "seo.view",
  "marketing.view",
  "analytics.view",
  "ai.view",
  "settings.view",
];

const AUTHOR: PermissionId[] = [
  ...VIEWER,
  "calculator.create",
  "calculator.edit",
  "content.manage",
];

const EDITOR: PermissionId[] = [
  ...AUTHOR,
  "calculator.publish",
  "category.manage",
  "seo.manage",
  "marketing.manage",
  "ai.generate",
];

const ADMIN: PermissionId[] = [
  ...EDITOR,
  "calculator.delete",
  "users.view",
  "users.manage",
  "roles.manage",
  "permissions.manage",
  "audit.view",
  "settings.manage",
  "integrations.manage",
];

const SUPER_ADMIN: PermissionId[] = [...ALL];

/**
 * Mock role → permission matrix. Replace with API/DB later.
 */
export const ROLE_PERMISSIONS: Record<PlatformRoleId, readonly PermissionId[]> =
  {
    viewer: VIEWER,
    author: AUTHOR,
    editor: EDITOR,
    admin: ADMIN,
    super_admin: SUPER_ADMIN,
  };
