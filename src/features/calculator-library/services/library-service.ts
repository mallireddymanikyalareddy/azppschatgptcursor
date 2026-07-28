import type {
  LibraryCalculator,
  LibraryPageQuery,
  LibraryPageResult,
} from "@/features/calculator-library/types";
import type { CalculatorLibraryRepository } from "@/features/calculator-library/repositories/mock-repository";
import { calculatorFilterService } from "@/features/calculator-library/services/filter-service";
import { calculatorSearchService } from "@/features/calculator-library/services/search-service";

/**
 * Application service for Calculator Library queries and mock mutations.
 * Persistence is intentionally absent — repository is the swap point.
 */
export class CalculatorLibraryService {
  constructor(private readonly repository: CalculatorLibraryRepository) {}

  async query(query: LibraryPageQuery): Promise<LibraryPageResult> {
    const all = await this.repository.listAll();
    const searched = calculatorSearchService.search(all, query.filters.search);
    const filtered = calculatorFilterService.apply(searched, query.filters);
    const stats = calculatorFilterService.computeStats(all);

    const pageSize = Math.max(1, query.pageSize);
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, query.page), totalPages);
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    const categoryMap = new Map<
      string,
      { slug: string; name: string; count: number }
    >();
    for (const item of all) {
      const existing = categoryMap.get(item.category.slug);
      if (existing) existing.count += 1;
      else {
        categoryMap.set(item.category.slug, {
          slug: item.category.slug,
          name: item.category.name,
          count: 1,
        });
      }
    }

    const subcategories = [
      ...new Set(
        all
          .map((item) => item.subcategory)
          .filter((value): value is string => Boolean(value)),
      ),
    ].sort();

    const authors = [...new Set(all.map((item) => item.createdBy))].sort();

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
      stats,
      facets: {
        categories: [...categoryMap.values()].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
        subcategories,
        authors,
      },
    };
  }

  async getById(id: string): Promise<LibraryCalculator | null> {
    return this.repository.getById(id);
  }

  /** Mock-only mutations — no persistence. Return updated clones. */
  async duplicate(id: string): Promise<LibraryCalculator | null> {
    const source = await this.repository.getById(id);
    if (!source) return null;
    return {
      ...source,
      id: `${source.id}_copy_${Date.now()}`,
      name: `${source.name} (Copy)`,
      slug: `${source.slug}-copy`,
      publicPath: `/${source.slug}-copy`,
      status: "draft",
      usageCount: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
  }
}
