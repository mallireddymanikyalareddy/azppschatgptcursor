export const ResultValueType = {
  Currency: "currency",
  Percentage: "percentage",
  Number: "number",
  Decimal: "decimal",
  Text: "text",
  Boolean: "boolean",
  Duration: "duration",
  Date: "date",
  Time: "time",
  Rating: "rating",
  Score: "score",
  Status: "status",
} as const;

export type ResultValueType =
  (typeof ResultValueType)[keyof typeof ResultValueType];

export const ResultLayout = {
  SingleMetric: "single_metric",
  CardGrid: "card_grid",
  ComparisonGrid: "comparison_grid",
  SummarySection: "summary_section",
  DetailedSection: "detailed_section",
  ExpandableSections: "expandable_sections",
} as const;

export type ResultLayout = (typeof ResultLayout)[keyof typeof ResultLayout];

export const ChartKind = {
  Line: "line",
  Area: "area",
  Bar: "bar",
  HorizontalBar: "horizontal_bar",
  Pie: "pie",
  Donut: "donut",
  StackedBar: "stacked_bar",
  ProgressRing: "progress_ring",
  Gauge: "gauge",
  Sparkline: "sparkline",
} as const;

export type ChartKind = (typeof ChartKind)[keyof typeof ChartKind];

export const RecommendationTone = {
  Tip: "tip",
  Warning: "warning",
  Suggestion: "suggestion",
  Insight: "insight",
} as const;

export type RecommendationTone =
  (typeof RecommendationTone)[keyof typeof RecommendationTone];

export const StatusTone = {
  Neutral: "neutral",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info",
} as const;

export type StatusTone = (typeof StatusTone)[keyof typeof StatusTone];

export const ExportFormat = {
  Pdf: "pdf",
  Excel: "excel",
  Csv: "csv",
  Print: "print",
  Share: "share",
} as const;

export type ExportFormat = (typeof ExportFormat)[keyof typeof ExportFormat];
