/**
 * Secure Formula Engine — parse, validate, resolve, execute.
 * Never uses eval() or Function().
 */

export * from "@/features/formula-engine/constants";
export type * from "@/features/formula-engine/types";

export { tokenize } from "@/features/formula-engine/tokenizer/tokenize";
export { parseExpression } from "@/features/formula-engine/parser/parse";
export {
  collectVariables,
  validateAst,
} from "@/features/formula-engine/validator/validate";
export { resolveDependencies } from "@/features/formula-engine/dependencies/resolve";
export { evaluateAst } from "@/features/formula-engine/executor/evaluate";
export {
  applyPrecision,
  resolvePrecision,
} from "@/features/formula-engine/precision/apply-precision";
export {
  BUILTIN_FUNCTIONS,
  FunctionRegistry,
  defaultFunctionRegistry,
} from "@/features/formula-engine/functions/registry";
export type {
  FormulaFunctionDefinition,
  FormulaFunctionHandler,
} from "@/features/formula-engine/functions/registry";
export {
  FormulaEngine,
  formulaEngine,
} from "@/features/formula-engine/engine/formula-engine";
export type { FormulaEngineOptions } from "@/features/formula-engine/engine/formula-engine";
export {
  DefaultFormulaEngineService,
  formulaEngineService,
} from "@/features/formula-engine/services/formula-engine-service";
export type { FormulaEngineService } from "@/features/formula-engine/services/formula-engine-service";
export { useFormulaEngine } from "@/features/formula-engine/hooks/use-formula-engine";
export type { UseFormulaEngineResult } from "@/features/formula-engine/hooks/use-formula-engine";
export * from "@/features/formula-engine/data";
