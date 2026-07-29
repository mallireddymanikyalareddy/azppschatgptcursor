import { BUILDER_SCHEMA_VERSION } from "@/features/calculator-builder/constants/enums";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import type { TemplateDifficulty } from "@/features/calculator-templates/constants/enums";

function mapDifficulty(
  difficulty: TemplateDifficulty,
): (typeof CalculatorDifficulty)[keyof typeof CalculatorDifficulty] {
  switch (difficulty) {
    case "beginner":
      return CalculatorDifficulty.Beginner;
    case "intermediate":
      return CalculatorDifficulty.Intermediate;
    case "advanced":
      return CalculatorDifficulty.Advanced;
    case "expert":
      return CalculatorDifficulty.Expert;
    default:
      return CalculatorDifficulty.Beginner;
  }
}

function mapStatus(
  status: CalculatorTemplate["metadata"]["status"],
): (typeof CalculatorStatus)[keyof typeof CalculatorStatus] {
  switch (status) {
    case "published":
      return CalculatorStatus.Published;
    case "archived":
      return CalculatorStatus.Archived;
    default:
      return CalculatorStatus.Draft;
  }
}

function slugifyCategory(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Maps a CalculatorTemplate into CalculatorBuilderDefinition.
 * Does not modify builder core — pure projection for "Create from template".
 */
export class TemplateGenerator {
  generate(template: CalculatorTemplate): CalculatorBuilderDefinition {
    const { metadata } = template;
    const now = new Date().toISOString();
    const categorySlug = slugifyCategory(metadata.category);

    return {
      schemaVersion: BUILDER_SCHEMA_VERSION,
      definitionVersion: metadata.version,
      metadata: {
        id: `calc_from_${metadata.id}`,
        name: metadata.name,
        slug: metadata.slug,
        description: metadata.description,
        categoryId: `cat_${categorySlug}`,
        categorySlug,
        categoryName: metadata.category,
        subcategory: metadata.subcategory,
        difficulty: mapDifficulty(metadata.difficulty),
        version: metadata.version,
        status: mapStatus(metadata.status),
        visibility: Visibility.Private,
        tags: [...metadata.tags],
      },
      inputs: template.inputs.inputs
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((input) => ({
          id: input.id,
          label: input.label,
          name: input.name,
          type: input.type,
          placeholder: input.placeholder,
          defaultValue: input.defaultValue,
          required: input.required,
          validation: input.validation,
          unit: input.unit,
          prefix: input.prefix,
          suffix: input.suffix,
          helpText: input.helpText,
          min: input.min,
          max: input.max,
          step: input.step,
          options: input.options,
          order: input.order,
        })),
      formulas: template.formulas.formulas
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          id: item.id,
          name: item.name,
          key: item.key,
          expression: item.expression,
          variables: item.variables,
          dependencies: item.dependencies,
          precision: item.precision,
          currency: item.currency,
          percentage: item.percentage,
          description: item.description,
          order: item.order,
        })),
      results: template.results.metrics
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => ({ ...item })),
      charts: template.charts.charts
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          id: item.id,
          title: item.title,
          kind: item.kind,
          seriesMappings: item.seriesMappings,
          order: item.order,
        })),
      seo: {
        title: template.seo.titleTemplate.replace("{{brand}}", "AZPPS"),
        description: template.seo.descriptionTemplate,
        keywords: [...template.seo.keywordTemplate],
        canonical: template.seo.canonicalPattern?.replace(
          "{{slug}}",
          metadata.slug,
        ),
        ogTitle: template.seo.ogTitleTemplate,
        ogDescription: template.seo.ogDescriptionTemplate,
        schemaPlaceholder: template.seo.schemaPlaceholder,
      },
      content: {
        introduction: template.content.introduction,
        formulaExplanation: template.content.formulaExplanation,
        howItWorks: template.content.howItWorks,
        examples: template.content.examples,
        faqs: template.content.faqs,
        tips: template.content.tips,
        references: template.content.references,
      },
      breakdowns: template.results.breakdowns,
      recommendations: template.results.recommendations,
      createdAt: metadata.createdAt,
      updatedAt: now,
    };
  }
}

export const templateGenerator = new TemplateGenerator();
