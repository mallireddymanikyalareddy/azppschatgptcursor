import { PipelineStageId } from "@/features/calculation-engine/constants/enums";
import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";
import type { PipelineStage } from "@/features/calculation-engine/pipeline/types";

/**
 * Stage: attach timing / identity metadata (no I/O).
 */
export const generateMetadataStage: PipelineStage = {
  id: PipelineStageId.GenerateMetadata,
  name: "Generate Metadata",
  async run(_ctx: CalculationContext) {
    // Metadata is assembled by the engine from context fields.
    // Stage exists for pipeline symmetry, events, and future enrichment.
  },
};
