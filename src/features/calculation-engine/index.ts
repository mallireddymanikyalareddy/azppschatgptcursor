/**
 * Calculation Engine — orchestrates calculator workflows.
 * Uses Formula Engine; does not modify form-engine or formula-engine.
 */

export * from "@/features/calculation-engine/constants";
export type * from "@/features/calculation-engine/types";

export { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
export { CalculationPipeline } from "@/features/calculation-engine/pipeline/pipeline";
export type { PipelineStage } from "@/features/calculation-engine/pipeline/types";
export { validateInputsStage } from "@/features/calculation-engine/pipeline/stages/validate-inputs";
export { resolveVariablesStage } from "@/features/calculation-engine/pipeline/stages/resolve-variables";
export { createExecuteFormulasStage } from "@/features/calculation-engine/pipeline/stages/execute-formulas";
export { createCalculateDerivedStage } from "@/features/calculation-engine/pipeline/stages/calculate-derived";
export { formatOutputsStage } from "@/features/calculation-engine/pipeline/stages/format-outputs";
export { generateMetadataStage } from "@/features/calculation-engine/pipeline/stages/generate-metadata";

export {
  ResultFormatter,
  formatOutputValue,
  resultFormatter,
} from "@/features/calculation-engine/formatting/result-formatter";
export type { FormatOptions } from "@/features/calculation-engine/formatting/result-formatter";

export {
  CalculationEventBus,
  calculationEventBus,
} from "@/features/calculation-engine/events/event-bus";

export type {
  CalculationCacheBundle,
  ConfigurationCache,
  FormulaCache,
  ResultCache,
} from "@/features/calculation-engine/cache/cache-contracts";

export * from "@/features/calculation-engine/services";
export * from "@/features/calculation-engine/hooks";
export * from "@/features/calculation-engine/data";
