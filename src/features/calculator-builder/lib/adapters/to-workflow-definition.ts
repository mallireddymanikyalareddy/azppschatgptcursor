import type { CalculatorWorkflowDefinition } from "@/features/calculation-engine/types";
import type { FormulaProgram } from "@/features/formula-engine/types";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

/**
 * Maps builder formulas + inputs → Calculation Engine workflow.
 * Variable names are aligned: form field name === calculation input name.
 */
export function toWorkflowDefinition(
  definition: CalculatorBuilderDefinition,
): CalculatorWorkflowDefinition {
  const { metadata, inputs, formulas, results } = definition;

  const program: FormulaProgram = {
    id: `prog_${metadata.slug || metadata.id}`,
    name: metadata.name || "Untitled program",
    description: metadata.description || undefined,
    formulas: [...formulas]
      .sort((a, b) => a.order - b.order)
      .map((formula) => ({
        id: formula.id,
        key: formula.key,
        name: formula.name,
        expression: formula.expression,
        variables: formula.variables.length ? formula.variables : undefined,
        dependencies: formula.dependencies.length
          ? formula.dependencies
          : undefined,
        precision: formula.precision,
        currency: formula.currency,
        percentage: formula.percentage,
        description: formula.description,
      })),
  };

  const formulaKeys = new Set(formulas.map((f) => f.key));
  const outputsFromResults = [...results]
    .sort((a, b) => a.order - b.order)
    .filter((r) => formulaKeys.has(r.key))
    .map((r) => ({
      key: r.key,
      label: r.label,
      format: r.format,
      precision: r.precision,
      currency: r.currency,
    }));

  const covered = new Set(outputsFromResults.map((o) => o.key));
  const remaining = formulas
    .filter((f) => f.key && !covered.has(f.key))
    .sort((a, b) => a.order - b.order)
    .map((f) => ({
      key: f.key,
      label: f.name,
      format: f.currency
        ? ("currency" as const)
        : f.percentage
          ? ("percentage" as const)
          : ("decimal" as const),
      precision: f.precision,
      currency: f.currency ? "INR" : undefined,
      internal: true,
    }));

  return {
    id: metadata.id,
    slug: metadata.slug || metadata.id,
    name: metadata.name || "Untitled calculator",
    description: metadata.description || undefined,
    inputs: [...inputs]
      .sort((a, b) => a.order - b.order)
      .map((input) => ({
        name: input.name,
        label: input.label,
        required: input.required,
        defaultValue:
          typeof input.defaultValue === "number"
            ? input.defaultValue
            : undefined,
        min: input.min,
        max: input.max,
        coerceNumber: true,
      })),
    program,
    outputs: [...outputsFromResults, ...remaining],
    metadata: {
      schemaVersion: definition.schemaVersion,
      definitionVersion: definition.definitionVersion,
    },
  };
}
