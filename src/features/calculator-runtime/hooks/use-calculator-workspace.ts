"use client";

import * as React from "react";

import { useCalculator } from "@/features/calculation-engine";
import type { FormValues } from "@/features/form-engine/types";
import type { ResultDataBag } from "@/features/results-engine/types";
import type { ResultsViewDefinition } from "@/features/results-engine/types";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import { summariseLoan } from "@/features/calculator-runtime/lib/amortisation";
import { hydrateResultsView } from "@/features/calculator-runtime/lib/hydrate-results-view";
import { resolveCalculatorInputs } from "@/features/calculator-runtime/lib/resolve-inputs";
import {
  validateCalculatorBusinessRules,
  type CalculatorValidationIssue,
} from "@/features/calculator-runtime/lib/validate-business-rules";

export type UseCalculatorWorkspaceResult = {
  definition: ProductionCalculatorDefinition;
  isCalculating: boolean;
  error: string | null;
  validationIssues: CalculatorValidationIssue[];
  resultData: ResultDataBag;
  resultsView: ResultsViewDefinition;
  metadata: {
    durationMs?: number;
    requestId?: string;
    locale: string;
    currency: string;
    loanStartDate?: string;
    tenureMonths?: number;
  } | null;
  run: (values: FormValues) => Promise<void>;
  reset: () => void;
};

/**
 * Generic calculator workspace hook — definition-driven, calculator-agnostic.
 * Loan amortisation enrichment runs only when `definition.amortisation.enabled`.
 */
export function useCalculatorWorkspace(
  definition: ProductionCalculatorDefinition,
): UseCalculatorWorkspaceResult {
  const {
    run: runEngine,
    result,
    isCalculating,
    error,
    reset,
  } = useCalculator({
    calculator: definition.workflow,
    context: {
      locale: definition.locale,
      currency: definition.currency,
    },
  });

  const [validationIssues, setValidationIssues] = React.useState<
    CalculatorValidationIssue[]
  >([]);
  const [fallbackData, setFallbackData] = React.useState<ResultDataBag | null>(
    null,
  );
  const [hydratedView, setHydratedView] = React.useState<ResultsViewDefinition>(
    definition.resultsView,
  );
  const [metadata, setMetadata] =
    React.useState<UseCalculatorWorkspaceResult["metadata"]>(null);

  const loanMode = Boolean(definition.amortisation?.enabled);

  const run = React.useCallback(
    async (values: FormValues) => {
      const business = validateCalculatorBusinessRules(
        values,
        definition.inputMapping,
      );
      setValidationIssues(business.issues);
      if (!business.valid) {
        setFallbackData(null);
        setHydratedView(definition.resultsView);
        setMetadata(null);
        return;
      }

      const resolved = resolveCalculatorInputs(values, definition.inputMapping);

      if (!loanMode) {
        const response = await runEngine(resolved.values);
        setMetadata({
          locale: definition.locale,
          currency: definition.currency,
          durationMs: response.durationMs,
          requestId:
            typeof response.metadata.requestId === "string"
              ? response.metadata.requestId
              : undefined,
        });
        setHydratedView(definition.resultsView);
        setFallbackData(
          response.success ? { ...response.calculatedValues } : null,
        );
        return;
      }

      const summary = summariseLoan({
        principal: resolved.principal,
        annualRatePercent: resolved.annualRate,
        tenureMonths: resolved.tenureMonths,
        processingFee: resolved.processingFee,
      });

      const view = hydrateResultsView(definition, summary);
      setHydratedView(view);
      setMetadata({
        locale: definition.locale,
        currency: definition.currency,
        loanStartDate: resolved.loanStartDate,
        tenureMonths: resolved.tenureMonths,
      });

      // Zero-rate loans cannot use the standard EMI formula (division by zero).
      if (resolved.annualRate === 0) {
        setFallbackData({
          emi: summary.emi,
          principal: summary.principal,
          totalInterest: summary.totalInterest,
          totalPayment: summary.totalPayment,
          processingFee: summary.processingFee,
          effectiveLoanCost: summary.effectiveLoanCost,
          interestPercentage: summary.interestPercentage,
          principalPercentage: summary.principalPercentage,
        });
        return;
      }

      const summaryData: ResultDataBag = {
        emi: summary.emi,
        principal: summary.principal,
        totalInterest: summary.totalInterest,
        totalPayment: summary.totalPayment,
        processingFee: summary.processingFee,
        effectiveLoanCost: summary.effectiveLoanCost,
        interestPercentage: summary.interestPercentage,
        principalPercentage: summary.principalPercentage,
      };

      const response = await runEngine({
        ...resolved.values,
        processingFeeInput: resolved.processingFee,
      });

      setMetadata({
        locale: definition.locale,
        currency: definition.currency,
        loanStartDate: resolved.loanStartDate,
        tenureMonths: resolved.tenureMonths,
        durationMs: response.durationMs,
        requestId:
          typeof response.metadata.requestId === "string"
            ? response.metadata.requestId
            : undefined,
      });

      if (response.success) {
        const emi = Number(response.calculatedValues.emi ?? summary.emi);
        setFallbackData({
          ...response.calculatedValues,
          ...summaryData,
          emi,
        });
        setHydratedView(hydrateResultsView(definition, { ...summary, emi }));
      } else {
        // Keep amortisation-accurate summary even if the formula engine path fails.
        setFallbackData(summaryData);
      }
    },
    [definition, loanMode, runEngine],
  );

  const resultData: ResultDataBag = React.useMemo(() => {
    if (fallbackData) return fallbackData;
    if (result?.success) return result.calculatedValues;
    return {};
  }, [fallbackData, result]);

  return {
    definition,
    isCalculating,
    error,
    validationIssues,
    resultData,
    resultsView: hydratedView,
    metadata,
    run,
    reset: () => {
      reset();
      setValidationIssues([]);
      setFallbackData(null);
      setHydratedView(definition.resultsView);
      setMetadata(null);
    },
  };
}
