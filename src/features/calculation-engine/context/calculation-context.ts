import type {
  CalculationIssue,
  CalculationRequest,
  CalculationWarning,
  CalculatorWorkflowDefinition,
  FormattedValue,
} from "@/features/calculation-engine/types";
import type { PipelineStageId } from "@/features/calculation-engine/constants/enums";

/**
 * Mutable bag passed through pipeline stages.
 * Isolated per calculation — safe for thousands of concurrent requests later.
 */
export class CalculationContext {
  readonly request: CalculationRequest;
  readonly startedAt: number;

  resolvedInputs: Record<string, number> = {};
  calculatedValues: Record<string, number> = {};
  formattedValues: FormattedValue[] = [];
  errors: CalculationIssue[] = [];
  warnings: CalculationWarning[] = [];
  completedStages: PipelineStageId[] = [];
  formulaDurationMs = 0;
  derivedDurationMs = 0;
  aborted = false;

  constructor(request: CalculationRequest) {
    this.request = request;
    this.startedAt = performance.now();
  }

  get calculator(): CalculatorWorkflowDefinition {
    return this.request.calculator;
  }

  addError(error: CalculationIssue): void {
    this.errors.push(error);
    this.aborted = true;
  }

  addWarning(warning: CalculationWarning): void {
    this.warnings.push(warning);
  }

  markStage(stage: PipelineStageId): void {
    this.completedStages.push(stage);
  }

  elapsedMs(): number {
    return performance.now() - this.startedAt;
  }
}
