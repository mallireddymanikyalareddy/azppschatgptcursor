import { BUILDER_SCHEMA_VERSION } from "@/features/calculator-builder/constants/enums";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";

export function createBuilderId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyBuilderDefinition(
  overrides?: Partial<CalculatorBuilderDefinition>,
): CalculatorBuilderDefinition {
  const now = new Date().toISOString();
  const id = createBuilderId("calc");

  return {
    schemaVersion: BUILDER_SCHEMA_VERSION,
    definitionVersion: "1.0.0",
    metadata: {
      id,
      name: "",
      slug: "",
      description: "",
      categoryId: "cat_general",
      categorySlug: "general",
      categoryName: "General",
      difficulty: CalculatorDifficulty.Beginner,
      version: "1.0.0",
      status: CalculatorStatus.Draft,
      visibility: Visibility.Private,
      tags: [],
    },
    inputs: [],
    formulas: [],
    results: [],
    charts: [],
    seo: {
      title: "",
      description: "",
      keywords: [],
    },
    content: {
      introduction: "",
      formulaExplanation: "",
      howItWorks: "",
      examples: [],
      faqs: [],
      tips: [],
      references: [],
    },
    breakdowns: [],
    recommendations: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
