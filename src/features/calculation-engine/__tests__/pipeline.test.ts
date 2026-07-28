import { describe, expect, it } from "vitest";

import { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import { CalculationPipeline } from "@/features/calculation-engine/pipeline/pipeline";
import { validateInputsStage } from "@/features/calculation-engine/pipeline/stages/validate-inputs";
import { resolveVariablesStage } from "@/features/calculation-engine/pipeline/stages/resolve-variables";
import { simpleInterestCalculator } from "@/features/calculation-engine/data";
import { PipelineStageId } from "@/features/calculation-engine/constants/enums";

describe("pipeline stages", () => {
  it("validate + resolve stages are independently runnable", async () => {
    const ctx = new CalculationContext({
      calculator: simpleInterestCalculator,
      inputs: { P: 1000, R: 5, T: 1 },
    });

    await validateInputsStage.run(ctx);
    expect(ctx.errors).toHaveLength(0);

    await resolveVariablesStage.run(ctx);
    expect(ctx.resolvedInputs.P).toBe(1000);
  });

  it("pipeline records completed stages", async () => {
    const pipeline = new CalculationPipeline([
      validateInputsStage,
      resolveVariablesStage,
    ]);
    const ctx = new CalculationContext({
      calculator: simpleInterestCalculator,
      inputs: { P: 1000, R: 5, T: 1 },
    });
    await pipeline.run(ctx);
    expect(ctx.completedStages).toEqual([
      PipelineStageId.ValidateInputs,
      PipelineStageId.ResolveVariables,
    ]);
  });
});
