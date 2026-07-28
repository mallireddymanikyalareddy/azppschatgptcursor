import { toDomainCalculator } from "@/features/calculator-builder/lib/adapters/to-domain-calculator";
import { toFormDefinition } from "@/features/calculator-builder/lib/adapters/to-form-definition";
import { toResultsViewDefinition } from "@/features/calculator-builder/lib/adapters/to-results-view";
import { toWorkflowDefinition } from "@/features/calculator-builder/lib/adapters/to-workflow-definition";
import type {
  CalculatorBuilderDefinition,
  CalculatorDefinitionBundle,
} from "@/features/calculator-builder/types";

/**
 * Generates the complete multi-engine calculator definition bundle.
 */
export function generateCalculatorDefinitionBundle(
  definition: CalculatorBuilderDefinition,
): CalculatorDefinitionBundle {
  return {
    schemaVersion: definition.schemaVersion,
    definitionVersion: definition.definitionVersion,
    builder: definition,
    domain: toDomainCalculator(definition),
    form: toFormDefinition(definition) as unknown as Record<string, unknown>,
    workflow: toWorkflowDefinition(definition) as unknown as Record<
      string,
      unknown
    >,
    resultsView: toResultsViewDefinition(definition) as unknown as Record<
      string,
      unknown
    >,
  };
}

export function stringifyDefinitionBundle(
  bundle: CalculatorDefinitionBundle,
  pretty = true,
): string {
  return JSON.stringify(bundle, null, pretty ? 2 : undefined);
}

export function stringifyBuilderDefinition(
  definition: CalculatorBuilderDefinition,
  pretty = true,
): string {
  return JSON.stringify(definition, null, pretty ? 2 : undefined);
}
