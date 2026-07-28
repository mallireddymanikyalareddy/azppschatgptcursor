import type { PlatformRole } from "@/features/rbac/types";

/**
 * Canonical platform roles. Add new roles here — then grant permissions
 * in `data/role-permissions.ts`.
 */
export const PLATFORM_ROLES: Record<string, PlatformRole> = {
  super_admin: {
    id: "super_admin",
    name: "Super Admin",
    description: "Full platform control including roles and system settings.",
    level: 100,
  },
  admin: {
    id: "admin",
    name: "Admin",
    description: "Operational administration across modules and users.",
    level: 80,
  },
  editor: {
    id: "editor",
    name: "Editor",
    description: "Create, edit, and publish calculators and content.",
    level: 60,
  },
  author: {
    id: "author",
    name: "Author",
    description: "Create and edit drafts; limited publish rights.",
    level: 40,
  },
  viewer: {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to dashboards and published assets.",
    level: 20,
  },
} as const;

export const PLATFORM_ROLE_LIST = Object.values(PLATFORM_ROLES);
