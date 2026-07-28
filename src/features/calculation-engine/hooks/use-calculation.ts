"use client";

import * as React from "react";

import {
  CalculationEngine,
  calculationEngine,
} from "@/features/calculation-engine/services/calculation-engine";
import type {
  CalculationRequest,
  CalculationResponse,
  CalculatorWorkflowDefinition,
  CalculationInputValues,
  CalculationContextOptions,
} from "@/features/calculation-engine/types";

export type UseCalculationResult = {
  calculate: (request: CalculationRequest) => Promise<CalculationResponse>;
  result: CalculationResponse | null;
  isCalculating: boolean;
  error: string | null;
  reset: () => void;
};

/**
 * Imperative calculation hook for future calculator pages.
 */
export function useCalculation(
  engine: CalculationEngine = calculationEngine,
): UseCalculationResult {
  const [result, setResult] = React.useState<CalculationResponse | null>(null);
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const calculate = React.useCallback(
    async (request: CalculationRequest) => {
      setIsCalculating(true);
      setError(null);
      try {
        const response = await engine.calculate(request);
        setResult(response);
        if (!response.success) {
          setError(response.errors[0]?.message ?? "Calculation failed");
        }
        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unexpected calculation error";
        setError(message);
        throw err;
      } finally {
        setIsCalculating(false);
      }
    },
    [engine],
  );

  const reset = React.useCallback(() => {
    setResult(null);
    setError(null);
    setIsCalculating(false);
  }, []);

  return { calculate, result, isCalculating, error, reset };
}

export type UseCalculatorOptions = {
  calculator: CalculatorWorkflowDefinition;
  context?: CalculationContextOptions;
  engine?: CalculationEngine;
};

export type UseCalculatorResult = UseCalculationResult & {
  calculator: CalculatorWorkflowDefinition;
  run: (inputs: CalculationInputValues) => Promise<CalculationResponse>;
};

/**
 * Binds a workflow definition and exposes run(inputs).
 */
export function useCalculator(
  options: UseCalculatorOptions,
): UseCalculatorResult {
  const engine = options.engine ?? calculationEngine;
  const base = useCalculation(engine);

  const run = React.useCallback(
    (inputs: CalculationInputValues) =>
      base.calculate({
        calculator: options.calculator,
        inputs,
        context: options.context,
      }),
    [base, options.calculator, options.context],
  );

  return {
    ...base,
    calculator: options.calculator,
    run,
  };
}

export type UseCalculationStateResult = {
  result: CalculationResponse | null;
  isCalculating: boolean;
  error: string | null;
  isSuccess: boolean;
  values: Record<string, number>;
  formatted: CalculationResponse["formattedValues"];
};

/**
 * Derives UI-friendly state from a calculation response.
 */
export function useCalculationState(
  result: CalculationResponse | null,
  isCalculating = false,
  error: string | null = null,
): UseCalculationStateResult {
  return {
    result,
    isCalculating,
    error,
    isSuccess: Boolean(result?.success),
    values: result?.calculatedValues ?? {},
    formatted: result?.formattedValues ?? [],
  };
}
