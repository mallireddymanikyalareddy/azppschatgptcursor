"use client";

import * as React from "react";

import type { PipelineStageState } from "@/features/ai-calculator-generator/types";
import type { GenerationStage } from "@/features/ai-calculator-generator/constants/enums";

export type UseGenerationPipelineResult = {
  stages: PipelineStageState[];
  currentStage: GenerationStage | null;
  setProgress: (stages: PipelineStageState[], current: GenerationStage) => void;
  reset: () => void;
  completedCount: number;
  totalCount: number;
  percent: number;
};

export function useGenerationPipeline(
  initial: PipelineStageState[] = [],
): UseGenerationPipelineResult {
  const [stages, setStages] = React.useState(initial);
  const [currentStage, setCurrentStage] =
    React.useState<GenerationStage | null>(null);

  const setProgress = React.useCallback(
    (next: PipelineStageState[], current: GenerationStage) => {
      setStages(next);
      setCurrentStage(current);
    },
    [],
  );

  const reset = React.useCallback(() => {
    setStages([]);
    setCurrentStage(null);
  }, []);

  const completedCount = stages.filter((s) => s.status === "completed").length;
  const totalCount = Math.max(stages.length, 1);
  const percent = Math.round((completedCount / totalCount) * 100);

  return {
    stages,
    currentStage,
    setProgress,
    reset,
    completedCount,
    totalCount,
    percent,
  };
}
