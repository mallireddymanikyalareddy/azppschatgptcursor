import { createHomepagePayload } from "@/features/homepage/data/mock-homepage";
import type {
  HomepageCalculatorCard,
  HomepageCategory,
  HomepagePayload,
} from "@/features/homepage/types";

/**
 * Mock repository — swap for CMS/API later without changing consumers.
 */
export class HomepageRepository {
  private readonly payload = createHomepagePayload();

  getHomepage(): HomepagePayload {
    return this.payload;
  }

  listCategories(): HomepageCategory[] {
    return this.payload.categories;
  }

  listCalculators(): HomepageCalculatorCard[] {
    return this.payload.allCalculators;
  }

  searchCalculators(query: string): HomepageCalculatorCard[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.payload.allCalculators.slice(0, 8);
    return this.payload.allCalculators
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          item.slug.includes(q),
      )
      .slice(0, 12);
  }
}

export const homepageRepository = new HomepageRepository();
