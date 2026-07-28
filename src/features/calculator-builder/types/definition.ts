import type {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import type { FieldType } from "@/features/form-engine/constants/enums";
import type { FieldValidationRule } from "@/features/form-engine/types";
import type { OutputFormat } from "@/features/calculation-engine/constants/enums";
import type {
  ChartKind,
  RecommendationTone,
  ResultValueType,
} from "@/features/results-engine/constants/enums";

export type BuilderMetadata = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  subcategory?: string;
  difficulty: CalculatorDifficulty;
  version: string;
  status: CalculatorStatus;
  visibility: Visibility;
  tags: string[];
  icon?: string;
};

export type BuilderInput = {
  id: string;
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string | number | boolean | null;
  required: boolean;
  validation: FieldValidationRule[];
  unit?: string;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  order: number;
  /** Conditional rules placeholder — structure only. */
  conditionalRulesPlaceholder?: string;
};

export type BuilderFormula = {
  id: string;
  name: string;
  key: string;
  expression: string;
  variables: string[];
  dependencies: string[];
  precision: number;
  currency?: boolean;
  percentage?: boolean;
  description?: string;
  order: number;
};

export type BuilderResultMetric = {
  id: string;
  key: string;
  label: string;
  type: ResultValueType;
  format: OutputFormat;
  precision?: number;
  currency?: string;
  emphasize?: boolean;
  order: number;
};

export type BuilderChart = {
  id: string;
  title: string;
  kind: ChartKind;
  /** Series key → result/input key mapping (config only). */
  seriesMappings: {
    id: string;
    name: string;
    dataKey: string;
    color?: string;
  }[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  colours?: string[];
  displayRulesPlaceholder?: string;
  order: number;
};

export type BuilderSeo = {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaPlaceholder?: Record<string, unknown>;
};

export type BuilderFaq = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export type BuilderContent = {
  introduction: string;
  formulaExplanation: string;
  howItWorks: string;
  examples: { title: string; description: string }[];
  faqs: BuilderFaq[];
  tips: string[];
  references: { title: string; url?: string }[];
};

export type BuilderBreakdown = {
  id: string;
  title: string;
  items: { id: string; label: string; dataKey: string }[];
};

export type BuilderRecommendation = {
  id: string;
  title: string;
  body: string;
  tone: RecommendationTone;
};

/**
 * Canonical builder document — source of truth for JSON generation.
 */
export type CalculatorBuilderDefinition = {
  schemaVersion: string;
  definitionVersion: string;
  metadata: BuilderMetadata;
  inputs: BuilderInput[];
  formulas: BuilderFormula[];
  results: BuilderResultMetric[];
  charts: BuilderChart[];
  seo: BuilderSeo;
  content: BuilderContent;
  breakdowns: BuilderBreakdown[];
  recommendations: BuilderRecommendation[];
  createdAt: string;
  updatedAt: string;
};

/**
 * Complete multi-engine export payload.
 */
export type CalculatorDefinitionBundle = {
  schemaVersion: string;
  definitionVersion: string;
  builder: CalculatorBuilderDefinition;
  domain: Record<string, unknown>;
  form: Record<string, unknown>;
  workflow: Record<string, unknown>;
  resultsView: Record<string, unknown>;
};
