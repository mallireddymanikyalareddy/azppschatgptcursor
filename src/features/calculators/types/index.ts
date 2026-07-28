import type {
  CalculatorDifficulty,
  CalculatorStatus,
  CategoryType,
  FormulaType,
  Visibility,
} from "@/features/calculators/constants/enums";

export type {
  DomainError,
  DomainErrorCode,
  DomainResult,
  EntityId,
  IsoDateTime,
  LocaleCode,
  PageRequest,
  PageResult,
  UnitDefinition,
  VariableOption,
} from "@/features/calculators/types/common";

export type {
  Calculator,
  CalculatorSummary,
} from "@/features/calculators/types/calculator";

export type {
  Category,
  CategoryRef,
} from "@/features/calculators/types/category";

export type {
  ChartAxis,
  ChartConfiguration,
  ChartLegend,
  ChartSeries,
} from "@/features/calculators/types/chart";

export type {
  CalculatorContent,
  ContentExample,
  ContentReference,
} from "@/features/calculators/types/content";

export type { FaqItem } from "@/features/calculators/types/faq";

export type { Formula } from "@/features/calculators/types/formula";

export type { ResultDefinition } from "@/features/calculators/types/result";

export type { SeoMetadata } from "@/features/calculators/types/seo";

export type { ValidationRule } from "@/features/calculators/types/validation-rule";

export type { Variable } from "@/features/calculators/types/variable";

/** Query filters for calculator catalogs (repository / service contracts). */
export type CalculatorListFilter = {
  status?: CalculatorStatus | CalculatorStatus[];
  categoryId?: string;
  categorySlug?: string;
  visibility?: Visibility;
  difficulty?: CalculatorDifficulty;
  search?: string;
  tags?: string[];
};

export type CategoryListFilter = {
  parentId?: string | null;
  type?: CategoryType;
  search?: string;
};

export type FormulaListFilter = {
  calculatorId?: string;
  type?: FormulaType;
  search?: string;
};
