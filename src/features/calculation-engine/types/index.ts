import type {
  CalculationErrorCode,
  CalculationEventType,
  OutputFormat,
  PipelineStageId,
} from "@/features/calculation-engine/constants/enums";
import type {
  FormulaDefinition,
  FormulaProgram,
  RoundingMode,
} from "@/features/formula-engine";

/** Numeric / nullable input bag from forms or APIs. */
export type CalculationInputValues = Record<
  string,
  number | string | boolean | null | undefined
>;

export type CalculationIssue = {
  code: CalculationErrorCode | string;
  message: string;
  path?: string;
  stage?: PipelineStageId;
};

export type CalculationWarning = {
  code: string;
  message: string;
  path?: string;
  stage?: PipelineStageId;
};

/** Declared input for a calculator workflow. */
export type CalculationInputSpec = {
  name: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  defaultValue?: number;
  min?: number;
  max?: number;
  /** Coerce string inputs to number. */
  coerceNumber?: boolean;
};

/** Output formatting declaration. */
export type CalculationOutputSpec = {
  key: string;
  label: string;
  format: OutputFormat;
  precision?: number;
  roundingMode?: RoundingMode;
  currency?: string;
  locale?: string;
  /** Hide from public results when true. */
  internal?: boolean;
};

/**
 * Calculator workflow definition for the Calculation Engine.
 * Composes Formula Engine programs without modifying them.
 */
export type CalculatorWorkflowDefinition = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  inputs: CalculationInputSpec[];
  /** Primary formula program (Formula Engine). */
  program: FormulaProgram;
  /**
   * Additional formulas that depend on primary results.
   * Executed after the main program in dependency order.
   */
  derived?: FormulaDefinition[];
  outputs: CalculationOutputSpec[];
  constants?: Record<string, number>;
  metadata?: Record<string, unknown>;
};

export type CalculationContextOptions = {
  locale?: string;
  currency?: string;
  requestId?: string;
  userId?: string;
  /** Opaque bag for future middleware / workers. */
  extras?: Record<string, unknown>;
};

export type CalculationRequest = {
  calculator: CalculatorWorkflowDefinition;
  inputs: CalculationInputValues;
  context?: CalculationContextOptions;
};

export type FormattedValue = {
  key: string;
  label: string;
  raw: number;
  formatted: string;
  format: OutputFormat;
};

export type CalculationMetadata = {
  calculatorId: string;
  calculatorSlug: string;
  calculatorName: string;
  requestId?: string;
  stages: PipelineStageId[];
  formulaDurationMs: number;
  derivedDurationMs: number;
  totalDurationMs: number;
  locale?: string;
  extras?: Record<string, unknown>;
};

export type CalculationResponse = {
  success: boolean;
  durationMs: number;
  inputs: Record<string, number>;
  calculatedValues: Record<string, number>;
  formattedValues: FormattedValue[];
  warnings: CalculationWarning[];
  errors: CalculationIssue[];
  metadata: CalculationMetadata;
};

export type CalculationEvent = {
  type: CalculationEventType;
  request: CalculationRequest;
  response?: CalculationResponse;
  stage?: PipelineStageId;
  timestamp: number;
  detail?: Record<string, unknown>;
};

export type CalculationEventListener = (
  event: CalculationEvent,
) => void | Promise<void>;
