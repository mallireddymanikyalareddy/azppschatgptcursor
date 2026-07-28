import { FormulaEngine } from "@/features/formula-engine/engine/formula-engine";
import type {
  EvaluateOptions,
  FormulaProgram,
  ProgramExecutionResult,
  ValidationResult,
} from "@/features/formula-engine/types";

/**
 * Application service contract for formula evaluation.
 * Swap implementations later without touching consumers.
 */
export interface FormulaEngineService {
  validateExpression(
    expression: string,
    knownNames: Iterable<string>,
  ): ValidationResult;
  evaluateProgram(
    program: FormulaProgram,
    options: EvaluateOptions,
  ): ProgramExecutionResult;
}

export class DefaultFormulaEngineService implements FormulaEngineService {
  constructor(private readonly engine: FormulaEngine = new FormulaEngine()) {}

  validateExpression(
    expression: string,
    knownNames: Iterable<string>,
  ): ValidationResult {
    const { parse: _parse, ...rest } = this.engine.validate(
      expression,
      knownNames,
    );
    return rest;
  }

  evaluateProgram(
    program: FormulaProgram,
    options: EvaluateOptions,
  ): ProgramExecutionResult {
    return this.engine.evaluateProgram(program, options);
  }
}

export const formulaEngineService: FormulaEngineService =
  new DefaultFormulaEngineService();
