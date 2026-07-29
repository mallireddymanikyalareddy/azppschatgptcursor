import type { PublicCalculatorPageDefinition } from "@/features/public-calculator-page/types";
import { MOCK_PUBLIC_CALCULATOR_PAGES } from "@/features/public-calculator-page/data/mock-pages";

export class CalculatorPageRepository {
  constructor(
    private readonly pages: PublicCalculatorPageDefinition[] = MOCK_PUBLIC_CALCULATOR_PAGES,
  ) {}

  list(): PublicCalculatorPageDefinition[] {
    return structuredClone(this.pages);
  }

  getBySlug(slug: string): PublicCalculatorPageDefinition | null {
    return structuredClone(
      this.pages.find((page) => page.slug === slug) ?? null,
    );
  }

  getSlugs(): string[] {
    return this.pages.map((page) => page.slug);
  }
}

export const calculatorPageRepository = new CalculatorPageRepository();
