import {
  createEmptyBuilderDefinition,
  createBuilderId,
  slugify,
} from "@/features/calculator-builder/lib/create-empty-definition";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import { templateGenerator } from "@/features/calculator-templates";
import type { CalculatorTemplate } from "@/features/calculator-templates";
import {
  FieldType,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";
import { OutputFormat } from "@/features/calculation-engine/constants/enums";
import {
  ChartKind,
  RecommendationTone,
  ResultValueType,
} from "@/features/results-engine/constants/enums";
import {
  GENERATION_STAGE_ORDER,
  GenerationReviewStatus,
  GenerationStage,
  GenerationStatus,
} from "@/features/ai-calculator-generator/constants/enums";
import type {
  GenerationConfidence,
  GenerationResult,
  GeneratorPromptInput,
  IntentAnalysisResult,
  PipelineStageState,
  RelatedSuggestion,
  TemplateMatchResult,
} from "@/features/ai-calculator-generator/types";
import type { PromptAnalyzer } from "@/features/ai-calculator-generator/services/prompt-analyzer";
import type { TemplateMatcher } from "@/features/ai-calculator-generator/services/template-matcher";
import type { ContentGenerator } from "@/features/ai-calculator-generator/services/content-generator";
import type { SEOGenerator } from "@/features/ai-calculator-generator/services/seo-generator";
import type { GenerationValidationService } from "@/features/ai-calculator-generator/services/validation-service";

export type PipelineProgressCallback = (
  stages: PipelineStageState[],
  current: GenerationStage,
) => void;

/**
 * Orchestrates the AI generation pipeline.
 * Output is always draft / needs_review — never published.
 */
export class GenerationPipeline {
  constructor(
    private readonly analyzer: PromptAnalyzer,
    private readonly matcher: TemplateMatcher,
    private readonly content: ContentGenerator,
    private readonly seo: SEOGenerator,
    private readonly validator: GenerationValidationService,
  ) {}

  async run(
    prompt: GeneratorPromptInput,
    onProgress?: PipelineProgressCallback,
  ): Promise<GenerationResult> {
    const started = Date.now();
    const createdAt = new Date().toISOString();
    const id = `gen_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const stages: PipelineStageState[] = GENERATION_STAGE_ORDER.map(
      (stage) => ({
        stage,
        status: "pending",
      }),
    );

    const mark = async (
      stage: GenerationStage,
      status: PipelineStageState["status"],
      message?: string,
    ) => {
      const row = stages.find((s) => s.stage === stage);
      if (!row) return;
      if (status === "running") row.startedAt = new Date().toISOString();
      if (status === "completed" || status === "failed") {
        row.completedAt = new Date().toISOString();
      }
      row.status = status;
      row.message = message;
      onProgress?.(structuredClone(stages), stage);
      await delay(status === "running" ? 70 : 20);
    };

    try {
      await mark(GenerationStage.IntentAnalysis, "running");
      const intent = await this.analyzer.analyze(prompt);
      await mark(
        GenerationStage.IntentAnalysis,
        "completed",
        `${intent.category} · ${intent.calculatorType}`,
      );

      await mark(GenerationStage.DomainDetection, "running");
      await mark(GenerationStage.DomainDetection, "completed", intent.industry);

      await mark(GenerationStage.TemplateSelection, "running");
      const templateMatch = this.matcher.match(intent, prompt.templateId);
      await mark(
        GenerationStage.TemplateSelection,
        "completed",
        templateMatch.templateName ?? "blank scaffold",
      );

      const template = templateMatch.templateId
        ? this.matcher.getById(templateMatch.templateId)
        : null;

      await mark(GenerationStage.InputGeneration, "running");
      let definition = buildDefinitionFromTemplateOrIntent({
        prompt,
        intent,
        template,
      });
      await mark(
        GenerationStage.InputGeneration,
        "completed",
        `${definition.inputs.length} inputs`,
      );

      await mark(GenerationStage.FormulaGeneration, "running");
      await mark(
        GenerationStage.FormulaGeneration,
        "completed",
        `${definition.formulas.length} formulas`,
      );

      await mark(GenerationStage.ValidationRules, "running");
      await mark(
        GenerationStage.ValidationRules,
        "completed",
        "Field validation attached",
      );

      await mark(GenerationStage.ResultsConfiguration, "running");
      await mark(
        GenerationStage.ResultsConfiguration,
        "completed",
        `${definition.results.length} metrics`,
      );

      await mark(GenerationStage.ChartsConfiguration, "running");
      await mark(
        GenerationStage.ChartsConfiguration,
        "completed",
        `${definition.charts.length} charts`,
      );

      await mark(GenerationStage.SeoGeneration, "running");
      definition = {
        ...definition,
        seo: this.seo.generate({
          prompt,
          intent,
          name: definition.metadata.name,
        }),
        metadata: {
          ...definition.metadata,
          slug:
            slugify(definition.metadata.name) ||
            definition.metadata.slug ||
            "generated-calculator",
          status: CalculatorStatus.Draft,
          visibility: Visibility.Private,
        },
      };
      await mark(GenerationStage.SeoGeneration, "completed", "SEO draft ready");

      await mark(GenerationStage.ContentGeneration, "running");
      definition = {
        ...definition,
        content: this.content.generate({ prompt, intent, definition }),
      };
      await mark(
        GenerationStage.ContentGeneration,
        "completed",
        "Long-form content scaffold",
      );

      await mark(GenerationStage.FaqGeneration, "running");
      await mark(
        GenerationStage.FaqGeneration,
        "completed",
        `${definition.content.faqs.length} FAQs`,
      );

      await mark(GenerationStage.RelatedSuggestions, "running");
      const related = buildRelatedSuggestions(intent, templateMatch);
      await mark(
        GenerationStage.RelatedSuggestions,
        "completed",
        `${related.length} suggestions`,
      );

      await mark(GenerationStage.PreviewReady, "running");
      await mark(GenerationStage.PreviewReady, "completed", "Preview ready");

      await mark(GenerationStage.Validation, "running");
      const validation = this.validator.validate(definition);
      await mark(
        GenerationStage.Validation,
        "completed",
        validation.valid ? "Passed" : "Needs fixes",
      );

      await mark(GenerationStage.BuilderReview, "running");
      await mark(
        GenerationStage.BuilderReview,
        "completed",
        "Awaiting human review",
      );

      const confidence = buildConfidence(
        intent,
        templateMatch,
        validation.valid,
        definition,
      );

      const completedAt = new Date().toISOString();
      return {
        id,
        prompt,
        status: GenerationStatus.NeedsReview,
        reviewStatus: GenerationReviewStatus.InReview,
        intent,
        templateMatch,
        definition,
        confidence,
        validation,
        related,
        stages,
        createdAt,
        completedAt,
        durationMs: Date.now() - started,
        provider: "mock",
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Generation failed";
      const running = stages.find((s) => s.status === "running");
      if (running) {
        running.status = "failed";
        running.message = message;
      }
      throw error;
    }
  }
}

function buildDefinitionFromTemplateOrIntent(args: {
  prompt: GeneratorPromptInput;
  intent: IntentAnalysisResult;
  template: CalculatorTemplate | null;
}): CalculatorBuilderDefinition {
  if (args.template) {
    const fromTemplate = templateGenerator.generate(args.template);
    const name =
      extractNameFromPrompt(args.prompt.prompt) || fromTemplate.metadata.name;
    return {
      ...fromTemplate,
      metadata: {
        ...fromTemplate.metadata,
        id: createBuilderId("ai_calc"),
        name,
        slug: slugify(name),
        description: `${fromTemplate.metadata.description} (AI draft — not published)`,
        difficulty: mapDifficulty(args.prompt.difficulty),
        status: CalculatorStatus.Draft,
        visibility: Visibility.Private,
        tags: [
          ...new Set([
            ...fromTemplate.metadata.tags,
            "ai-generated",
            "needs-review",
          ]),
        ],
      },
      recommendations: [
        ...fromTemplate.recommendations,
        {
          id: createBuilderId("rec"),
          title: "Human review required",
          body: "This calculator was generated by mock AI and must be reviewed before publishing.",
          tone: RecommendationTone.Warning,
        },
      ],
    };
  }

  return buildBlankFromIntent(args.prompt, args.intent);
}

function buildBlankFromIntent(
  prompt: GeneratorPromptInput,
  intent: IntentAnalysisResult,
): CalculatorBuilderDefinition {
  const name =
    extractNameFromPrompt(prompt.prompt) || `${intent.category} Calculator`;
  const now = new Date().toISOString();
  const base = createEmptyBuilderDefinition({
    metadata: {
      id: createBuilderId("ai_calc"),
      name,
      slug: slugify(name),
      description: `AI-generated draft for: ${prompt.prompt}`,
      categoryId: `cat_${slugify(intent.category) || "general"}`,
      categorySlug: slugify(intent.category) || "general",
      categoryName: intent.category,
      difficulty: mapDifficulty(prompt.difficulty),
      version: "0.1.0",
      status: CalculatorStatus.Draft,
      visibility: Visibility.Private,
      tags: ["ai-generated", "needs-review", intent.industry],
    },
    createdAt: now,
    updatedAt: now,
  });

  const inputs = intent.requiredInputs.map((inputName, index) => ({
    id: createBuilderId("in"),
    label: labelize(inputName),
    name: inputName,
    type: FieldType.Number,
    required: true,
    validation: [
      {
        type: ValidationRuleType.Required,
        message: `${labelize(inputName)} is required.`,
      },
    ],
    defaultValue: index === 0 ? 100 : 10,
    order: index + 1,
  }));

  const primaryOut = intent.requiredOutputs[0] ?? "result";
  const expression =
    intent.requiredInputs.length > 0 ? intent.requiredInputs.join(" * ") : "0";

  return {
    ...base,
    inputs,
    formulas: [
      {
        id: createBuilderId("f"),
        name: labelize(primaryOut),
        key: primaryOut,
        expression,
        variables: intent.requiredInputs,
        dependencies: [],
        precision: 2,
        order: 1,
        description: "Mock formula scaffold — refine in Builder Review.",
      },
    ],
    results: [
      {
        id: createBuilderId("m"),
        key: primaryOut,
        label: labelize(primaryOut),
        type: ResultValueType.Number,
        format: OutputFormat.Decimal,
        emphasize: true,
        order: 1,
      },
    ],
    charts: [
      {
        id: createBuilderId("c"),
        title: "Result overview",
        kind: ChartKind.ProgressRing,
        seriesMappings: [
          { id: "s1", name: labelize(primaryOut), dataKey: primaryOut },
        ],
        order: 1,
      },
    ],
    recommendations: [
      {
        id: createBuilderId("rec"),
        title: "Human review required",
        body: "Blank-scaffold generation — verify formulas before publishing.",
        tone: RecommendationTone.Warning,
      },
    ],
  };
}

function buildRelatedSuggestions(
  intent: IntentAnalysisResult,
  match: TemplateMatchResult,
): RelatedSuggestion[] {
  return [
    {
      id: "rel_1",
      kind: "calculator",
      title: `${intent.category} companion calculator`,
      slug: slugify(`${intent.category}-companion`),
      reason: "Same domain, adjacent use case",
    },
    {
      id: "rel_2",
      kind: "article",
      title: `How to use a ${intent.calculatorType} calculator`,
      reason: "Supports content cluster SEO",
    },
    {
      id: "rel_3",
      kind: "calculator",
      title: match.templateName
        ? `Related to ${match.templateName}`
        : "Generic percentage calculator",
      reason: "Template neighbourhood suggestion",
    },
  ];
}

function buildConfidence(
  intent: IntentAnalysisResult,
  match: TemplateMatchResult,
  validationOk: boolean,
  definition: CalculatorBuilderDefinition,
): GenerationConfidence {
  const formula =
    definition.formulas.length > 0 &&
    definition.formulas.every((f) => f.expression.trim())
      ? 0.88
      : 0.45;
  const seo =
    definition.seo.title && definition.seo.keywords.length > 0 ? 0.86 : 0.5;
  const content =
    definition.content.introduction.split(/\s+/).length > 200 ? 0.84 : 0.6;
  const templateMatch = match.score || intent.confidence;
  const overall = Number(
    (
      (templateMatch + formula + seo + content + (validationOk ? 0.9 : 0.4)) /
      5
    ).toFixed(2),
  );
  return {
    templateMatch: Number(templateMatch.toFixed(2)),
    formula,
    seo,
    content,
    overall,
  };
}

function extractNameFromPrompt(prompt: string): string | null {
  const cleaned = prompt
    .replace(/^(create|build|make|generate)\s+(a|an|the)\s+/i, "")
    .replace(/\s+calculator.*$/i, "")
    .trim();
  if (!cleaned || cleaned.length < 2) return null;
  return `${cleaned
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")} Calculator`.replace(/Calculator Calculator/i, "Calculator");
}

function labelize(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function mapDifficulty(
  value: GeneratorPromptInput["difficulty"],
): (typeof CalculatorDifficulty)[keyof typeof CalculatorDifficulty] {
  switch (value) {
    case "intermediate":
      return CalculatorDifficulty.Intermediate;
    case "advanced":
      return CalculatorDifficulty.Advanced;
    case "expert":
      return CalculatorDifficulty.Expert;
    default:
      return CalculatorDifficulty.Beginner;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
