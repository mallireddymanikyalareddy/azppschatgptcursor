import { FormulaErrorCode } from "@/features/formula-engine/constants/enums";
import type { FormulaIssue } from "@/features/formula-engine/types";

export type FormulaFunctionHandler = (
  args: number[],
) => number | { error: FormulaIssue };

export type FormulaFunctionDefinition = {
  name: string;
  minArgs: number;
  maxArgs: number;
  impl: FormulaFunctionHandler;
};

function argCountIssue(
  name: string,
  got: number,
  min: number,
  max: number,
): FormulaIssue {
  return {
    code: FormulaErrorCode.ArgumentCount,
    message: `Function '${name}' expects ${min === max ? min : `${min}-${max}`} argument(s), got ${got}`,
  };
}

function wrap(
  name: string,
  minArgs: number,
  maxArgs: number,
  fn: (...args: number[]) => number,
): FormulaFunctionDefinition {
  return {
    name,
    minArgs,
    maxArgs,
    impl: (args) => {
      if (args.length < minArgs || args.length > maxArgs) {
        return { error: argCountIssue(name, args.length, minArgs, maxArgs) };
      }
      const value = fn(...args);
      if (!Number.isFinite(value)) {
        return {
          error: {
            code: FormulaErrorCode.Overflow,
            message: `Function '${name}' produced a non-finite result`,
          },
        };
      }
      return value;
    },
  };
}

/** Built-in math functions — closed set; extend via registerFunction. */
export const BUILTIN_FUNCTIONS: FormulaFunctionDefinition[] = [
  wrap("abs", 1, 1, Math.abs),
  wrap("round", 1, 1, Math.round),
  wrap("ceil", 1, 1, Math.ceil),
  wrap("floor", 1, 1, Math.floor),
  wrap("min", 1, Number.MAX_SAFE_INTEGER, (...a) => Math.min(...a)),
  wrap("max", 1, Number.MAX_SAFE_INTEGER, (...a) => Math.max(...a)),
  wrap("pow", 2, 2, Math.pow),
  wrap("sqrt", 1, 1, Math.sqrt),
  wrap("log", 1, 1, Math.log),
  wrap("exp", 1, 1, Math.exp),
  wrap("sin", 1, 1, Math.sin),
  wrap("cos", 1, 1, Math.cos),
  wrap("tan", 1, 1, Math.tan),
];

export class FunctionRegistry {
  private readonly map = new Map<string, FormulaFunctionDefinition>();

  constructor(seed: FormulaFunctionDefinition[] = BUILTIN_FUNCTIONS) {
    for (const def of seed) {
      this.map.set(def.name.toLowerCase(), def);
    }
  }

  has(name: string): boolean {
    return this.map.has(name.toLowerCase());
  }

  get(name: string): FormulaFunctionDefinition | undefined {
    return this.map.get(name.toLowerCase());
  }

  register(definition: FormulaFunctionDefinition): void {
    this.map.set(definition.name.toLowerCase(), definition);
  }

  list(): string[] {
    return [...this.map.keys()].sort();
  }
}

export const defaultFunctionRegistry = new FunctionRegistry();
