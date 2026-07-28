import type { CalculationCacheBundle } from "@/features/calculation-engine/cache/cache-contracts";
import {
  CalculationEventType,
  PipelineStageId,
} from "@/features/calculation-engine/constants/enums";
import { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import {
  CalculationEventBus,
  calculationEventBus,
} from "@/features/calculation-engine/events/event-bus";
import { CalculationPipeline } from "@/features/calculation-engine/pipeline/pipeline";
import { createCalculateDerivedStage } from "@/features/calculation-engine/pipeline/stages/calculate-derived";
import { createExecuteFormulasStage } from "@/features/calculation-engine/pipeline/stages/execute-formulas";
import { formatOutputsStage } from "@/features/calculation-engine/pipeline/stages/format-outputs";
import { generateMetadataStage } from "@/features/calculation-engine/pipeline/stages/generate-metadata";
import { resolveVariablesStage } from "@/features/calculation-engine/pipeline/stages/resolve-variables";
import { validateInputsStage } from "@/features/calculation-engine/pipeline/stages/validate-inputs";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";
import {
  CalculationLogger,
  calculationLogger,
} from "@/features/calculation-engine/services/calculation-logger";
import type {
  CalculationRequest,
  CalculationResponse,
} from "@/features/calculation-engine/types";
import { FormulaEngine, formulaEngine } from "@/features/formula-engine";

export type CalculationEngineOptions = {
  formulaEngine?: FormulaEngine;
  pipeline?: CalculationPipeline;
  events?: CalculationEventBus;
  logger?: CalculationLogger;
  /** Reserved for future memoization / workers. */
  caches?: CalculationCacheBundle;
};

export function createDefaultPipeline(
  engine: FormulaEngine = formulaEngine,
): CalculationPipeline {
  const stages: PipelineStage[] = [
    validateInputsStage,
    resolveVariablesStage,
    createExecuteFormulasStage(engine),
    createCalculateDerivedStage(engine),
    formatOutputsStage,
    generateMetadataStage,
  ];
  return new CalculationPipeline(stages);
}

/**
 * Orchestrates calculator workflows:
 * validate → resolve → formulas → derived → format → metadata.
 */
export class CalculationEngine {
  private readonly formulaEngine: FormulaEngine;
  private readonly pipeline: CalculationPipeline;
  private readonly events: CalculationEventBus;
  private readonly logger: CalculationLogger;

  constructor(options: CalculationEngineOptions = {}) {
    this.formulaEngine = options.formulaEngine ?? formulaEngine;
    this.pipeline =
      options.pipeline ?? createDefaultPipeline(this.formulaEngine);
    this.events = options.events ?? calculationEventBus;
    this.logger = options.logger ?? calculationLogger;
  }

  async calculate(request: CalculationRequest): Promise<CalculationResponse> {
    const ctx = new CalculationContext(request);
    this.logger.logRequest(request);

    await this.events.emit({
      type: CalculationEventType.BeforeCalculation,
      request,
      timestamp: Date.now(),
    });

    await this.pipeline.run(ctx);

    const response = this.toResponse(ctx);

    if (ctx.completedStages.includes(PipelineStageId.ValidateInputs)) {
      await this.events.emit({
        type: CalculationEventType.AfterValidation,
        request,
        response,
        stage: PipelineStageId.ValidateInputs,
        timestamp: Date.now(),
      });
    }

    if (ctx.completedStages.includes(PipelineStageId.ExecuteFormulas)) {
      await this.events.emit({
        type: CalculationEventType.AfterFormula,
        request,
        response,
        stage: PipelineStageId.ExecuteFormulas,
        timestamp: Date.now(),
        detail: { durationMs: ctx.formulaDurationMs },
      });
    }

    if (response.success) {
      await this.events.emit({
        type: CalculationEventType.CalculationComplete,
        request,
        response,
        timestamp: Date.now(),
      });
    } else {
      await this.events.emit({
        type: CalculationEventType.CalculationFailed,
        request,
        response,
        timestamp: Date.now(),
      });
    }

    this.logger.logResponse(response);
    return response;
  }

  private toResponse(ctx: CalculationContext): CalculationResponse {
    const success = ctx.errors.length === 0;
    return {
      success,
      durationMs: ctx.elapsedMs(),
      inputs: ctx.resolvedInputs,
      calculatedValues: ctx.calculatedValues,
      formattedValues: ctx.formattedValues,
      warnings: ctx.warnings,
      errors: ctx.errors,
      metadata: {
        calculatorId: ctx.calculator.id,
        calculatorSlug: ctx.calculator.slug,
        calculatorName: ctx.calculator.name,
        requestId: ctx.request.context?.requestId,
        stages: [...ctx.completedStages],
        formulaDurationMs: ctx.formulaDurationMs,
        derivedDurationMs: ctx.derivedDurationMs,
        totalDurationMs: ctx.elapsedMs(),
        locale: ctx.request.context?.locale,
        extras: ctx.request.context?.extras,
      },
    };
  }
}

export const calculationEngine = new CalculationEngine();
