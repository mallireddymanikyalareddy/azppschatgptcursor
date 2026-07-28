import { FormulaErrorCode } from "@/features/formula-engine/constants/enums";
import type { FunctionRegistry } from "@/features/formula-engine/functions/registry";
import { defaultFunctionRegistry } from "@/features/formula-engine/functions/registry";
import type {
  AstNode,
  FormulaIssue,
  FormulaWarning,
  ValidationResult,
} from "@/features/formula-engine/types";

function walk(node: AstNode, visit: (node: AstNode) => void): void {
  visit(node);
  switch (node.kind) {
    case "unary":
      walk(node.argument, visit);
      break;
    case "binary":
      walk(node.left, visit);
      walk(node.right, visit);
      break;
    case "call":
      for (const arg of node.args) walk(arg, visit);
      break;
    default:
      break;
  }
}

export type ValidateAstOptions = {
  /** Allowed variable / constant names. */
  knownNames: ReadonlySet<string>;
  registry?: FunctionRegistry;
};

/**
 * Semantic validation of a parsed AST against known variables and functions.
 */
export function validateAst(
  ast: AstNode,
  options: ValidateAstOptions,
): ValidationResult {
  const registry = options.registry ?? defaultFunctionRegistry;
  const errors: FormulaIssue[] = [];
  const warnings: FormulaWarning[] = [];
  const referencedVariables = new Set<string>();
  const referencedFunctions = new Set<string>();

  walk(ast, (node) => {
    if (node.kind === "variable") {
      referencedVariables.add(node.name);
      if (!options.knownNames.has(node.name)) {
        errors.push({
          code: FormulaErrorCode.UnknownVariable,
          message: `Unknown variable '${node.name}'`,
          path: node.name,
        });
      }
    }

    if (node.kind === "call") {
      referencedFunctions.add(node.name);
      const fn = registry.get(node.name);
      if (!fn) {
        errors.push({
          code: FormulaErrorCode.InvalidFunction,
          message: `Unsupported function '${node.name}'`,
          path: node.name,
        });
      } else if (
        node.args.length < fn.minArgs ||
        node.args.length > fn.maxArgs
      ) {
        errors.push({
          code: FormulaErrorCode.ArgumentCount,
          message: `Function '${node.name}' expects ${fn.minArgs === fn.maxArgs ? fn.minArgs : `${fn.minArgs}-${fn.maxArgs}`} argument(s), got ${node.args.length}`,
          path: node.name,
        });
      }
    }

    if (node.kind === "binary" && node.operator === "/") {
      if (node.right.kind === "number" && node.right.value === 0) {
        errors.push({
          code: FormulaErrorCode.DivideByZero,
          message: "Division by zero in expression",
        });
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    referencedVariables: [...referencedVariables].sort(),
    referencedFunctions: [...referencedFunctions].sort(),
  };
}

export function collectVariables(ast: AstNode): string[] {
  const names = new Set<string>();
  walk(ast, (node) => {
    if (node.kind === "variable") names.add(node.name);
  });
  return [...names].sort();
}
