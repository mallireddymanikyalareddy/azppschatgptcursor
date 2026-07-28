import { PipelineStageId } from "@/features/calculation-engine/constants/enums";
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
 * Stage: apply defaults and produce the resolved numeric input map.
 */
export const resolveVariablesStage: PipelineStage = {
  id: PipelineStageId.ResolveVariables,
  name: "Resolve Variables",
  async run(ctx: CalculationContext) {
    const resolved: Record<string, number> = {
      ...(ctx.calculator.constants ?? {}),
    };

    for (const spec of ctx.calculator.inputs) {
      const provided = ctx.request.inputs[spec.name];
      const isMissing =
        provided === null || provided === undefined || provided === "";

      if (isMissing) {
        if (typeof spec.defaultValue === "number") {
          resolved[spec.name] = spec.defaultValue;
          ctx.addWarning({
            code: "DEFAULT_APPLIED",
            message: `Default value applied for ${spec.label}`,
            path: spec.name,
            stage: PipelineStageId.ResolveVariables,
          });
        }
        continue;
      }

      const numeric = coerceToNumber(provided);
      if (numeric !== null) {
        resolved[spec.name] = numeric;
      }
    }

    ctx.resolvedInputs = resolved;
  },
};
