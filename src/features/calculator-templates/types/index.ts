import type { FieldType } from "@/features/form-engine/constants/enums";
import type { FieldValidationRule } from "@/features/form-engine/types";
import type { OutputFormat } from "@/features/calculation-engine/constants/enums";
import type {
  ChartKind,
  RecommendationTone,
  ResultValueType,
} from "@/features/results-engine/constants/enums";
import type {
  TemplateDifficulty,
  TemplateLifecycleStatus,
  TemplateType,
} from "@/features/calculator-templates/constants/enums";

/** Template catalog metadata. */
export type TemplateMetadata = {
  id: string;
  name: string;
  slug: string;
  description: string;
  templateType: TemplateType;
  category: string;
  subcategory?: string;
  difficulty: TemplateDifficulty;
  version: string;
  status: TemplateLifecycleStatus;
  tags: string[];
  estimatedBuildMinutes: number;
  usageCount: number;
  featured?: boolean;
  popular?: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  seoReady: boolean;
  contentReady: boolean;
};

export type InputBlueprintItem = {
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
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  order: number;
  groupId?: string;
};

export type InputBlueprint = {
  groups: { id: string; title: string; order: number }[];
  inputs: InputBlueprintItem[];
};

export type FormulaBlueprintItem = {
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
  groupId?: string;
};

export type FormulaBlueprint = {
  groups: { id: string; title: string; order: number }[];
  formulas: FormulaBlueprintItem[];
};

export type ResultBlueprintItem = {
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

export type ResultBlueprint = {
  metrics: ResultBlueprintItem[];
  breakdowns: {
    id: string;
    title: string;
    items: { id: string; label: string; dataKey: string }[];
  }[];
  recommendations: {
    id: string;
    title: string;
    body: string;
    tone: RecommendationTone;
  }[];
};

export type ChartBlueprintItem = {
  id: string;
  title: string;
  kind: ChartKind;
  seriesMappings: {
    id: string;
    name: string;
    dataKey: string;
    color?: string;
  }[];
  order: number;
};

export type ChartBlueprint = {
  charts: ChartBlueprintItem[];
};

export type SeoBlueprint = {
  titleTemplate: string;
  descriptionTemplate: string;
  keywordTemplate: string[];
  slugPattern: string;
  canonicalPattern?: string;
  ogTitleTemplate?: string;
  ogDescriptionTemplate?: string;
  schemaPlaceholder?: Record<string, unknown>;
};

export type ContentBlueprint = {
  introduction: string;
  howItWorks: string;
  formulaExplanation: string;
  benefits: string[];
  tips: string[];
  examples: { title: string; description: string }[];
  faqs: { id: string; question: string; answer: string; order: number }[];
  relatedCalculators: string[];
  relatedArticles: string[];
  references: { title: string; url?: string }[];
  aiPromptPlaceholders: string[];
};

export type ValidationBlueprintRule = {
  id: string;
  name: string;
  fieldName?: string;
  rule: FieldValidationRule;
  conditionalPlaceholder?: string;
};

export type ValidationBlueprint = {
  rules: ValidationBlueprintRule[];
};

export type TemplateVersionSnapshot = {
  version: string;
  status: TemplateLifecycleStatus;
  createdAt: string;
  notes?: string;
};

/**
 * Canonical calculator template — configuration only.
 * Generator maps this into CalculatorBuilderDefinition.
 */
export type CalculatorTemplate = {
  metadata: TemplateMetadata;
  inputs: InputBlueprint;
  formulas: FormulaBlueprint;
  results: ResultBlueprint;
  charts: ChartBlueprint;
  seo: SeoBlueprint;
  content: ContentBlueprint;
  validation: ValidationBlueprint;
  versions: TemplateVersionSnapshot[];
};

export type TemplateLibraryFilters = {
  search: string;
  templateType: TemplateType | "all";
  category: string | "all";
  status: TemplateLifecycleStatus | "all";
  difficulty: TemplateDifficulty | "all";
  featuredOnly: boolean;
  sortBy: "name" | "updatedAt" | "usageCount" | "createdAt";
  sortDirection: "asc" | "desc";
};

export type TemplateLibraryPageResult = {
  items: CalculatorTemplate[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  featured: CalculatorTemplate[];
  popular: CalculatorTemplate[];
  newest: CalculatorTemplate[];
  recentlyUpdated: CalculatorTemplate[];
  categories: { name: string; count: number }[];
  types: { type: TemplateType; count: number }[];
};

export type TemplateValidationIssue = {
  code: string;
  message: string;
  path?: string;
  severity: "error" | "warning";
};

export type TemplateValidationReport = {
  valid: boolean;
  issues: TemplateValidationIssue[];
};

export type TemplateExportPackage = {
  format: "json" | "zip";
  filename: string;
  mimeType: string;
  content: string;
  /** ZIP packaging is architecture-only — content remains JSON payload. */
  zipPrepared: boolean;
};

export function createDefaultTemplateFilters(): TemplateLibraryFilters {
  return {
    search: "",
    templateType: "all",
    category: "all",
    status: "all",
    difficulty: "all",
    featuredOnly: false,
    sortBy: "updatedAt",
    sortDirection: "desc",
  };
}
