import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import {
  GenerationReviewStatus,
  GenerationStatus,
} from "@/features/ai-calculator-generator/constants/enums";
import type {
  GenerationHistoryItem,
  GenerationResult,
  GeneratorDashboardStats,
  GeneratorPromptInput,
  PipelineStageState,
  PromptLibraryItem,
} from "@/features/ai-calculator-generator/types";
import { MOCK_GENERATION_HISTORY } from "@/features/ai-calculator-generator/data/mock-history";
import { PROMPT_LIBRARY } from "@/features/ai-calculator-generator/data/prompt-library";
import { GenerationPipeline } from "@/features/ai-calculator-generator/services/generation-pipeline";
import type { PipelineProgressCallback } from "@/features/ai-calculator-generator/services/generation-pipeline";
import { PromptAnalyzer } from "@/features/ai-calculator-generator/services/prompt-analyzer";
import { TemplateMatcher } from "@/features/ai-calculator-generator/services/template-matcher";
import { ContentGenerator } from "@/features/ai-calculator-generator/services/content-generator";
import { SEOGenerator } from "@/features/ai-calculator-generator/services/seo-generator";
import { GenerationValidationService } from "@/features/ai-calculator-generator/services/validation-service";
import { mockAIProvider } from "@/features/ai-calculator-generator/services/mock-ai-provider";

/**
 * Application facade for AI Calculator Generator.
 * Mock in-memory history; never publishes calculators.
 */
export class AIGeneratorService {
  private history: GenerationResult[];
  private readonly pipeline: GenerationPipeline;

  constructor() {
    this.history = structuredClone(MOCK_GENERATION_HISTORY);
    this.pipeline = new GenerationPipeline(
      new PromptAnalyzer(mockAIProvider),
      new TemplateMatcher(),
      new ContentGenerator(),
      new SEOGenerator(),
      new GenerationValidationService(),
    );
  }

  getPromptLibrary(): PromptLibraryItem[] {
    return structuredClone(PROMPT_LIBRARY);
  }

  getTemplateOptions() {
    return new TemplateMatcher().listOptions();
  }

  async listHistory(): Promise<GenerationHistoryItem[]> {
    return this.history
      .map((item) => ({
        id: item.id,
        promptText: item.prompt.prompt,
        calculatorName: item.definition.metadata.name,
        status: item.status,
        reviewStatus: item.reviewStatus,
        createdAt: item.createdAt,
        durationMs: item.durationMs ?? 0,
        overallConfidence: item.confidence.overall,
        templateName: item.templateMatch.templateName,
      }))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async getById(id: string): Promise<GenerationResult | null> {
    return structuredClone(this.history.find((item) => item.id === id) ?? null);
  }

  getDashboardStats(): GeneratorDashboardStats {
    const total = this.history.length;
    const needsReview = this.history.filter(
      (h) => h.reviewStatus === GenerationReviewStatus.InReview,
    ).length;
    const completed = this.history.filter(
      (h) =>
        h.status === GenerationStatus.Completed ||
        h.status === GenerationStatus.NeedsReview,
    ).length;
    const avgConfidence =
      total === 0
        ? 0
        : this.history.reduce((sum, h) => sum + h.confidence.overall, 0) /
          total;
    const avgDurationMs =
      total === 0
        ? 0
        : this.history.reduce((sum, h) => sum + (h.durationMs ?? 0), 0) / total;

    return {
      totalGenerations: total,
      needsReview,
      completed,
      avgConfidence: Number(avgConfidence.toFixed(2)),
      avgDurationMs: Math.round(avgDurationMs),
    };
  }

  async generate(
    prompt: GeneratorPromptInput,
    onProgress?: PipelineProgressCallback,
  ): Promise<GenerationResult> {
    const result = await this.pipeline.run(prompt, onProgress);
    this.history.unshift(result);
    return structuredClone(result);
  }

  async updateDefinition(
    id: string,
    definition: CalculatorBuilderDefinition,
  ): Promise<GenerationResult | null> {
    const index = this.history.findIndex((item) => item.id === id);
    if (index < 0) return null;
    const current = this.history[index];
    const validation = new GenerationValidationService().validate(definition);
    const next: GenerationResult = {
      ...current,
      definition: {
        ...definition,
        metadata: {
          ...definition.metadata,
          status: "draft",
        },
        updatedAt: new Date().toISOString(),
      },
      validation,
      reviewStatus: GenerationReviewStatus.InReview,
      status: GenerationStatus.NeedsReview,
    };
    this.history[index] = next;
    return structuredClone(next);
  }

  async setReviewStatus(
    id: string,
    reviewStatus: GenerationReviewStatus,
  ): Promise<GenerationResult | null> {
    const index = this.history.findIndex((item) => item.id === id);
    if (index < 0) return null;
    const current = this.history[index];
    // Never publish — approved only marks human acceptance of the draft artifact.
    const next: GenerationResult = {
      ...current,
      reviewStatus,
      status:
        reviewStatus === GenerationReviewStatus.Rejected
          ? GenerationStatus.Discarded
          : GenerationStatus.NeedsReview,
      definition: {
        ...current.definition,
        metadata: {
          ...current.definition.metadata,
          status: "draft",
          visibility: "private",
        },
      },
    };
    this.history[index] = next;
    return structuredClone(next);
  }

  /** Expose live stage snapshots for UI progress (no persistence). */
  createEmptyStages(): PipelineStageState[] {
    return [];
  }
}

export const aiGeneratorService = new AIGeneratorService();
