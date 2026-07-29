import type { CalculatorTemplate } from "@/features/calculator-templates/types";

export type TemplateCardModel = {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  version: string;
  templateType: string;
  status: string;
  inputCount: number;
  formulaCount: number;
  chartsIncluded: boolean;
  seoReady: boolean;
  contentReady: boolean;
  estimatedBuildMinutes: number;
  usageCount: number;
  featured?: boolean;
  popular?: boolean;
  updatedAt: string;
};

export function toTemplateCard(
  template: CalculatorTemplate,
): TemplateCardModel {
  return {
    id: template.metadata.id,
    name: template.metadata.name,
    description: template.metadata.description,
    category: template.metadata.category,
    difficulty: template.metadata.difficulty,
    version: template.metadata.version,
    templateType: template.metadata.templateType,
    status: template.metadata.status,
    inputCount: template.inputs.inputs.length,
    formulaCount: template.formulas.formulas.length,
    chartsIncluded: template.charts.charts.length > 0,
    seoReady: template.metadata.seoReady,
    contentReady: template.metadata.contentReady,
    estimatedBuildMinutes: template.metadata.estimatedBuildMinutes,
    usageCount: template.metadata.usageCount,
    featured: template.metadata.featured,
    popular: template.metadata.popular,
    updatedAt: template.metadata.updatedAt,
  };
}

export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (
    from < 0 ||
    to < 0 ||
    from >= items.length ||
    to >= items.length ||
    from === to
  ) {
    return items;
  }
  const next = [...items];
  const [removed] = next.splice(from, 1);
  next.splice(to, 0, removed);
  return next;
}

export function reorderWithOrder<T extends { order: number }>(
  items: T[],
  from: number,
  to: number,
): T[] {
  return moveItem(items, from, to).map((item, index) => ({
    ...item,
    order: index + 1,
  }));
}
