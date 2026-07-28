"use client";

import * as React from "react";

import {
  FormulaEngine,
  formulaEngine,
} from "@/features/formula-engine/engine/formula-engine";
import type {
  EvaluateOptions,
  FormulaProgram,
  ProgramExecutionResult,
} from "@/features/formula-engine/types";

export type UseFormulaEngineResult = {
  engine: FormulaEngine;
  evaluateProgram: (
    program: FormulaProgram,
    options: EvaluateOptions,
  ) => ProgramExecutionResult;
  lastResult: ProgramExecutionResult | null;
};

/**
 * Thin React hook for future calculator page integration.
 * Pure evaluation — no UI side effects.
 */
export function useFormulaEngine(
  instance: FormulaEngine = formulaEngine,
): UseFormulaEngineResult {
  const [lastResult, setLastResult] =
    React.useState<ProgramExecutionResult | null>(null);

  const evaluateProgram = React.useCallback(
    (program: FormulaProgram, options: EvaluateOptions) => {
      const result = instance.evaluateProgram(program, options);
      setLastResult(result);
      return result;
    },
    [instance],
  );

  return { engine: instance, evaluateProgram, lastResult };
}
