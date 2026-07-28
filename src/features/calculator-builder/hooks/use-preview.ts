"use client";

import * as React from "react";

import { toFormDefinition } from "@/features/calculator-builder/lib/adapters/to-form-definition";
import { toResultsViewDefinition } from "@/features/calculator-builder/lib/adapters/to-results-view";
import { toWorkflowDefinition } from "@/features/calculator-builder/lib/adapters/to-workflow-definition";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import type { FormDefinition, FormValues } from "@/features/form-engine/types";
import type {
  CalculationResponse,
  CalculatorWorkflowDefinition,
} from "@/features/calculation-engine/types";
import type {
  ResultDataBag,
  ResultsViewDefinition,
} from "@/features/results-engine/types";
import { useCalculator } from "@/features/calculation-engine";

export type UsePreviewResult = {
  formDefinition: FormDefinition;
  workflow: CalculatorWorkflowDefinition;
  resultsView: ResultsViewDefinition;
  result: CalculationResponse | null;
  resultData: ResultDataBag;
  isCalculating: boolean;
  error: string | null;
  runFromFormValues: (values: FormValues) => Promise<CalculationResponse>;
  reset: () => void;
};

/**
 * Live preview adapters — Form + Calculation + Results engines.
 * Recomputes definitions when builder configuration changes.
 */
export function usePreview(
  definition: CalculatorBuilderDefinition,
): UsePreviewResult {
  const formDefinition = React.useMemo(
    () => toFormDefinition(definition),
    [definition],
  );
  const workflow = React.useMemo(
    () => toWorkflowDefinition(definition),
    [definition],
  );
  const resultsView = React.useMemo(
    () => toResultsViewDefinition(definition),
    [definition],
  );

  const { run, result, isCalculating, error, reset } = useCalculator({
    calculator: workflow,
    context: { locale: "en-IN", currency: "INR" },
  });

  const runFromFormValues = React.useCallback(
    async (values: FormValues) => {
      const inputs: Record<
        string,
        number | string | boolean | null | undefined
      > = {};
      for (const field of formDefinition.fields) {
        inputs[field.name] = values[field.name] as
          number | string | boolean | null | undefined;
      }
      return run(inputs);
    },
    [formDefinition.fields, run],
  );

  const resultData: ResultDataBag = React.useMemo(() => {
    if (!result?.success) return {};
    return result.calculatedValues;
  }, [result]);

  return {
    formDefinition,
    workflow,
    resultsView,
    result,
    resultData,
    isCalculating,
    error,
    runFromFormValues,
    reset,
  };
}
