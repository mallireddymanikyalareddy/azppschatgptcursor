import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

/**
 * Maps builder state → domain calculator-shaped JSON (CMS / catalog compatible).
 */
export function toDomainCalculator(
  definition: CalculatorBuilderDefinition,
): Record<string, unknown> {
  const { metadata, inputs, formulas, results, charts, seo, content } =
    definition;

  return {
    id: metadata.id,
    name: metadata.name,
    slug: metadata.slug,
    description: metadata.description,
    category: {
      id: metadata.categoryId,
      slug: metadata.categorySlug,
      name: metadata.categoryName,
    },
    subcategory: metadata.subcategory,
    difficulty: metadata.difficulty,
    version: metadata.version,
    status: metadata.status,
    visibility: metadata.visibility,
    tags: metadata.tags,
    icon: metadata.icon,
    variables: inputs.map((input) => ({
      id: input.id,
      name: input.name,
      label: input.label,
      type: input.type,
      required: input.required,
      unit: input.unit,
      defaultValue: input.defaultValue,
      validation: input.validation,
      helpText: input.helpText,
      order: input.order,
    })),
    formulas: formulas.map((formula) => ({
      id: formula.id,
      key: formula.key,
      name: formula.name,
      expression: formula.expression,
      variables: formula.variables,
      dependencies: formula.dependencies,
      precision: formula.precision,
      order: formula.order,
    })),
    results: results.map((result) => ({
      id: result.id,
      key: result.key,
      label: result.label,
      type: result.type,
      format: result.format,
      order: result.order,
    })),
    charts: charts.map((chart) => ({
      id: chart.id,
      title: chart.title,
      kind: chart.kind,
      seriesMappings: chart.seriesMappings,
      order: chart.order,
    })),
    seo: {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      canonical: seo.canonical,
      openGraph: {
        title: seo.ogTitle,
        description: seo.ogDescription,
        image: seo.ogImage,
      },
      jsonLd: seo.schemaPlaceholder ?? null,
    },
    content: {
      introduction: content.introduction,
      formulaExplanation: content.formulaExplanation,
      howItWorks: content.howItWorks,
      examples: content.examples,
      faqs: content.faqs,
      tips: content.tips,
      references: content.references,
    },
    schemaVersion: definition.schemaVersion,
    definitionVersion: definition.definitionVersion,
    createdAt: definition.createdAt,
    updatedAt: definition.updatedAt,
  };
}
