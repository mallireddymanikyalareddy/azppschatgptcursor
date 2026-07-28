/**
 * Admin shell routes. All live under `/admin` (middleware-protected).
 */
export const ADMIN_ROUTES = {
  root: "/admin",
  dashboard: "/admin",

  calculators: "/admin/calculators",
  calculatorBuilder: "/admin/calculators/builder",
  calculatorCategories: "/admin/calculators/categories",
  formulaLibrary: "/admin/calculators/formulas",

  aiFactory: "/admin/ai-factory",
  aiQueue: "/admin/ai-factory/queue",
  aiHistory: "/admin/ai-factory/history",

  articles: "/admin/content/articles",
  faqs: "/admin/content/faqs",
  images: "/admin/content/images",

  seoMetadata: "/admin/seo/metadata",
  seoSchema: "/admin/seo/schema",
  seoSitemap: "/admin/seo/sitemap",

  campaigns: "/admin/marketing/campaigns",
  socialPosts: "/admin/marketing/social-posts",

  analytics: "/admin/analytics",
  reports: "/admin/analytics/reports",

  users: "/admin/administration/users",
  roles: "/admin/administration/roles",
  permissions: "/admin/administration/permissions",
  auditLogs: "/admin/administration/audit-logs",

  settings: "/admin/system/settings",
  integrations: "/admin/system/integrations",
  profile: "/admin/system/profile",
  preferences: "/admin/system/preferences",
  security: "/admin/system/security",
  apiKeys: "/admin/system/api-keys",
} as const;

export type AdminRouteKey = keyof typeof ADMIN_ROUTES;
export type AdminRoutePath = (typeof ADMIN_ROUTES)[AdminRouteKey];
