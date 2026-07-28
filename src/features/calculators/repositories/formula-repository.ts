import type {
  DomainResult,
  EntityId,
  Formula,
  FormulaListFilter,
  PageRequest,
  PageResult,
} from "@/features/calculators/types";

/**
 * Persistence contract for Formula definitions.
 * Formulas may be shared across calculators in a future library;
 * today they are typically nested under a Calculator aggregate.
 */
export interface FormulaRepository {
  findById(id: EntityId): Promise<DomainResult<Formula | null>>;
  listByCalculator(calculatorId: EntityId): Promise<DomainResult<Formula[]>>;
  list(
    filter?: FormulaListFilter,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<Formula>>>;
}
