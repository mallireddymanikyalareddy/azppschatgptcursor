/**
 * Production calculator runtime contracts.
 * Definitions drive form, calculation, and results — no per-calculator React UI.
 */

import type { FormDefinition } from "@/features/form-engine/types";
import type { CalculatorWorkflowDefinition } from "@/features/calculation-engine/types";
import type { ResultsViewDefinition } from "@/features/results-engine/types";

export type TenureUnit = "months" | "years";

/**
 * Declarative map from form field names → calculation input names,
 * plus optional tenure unit resolution.
 */
export type CalculatorInputMapping = {
  /** formField → workflowInput */
  fields: Record<string, string>;
  /**
   * When set, resolves tenure months from (tenureField + tenureTypeField).
   * Result is written to `targetInput` (e.g. "n").
   */
  tenure?: {
    tenureField: string;
    tenureTypeField: string;
    targetInput: string;
    maxMonths: number;
  };
  /** Optional principal reduction: P = loanAmount - prepayment */
  principalNetOfPrepayment?: {
    principalField: string;
    prepaymentField: string;
    targetInput: string;
  };
};

export type CalculatorSeoDefinition = {
  title: string;
  description: string;
  keywords: string[];
};

export type CalculatorContentDefinition = {
  introduction: string;
  howItWorks: string;
  formulaExplanation: string;
};

export type ProductionCalculatorDefinition = {
  id: string;
  slug: string;
  name: string;
  description: string;
  locale: string;
  currency: string;
  form: FormDefinition;
  workflow: CalculatorWorkflowDefinition;
  /** Base presentation schema — tables/charts hydrated at runtime. */
  resultsView: ResultsViewDefinition;
  inputMapping: CalculatorInputMapping;
  seo: CalculatorSeoDefinition;
  content: CalculatorContentDefinition;
  /** Enable amortisation schedule enrichment after calculation. */
  amortisation?: {
    enabled: boolean;
    tableId: string;
    balanceChartId?: string;
    annualChartId?: string;
    pageSize?: number;
  };
};
