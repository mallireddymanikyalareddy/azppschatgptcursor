import { homeLoanEmiProductionDefinition } from "@/features/calculators/definitions/home-loan-emi";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";

/**
 * Production calculator registry.
 * Each entry is publicly available at `/{slug}` (e.g. /home-loan-emi).
 * Register new calculators here — do not add /calculators/ routes.
 */
const REGISTRY: Record<string, ProductionCalculatorDefinition> = {
  [homeLoanEmiProductionDefinition.slug]: homeLoanEmiProductionDefinition,
};

export function getCalculatorDefinition(
  slug: string,
): ProductionCalculatorDefinition | null {
  return REGISTRY[slug] ?? null;
}

export function listCalculatorDefinitions(): ProductionCalculatorDefinition[] {
  return Object.values(REGISTRY);
}

export function getCalculatorSlugs(): string[] {
  return Object.keys(REGISTRY);
}
