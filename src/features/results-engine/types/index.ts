import type {
  ChartKind,
  RecommendationTone,
  ResultLayout,
  ResultValueType,
  StatusTone,
} from "@/features/results-engine/constants/enums";

export type ResultPrimitive = string | number | boolean | null | undefined;

/** Raw calculation-like payload the presentation engine can map. */
export type ResultDataBag = Record<string, ResultPrimitive>;

export type ResultFormatOptions = {
  locale?: string;
  currency?: string;
  precision?: number;
  unit?: string;
  abbreviate?: boolean;
};

export type ResultMetricDefinition = {
  id: string;
  key: string;
  label: string;
  type: ResultValueType;
  description?: string;
  format?: ResultFormatOptions;
  /** Optional badge / status mapping for status type. */
  statusMap?: Record<string, { label: string; tone: StatusTone }>;
  emphasize?: boolean;
  colSpan?: 1 | 2 | 3;
};

export type ResultSectionDefinition = {
  id: string;
  title: string;
  description?: string;
  layout?: ResultLayout;
  metricIds?: string[];
  expandable?: boolean;
  defaultOpen?: boolean;
};

export type ChartSeriesPoint = {
  label: string;
  value: number;
  color?: string;
};

export type ChartSeries = {
  id: string;
  name: string;
  data: ChartSeriesPoint[];
  color?: string;
};

export type ChartDefinition = {
  id: string;
  title: string;
  description?: string;
  kind: ChartKind;
  series: ChartSeries[];
  unit?: string;
  /** 0–100 for gauge / progress ring. */
  progress?: number;
  height?: number;
};

export type TableColumnDefinition = {
  id: string;
  header: string;
  accessorKey: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  formatType?: ResultValueType;
  format?: ResultFormatOptions;
};

export type TableDefinition = {
  id: string;
  title?: string;
  description?: string;
  columns: TableColumnDefinition[];
  rows: Record<string, ResultPrimitive>[];
  pageSize?: number;
  stickyHeader?: boolean;
};

export type ComparisonOption = {
  id: string;
  title: string;
  subtitle?: string;
  metrics: ResultMetricDefinition[];
  values: ResultDataBag;
  highlighted?: boolean;
  badge?: string;
};

export type ComparisonDefinition = {
  id: string;
  title: string;
  description?: string;
  options: ComparisonOption[];
};

export type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  value?: ResultPrimitive;
  valueType?: ResultValueType;
  format?: ResultFormatOptions;
  tone?: StatusTone;
};

export type TimelineDefinition = {
  id: string;
  title: string;
  description?: string;
  items: TimelineItem[];
};

export type BreakdownItem = {
  id: string;
  label: string;
  value: number;
  type?: ResultValueType;
  format?: ResultFormatOptions;
  color?: string;
  share?: number;
};

export type BreakdownDefinition = {
  id: string;
  title: string;
  description?: string;
  items: BreakdownItem[];
  totalLabel?: string;
};

export type RecommendationItem = {
  id: string;
  title: string;
  body: string;
  tone: RecommendationTone;
  /** Future AI flag — presentation only. */
  aiGenerated?: boolean;
};

export type RecommendationDefinition = {
  id: string;
  title?: string;
  items: RecommendationItem[];
};

export type InfoCardDefinition = {
  id: string;
  title: string;
  body: string;
  tone?: StatusTone;
};

/**
 * Full presentation config for one calculator result surface.
 * No per-calculator React components required.
 */
export type ResultsViewDefinition = {
  id: string;
  calculatorId: string;
  calculatorSlug: string;
  title: string;
  summary?: string;
  layout?: ResultLayout;
  metrics: ResultMetricDefinition[];
  sections?: ResultSectionDefinition[];
  charts?: ChartDefinition[];
  tables?: TableDefinition[];
  comparisons?: ComparisonDefinition[];
  timelines?: TimelineDefinition[];
  breakdowns?: BreakdownDefinition[];
  recommendations?: RecommendationDefinition;
  infoCards?: InfoCardDefinition[];
  /** Print-friendly title override. */
  printTitle?: string;
};

export type MappedMetric = {
  definition: ResultMetricDefinition;
  raw: ResultPrimitive;
  formatted: string;
};
