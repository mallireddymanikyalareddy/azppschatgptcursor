import {
  CalculationErrorCode,
  PipelineStageId,
} from "@/features/calculation-engine/constants/enums";
import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";

function coerceToNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/**
 * Stage: validate required/optional inputs and bounds.
 */
export const validateInputsStage: PipelineStage = {
  id: PipelineStageId.ValidateInputs,
  name: "Validate Inputs",
  async run(ctx: CalculationContext) {
    const { inputs: specs } = ctx.calculator;
    const raw = ctx.request.inputs;

    for (const spec of specs) {
      const provided = raw[spec.name];
      const isMissing =
        provided === null || provided === undefined || provided === "";

      if (isMissing) {
        if (spec.required && spec.defaultValue === undefined) {
          ctx.addError({
            code: CalculationErrorCode.MissingInput,
            message: `${spec.label} is required`,
            path: spec.name,
            stage: PipelineStageId.ValidateInputs,
          });
          continue;
        }
        continue;
      }

      const numeric =
        spec.coerceNumber === false && typeof provided === "number"
          ? provided
          : coerceToNumber(provided);

      if (numeric === null) {
        ctx.addError({
          code: CalculationErrorCode.InvalidInput,
          message: `${spec.label} must be a valid number`,
          path: spec.name,
          stage: PipelineStageId.ValidateInputs,
        });
        continue;
      }

      if (typeof spec.min === "number" && numeric < spec.min) {
        ctx.addError({
          code: CalculationErrorCode.InvalidInput,
          message: `${spec.label} must be at least ${spec.min}`,
          path: spec.name,
          stage: PipelineStageId.ValidateInputs,
        });
      }

      if (typeof spec.max === "number" && numeric > spec.max) {
        ctx.addError({
          code: CalculationErrorCode.InvalidInput,
          message: `${spec.label} must be at most ${spec.max}`,
          path: spec.name,
          stage: PipelineStageId.ValidateInputs,
        });
      }
    }
  },
};
