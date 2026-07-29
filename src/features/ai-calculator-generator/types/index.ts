import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import type { TemplateType } from "@/features/calculator-templates/constants/enums";
import type {
  ContentLength,
  GenerationReviewStatus,
  GenerationStage,
  GenerationStatus,
  PromptAudience,
  PromptIndustry,
  PromptLibraryCategory,
} from "@/features/ai-calculator-generator/constants/enums";

/** User-facing generation request (configuration-driven). */
export type GeneratorPromptInput = {
  prompt: string;
  templateId?: string | "auto";
  industry: PromptIndustry | "auto";
  audience: PromptAudience;
  country: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  contentLength: ContentLength;
  seoTarget?: string;
};

export type IntentAnalysisResult = {
  category: string;
  calculatorType: string;
  requiredInputs: string[];
  requiredOutputs: string[];
  complexity: "low" | "medium" | "high";
  industry: PromptIndustry;
  keywords: string[];
  confidence: number;
};

export type TemplateMatchResult = {
  templateId: string | null;
  templateName: string | null;
  templateType: TemplateType | null;
  score: number;
  rationale: string;
};

export type GenerationConfidence = {
  templateMatch: number;
  formula: number;
  seo: number;
  content: number;
  overall: number;
};

export type GenerationValidationIssue = {
  code: string;
  message: string;
  path?: string;
  severity: "error" | "warning";
};

export type GenerationValidationReport = {
  valid: boolean;
  issues: GenerationValidationIssue[];
};

export type RelatedSuggestion = {
  id: string;
  kind: "calculator" | "article";
  title: string;
  slug?: string;
  reason: string;
};

export type PipelineStageState = {
  stage: GenerationStage;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  message?: string;
  startedAt?: string;
  completedAt?: string;
};

/**
 * Full generation artifact — never published automatically.
 * `definition` is CalculatorBuilderDefinition-compatible for Builder review.
 */
export type GenerationResult = {
  id: string;
  prompt: GeneratorPromptInput;
  status: GenerationStatus;
  reviewStatus: GenerationReviewStatus;
  intent: IntentAnalysisResult;
  templateMatch: TemplateMatchResult;
  definition: CalculatorBuilderDefinition;
  confidence: GenerationConfidence;
  validation: GenerationValidationReport;
  related: RelatedSuggestion[];
  stages: PipelineStageState[];
  createdAt: string;
  completedAt?: string;
  durationMs?: number;
  provider: "mock";
};

export type GenerationHistoryItem = {
  id: string;
  promptText: string;
  calculatorName: string;
  status: GenerationStatus;
  reviewStatus: GenerationReviewStatus;
  createdAt: string;
  durationMs: number;
  overallConfidence: number;
  templateName: string | null;
};

export type PromptLibraryItem = {
  id: string;
  title: string;
  prompt: string;
  category: PromptLibraryCategory;
  industry: PromptIndustry;
  tags: string[];
};

export type GeneratorDashboardStats = {
  totalGenerations: number;
  needsReview: number;
  completed: number;
  avgConfidence: number;
  avgDurationMs: number;
};

export function createDefaultPromptInput(
  overrides?: Partial<GeneratorPromptInput>,
): GeneratorPromptInput {
  return {
    prompt: "",
    templateId: "auto",
    industry: "auto",
    audience: "consumers",
    country: "IN",
    language: "en",
    difficulty: "beginner",
    contentLength: "medium",
    seoTarget: "",
    ...overrides,
  };
}
