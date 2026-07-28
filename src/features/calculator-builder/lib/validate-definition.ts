import { FormulaEngine } from "@/features/formula-engine";
import type {
  BuilderValidationIssue,
  BuilderValidationReport,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

const formulaEngine = new FormulaEngine();

/**
 * Validates a builder definition for metadata, uniqueness, formulas, and outputs.
 */
export function validateBuilderDefinition(
  definition: CalculatorBuilderDefinition,
): BuilderValidationReport {
  const issues: BuilderValidationIssue[] = [];
  const { metadata, inputs, formulas, results, seo, content } = definition;

  if (!metadata.name.trim()) {
    issues.push({
      code: "METADATA_NAME_REQUIRED",
      message: "Calculator name is required.",
      path: "metadata.name",
      severity: "error",
    });
  }

  if (!metadata.slug.trim()) {
    issues.push({
      code: "METADATA_SLUG_REQUIRED",
      message: "Calculator slug is required.",
      path: "metadata.slug",
      severity: "error",
    });
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
    issues.push({
      code: "METADATA_SLUG_INVALID",
      message: "Slug must be lowercase kebab-case.",
      path: "metadata.slug",
      severity: "error",
    });
  }

  if (!metadata.description.trim()) {
    issues.push({
      code: "METADATA_DESCRIPTION_MISSING",
      message: "Description is recommended for discovery.",
      path: "metadata.description",
      severity: "warning",
    });
  }

  if (!metadata.categoryId.trim()) {
    issues.push({
      code: "METADATA_CATEGORY_REQUIRED",
      message: "Category is required.",
      path: "metadata.categoryId",
      severity: "error",
    });
  }

  if (inputs.length === 0) {
    issues.push({
      code: "INPUTS_REQUIRED",
      message: "At least one input is required.",
      path: "inputs",
      severity: "error",
    });
  }

  const inputNames = new Map<string, string>();
  for (const input of inputs) {
    if (!input.label.trim()) {
      issues.push({
        code: "INPUT_LABEL_REQUIRED",
        message: `Input "${input.id}" needs a label.`,
        path: `inputs.${input.id}.label`,
        severity: "error",
      });
    }
    if (!input.name.trim()) {
      issues.push({
        code: "INPUT_NAME_REQUIRED",
        message: `Input "${input.label || input.id}" needs a variable name.`,
        path: `inputs.${input.id}.name`,
        severity: "error",
      });
      continue;
    }
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(input.name)) {
      issues.push({
        code: "INPUT_NAME_INVALID",
        message: `Variable "${input.name}" must be a valid identifier.`,
        path: `inputs.${input.id}.name`,
        severity: "error",
      });
    }
    const existing = inputNames.get(input.name);
    if (existing) {
      issues.push({
        code: "DUPLICATE_VARIABLE",
        message: `Duplicate variable name "${input.name}".`,
        path: `inputs.${input.id}.name`,
        severity: "error",
      });
    } else {
      inputNames.set(input.name, input.id);
    }
  }

  if (formulas.length === 0) {
    issues.push({
      code: "FORMULAS_REQUIRED",
      message: "At least one formula is required.",
      path: "formulas",
      severity: "error",
    });
  }

  const formulaIds = new Set(formulas.map((f) => f.id));
  const formulaKeys = new Map<string, string>();
  const knownNames = new Set<string>([
    ...inputs.map((i) => i.name).filter(Boolean),
  ]);

  const ordered = [...formulas].sort((a, b) => a.order - b.order);
  for (const formula of ordered) {
    if (!formula.name.trim()) {
      issues.push({
        code: "FORMULA_NAME_REQUIRED",
        message: `Formula "${formula.id}" needs a name.`,
        path: `formulas.${formula.id}.name`,
        severity: "error",
      });
    }
    if (!formula.key.trim()) {
      issues.push({
        code: "FORMULA_KEY_REQUIRED",
        message: `Formula "${formula.name || formula.id}" needs an output variable.`,
        path: `formulas.${formula.id}.key`,
        severity: "error",
      });
    } else if (formulaKeys.has(formula.key)) {
      issues.push({
        code: "DUPLICATE_OUTPUT",
        message: `Duplicate output variable "${formula.key}".`,
        path: `formulas.${formula.id}.key`,
        severity: "error",
      });
    } else {
      formulaKeys.set(formula.key, formula.id);
    }

    if (!formula.expression.trim()) {
      issues.push({
        code: "FORMULA_EXPRESSION_REQUIRED",
        message: `Formula "${formula.name || formula.key}" needs an expression.`,
        path: `formulas.${formula.id}.expression`,
        severity: "error",
      });
    } else {
      const validation = formulaEngine.validate(formula.expression, [
        ...knownNames,
      ]);
      if (!validation.valid) {
        for (const err of validation.errors) {
          issues.push({
            code: "FORMULA_ERROR",
            message: `${formula.name || formula.key}: ${err.message}`,
            path: `formulas.${formula.id}.expression`,
            severity: "error",
          });
        }
      }
      for (const warning of validation.warnings) {
        issues.push({
          code: "FORMULA_WARNING",
          message: `${formula.name || formula.key}: ${warning.message}`,
          path: `formulas.${formula.id}.expression`,
          severity: "warning",
        });
      }
    }

    for (const dep of formula.dependencies) {
      if (!formulaIds.has(dep)) {
        issues.push({
          code: "BROKEN_DEPENDENCY",
          message: `Formula "${formula.name || formula.key}" depends on missing formula "${dep}".`,
          path: `formulas.${formula.id}.dependencies`,
          severity: "error",
        });
      }
    }

    if (formula.key) {
      knownNames.add(formula.key);
    }
  }

  if (results.length === 0) {
    issues.push({
      code: "RESULTS_REQUIRED",
      message: "At least one result metric is required.",
      path: "results",
      severity: "error",
    });
  }

  const outputKeys = new Set(formulas.map((f) => f.key).filter(Boolean));
  for (const result of results) {
    if (!result.key.trim()) {
      issues.push({
        code: "RESULT_KEY_REQUIRED",
        message: `Result "${result.label || result.id}" needs a key.`,
        path: `results.${result.id}.key`,
        severity: "error",
      });
    } else if (!outputKeys.has(result.key)) {
      issues.push({
        code: "MISSING_OUTPUT",
        message: `Result "${result.label}" references unknown output "${result.key}".`,
        path: `results.${result.id}.key`,
        severity: "error",
      });
    }
  }

  if (!seo.title.trim()) {
    issues.push({
      code: "SEO_TITLE_MISSING",
      message: "SEO title is recommended.",
      path: "seo.title",
      severity: "warning",
    });
  }

  if (!content.introduction.trim()) {
    issues.push({
      code: "CONTENT_INTRO_MISSING",
      message: "Introduction content is recommended.",
      path: "content.introduction",
      severity: "warning",
    });
  }

  const hasErrors = issues.some((i) => i.severity === "error");
  return { valid: !hasErrors, issues };
}
