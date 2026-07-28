import type {
  DomainResult,
  EntityId,
  Formula,
  FormulaListFilter,
  PageRequest,
  PageResult,
} from "@/features/calculators/types";

/**
 * Application service contract for Formula library use-cases.
 * Expression evaluation is intentionally excluded from this foundation.
 */
export interface FormulaService {
  getById(id: EntityId): Promise<DomainResult<Formula>>;
  listByCalculator(calculatorId: EntityId): Promise<DomainResult<Formula[]>>;
  list(
    filter?: FormulaListFilter,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<Formula>>>;
  /** Returns dependency IDs in topological order when acyclic. */
  resolveDependencyOrder(
    formulaIds: EntityId[],
  ): Promise<DomainResult<EntityId[]>>;
}
