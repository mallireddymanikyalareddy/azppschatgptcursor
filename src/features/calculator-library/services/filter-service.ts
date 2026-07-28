import type {
  LibraryCalculator,
  LibraryFilters,
  LibrarySortField,
  LibraryStats,
} from "@/features/calculator-library/types";
import { LibrarySortField as SortField } from "@/features/calculator-library/types";
import { CalculatorStatus } from "@/features/calculators/constants/enums";

/**
 * Declarative filter + sort for calculator catalogs.
 * Designed so the same filter DTO can map to SQL/ORM later.
 */
export class CalculatorFilterService {
  apply(
    items: LibraryCalculator[],
    filters: LibraryFilters,
  ): LibraryCalculator[] {
    let next = items;

    if (filters.categorySlug !== "all") {
      next = next.filter((item) => item.category.slug === filters.categorySlug);
    }
    if (filters.subcategory !== "all") {
      next = next.filter((item) => item.subcategory === filters.subcategory);
    }
    if (filters.status !== "all") {
      next = next.filter((item) => item.status === filters.status);
    }
    if (filters.visibility !== "all") {
      next = next.filter((item) => item.visibility === filters.visibility);
    }
    if (filters.difficulty !== "all") {
      next = next.filter((item) => item.difficulty === filters.difficulty);
    }
    if (filters.templateBased !== "all") {
      const want = filters.templateBased === "yes";
      next = next.filter((item) => item.templateBased === want);
    }
    if (filters.aiGenerated !== "all") {
      const want = filters.aiGenerated === "yes";
      next = next.filter((item) => item.aiGenerated === want);
    }
    if (filters.createdBy !== "all") {
      next = next.filter((item) => item.createdBy === filters.createdBy);
    }
    if (filters.updatedFrom) {
      const from = Date.parse(filters.updatedFrom);
      next = next.filter((item) => Date.parse(item.updatedAt) >= from);
    }
    if (filters.updatedTo) {
      const to = Date.parse(filters.updatedTo);
      next = next.filter((item) => Date.parse(item.updatedAt) <= to);
    }

    return this.sort(next, filters.sortBy, filters.sortDirection);
  }

  sort(
    items: LibraryCalculator[],
    sortBy: LibrarySortField,
    direction: "asc" | "desc",
  ): LibraryCalculator[] {
    const factor = direction === "asc" ? 1 : -1;
    return [...items].sort((a, b) => {
      const left = this.sortValue(a, sortBy);
      const right = this.sortValue(b, sortBy);
      if (left < right) return -1 * factor;
      if (left > right) return 1 * factor;
      return a.name.localeCompare(b.name) * factor;
    });
  }

  computeStats(items: LibraryCalculator[]): LibraryStats {
    const recentlyCutoff =
      Date.parse("2026-07-28T12:00:00.000Z") - 14 * 86_400_000;
    return {
      total: items.length,
      published: items.filter((i) => i.status === CalculatorStatus.Published)
        .length,
      draft: items.filter((i) => i.status === CalculatorStatus.Draft).length,
      archived: items.filter((i) => i.status === CalculatorStatus.Archived)
        .length,
      recentlyUpdated: items.filter(
        (i) => Date.parse(i.updatedAt) >= recentlyCutoff,
      ).length,
      aiGenerated: items.filter((i) => i.aiGenerated).length,
      templateBased: items.filter((i) => i.templateBased).length,
    };
  }

  private sortValue(
    item: LibraryCalculator,
    sortBy: LibrarySortField,
  ): string | number {
    switch (sortBy) {
      case SortField.Name:
        return item.name.toLowerCase();
      case SortField.Category:
        return item.category.name.toLowerCase();
      case SortField.UpdatedAt:
        return Date.parse(item.updatedAt);
      case SortField.Usage:
        return item.usageCount;
      case SortField.Status:
        return item.status;
      case SortField.Version:
        return item.version;
      default:
        return item.name.toLowerCase();
    }
  }
}

export const calculatorFilterService = new CalculatorFilterService();
