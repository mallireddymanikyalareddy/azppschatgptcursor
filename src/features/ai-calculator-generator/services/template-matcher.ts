import {
  MOCK_CALCULATOR_TEMPLATES,
  type CalculatorTemplate,
} from "@/features/calculator-templates";
import type { TemplateType } from "@/features/calculator-templates/constants/enums";
import type {
  IntentAnalysisResult,
  TemplateMatchResult,
} from "@/features/ai-calculator-generator/types";

/**
 * Matches prompt intent to the best Calculator Template.
 * Reads mock catalog only — does not modify the Template System.
 */
export class TemplateMatcher {
  constructor(
    private readonly templates: CalculatorTemplate[] = MOCK_CALCULATOR_TEMPLATES,
  ) {}

  match(
    intent: IntentAnalysisResult,
    preferredTemplateId?: string | "auto",
  ): TemplateMatchResult {
    if (preferredTemplateId && preferredTemplateId !== "auto") {
      const preferred = this.templates.find(
        (t) => t.metadata.id === preferredTemplateId,
      );
      if (preferred) {
        return {
          templateId: preferred.metadata.id,
          templateName: preferred.metadata.name,
          templateType: preferred.metadata.templateType,
          score: 0.98,
          rationale: "Explicit template selection from prompt workspace.",
        };
      }
    }

    let best: { template: CalculatorTemplate; score: number } | null = null;

    for (const template of this.templates) {
      const score = scoreTemplate(template, intent);
      if (!best || score > best.score) best = { template, score };
    }

    if (!best || best.score < 0.25) {
      return {
        templateId: null,
        templateName: null,
        templateType: null,
        score: 0,
        rationale: "No strong template match — generating from blank scaffold.",
      };
    }

    return {
      templateId: best.template.metadata.id,
      templateName: best.template.metadata.name,
      templateType: best.template.metadata.templateType,
      score: Number(best.score.toFixed(2)),
      rationale: `Matched “${best.template.metadata.name}” via category/type keywords.`,
    };
  }

  getById(id: string): CalculatorTemplate | null {
    return this.templates.find((t) => t.metadata.id === id) ?? null;
  }

  listOptions(): { id: string; name: string; type: TemplateType }[] {
    return this.templates.map((t) => ({
      id: t.metadata.id,
      name: t.metadata.name,
      type: t.metadata.templateType,
    }));
  }
}

export const templateMatcher = new TemplateMatcher();

function scoreTemplate(
  template: CalculatorTemplate,
  intent: IntentAnalysisResult,
): number {
  let score = 0;
  const name = template.metadata.name.toLowerCase();
  const slug = template.metadata.slug.toLowerCase();
  const category = template.metadata.category.toLowerCase();
  const type = template.metadata.templateType;

  if (category.includes(intent.category.toLowerCase())) score += 0.35;
  if (intent.category.toLowerCase().includes(category)) score += 0.2;

  for (const keyword of intent.keywords) {
    if (name.includes(keyword) || slug.includes(keyword)) score += 0.12;
    if (template.metadata.tags.some((tag) => tag.includes(keyword))) {
      score += 0.05;
    }
  }

  const typeMap: Record<string, TemplateType[]> = {
    emi: ["loan", "mortgage", "finance"],
    investment: ["investment", "savings", "retirement"],
    tax: ["tax"],
    health: ["health", "fitness", "medical"],
    retirement: ["retirement", "savings"],
    utility: ["utility", "conversion", "custom"],
  };

  const allowed = typeMap[intent.calculatorType] ?? [];
  if (allowed.includes(type)) score += 0.3;

  return Math.min(1, score);
}
