import { toFormDefinition } from "@/features/calculator-builder/lib/adapters/to-form-definition";
import { toResultsViewDefinition } from "@/features/calculator-builder/lib/adapters/to-results-view";
import { toWorkflowDefinition } from "@/features/calculator-builder/lib/adapters/to-workflow-definition";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import { MOCK_CALCULATOR_TEMPLATES } from "@/features/calculator-templates/data/mock-templates";
import { templateGenerator } from "@/features/calculator-templates/services";

/**
 * Builds a runtime engine definition from a Calculator Template.
 * Does not modify Template System or Builder core — adapters only.
 */
export function engineFromTemplateSlug(
  templateSlug: string,
  overrides?: Partial<
    Pick<ProductionCalculatorDefinition, "name" | "description" | "slug">
  >,
): ProductionCalculatorDefinition {
  const template = MOCK_CALCULATOR_TEMPLATES.find(
    (item) => item.metadata.slug === templateSlug,
  );
  if (!template) {
    throw new Error(`Template not found for slug: ${templateSlug}`);
  }

  const builder = templateGenerator.generate(template);
  const form = toFormDefinition(builder);
  const workflow = toWorkflowDefinition(builder);
  const resultsView = toResultsViewDefinition(builder);

  const fields: Record<string, string> = {};
  for (const field of form.fields) {
    fields[field.name] = field.name;
  }

  const slug = overrides?.slug ?? template.metadata.slug;
  return {
    id: `public_${template.metadata.id}`,
    slug,
    name: overrides?.name ?? `${template.metadata.name} Calculator`,
    description: overrides?.description ?? template.metadata.description,
    locale: "en-IN",
    currency: "INR",
    form,
    workflow,
    resultsView,
    inputMapping: { fields },
    seo: {
      title: builder.seo.title,
      description: builder.seo.description,
      keywords: builder.seo.keywords,
    },
    content: {
      introduction: builder.content.introduction,
      howItWorks: builder.content.howItWorks,
      formulaExplanation: builder.content.formulaExplanation,
    },
  };
}
