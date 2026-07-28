"use client";

import { usePermission, useRbac } from "@/features/rbac/context/rbac-context";
import type { PermissionId } from "@/features/rbac/types";

type CanAccessProps = {
  permission: PermissionId | PermissionId[];
  mode?: "all" | "any";
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Conditionally render UI by permission (buttons, sections, nav extras).
 */
export function CanAccess({
  permission,
  mode = "all",
  fallback = null,
  children,
}: CanAccessProps) {
  const allowed = usePermission(permission, mode);
  const { isReady } = useRbac();

  if (!isReady) return null;
  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}
