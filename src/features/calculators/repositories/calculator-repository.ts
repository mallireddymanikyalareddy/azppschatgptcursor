import type {
  Calculator,
  CalculatorListFilter,
  CalculatorSummary,
  DomainResult,
  EntityId,
  PageRequest,
  PageResult,
} from "@/features/calculators/types";

/**
 * Persistence contract for Calculator aggregates.
 * Implementations (memory, SQL, document store) live outside this foundation.
 */
export interface CalculatorRepository {
  findById(id: EntityId): Promise<DomainResult<Calculator | null>>;
  findBySlug(slug: string): Promise<DomainResult<Calculator | null>>;
  list(
    filter?: CalculatorListFilter,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<CalculatorSummary>>>;
  existsBySlug(slug: string): Promise<DomainResult<boolean>>;
  count(filter?: CalculatorListFilter): Promise<DomainResult<number>>;
}
