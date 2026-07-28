import {
  CalculationErrorCode,
  PipelineStageId,
} from "@/features/calculation-engine/constants/enums";
import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import { formatOutputValue } from "@/features/calculation-engine/formatting/result-formatter";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";

/**
 * Stage: format calculated values for presentation (locale-ready).
 */
export const formatOutputsStage: PipelineStage = {
  id: PipelineStageId.FormatOutputs,
  name: "Format Outputs",
  async run(ctx: CalculationContext) {
    const locale = ctx.request.context?.locale ?? "en-IN";
    const currency =
      ctx.request.context?.currency ??
      ctx.calculator.outputs.find((o) => o.currency)?.currency ??
      "INR";

    for (const output of ctx.calculator.outputs) {
      if (output.internal) continue;
      const raw = ctx.calculatedValues[output.key];
      if (typeof raw !== "number" || !Number.isFinite(raw)) {
        ctx.addWarning({
          code: "MISSING_OUTPUT",
          message: `Output '${output.key}' was not produced`,
          path: output.key,
          stage: PipelineStageId.FormatOutputs,
        });
        continue;
      }

      try {
        ctx.formattedValues.push(
          formatOutputValue(output, raw, { locale, currency }),
        );
      } catch (error) {
        ctx.addError({
          code: CalculationErrorCode.FormattingFailed,
          message:
            error instanceof Error
              ? error.message
              : `Failed to format '${output.key}'`,
          path: output.key,
          stage: PipelineStageId.FormatOutputs,
        });
      }
    }
  },
};
