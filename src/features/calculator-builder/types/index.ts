export type {
  BuilderBreakdown,
  BuilderChart,
  BuilderContent,
  BuilderFaq,
  BuilderFormula,
  BuilderInput,
  BuilderMetadata,
  BuilderRecommendation,
  BuilderResultMetric,
  BuilderSeo,
  CalculatorBuilderDefinition,
  CalculatorDefinitionBundle,
} from "@/features/calculator-builder/types/definition";

export type BuilderValidationIssue = {
  code: string;
  message: string;
  path?: string;
  severity: "error" | "warning";
};

export type BuilderValidationReport = {
  valid: boolean;
  issues: BuilderValidationIssue[];
};
