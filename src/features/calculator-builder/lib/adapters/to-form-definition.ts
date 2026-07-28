import { FormLayout } from "@/features/form-engine/constants/enums";
import type { FormDefinition } from "@/features/form-engine/types";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

/**
 * Maps builder inputs → Dynamic Form Engine definition.
 */
export function toFormDefinition(
  definition: CalculatorBuilderDefinition,
): FormDefinition {
  const { metadata, inputs } = definition;
  const sectionId = "section_inputs";

  return {
    id: `form_${metadata.slug || metadata.id}`,
    name: metadata.name || "Untitled calculator",
    description: metadata.description || undefined,
    calculatorId: metadata.id,
    calculatorSlug: metadata.slug || undefined,
    layout: FormLayout.TwoColumn,
    submitLabel: "Calculate",
    resetLabel: "Reset",
    showReset: true,
    sections: [
      {
        id: sectionId,
        title: "Inputs",
        description: "Calculator inputs configured in the builder.",
        layout: FormLayout.TwoColumn,
        order: 1,
      },
    ],
    fields: [...inputs]
      .sort((a, b) => a.order - b.order)
      .map((input) => ({
        id: input.id,
        name: input.name,
        type: input.type,
        label: input.label,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue ?? undefined,
        required: input.required,
        helpText: input.helpText,
        tooltip: input.tooltip,
        prefix: input.prefix,
        suffix: input.suffix,
        unit: input.unit,
        min: input.min,
        max: input.max,
        step: input.step,
        options: input.options,
        validation: input.validation,
        sectionId,
        order: input.order,
        colSpan: 1 as const,
      })),
  };
}
