import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";

/**
 * Sequential calculation pipeline.
 * Stages remain independently unit-testable; parallel fan-out is a future option.
 */
export class CalculationPipeline {
  constructor(private readonly stages: PipelineStage[]) {}

  getStages(): readonly PipelineStage[] {
    return this.stages;
  }

  async run(ctx: CalculationContext): Promise<void> {
    for (const stage of this.stages) {
      if (ctx.aborted) break;
      await stage.run(ctx);
      ctx.markStage(stage.id);
    }
  }
}
