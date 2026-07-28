"use client";

import * as React from "react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  checkAccess,
  mapAuthRolesToPlatform,
  resolvePermissionsForRoles,
} from "@/features/rbac/lib/permission-engine";
import { PLATFORM_ROLES } from "@/features/rbac/constants/roles";
import type {
  AccessCheckInput,
  PermissionId,
  PlatformRole,
  PlatformRoleId,
} from "@/features/rbac/types";

type RbacContextValue = {
  roles: PlatformRoleId[];
  roleDetails: PlatformRole[];
  permissions: ReadonlySet<PermissionId>;
  can: (
    permission: PermissionId | PermissionId[],
    mode?: "all" | "any",
  ) => boolean;
  canAccess: (input: AccessCheckInput) => boolean;
  hasRole: (role: PlatformRoleId | PlatformRoleId[]) => boolean;
  isReady: boolean;
};

const RbacContext = React.createContext<RbacContextValue | null>(null);

export function RbacProvider({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();

  const value = React.useMemo<RbacContextValue>(() => {
    const roles = mapAuthRolesToPlatform(user?.roles ?? []);
    const permissions = resolvePermissionsForRoles(roles);
    const roleDetails = roles.map((id) => PLATFORM_ROLES[id]);

    return {
      roles,
      roleDetails,
      permissions,
      can: (permission, mode = "all") =>
        checkAccess(permissions, { permission, mode }),
      canAccess: (input) => checkAccess(permissions, input),
      hasRole: (role) => {
        const list = Array.isArray(role) ? role : [role];
        return list.some((r) => roles.includes(r));
      },
      isReady: status !== "loading",
    };
  }, [user?.roles, status]);

  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>;
}

export function useRbac(): RbacContextValue {
  const ctx = React.useContext(RbacContext);
  if (!ctx) {
    throw new Error("useRbac must be used within RbacProvider.");
  }
  return ctx;
}

export function usePermission(
  permission: PermissionId | PermissionId[],
  mode: "all" | "any" = "all",
): boolean {
  const { can, isReady } = useRbac();
  if (!isReady) return false;
  return can(permission, mode);
}
