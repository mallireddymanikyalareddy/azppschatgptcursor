import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

export type BuilderHistorySnapshot = {
  definition: CalculatorBuilderDefinition;
  label?: string;
  createdAt: string;
};

/**
 * In-memory undo/redo history. No persistence.
 * Architecture prepared for future remote history adapters.
 */
export class BuilderHistory {
  private past: BuilderHistorySnapshot[] = [];
  private future: BuilderHistorySnapshot[] = [];
  private current: CalculatorBuilderDefinition;
  private readonly limit: number;

  constructor(
    initial: CalculatorBuilderDefinition,
    options?: { limit?: number },
  ) {
    this.current = structuredClone(initial);
    this.limit = options?.limit ?? 50;
  }

  getCurrent(): CalculatorBuilderDefinition {
    return structuredClone(this.current);
  }

  canUndo(): boolean {
    return this.past.length > 0;
  }

  canRedo(): boolean {
    return this.future.length > 0;
  }

  push(next: CalculatorBuilderDefinition, label?: string): void {
    this.past.push({
      definition: structuredClone(this.current),
      label,
      createdAt: new Date().toISOString(),
    });
    if (this.past.length > this.limit) {
      this.past.shift();
    }
    this.current = structuredClone(next);
    this.future = [];
  }

  undo(): CalculatorBuilderDefinition | null {
    const previous = this.past.pop();
    if (!previous) return null;
    this.future.push({
      definition: structuredClone(this.current),
      createdAt: new Date().toISOString(),
    });
    this.current = structuredClone(previous.definition);
    return this.getCurrent();
  }

  redo(): CalculatorBuilderDefinition | null {
    const next = this.future.pop();
    if (!next) return null;
    this.past.push({
      definition: structuredClone(this.current),
      createdAt: new Date().toISOString(),
    });
    this.current = structuredClone(next.definition);
    return this.getCurrent();
  }

  replace(definition: CalculatorBuilderDefinition): void {
    this.current = structuredClone(definition);
    this.past = [];
    this.future = [];
  }
}
