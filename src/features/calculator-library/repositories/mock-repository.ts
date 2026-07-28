import type { LibraryCalculator } from "@/features/calculator-library/types";

/**
 * Repository contract — swap MockCalculatorRepository for API/DB later.
 */
export interface CalculatorLibraryRepository {
  listAll(): Promise<LibraryCalculator[]>;
  getById(id: string): Promise<LibraryCalculator | null>;
  getBySlug(slug: string): Promise<LibraryCalculator | null>;
}

export class MockCalculatorRepository implements CalculatorLibraryRepository {
  constructor(private readonly seed: LibraryCalculator[]) {}

  async listAll(): Promise<LibraryCalculator[]> {
    // Clone to protect in-memory seed from accidental mutation.
    return structuredClone(this.seed);
  }

  async getById(id: string): Promise<LibraryCalculator | null> {
    return structuredClone(this.seed.find((item) => item.id === id) ?? null);
  }

  async getBySlug(slug: string): Promise<LibraryCalculator | null> {
    return structuredClone(
      this.seed.find((item) => item.slug === slug) ?? null,
    );
  }
}
