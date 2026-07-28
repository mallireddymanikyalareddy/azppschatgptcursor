import type { PipelineStageId } from "@/features/calculation-engine/constants/enums";
import type { CalculationContext } from "@/features/calculation-engine/context/calculation-context";

export type PipelineStage = {
  id: PipelineStageId;
  name: string;
  run: (ctx: CalculationContext) => void | Promise<void>;
};
