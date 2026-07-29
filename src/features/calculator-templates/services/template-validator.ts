import type {
  CalculatorTemplate,
  TemplateValidationIssue,
  TemplateValidationReport,
} from "@/features/calculator-templates/types";

/**
 * Configuration-driven template validator.
 * Ensures blueprints are complete enough to generate a builder definition.
 */
export class TemplateValidator {
  validate(template: CalculatorTemplate): TemplateValidationReport {
    const issues: TemplateValidationIssue[] = [];
    const { metadata, inputs, formulas, results, seo, content } = template;

    if (!metadata.name.trim()) {
      issues.push({
        code: "META_NAME",
        message: "Template name is required.",
        path: "metadata.name",
        severity: "error",
      });
    }
    if (!metadata.slug.trim()) {
      issues.push({
        code: "META_SLUG",
        message: "Template slug is required.",
        path: "metadata.slug",
        severity: "error",
      });
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
      issues.push({
        code: "META_SLUG_FORMAT",
        message: "Slug must be lowercase kebab-case.",
        path: "metadata.slug",
        severity: "error",
      });
    }

    if (inputs.inputs.length === 0) {
      issues.push({
        code: "INPUT_EMPTY",
        message: "At least one input is required.",
        path: "inputs",
        severity: "error",
      });
    }

    const inputNames = new Set<string>();
    for (const input of inputs.inputs) {
      if (!input.name.trim()) {
        issues.push({
          code: "INPUT_NAME",
          message: `Input “${input.label || input.id}” is missing a name.`,
          path: `inputs.${input.id}`,
          severity: "error",
        });
      }
      if (inputNames.has(input.name)) {
        issues.push({
          code: "INPUT_DUP",
          message: `Duplicate input name “${input.name}”.`,
          path: `inputs.${input.id}`,
          severity: "error",
        });
      }
      inputNames.add(input.name);
    }

    if (formulas.formulas.length === 0) {
      issues.push({
        code: "FORMULA_EMPTY",
        message: "At least one formula is required.",
        path: "formulas",
        severity: "error",
      });
    }

    const formulaKeys = new Set(formulas.formulas.map((f) => f.key));
    for (const item of formulas.formulas) {
      if (!item.expression.trim()) {
        issues.push({
          code: "FORMULA_EXPR",
          message: `Formula “${item.name}” has an empty expression.`,
          path: `formulas.${item.id}`,
          severity: "error",
        });
      }
      for (const dep of item.dependencies) {
        if (!formulaKeys.has(dep) && !inputNames.has(dep)) {
          issues.push({
            code: "FORMULA_DEP",
            message: `Formula “${item.name}” depends on unknown key “${dep}”.`,
            path: `formulas.${item.id}`,
            severity: "warning",
          });
        }
      }
    }

    if (results.metrics.length === 0) {
      issues.push({
        code: "RESULT_EMPTY",
        message: "At least one result metric is required.",
        path: "results",
        severity: "error",
      });
    }

    for (const metric of results.metrics) {
      if (!formulaKeys.has(metric.key) && !inputNames.has(metric.key)) {
        issues.push({
          code: "RESULT_KEY",
          message: `Metric “${metric.label}” references unknown key “${metric.key}”.`,
          path: `results.${metric.id}`,
          severity: "warning",
        });
      }
    }

    if (!seo.titleTemplate.trim()) {
      issues.push({
        code: "SEO_TITLE",
        message: "SEO title template is recommended.",
        path: "seo.titleTemplate",
        severity: "warning",
      });
    }

    if (!content.introduction.trim()) {
      issues.push({
        code: "CONTENT_INTRO",
        message: "Introduction content is recommended.",
        path: "content.introduction",
        severity: "warning",
      });
    }

    if (!metadata.seoReady) {
      issues.push({
        code: "SEO_FLAG",
        message: "Template is not marked SEO ready.",
        path: "metadata.seoReady",
        severity: "warning",
      });
    }

    return {
      valid: !issues.some((issue) => issue.severity === "error"),
      issues,
    };
  }
}

export const templateValidator = new TemplateValidator();
