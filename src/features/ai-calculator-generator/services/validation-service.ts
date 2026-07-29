import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import type {
  GenerationValidationIssue,
  GenerationValidationReport,
} from "@/features/ai-calculator-generator/types";

/**
 * Validates AI-generated CalculatorBuilderDefinition before human review.
 * Never publishes — validation only.
 */
export class GenerationValidationService {
  validate(
    definition: CalculatorBuilderDefinition,
  ): GenerationValidationReport {
    const issues: GenerationValidationIssue[] = [];

    if (!definition.metadata.name.trim()) {
      issues.push({
        code: "META_NAME",
        message: "Calculator name is required.",
        path: "metadata.name",
        severity: "error",
      });
    }
    if (!definition.metadata.slug.trim()) {
      issues.push({
        code: "META_SLUG",
        message: "Slug is required.",
        path: "metadata.slug",
        severity: "error",
      });
    }

    if (definition.inputs.length === 0) {
      issues.push({
        code: "INPUTS",
        message: "At least one input is required.",
        path: "inputs",
        severity: "error",
      });
    }

    const inputNames = new Set<string>();
    for (const input of definition.inputs) {
      if (inputNames.has(input.name)) {
        issues.push({
          code: "DUP_INPUT",
          message: `Duplicate input variable “${input.name}”.`,
          path: `inputs.${input.id}`,
          severity: "error",
        });
      }
      inputNames.add(input.name);
    }

    if (definition.formulas.length === 0) {
      issues.push({
        code: "FORMULAS",
        message: "At least one formula is required.",
        path: "formulas",
        severity: "error",
      });
    }

    const formulaKeys = new Set(definition.formulas.map((f) => f.key));
    for (const formula of definition.formulas) {
      if (!formula.expression.trim()) {
        issues.push({
          code: "FORMULA_EMPTY",
          message: `Formula “${formula.name}” has an empty expression.`,
          path: `formulas.${formula.id}`,
          severity: "error",
        });
      }
      for (const variable of formula.variables) {
        if (!inputNames.has(variable) && !formulaKeys.has(variable)) {
          issues.push({
            code: "MISSING_VAR",
            message: `Formula “${formula.name}” references missing variable “${variable}”.`,
            path: `formulas.${formula.id}`,
            severity: "warning",
          });
        }
      }
    }

    if (definition.results.length === 0) {
      issues.push({
        code: "RESULTS",
        message: "At least one result metric is required.",
        path: "results",
        severity: "error",
      });
    }

    if (!definition.seo.title.trim() || !definition.seo.description.trim()) {
      issues.push({
        code: "SEO",
        message: "SEO title and description are required.",
        path: "seo",
        severity: "error",
      });
    }
    if (definition.seo.keywords.length === 0) {
      issues.push({
        code: "SEO_KEYWORDS",
        message: "SEO keywords are recommended.",
        path: "seo.keywords",
        severity: "warning",
      });
    }

    if (!definition.content.introduction.trim()) {
      issues.push({
        code: "CONTENT",
        message: "Introduction content is required.",
        path: "content.introduction",
        severity: "error",
      });
    }
    if (definition.content.faqs.length === 0) {
      issues.push({
        code: "FAQS",
        message: "FAQs are recommended.",
        path: "content.faqs",
        severity: "warning",
      });
    }

    return {
      valid: !issues.some((issue) => issue.severity === "error"),
      issues,
    };
  }
}

export const generationValidationService = new GenerationValidationService();
