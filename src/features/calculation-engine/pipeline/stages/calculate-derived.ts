import {
  CalculationErrorCode,
  PipelineStageId,
} from "@/features/calculation-engine/constants/enums";
import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";
import type { FormulaEngine, FormulaProgram } from "@/features/formula-engine";

/**
 * Stage: run dependent/derived formulas after primary results exist.
 * Example: EMI → total interest → interest percentage.
 */
export function createCalculateDerivedStage(
  formulaEngine: FormulaEngine,
): PipelineStage {
  return {
    id: PipelineStageId.CalculateDerived,
    name: "Calculate Derived",
    async run(ctx: CalculationContext) {
      const derived = ctx.calculator.derived ?? [];
      if (derived.length === 0) return;

      const started = performance.now();
      const program: FormulaProgram = {
        id: `${ctx.calculator.program.id}_derived`,
        name: `${ctx.calculator.name} derived`,
        formulas: derived,
        constants: {
          ...(ctx.calculator.constants ?? {}),
          ...ctx.resolvedInputs,
          ...ctx.calculatedValues,
        },
      };

      const result = formulaEngine.evaluateProgram(program, {
        values: {
          ...ctx.resolvedInputs,
          ...ctx.calculatedValues,
        },
        constants: ctx.calculator.constants,
      });
      ctx.derivedDurationMs = performance.now() - started;

      if (!result.success) {
        for (const error of result.errors) {
          ctx.addError({
            code: CalculationErrorCode.DerivedFailed,
            message: error.message,
            path: error.path,
            stage: PipelineStageId.CalculateDerived,
          });
        }
        return;
      }

      ctx.calculatedValues = {
        ...ctx.calculatedValues,
        ...result.results,
      };
    },
  };
}
