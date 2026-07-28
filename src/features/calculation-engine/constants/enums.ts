export const CalculationErrorCode = {
  InvalidRequest: "INVALID_REQUEST",
  ValidationFailed: "VALIDATION_FAILED",
  MissingInput: "MISSING_INPUT",
  InvalidInput: "INVALID_INPUT",
  FormulaFailed: "FORMULA_FAILED",
  DerivedFailed: "DERIVED_FAILED",
  FormattingFailed: "FORMATTING_FAILED",
  UnknownCalculator: "UNKNOWN_CALCULATOR",
  Cancelled: "CANCELLED",
  Unknown: "UNKNOWN",
} as const;

export type CalculationErrorCode =
  (typeof CalculationErrorCode)[keyof typeof CalculationErrorCode];

export const OutputFormat = {
  Currency: "currency",
  Percentage: "percentage",
  Decimal: "decimal",
  Integer: "integer",
  Scientific: "scientific",
  Duration: "duration",
  Date: "date",
  Raw: "raw",
} as const;

export type OutputFormat = (typeof OutputFormat)[keyof typeof OutputFormat];

export const CalculationEventType = {
  BeforeCalculation: "before_calculation",
  AfterValidation: "after_validation",
  AfterFormula: "after_formula",
  AfterDerived: "after_derived",
  CalculationComplete: "calculation_complete",
  CalculationFailed: "calculation_failed",
} as const;

export type CalculationEventType =
  (typeof CalculationEventType)[keyof typeof CalculationEventType];

export const PipelineStageId = {
  ValidateInputs: "validate_inputs",
  ResolveVariables: "resolve_variables",
  ExecuteFormulas: "execute_formulas",
  CalculateDerived: "calculate_derived",
  FormatOutputs: "format_outputs",
  GenerateMetadata: "generate_metadata",
} as const;

export type PipelineStageId =
  (typeof PipelineStageId)[keyof typeof PipelineStageId];
