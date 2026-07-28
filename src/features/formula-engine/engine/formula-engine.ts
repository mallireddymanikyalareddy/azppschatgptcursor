import { FormulaErrorCode } from "@/features/formula-engine/constants/enums";
import { resolveDependencies } from "@/features/formula-engine/dependencies/resolve";
import { evaluateAst } from "@/features/formula-engine/executor/evaluate";
import type { FunctionRegistry } from "@/features/formula-engine/functions/registry";
import { defaultFunctionRegistry } from "@/features/formula-engine/functions/registry";
import { parseExpression } from "@/features/formula-engine/parser/parse";
import { validateAst } from "@/features/formula-engine/validator/validate";
import type {
  EvaluateOptions,
  FormulaDefinition,
  FormulaExecutionResult,
  FormulaIssue,
  FormulaProgram,
  ParseResult,
  ProgramExecutionResult,
  ValidationResult,
  VariableValues,
} from "@/features/formula-engine/types";

export type FormulaEngineOptions = {
  registry?: FunctionRegistry;
};

function toFiniteBag(
  values: VariableValues,
  constants: Record<string, number> = {},
): { map: Record<string, number>; errors: FormulaIssue[] } {
  const map: Record<string, number> = { ...constants };
  const errors: FormulaIssue[] = [];

  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined) {
      errors.push({
        code: FormulaErrorCode.MissingInput,
        message: `Missing input for variable '${key}'`,
        path: key,
      });
      continue;
    }
    if (typeof value !== "number" || !Number.isFinite(value)) {
      errors.push({
        code: FormulaErrorCode.MissingInput,
        message: `Variable '${key}' must be a finite number`,
        path: key,
      });
      continue;
    }
    map[key] = value;
  }

  return { map, errors };
}

/**
 * Secure formula engine facade.
 * Pipeline: parse → validate → (optional deps) → evaluate.
 */
export class FormulaEngine {
  private readonly registry: FunctionRegistry;

  constructor(options: FormulaEngineOptions = {}) {
    this.registry = options.registry ?? defaultFunctionRegistry;
  }

  parse(expression: string): ParseResult {
    return parseExpression(expression);
  }

  validate(
    expression: string,
    knownNames: Iterable<string>,
  ): ValidationResult & { parse: ParseResult } {
    const parse = this.parse(expression);
    if (!parse.success) {
      return {
        valid: false,
        errors: parse.errors,
        warnings: [],
        referencedVariables: [],
        referencedFunctions: [],
        parse,
      };
    }

    const validation = validateAst(parse.ast, {
      knownNames: new Set(knownNames),
      registry: this.registry,
    });

    return { ...validation, parse };
  }

  evaluateExpression(
    expression: string,
    options: EvaluateOptions & Partial<FormulaDefinition>,
  ): FormulaExecutionResult {
    const started = performance.now();
    const constants = options.constants ?? {};
    const { map, errors: inputErrors } = toFiniteBag(options.values, constants);

    if (inputErrors.length > 0) {
      // Allow partial maps — missing vars fail at evaluation if referenced.
    }

    const known = new Set([
      ...Object.keys(map),
      ...Object.keys(options.values),
      ...Object.keys(constants),
      ...(options.variables ?? []),
    ]);

    const validated = this.validate(expression, known);
    if (!validated.valid || !validated.parse.success) {
      return {
        formulaId: options.id ?? "inline",
        key: options.key ?? "result",
        value: null,
        success: false,
        errors: validated.errors,
        warnings: validated.warnings,
        durationMs: performance.now() - started,
      };
    }

    const evaluated = evaluateAst(validated.parse.ast, {
      values: map,
      registry: this.registry,
      precision: options.precision,
      roundingMode: options.roundingMode,
      currency: options.currency,
      percentage: options.percentage,
      defaultPrecision: options.defaultPrecision,
    });

    return {
      formulaId: options.id ?? "inline",
      key: options.key ?? "result",
      value: evaluated.value,
      success: evaluated.success,
      errors: [
        ...inputErrors.filter((e) =>
          validated.referencedVariables.includes(e.path ?? ""),
        ),
        ...evaluated.errors,
      ],
      warnings: evaluated.warnings,
      durationMs: performance.now() - started,
    };
  }

  evaluateProgram(
    program: FormulaProgram,
    options: EvaluateOptions,
  ): ProgramExecutionResult {
    const started = performance.now();
    const constants = {
      ...(program.constants ?? {}),
      ...(options.constants ?? {}),
    };
    const { map } = toFiniteBag(options.values, constants);
    const errors: FormulaIssue[] = [];
    const warnings: ProgramExecutionResult["warnings"] = [];
    const executions: FormulaExecutionResult[] = [];

    const deps = resolveDependencies(program);
    if (!deps.success) {
      return {
        success: false,
        results: {},
        executions: [],
        errors: deps.errors,
        warnings: [],
        durationMs: performance.now() - started,
        values: map,
      };
    }

    const byId = new Map(program.formulas.map((f) => [f.id, f]));
    const results: Record<string, number> = {};

    for (const formulaId of deps.graph.order) {
      const formula = byId.get(formulaId);
      if (!formula) {
        errors.push({
          code: FormulaErrorCode.UnknownFormula,
          message: `Unknown formula '${formulaId}'`,
          path: formulaId,
        });
        continue;
      }

      const env = { ...map, ...results };
      const known = new Set([
        ...Object.keys(env),
        ...(formula.variables ?? []),
      ]);

      const formulaStarted = performance.now();
      const validated = this.validate(formula.expression, known);

      if (!validated.valid || !validated.parse.success) {
        const execution: FormulaExecutionResult = {
          formulaId: formula.id,
          key: formula.key,
          value: null,
          success: false,
          errors: validated.errors,
          warnings: validated.warnings,
          durationMs: performance.now() - formulaStarted,
        };
        executions.push(execution);
        errors.push(...validated.errors);
        break;
      }

      const evaluated = evaluateAst(validated.parse.ast, {
        values: env,
        registry: this.registry,
        precision: formula.precision,
        roundingMode: formula.roundingMode,
        currency: formula.currency,
        percentage: formula.percentage,
        defaultPrecision: options.defaultPrecision,
      });

      const execution: FormulaExecutionResult = {
        formulaId: formula.id,
        key: formula.key,
        value: evaluated.value,
        success: evaluated.success,
        errors: evaluated.errors,
        warnings: evaluated.warnings,
        durationMs: performance.now() - formulaStarted,
      };
      executions.push(execution);
      warnings.push(...evaluated.warnings);

      if (!evaluated.success || evaluated.value === null) {
        errors.push(...evaluated.errors);
        break;
      }

      results[formula.key] = evaluated.value;
    }

    return {
      success: errors.length === 0,
      results,
      executions,
      errors,
      warnings,
      durationMs: performance.now() - started,
      values: { ...map, ...results },
    };
  }
}

export const formulaEngine = new FormulaEngine();
