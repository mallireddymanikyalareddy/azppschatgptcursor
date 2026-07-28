import {
  FormulaErrorCode,
  RoundingMode,
} from "@/features/formula-engine/constants/enums";
import type { FunctionRegistry } from "@/features/formula-engine/functions/registry";
import { defaultFunctionRegistry } from "@/features/formula-engine/functions/registry";
import {
  applyPrecision,
  resolvePrecision,
} from "@/features/formula-engine/precision/apply-precision";
import type {
  AstNode,
  FormulaIssue,
  FormulaWarning,
} from "@/features/formula-engine/types";

export type EvaluateAstOptions = {
  values: Record<string, number>;
  registry?: FunctionRegistry;
  precision?: number;
  roundingMode?: (typeof RoundingMode)[keyof typeof RoundingMode];
  currency?: boolean;
  percentage?: boolean;
  defaultPrecision?: number;
};

export type EvaluateAstResult = {
  success: boolean;
  value: number | null;
  errors: FormulaIssue[];
  warnings: FormulaWarning[];
};

function evalNode(
  node: AstNode,
  values: Record<string, number>,
  registry: FunctionRegistry,
  errors: FormulaIssue[],
): number | null {
  switch (node.kind) {
    case "number":
      return node.value;
    case "variable": {
      if (!(node.name in values)) {
        errors.push({
          code: FormulaErrorCode.MissingInput,
          message: `Missing input for variable '${node.name}'`,
          path: node.name,
        });
        return null;
      }
      const value = values[node.name]!;
      if (!Number.isFinite(value)) {
        errors.push({
          code: FormulaErrorCode.MissingInput,
          message: `Variable '${node.name}' is not a finite number`,
          path: node.name,
        });
        return null;
      }
      return value;
    }
    case "unary": {
      const arg = evalNode(node.argument, values, registry, errors);
      if (arg === null) return null;
      return node.operator === "-" ? -arg : arg;
    }
    case "binary": {
      const left = evalNode(node.left, values, registry, errors);
      if (left === null) return null;
      const right = evalNode(node.right, values, registry, errors);
      if (right === null) return null;

      let result: number;
      switch (node.operator) {
        case "+":
          result = left + right;
          break;
        case "-":
          result = left - right;
          break;
        case "*":
          result = left * right;
          break;
        case "/":
          if (right === 0) {
            errors.push({
              code: FormulaErrorCode.DivideByZero,
              message: "Division by zero",
            });
            return null;
          }
          result = left / right;
          break;
        case "%":
          if (right === 0) {
            errors.push({
              code: FormulaErrorCode.DivideByZero,
              message: "Modulo by zero",
            });
            return null;
          }
          result = left % right;
          break;
        case "^":
          result = left ** right;
          break;
        default:
          errors.push({
            code: FormulaErrorCode.UnsupportedOperator,
            message: `Unsupported operator`,
          });
          return null;
      }

      if (!Number.isFinite(result)) {
        errors.push({
          code: FormulaErrorCode.Overflow,
          message: "Arithmetic overflow or non-finite result",
        });
        return null;
      }
      return result;
    }
    case "call": {
      const fn = registry.get(node.name);
      if (!fn) {
        errors.push({
          code: FormulaErrorCode.InvalidFunction,
          message: `Unsupported function '${node.name}'`,
          path: node.name,
        });
        return null;
      }
      const args: number[] = [];
      for (const argNode of node.args) {
        const arg = evalNode(argNode, values, registry, errors);
        if (arg === null) return null;
        args.push(arg);
      }
      const out = fn.impl(args);
      if (typeof out === "object") {
        errors.push(out.error);
        return null;
      }
      return out;
    }
    default:
      errors.push({
        code: FormulaErrorCode.InvalidFormula,
        message: "Unknown AST node",
      });
      return null;
  }
}

/**
 * Evaluates a validated AST against a numeric environment.
 * Safe: walks the tree only — never eval/Function.
 */
export function evaluateAst(
  ast: AstNode,
  options: EvaluateAstOptions,
): EvaluateAstResult {
  const errors: FormulaIssue[] = [];
  const warnings: FormulaWarning[] = [];
  const registry = options.registry ?? defaultFunctionRegistry;
  const raw = evalNode(ast, options.values, registry, errors);

  if (raw === null || errors.length > 0) {
    return { success: false, value: null, errors, warnings };
  }

  const precision = resolvePrecision({
    precision: options.precision,
    currency: options.currency,
    percentage: options.percentage,
    defaultPrecision: options.defaultPrecision,
  });
  const mode = options.roundingMode ?? RoundingMode.HalfUp;
  const value = applyPrecision(raw, precision, mode);

  return { success: true, value, errors, warnings };
}
