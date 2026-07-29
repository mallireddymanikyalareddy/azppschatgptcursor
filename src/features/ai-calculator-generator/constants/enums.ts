/**
 * AI Calculator Generator — pipeline stages and catalogs.
 * Mock-only; swap MockAIProvider for a real LLM adapter later.
 */

export const GenerationStage = {
  IntentAnalysis: "intent_analysis",
  DomainDetection: "domain_detection",
  TemplateSelection: "template_selection",
  InputGeneration: "input_generation",
  FormulaGeneration: "formula_generation",
  ValidationRules: "validation_rules",
  ResultsConfiguration: "results_configuration",
  ChartsConfiguration: "charts_configuration",
  SeoGeneration: "seo_generation",
  ContentGeneration: "content_generation",
  FaqGeneration: "faq_generation",
  RelatedSuggestions: "related_suggestions",
  PreviewReady: "preview_ready",
  Validation: "validation",
  BuilderReview: "builder_review",
} as const;

export type GenerationStage =
  (typeof GenerationStage)[keyof typeof GenerationStage];

export const GENERATION_STAGE_ORDER: GenerationStage[] = [
  GenerationStage.IntentAnalysis,
  GenerationStage.DomainDetection,
  GenerationStage.TemplateSelection,
  GenerationStage.InputGeneration,
  GenerationStage.FormulaGeneration,
  GenerationStage.ValidationRules,
  GenerationStage.ResultsConfiguration,
  GenerationStage.ChartsConfiguration,
  GenerationStage.SeoGeneration,
  GenerationStage.ContentGeneration,
  GenerationStage.FaqGeneration,
  GenerationStage.RelatedSuggestions,
  GenerationStage.PreviewReady,
  GenerationStage.Validation,
  GenerationStage.BuilderReview,
];

export const GenerationStatus = {
  Idle: "idle",
  Queued: "queued",
  Running: "running",
  Completed: "completed",
  Failed: "failed",
  NeedsReview: "needs_review",
  Discarded: "discarded",
} as const;

export type GenerationStatus =
  (typeof GenerationStatus)[keyof typeof GenerationStatus];

/** Generated calculators never auto-publish. */
export const GenerationReviewStatus = {
  Draft: "draft",
  InReview: "in_review",
  Approved: "approved",
  Rejected: "rejected",
} as const;

export type GenerationReviewStatus =
  (typeof GenerationReviewStatus)[keyof typeof GenerationReviewStatus];

export const PromptIndustry = {
  Finance: "finance",
  Tax: "tax",
  Health: "health",
  Fitness: "fitness",
  Investment: "investment",
  Insurance: "insurance",
  Education: "education",
  Construction: "construction",
  Utility: "utility",
  General: "general",
} as const;

export type PromptIndustry =
  (typeof PromptIndustry)[keyof typeof PromptIndustry];

export const PromptAudience = {
  Consumers: "consumers",
  Professionals: "professionals",
  Students: "students",
  Businesses: "businesses",
  General: "general",
} as const;

export type PromptAudience =
  (typeof PromptAudience)[keyof typeof PromptAudience];

export const ContentLength = {
  Short: "short",
  Medium: "medium",
  Long: "long",
} as const;

export type ContentLength = (typeof ContentLength)[keyof typeof ContentLength];

export const PromptLibraryCategory = {
  Loans: "loans",
  Investments: "investments",
  Tax: "tax",
  Health: "health",
  Retirement: "retirement",
  Utilities: "utilities",
} as const;

export type PromptLibraryCategory =
  (typeof PromptLibraryCategory)[keyof typeof PromptLibraryCategory];
