/**
 * Calculator Library — catalog management hub for 10k+ calculators.
 * Mock repository today; swap for database-backed repository later.
 */

export type * from "@/features/calculator-library/types";
export { MOCK_LIBRARY_CALCULATORS } from "@/features/calculator-library/data/mock-calculators";
export { MockCalculatorRepository } from "@/features/calculator-library/repositories/mock-repository";
export {
  calculatorLibraryService,
  mockCalculatorRepository,
} from "@/features/calculator-library/services";
export {
  CalculatorFilterService,
  calculatorFilterService,
} from "@/features/calculator-library/services/filter-service";
export {
  CalculatorSearchService,
  calculatorSearchService,
} from "@/features/calculator-library/services/search-service";
export { CalculatorLibraryService } from "@/features/calculator-library/services/library-service";
export * from "@/features/calculator-library/hooks";
export { CalculatorLibraryPage } from "@/features/calculator-library/components/calculator-library-page";
