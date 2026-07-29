"use client";

import * as React from "react";

import { GenerationReviewStatus } from "@/features/ai-calculator-generator/constants/enums";
import type {
  GenerationResult,
  GeneratorDashboardStats,
  GeneratorPromptInput,
  PipelineStageState,
} from "@/features/ai-calculator-generator/types";
import { createDefaultPromptInput } from "@/features/ai-calculator-generator/types";
import { aiGeneratorService } from "@/features/ai-calculator-generator/services";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

export type UseAIGeneratorResult = {
  prompt: GeneratorPromptInput;
  setPrompt: React.Dispatch<React.SetStateAction<GeneratorPromptInput>>;
  patchPrompt: (patch: Partial<GeneratorPromptInput>) => void;
  result: GenerationResult | null;
  stages: PipelineStageState[];
  currentStage: string | null;
  generating: boolean;
  error: string | null;
  stats: GeneratorDashboardStats;
  notice: string | null;
  setNotice: (message: string | null) => void;
  generate: () => Promise<void>;
  loadResult: (id: string) => Promise<void>;
  updateDefinition: (definition: CalculatorBuilderDefinition) => Promise<void>;
  approveDraft: () => Promise<void>;
  rejectDraft: () => Promise<void>;
  clearResult: () => void;
  refreshStats: () => void;
};

export function useAIGenerator(): UseAIGeneratorResult {
  const [prompt, setPrompt] = React.useState(createDefaultPromptInput);
  const [result, setResult] = React.useState<GenerationResult | null>(null);
  const [stages, setStages] = React.useState<PipelineStageState[]>([]);
  const [currentStage, setCurrentStage] = React.useState<string | null>(null);
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [stats, setStats] = React.useState(() =>
    aiGeneratorService.getDashboardStats(),
  );

  const patchPrompt = React.useCallback(
    (patch: Partial<GeneratorPromptInput>) => {
      setPrompt((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  const refreshStats = React.useCallback(() => {
    setStats(aiGeneratorService.getDashboardStats());
  }, []);

  const generate = React.useCallback(async () => {
    if (!prompt.prompt.trim()) {
      setError("Enter a prompt to generate a calculator.");
      return;
    }
    setGenerating(true);
    setError(null);
    setNotice(null);
    setStages([]);
    setCurrentStage(null);
    try {
      const next = await aiGeneratorService.generate(
        prompt,
        (nextStages, stage) => {
          setStages(nextStages);
          setCurrentStage(stage);
        },
      );
      setResult(next);
      setNotice(
        `Generated “${next.definition.metadata.name}” — draft only, not published.`,
      );
      refreshStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }, [prompt, refreshStats]);

  const loadResult = React.useCallback(async (id: string) => {
    const item = await aiGeneratorService.getById(id);
    if (item) {
      setResult(item);
      setStages(item.stages);
      setPrompt(item.prompt);
      setNotice(`Loaded generation “${item.definition.metadata.name}”.`);
    }
  }, []);

  const updateDefinition = React.useCallback(
    async (definition: CalculatorBuilderDefinition) => {
      if (!result) return;
      const updated = await aiGeneratorService.updateDefinition(
        result.id,
        definition,
      );
      if (updated) {
        setResult(updated);
        setNotice("Draft definition updated (still not published).");
        refreshStats();
      }
    },
    [result, refreshStats],
  );

  const approveDraft = React.useCallback(async () => {
    if (!result) return;
    const updated = await aiGeneratorService.setReviewStatus(
      result.id,
      GenerationReviewStatus.Approved,
    );
    if (updated) {
      setResult(updated);
      setNotice(
        "Draft approved for later Builder handoff — calculator remains unpublished.",
      );
      refreshStats();
    }
  }, [result, refreshStats]);

  const rejectDraft = React.useCallback(async () => {
    if (!result) return;
    const updated = await aiGeneratorService.setReviewStatus(
      result.id,
      GenerationReviewStatus.Rejected,
    );
    if (updated) {
      setResult(updated);
      setNotice("Generation discarded.");
      refreshStats();
    }
  }, [result, refreshStats]);

  const clearResult = React.useCallback(() => {
    setResult(null);
    setStages([]);
    setCurrentStage(null);
    setError(null);
  }, []);

  return {
    prompt,
    setPrompt,
    patchPrompt,
    result,
    stages,
    currentStage,
    generating,
    error,
    stats,
    notice,
    setNotice,
    generate,
    loadResult,
    updateDefinition,
    approveDraft,
    rejectDraft,
    clearResult,
    refreshStats,
  };
}
