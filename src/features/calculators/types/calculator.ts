import type {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import type {
  EntityId,
  IsoDateTime,
} from "@/features/calculators/types/common";
import type { CategoryRef } from "@/features/calculators/types/category";
import type { ChartConfiguration } from "@/features/calculators/types/chart";
import type { CalculatorContent } from "@/features/calculators/types/content";
import type { FaqItem } from "@/features/calculators/types/faq";
import type { Formula } from "@/features/calculators/types/formula";
import type { ResultDefinition } from "@/features/calculators/types/result";
import type { SeoMetadata } from "@/features/calculators/types/seo";
import type { Variable } from "@/features/calculators/types/variable";

/**
 * Calculator aggregate root.
 * Composes formula, variables, results, charts, FAQ, SEO, and content
 * so every category can reuse the same shape at 10k+ scale.
 */
export type Calculator = {
  id: EntityId;
  slug: string;
  name: string;
  description: string;
  category: CategoryRef;
  status: CalculatorStatus;
  difficulty: CalculatorDifficulty;
  /** Semver-style definition version, e.g. "1.0.0". */
  version: string;
  visibility: Visibility;
  variables: Variable[];
  formulas: Formula[];
  results: ResultDefinition[];
  charts: ChartConfiguration[];
  faqs: FaqItem[];
  seo: SeoMetadata;
  content: CalculatorContent;
  /** Primary formula used for the default result. */
  primaryFormulaId?: EntityId;
  tags?: string[];
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
};

/** List/card projection — avoids hydrating full content for catalog queries. */
export type CalculatorSummary = {
  id: EntityId;
  slug: string;
  name: string;
  description: string;
  category: CategoryRef;
  status: CalculatorStatus;
  difficulty: CalculatorDifficulty;
  version: string;
  visibility: Visibility;
  tags?: string[];
  updatedAt: IsoDateTime;
};
