import type {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import type { CategoryRef } from "@/features/calculators/types";

export const LibraryBadgeKind = {
  New: "new",
  Popular: "popular",
  AiGenerated: "ai_generated",
  Template: "template",
  Published: "published",
  Draft: "draft",
  Archived: "archived",
  Experimental: "experimental",
} as const;

export type LibraryBadgeKind =
  (typeof LibraryBadgeKind)[keyof typeof LibraryBadgeKind];

export const LibraryViewMode = {
  Table: "table",
  Grid: "grid",
} as const;

export type LibraryViewMode =
  (typeof LibraryViewMode)[keyof typeof LibraryViewMode];

export const LibrarySortField = {
  Name: "name",
  Category: "category",
  UpdatedAt: "updatedAt",
  Usage: "usageCount",
  Status: "status",
  Version: "version",
} as const;

export type LibrarySortField =
  (typeof LibrarySortField)[keyof typeof LibrarySortField];

export type LibrarySortDirection = "asc" | "desc";

/**
 * Catalog row for Calculator Library — lean projection for 10k+ scale lists.
 */
export type LibraryCalculator = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: CategoryRef;
  subcategory?: string;
  status: CalculatorStatus;
  visibility: Visibility;
  difficulty: CalculatorDifficulty;
  version: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  tags: string[];
  aiGenerated: boolean;
  templateBased: boolean;
  inputCount: number;
  formulaCount: number;
  chartCount: number;
  resultCount: number;
  seoComplete: boolean;
  contentComplete: boolean;
  badges: LibraryBadgeKind[];
  /** Public root path, e.g. /home-loan-emi */
  publicPath: string;
};

export type LibraryStats = {
  total: number;
  published: number;
  draft: number;
  archived: number;
  recentlyUpdated: number;
  aiGenerated: number;
  templateBased: number;
};

export type LibraryFilters = {
  search: string;
  categorySlug: string | "all";
  subcategory: string | "all";
  status: CalculatorStatus | "all";
  visibility: Visibility | "all";
  difficulty: CalculatorDifficulty | "all";
  templateBased: "all" | "yes" | "no";
  aiGenerated: "all" | "yes" | "no";
  createdBy: string | "all";
  updatedFrom?: string;
  updatedTo?: string;
  sortBy: LibrarySortField;
  sortDirection: LibrarySortDirection;
};

export type LibraryPageQuery = {
  filters: LibraryFilters;
  page: number;
  pageSize: number;
};

export type LibraryPageResult = {
  items: LibraryCalculator[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  stats: LibraryStats;
  facets: {
    categories: { slug: string; name: string; count: number }[];
    subcategories: string[];
    authors: string[];
  };
};

export function createDefaultLibraryFilters(): LibraryFilters {
  return {
    search: "",
    categorySlug: "all",
    subcategory: "all",
    status: "all",
    visibility: "all",
    difficulty: "all",
    templateBased: "all",
    aiGenerated: "all",
    createdBy: "all",
    sortBy: LibrarySortField.UpdatedAt,
    sortDirection: "desc",
  };
}
