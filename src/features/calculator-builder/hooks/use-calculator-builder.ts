"use client";

import * as React from "react";

import { BuilderStep } from "@/features/calculator-builder/constants/enums";
import { useBuilderState } from "@/features/calculator-builder/hooks/use-builder-state";
import { useJSONGenerator } from "@/features/calculator-builder/hooks/use-json-generator";
import { usePreview } from "@/features/calculator-builder/hooks/use-preview";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import type { UseBuilderStateResult } from "@/features/calculator-builder/hooks/use-builder-state";
import type { UseJSONGeneratorResult } from "@/features/calculator-builder/hooks/use-json-generator";
import type { UsePreviewResult } from "@/features/calculator-builder/hooks/use-preview";

export type UseCalculatorBuilderOptions = {
  initial?: CalculatorBuilderDefinition;
  enableAutosave?: boolean;
};

export type UseCalculatorBuilderResult = UseBuilderStateResult & {
  step: BuilderStep;
  setStep: (step: BuilderStep) => void;
  preview: UsePreviewResult;
  json: UseJSONGeneratorResult;
};

/**
 * Facade hook composing builder state, preview, and JSON generation.
 */
export function useCalculatorBuilder(
  options: UseCalculatorBuilderOptions = {},
): UseCalculatorBuilderResult {
  const state = useBuilderState({
    initial: options.initial,
    enableAutosave: options.enableAutosave,
  });
  const [step, setStep] = React.useState<BuilderStep>(BuilderStep.Metadata);
  const preview = usePreview(state.definition);
  const json = useJSONGenerator(state.definition);

  return {
    ...state,
    step,
    setStep,
    preview,
    json,
  };
}
