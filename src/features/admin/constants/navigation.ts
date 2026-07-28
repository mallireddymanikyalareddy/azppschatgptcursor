import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Blocks,
  FileText,
  Gauge,
  HelpCircle,
  History,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  LineChart,
  ListTodo,
  Map,
  Megaphone,
  Network,
  ScrollText,
  Search,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Tags,
  UserCircle,
  Users,
  Workflow,
} from "lucide-react";

import { ADMIN_ROUTES } from "@/features/admin/constants/routes";
import type { PermissionId } from "@/features/rbac/types";

export type AdminNavItem = {
  id: string;
  title: string;
  href: string;
  icon?: LucideIcon;
  /** Permission(s) required to see this item. */
  permission?: PermissionId | PermissionId[];
  permissionMode?: "all" | "any";
  disabled?: boolean;
  children?: AdminNavItem[];
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

/**
 * Grouped admin navigation. Items are placeholders for future modules.
 */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        href: ADMIN_ROUTES.dashboard,
        icon: LayoutDashboard,
        permission: "dashboard.view",
      },
    ],
  },
  {
    id: "calculator-management",
    label: "Calculator Management",
    items: [
      {
        id: "calculators",
        title: "Calculator Library",
        href: ADMIN_ROUTES.calculators,
        icon: Gauge,
        permission: "calculator.view",
      },
      {
        id: "calculator-builder",
        title: "Calculator Builder",
        href: ADMIN_ROUTES.calculatorBuilder,
        icon: Blocks,
        permission: "calculator.create",
      },
      {
        id: "categories",
        title: "Categories",
        href: ADMIN_ROUTES.calculatorCategories,
        icon: Tags,
        permission: "category.manage",
      },
      {
        id: "formulas",
        title: "Formula Library",
        href: ADMIN_ROUTES.formulaLibrary,
        icon: Workflow,
        permission: "calculator.view",
      },
    ],
  },
  {
    id: "ai-factory",
    label: "AI Factory",
    items: [
      {
        id: "ai-generator",
        title: "AI Generator",
        href: ADMIN_ROUTES.aiFactory,
        icon: Sparkles,
        permission: "ai.view",
      },
      {
        id: "ai-queue",
        title: "AI Queue",
        href: ADMIN_ROUTES.aiQueue,
        icon: ListTodo,
        permission: "ai.view",
      },
      {
        id: "ai-history",
        title: "AI History",
        href: ADMIN_ROUTES.aiHistory,
        icon: History,
        permission: "ai.view",
      },
    ],
  },
  {
    id: "content",
    label: "Content",
    items: [
      {
        id: "articles",
        title: "Articles",
        href: ADMIN_ROUTES.articles,
        icon: FileText,
        permission: "content.view",
      },
      {
        id: "faqs",
        title: "FAQs",
        href: ADMIN_ROUTES.faqs,
        icon: HelpCircle,
        permission: "content.view",
      },
      {
        id: "images",
        title: "Images",
        href: ADMIN_ROUTES.images,
        icon: ImageIcon,
        permission: "content.view",
      },
    ],
  },
  {
    id: "seo",
    label: "SEO",
    items: [
      {
        id: "seo-metadata",
        title: "Metadata",
        href: ADMIN_ROUTES.seoMetadata,
        icon: Search,
        permission: "seo.view",
      },
      {
        id: "seo-schema",
        title: "Schema",
        href: ADMIN_ROUTES.seoSchema,
        icon: Blocks,
        permission: "seo.view",
      },
      {
        id: "seo-sitemap",
        title: "Sitemap",
        href: ADMIN_ROUTES.seoSitemap,
        icon: Map,
        permission: "seo.view",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    items: [
      {
        id: "campaigns",
        title: "Campaigns",
        href: ADMIN_ROUTES.campaigns,
        icon: Megaphone,
        permission: "marketing.view",
      },
      {
        id: "social-posts",
        title: "Social Posts",
        href: ADMIN_ROUTES.socialPosts,
        icon: Share2,
        permission: "marketing.view",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    items: [
      {
        id: "analytics-dashboard",
        title: "Dashboard",
        href: ADMIN_ROUTES.analytics,
        icon: BarChart3,
        permission: "analytics.view",
      },
      {
        id: "analytics-reports",
        title: "Reports",
        href: ADMIN_ROUTES.reports,
        icon: LineChart,
        permission: "analytics.view",
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    items: [
      {
        id: "users",
        title: "Users",
        href: ADMIN_ROUTES.users,
        icon: Users,
        permission: "users.view",
      },
      {
        id: "roles",
        title: "Roles",
        href: ADMIN_ROUTES.roles,
        icon: Shield,
        permission: "roles.manage",
      },
      {
        id: "permissions",
        title: "Permissions",
        href: ADMIN_ROUTES.permissions,
        icon: ShieldCheck,
        permission: "permissions.manage",
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        href: ADMIN_ROUTES.auditLogs,
        icon: ScrollText,
        permission: "audit.view",
      },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        id: "settings",
        title: "Settings",
        href: ADMIN_ROUTES.settings,
        icon: Settings,
        permission: "settings.view",
      },
      {
        id: "integrations",
        title: "Integrations",
        href: ADMIN_ROUTES.integrations,
        icon: Network,
        permission: "integrations.manage",
      },
      {
        id: "profile",
        title: "Profile",
        href: ADMIN_ROUTES.profile,
        icon: UserCircle,
        permission: "settings.view",
      },
    ],
  },
];

export type AdminUserMenuItem = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  permission?: PermissionId;
};

export const ADMIN_USER_MENU: AdminUserMenuItem[] = [
  {
    id: "profile",
    title: "Profile",
    href: ADMIN_ROUTES.profile,
    icon: UserCircle,
  },
  {
    id: "preferences",
    title: "Preferences",
    href: ADMIN_ROUTES.preferences,
    icon: Settings,
  },
  {
    id: "security",
    title: "Security",
    href: ADMIN_ROUTES.security,
    icon: Shield,
  },
  {
    id: "api-keys",
    title: "API Keys",
    href: ADMIN_ROUTES.apiKeys,
    icon: KeyRound,
  },
];

export type AdminBreadcrumbMeta = {
  href: string;
  title: string;
  parentHref?: string;
};

/** Flat route → breadcrumb titles for active highlighting & crumbs. */
export const ADMIN_BREADCRUMB_META: AdminBreadcrumbMeta[] = [
  { href: ADMIN_ROUTES.dashboard, title: "Dashboard" },
  { href: ADMIN_ROUTES.calculators, title: "Calculator Library" },
  {
    href: ADMIN_ROUTES.calculatorBuilder,
    title: "Calculator Builder",
    parentHref: ADMIN_ROUTES.calculators,
  },
  {
    href: ADMIN_ROUTES.calculatorCategories,
    title: "Categories",
    parentHref: ADMIN_ROUTES.calculators,
  },
  {
    href: ADMIN_ROUTES.formulaLibrary,
    title: "Formula Library",
    parentHref: ADMIN_ROUTES.calculators,
  },
  { href: ADMIN_ROUTES.aiFactory, title: "AI Generator" },
  {
    href: ADMIN_ROUTES.aiQueue,
    title: "AI Queue",
    parentHref: ADMIN_ROUTES.aiFactory,
  },
  {
    href: ADMIN_ROUTES.aiHistory,
    title: "AI History",
    parentHref: ADMIN_ROUTES.aiFactory,
  },
  { href: ADMIN_ROUTES.articles, title: "Articles" },
  { href: ADMIN_ROUTES.faqs, title: "FAQs" },
  { href: ADMIN_ROUTES.images, title: "Images" },
  { href: ADMIN_ROUTES.seoMetadata, title: "Metadata" },
  { href: ADMIN_ROUTES.seoSchema, title: "Schema" },
  { href: ADMIN_ROUTES.seoSitemap, title: "Sitemap" },
  { href: ADMIN_ROUTES.campaigns, title: "Campaigns" },
  { href: ADMIN_ROUTES.socialPosts, title: "Social Posts" },
  { href: ADMIN_ROUTES.analytics, title: "Analytics" },
  {
    href: ADMIN_ROUTES.reports,
    title: "Reports",
    parentHref: ADMIN_ROUTES.analytics,
  },
  { href: ADMIN_ROUTES.users, title: "Users" },
  { href: ADMIN_ROUTES.roles, title: "Roles" },
  { href: ADMIN_ROUTES.permissions, title: "Permissions" },
  { href: ADMIN_ROUTES.auditLogs, title: "Audit Logs" },
  { href: ADMIN_ROUTES.settings, title: "Settings" },
  { href: ADMIN_ROUTES.integrations, title: "Integrations" },
  { href: ADMIN_ROUTES.profile, title: "Profile" },
  { href: ADMIN_ROUTES.preferences, title: "Preferences" },
  { href: ADMIN_ROUTES.security, title: "Security" },
  { href: ADMIN_ROUTES.apiKeys, title: "API Keys" },
];

export type AdminPageDefinition = {
  href: string;
  title: string;
  description: string;
  eyebrow: string;
};

export const ADMIN_PAGE_DEFINITIONS: AdminPageDefinition[] = [
  {
    href: ADMIN_ROUTES.dashboard,
    title: "Dashboard",
    description: "Platform overview with mock operational metrics.",
    eyebrow: "Overview",
  },
  {
    href: ADMIN_ROUTES.calculators,
    title: "Calculator Library",
    description:
      "Search, filter, and manage the full calculator catalog at scale.",
    eyebrow: "Calculator Management",
  },
  {
    href: ADMIN_ROUTES.calculatorBuilder,
    title: "Calculator Builder",
    description:
      "Create calculator definitions without code and export engine-compatible JSON.",
    eyebrow: "Calculator Management",
  },
  {
    href: ADMIN_ROUTES.calculatorCategories,
    title: "Categories",
    description: "Organize calculators into categories.",
    eyebrow: "Calculator Management",
  },
  {
    href: ADMIN_ROUTES.formulaLibrary,
    title: "Formula Library",
    description: "Reusable formula assets placeholder.",
    eyebrow: "Calculator Management",
  },
  {
    href: ADMIN_ROUTES.aiFactory,
    title: "AI Generator",
    description: "AI generation workspace placeholder — no AI connected.",
    eyebrow: "AI Factory",
  },
  {
    href: ADMIN_ROUTES.aiQueue,
    title: "AI Queue",
    description: "Queued AI jobs placeholder.",
    eyebrow: "AI Factory",
  },
  {
    href: ADMIN_ROUTES.aiHistory,
    title: "AI History",
    description: "Historical AI runs placeholder.",
    eyebrow: "AI Factory",
  },
  {
    href: ADMIN_ROUTES.articles,
    title: "Articles",
    description: "Content articles placeholder.",
    eyebrow: "Content",
  },
  {
    href: ADMIN_ROUTES.faqs,
    title: "FAQs",
    description: "FAQ management placeholder.",
    eyebrow: "Content",
  },
  {
    href: ADMIN_ROUTES.images,
    title: "Images",
    description: "Media library placeholder.",
    eyebrow: "Content",
  },
  {
    href: ADMIN_ROUTES.seoMetadata,
    title: "Metadata",
    description: "SEO metadata management placeholder.",
    eyebrow: "SEO",
  },
  {
    href: ADMIN_ROUTES.seoSchema,
    title: "Schema",
    description: "Structured data schema placeholder.",
    eyebrow: "SEO",
  },
  {
    href: ADMIN_ROUTES.seoSitemap,
    title: "Sitemap",
    description: "Sitemap configuration placeholder.",
    eyebrow: "SEO",
  },
  {
    href: ADMIN_ROUTES.campaigns,
    title: "Campaigns",
    description: "Marketing campaigns placeholder.",
    eyebrow: "Marketing",
  },
  {
    href: ADMIN_ROUTES.socialPosts,
    title: "Social Posts",
    description: "Social publishing placeholder.",
    eyebrow: "Marketing",
  },
  {
    href: ADMIN_ROUTES.analytics,
    title: "Analytics",
    description: "Analytics overview placeholder.",
    eyebrow: "Analytics",
  },
  {
    href: ADMIN_ROUTES.reports,
    title: "Reports",
    description: "Reporting workspace placeholder.",
    eyebrow: "Analytics",
  },
  {
    href: ADMIN_ROUTES.users,
    title: "Users",
    description: "User directory placeholder.",
    eyebrow: "Administration",
  },
  {
    href: ADMIN_ROUTES.roles,
    title: "Roles",
    description: "Role definitions and assignments placeholder.",
    eyebrow: "Administration",
  },
  {
    href: ADMIN_ROUTES.permissions,
    title: "Permissions",
    description: "Permission catalog and grants placeholder.",
    eyebrow: "Administration",
  },
  {
    href: ADMIN_ROUTES.auditLogs,
    title: "Audit Logs",
    description: "Audit trail placeholder.",
    eyebrow: "Administration",
  },
  {
    href: ADMIN_ROUTES.settings,
    title: "Settings",
    description: "System settings placeholder.",
    eyebrow: "System",
  },
  {
    href: ADMIN_ROUTES.integrations,
    title: "Integrations",
    description: "Third-party integrations placeholder.",
    eyebrow: "System",
  },
  {
    href: ADMIN_ROUTES.profile,
    title: "Profile",
    description: "Your profile settings placeholder.",
    eyebrow: "System",
  },
  {
    href: ADMIN_ROUTES.preferences,
    title: "Preferences",
    description: "Personal preferences placeholder.",
    eyebrow: "System",
  },
  {
    href: ADMIN_ROUTES.security,
    title: "Security",
    description: "Account security placeholder.",
    eyebrow: "System",
  },
  {
    href: ADMIN_ROUTES.apiKeys,
    title: "API Keys",
    description: "API key management placeholder.",
    eyebrow: "System",
  },
];
