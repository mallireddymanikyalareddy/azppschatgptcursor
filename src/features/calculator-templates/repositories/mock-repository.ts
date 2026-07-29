import type { CalculatorTemplate } from "@/features/calculator-templates/types";

/**
 * Repository contract — swap MockTemplateRepository for API/DB later.
 * Marketplace sync can also implement this interface.
 */
export interface TemplateRepository {
  listAll(): Promise<CalculatorTemplate[]>;
  getById(id: string): Promise<CalculatorTemplate | null>;
  getBySlug(slug: string): Promise<CalculatorTemplate | null>;
  save(template: CalculatorTemplate): Promise<CalculatorTemplate>;
  delete(id: string): Promise<boolean>;
}

/**
 * In-memory template store. Mutations affect the session store only.
 */
export class MockTemplateRepository implements TemplateRepository {
  private store: CalculatorTemplate[];

  constructor(seed: CalculatorTemplate[]) {
    this.store = structuredClone(seed);
  }

  async listAll(): Promise<CalculatorTemplate[]> {
    return structuredClone(this.store);
  }

  async getById(id: string): Promise<CalculatorTemplate | null> {
    return structuredClone(
      this.store.find((t) => t.metadata.id === id) ?? null,
    );
  }

  async getBySlug(slug: string): Promise<CalculatorTemplate | null> {
    return structuredClone(
      this.store.find((t) => t.metadata.slug === slug) ?? null,
    );
  }

  async save(template: CalculatorTemplate): Promise<CalculatorTemplate> {
    const clone = structuredClone(template);
    const index = this.store.findIndex(
      (t) => t.metadata.id === clone.metadata.id,
    );
    if (index >= 0) this.store[index] = clone;
    else this.store.unshift(clone);
    return structuredClone(clone);
  }

  async delete(id: string): Promise<boolean> {
    const before = this.store.length;
    this.store = this.store.filter((t) => t.metadata.id !== id);
    return this.store.length < before;
  }
}
