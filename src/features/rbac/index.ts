export type {
  AccessCheckInput,
  Permission,
  PermissionId,
  PermissionScope,
  PlatformRole,
  PlatformRoleId,
  RolePermissionGrant,
} from "@/features/rbac/types";
export { PLATFORM_ROLE_IDS, PERMISSION_IDS } from "@/features/rbac/types";
export {
  PLATFORM_ROLES,
  PLATFORM_ROLE_LIST,
} from "@/features/rbac/constants/roles";
export {
  PERMISSIONS,
  PERMISSION_LIST,
} from "@/features/rbac/constants/permissions";
export { ROLE_PERMISSIONS } from "@/features/rbac/data/role-permissions";
export {
  checkAccess,
  hasPermission,
  mapAuthRolesToPlatform,
  resolvePermissionsForRoles,
} from "@/features/rbac/lib/permission-engine";
export {
  RbacProvider,
  usePermission,
  useRbac,
} from "@/features/rbac/context/rbac-context";
export { CanAccess } from "@/features/rbac/components/can-access";
