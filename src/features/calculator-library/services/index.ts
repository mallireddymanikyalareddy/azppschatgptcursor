import { MOCK_LIBRARY_CALCULATORS } from "@/features/calculator-library/data/mock-calculators";
import { MockCalculatorRepository } from "@/features/calculator-library/repositories/mock-repository";
import { CalculatorLibraryService } from "@/features/calculator-library/services/library-service";

export const mockCalculatorRepository = new MockCalculatorRepository(
  MOCK_LIBRARY_CALCULATORS,
);

/** Default library service wired to the in-memory mock repository. */
export const calculatorLibraryService = new CalculatorLibraryService(
  mockCalculatorRepository,
);
