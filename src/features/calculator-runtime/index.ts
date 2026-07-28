export type * from "@/features/calculator-runtime/types";
export {
  calculateMonthlyEmi,
  generateAmortisationSchedule,
  summariseLoan,
  buildOutstandingBalanceSeries,
  buildAnnualPrincipalInterestSeries,
  formatCurrencyInr,
  formatPercent,
  roundCurrency,
  roundPercent,
} from "@/features/calculator-runtime/lib/amortisation";
export type {
  AmortisationRow,
  LoanSummary,
  EmiComputeInput,
} from "@/features/calculator-runtime/lib/amortisation";
export { resolveCalculatorInputs } from "@/features/calculator-runtime/lib/resolve-inputs";
export type { ResolvedCalculatorInputs } from "@/features/calculator-runtime/lib/resolve-inputs";
export { validateCalculatorBusinessRules } from "@/features/calculator-runtime/lib/validate-business-rules";
export type {
  CalculatorValidationIssue,
  CalculatorValidationResult,
} from "@/features/calculator-runtime/lib/validate-business-rules";
export { hydrateResultsView } from "@/features/calculator-runtime/lib/hydrate-results-view";
export {
  getCalculatorDefinition,
  getCalculatorSlugs,
  listCalculatorDefinitions,
} from "@/features/calculator-runtime/lib/registry";
export {
  getCalculatorPublicPath,
  getCalculatorPublicUrl,
} from "@/features/calculator-runtime/lib/public-path";
export { useCalculatorWorkspace } from "@/features/calculator-runtime/hooks/use-calculator-workspace";
export type { UseCalculatorWorkspaceResult } from "@/features/calculator-runtime/hooks/use-calculator-workspace";
export { CalculatorWorkspace } from "@/features/calculator-runtime/components/calculator-workspace";
export type { CalculatorWorkspaceProps } from "@/features/calculator-runtime/components/calculator-workspace";
