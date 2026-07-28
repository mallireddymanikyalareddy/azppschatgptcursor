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
 * Application service contract for Calculator use-cases.
 * Orchestrates repositories; no calculation engine here.
 */
export interface CalculatorService {
  getById(id: EntityId): Promise<DomainResult<Calculator>>;
  getBySlug(slug: string): Promise<DomainResult<Calculator>>;
  listSummaries(
    filter?: CalculatorListFilter,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<CalculatorSummary>>>;
  /** Returns published + public calculators for marketing surfaces. */
  listPublished(
    filter?: Omit<CalculatorListFilter, "status" | "visibility">,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<CalculatorSummary>>>;
}
