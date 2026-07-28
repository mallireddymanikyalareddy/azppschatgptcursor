import type { LibraryCalculator } from "@/features/calculator-library/types";

/**
 * Full-text style search across catalog fields (client-side mock).
 * Future: replace with search index / DB full-text.
 */
export class CalculatorSearchService {
  search(items: LibraryCalculator[], query: string): LibraryCalculator[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;

    const terms = normalized.split(/\s+/).filter(Boolean);

    return items.filter((item) => {
      const haystack = [
        item.name,
        item.slug,
        item.description,
        item.category.name,
        item.category.slug,
        item.subcategory ?? "",
        item.createdBy,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    });
  }
}

export const calculatorSearchService = new CalculatorSearchService();
