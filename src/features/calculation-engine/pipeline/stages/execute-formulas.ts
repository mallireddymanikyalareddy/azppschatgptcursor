import {
  CalculationErrorCode,
  PipelineStageId,
} from "@/features/calculation-engine/constants/enums";
import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";
import type { FormulaEngine } from "@/features/formula-engine";

export function createExecuteFormulasStage(
  formulaEngine: FormulaEngine,
): PipelineStage {
  return {
    id: PipelineStageId.ExecuteFormulas,
    name: "Execute Formulas",
    async run(ctx: CalculationContext) {
      const started = performance.now();
      const result = formulaEngine.evaluateProgram(ctx.calculator.program, {
        values: ctx.resolvedInputs,
        constants: ctx.calculator.constants,
      });
      ctx.formulaDurationMs = performance.now() - started;

      if (!result.success) {
        for (const error of result.errors) {
          ctx.addError({
            code: CalculationErrorCode.FormulaFailed,
            message: error.message,
            path: error.path,
            stage: PipelineStageId.ExecuteFormulas,
          });
        }
        for (const warning of result.warnings) {
          ctx.addWarning({
            code: warning.code,
            message: warning.message,
            stage: PipelineStageId.ExecuteFormulas,
          });
        }
        return;
      }

      ctx.calculatedValues = { ...result.results };
      for (const warning of result.warnings) {
        ctx.addWarning({
          code: warning.code,
          message: warning.message,
          stage: PipelineStageId.ExecuteFormulas,
        });
      }
    },
  };
}
