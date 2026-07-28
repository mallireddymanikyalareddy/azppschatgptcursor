import type { Permission } from "@/features/rbac/types";

/**
 * Canonical permission catalog. Add new permissions here, then grant
 * them to roles in `data/role-permissions.ts`.
 */
export const PERMISSIONS: Record<string, Permission> = {
  "dashboard.view": {
    id: "dashboard.view",
    label: "View dashboard",
    description: "Access the admin dashboard overview.",
    feature: "dashboard",
  },
  "calculator.view": {
    id: "calculator.view",
    label: "View calculators",
    description: "Browse calculator listings and details.",
    feature: "calculators",
  },
  "calculator.create": {
    id: "calculator.create",
    label: "Create calculators",
    description: "Create new calculator drafts.",
    feature: "calculators",
  },
  "calculator.edit": {
    id: "calculator.edit",
    label: "Edit calculators",
    description: "Modify existing calculators.",
    feature: "calculators",
  },
  "calculator.delete": {
    id: "calculator.delete",
    label: "Delete calculators",
    description: "Remove calculators permanently.",
    feature: "calculators",
  },
  "calculator.publish": {
    id: "calculator.publish",
    label: "Publish calculators",
    description: "Publish or unpublish calculators.",
    feature: "calculators",
  },
  "category.manage": {
    id: "category.manage",
    label: "Manage categories",
    description: "Create and organize calculator categories.",
    feature: "calculators",
  },
  "content.view": {
    id: "content.view",
    label: "View content",
    description: "Browse articles, FAQs, and media.",
    feature: "content",
  },
  "content.manage": {
    id: "content.manage",
    label: "Manage content",
    description: "Create and edit content assets.",
    feature: "content",
  },
  "seo.view": {
    id: "seo.view",
    label: "View SEO",
    description: "Browse SEO metadata and schema.",
    feature: "seo",
  },
  "seo.manage": {
    id: "seo.manage",
    label: "Manage SEO",
    description: "Edit metadata, schema, and sitemap settings.",
    feature: "seo",
  },
  "marketing.view": {
    id: "marketing.view",
    label: "View marketing",
    description: "Browse campaigns and social posts.",
    feature: "marketing",
  },
  "marketing.manage": {
    id: "marketing.manage",
    label: "Manage marketing",
    description: "Create and manage marketing assets.",
    feature: "marketing",
  },
  "analytics.view": {
    id: "analytics.view",
    label: "View analytics",
    description: "Access analytics dashboards and reports.",
    feature: "analytics",
  },
  "ai.view": {
    id: "ai.view",
    label: "View AI factory",
    description: "Browse AI queue and history placeholders.",
    feature: "ai",
  },
  "ai.generate": {
    id: "ai.generate",
    label: "Run AI generation",
    description: "Trigger AI generation jobs (placeholder).",
    feature: "ai",
  },
  "users.view": {
    id: "users.view",
    label: "View users",
    description: "Browse user directory.",
    feature: "administration",
  },
  "users.manage": {
    id: "users.manage",
    label: "Manage users",
    description: "Invite, update, and deactivate users.",
    feature: "administration",
  },
  "roles.manage": {
    id: "roles.manage",
    label: "Manage roles",
    description: "Assign and configure platform roles.",
    feature: "administration",
  },
  "permissions.manage": {
    id: "permissions.manage",
    label: "Manage permissions",
    description: "Configure permission grants.",
    feature: "administration",
  },
  "audit.view": {
    id: "audit.view",
    label: "View audit logs",
    description: "Inspect audit trail events.",
    feature: "administration",
  },
  "settings.view": {
    id: "settings.view",
    label: "View settings",
    description: "Browse system and profile settings.",
    feature: "system",
  },
  "settings.manage": {
    id: "settings.manage",
    label: "Manage settings",
    description: "Update system settings and integrations.",
    feature: "system",
  },
  "integrations.manage": {
    id: "integrations.manage",
    label: "Manage integrations",
    description: "Configure third-party integrations.",
    feature: "system",
  },
} as const;

export const PERMISSION_LIST = Object.values(PERMISSIONS);
