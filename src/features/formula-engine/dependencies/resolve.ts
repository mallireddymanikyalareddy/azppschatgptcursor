import { FormulaErrorCode } from "@/features/formula-engine/constants/enums";
import { parseExpression } from "@/features/formula-engine/parser/parse";
import { collectVariables } from "@/features/formula-engine/validator/validate";
import type {
  DependencyGraph,
  FormulaDefinition,
  FormulaIssue,
  FormulaProgram,
} from "@/features/formula-engine/types";

/**
 * Builds a DAG of formula dependencies (explicit + result-key references)
 * and returns a topological execution order.
 */
export function resolveDependencies(
  program: FormulaProgram,
):
  | { success: true; graph: DependencyGraph }
  | { success: false; errors: FormulaIssue[] } {
  const byId = new Map(program.formulas.map((f) => [f.id, f]));
  const keyToId = new Map(program.formulas.map((f) => [f.key, f.id]));
  const constantNames = new Set(Object.keys(program.constants ?? {}));
  const errors: FormulaIssue[] = [];
  const edges: Record<string, string[]> = {};

  for (const formula of program.formulas) {
    const deps = new Set<string>();

    for (const depRef of formula.dependencies ?? []) {
      const resolvedId = byId.has(depRef) ? depRef : keyToId.get(depRef);
      if (!resolvedId) {
        errors.push({
          code: FormulaErrorCode.UnknownFormula,
          message: `Formula '${formula.id}' depends on unknown formula '${depRef}'`,
          path: formula.id,
        });
        continue;
      }
      deps.add(resolvedId);
    }

    const parsed = parseExpression(formula.expression);
    if (parsed.success) {
      const vars = collectVariables(parsed.ast);
      for (const name of vars) {
        if (constantNames.has(name)) continue;
        const depFormulaId = keyToId.get(name);
        if (depFormulaId && depFormulaId !== formula.id) {
          deps.add(depFormulaId);
        }
      }
    }

    edges[formula.id] = [...deps];
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  const order: string[] = [];
  const visiting = new Set<string>();
  const visited = new Set<string>();

  const visit = (id: string): boolean => {
    if (visited.has(id)) return true;
    if (visiting.has(id)) {
      errors.push({
        code: FormulaErrorCode.CircularDependency,
        message: `Circular dependency detected at formula '${id}'`,
        path: id,
      });
      return false;
    }
    visiting.add(id);
    for (const dep of edges[id] ?? []) {
      if (!visit(dep)) return false;
    }
    visiting.delete(id);
    visited.add(id);
    order.push(id);
    return true;
  };

  for (const formula of program.formulas) {
    if (!visit(formula.id)) break;
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, graph: { order, edges } };
}

export function getFormulaMap(
  formulas: FormulaDefinition[],
): Map<string, FormulaDefinition> {
  return new Map(formulas.map((f) => [f.id, f]));
}
