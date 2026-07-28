/**
 * Canonical calculator-domain enums.
 * Prefer these string-literal catalogs over TypeScript `enum` for tree-shaking
 * and JSON-friendly persistence across 10k+ calculator definitions.
 */

/** Lifecycle of a calculator definition. */
export const CalculatorStatus = {
  Draft: "draft",
  Review: "review",
  Published: "published",
  Archived: "archived",
  Deprecated: "deprecated",
} as const;

export type CalculatorStatus =
  (typeof CalculatorStatus)[keyof typeof CalculatorStatus];

/** How a category node is used in the taxonomy. */
export const CategoryType = {
  Root: "root",
  Group: "group",
  Leaf: "leaf",
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

/** Relative complexity for discovery / filtering. */
export const CalculatorDifficulty = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Expert: "expert",
} as const;

export type CalculatorDifficulty =
  (typeof CalculatorDifficulty)[keyof typeof CalculatorDifficulty];

/** Who can see a calculator (or nested content block). */
export const Visibility = {
  Public: "public",
  Unlisted: "unlisted",
  Private: "private",
  Internal: "internal",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

/** Input control / value kind for variables. */
export const InputType = {
  Number: "number",
  Integer: "integer",
  Currency: "currency",
  Percentage: "percentage",
  Text: "text",
  Select: "select",
  MultiSelect: "multi_select",
  Boolean: "boolean",
  Date: "date",
  Range: "range",
} as const;

export type InputType = (typeof InputType)[keyof typeof InputType];

/** How a calculated result should be interpreted / rendered. */
export const OutputType = {
  Number: "number",
  Currency: "currency",
  Percentage: "percentage",
  Text: "text",
  Boolean: "boolean",
  Duration: "duration",
  Ratio: "ratio",
} as const;

export type OutputType = (typeof OutputType)[keyof typeof OutputType];

/** Formula expression dialect / evaluation strategy. */
export const FormulaType = {
  Algebraic: "algebraic",
  Financial: "financial",
  Statistical: "statistical",
  Conditional: "conditional",
  Composite: "composite",
  Custom: "custom",
} as const;

export type FormulaType = (typeof FormulaType)[keyof typeof FormulaType];

/** Chart visualisation kinds supported by calculator results. */
export const ChartType = {
  Line: "line",
  Bar: "bar",
  Area: "area",
  Pie: "pie",
  Donut: "donut",
  StackedBar: "stacked_bar",
  Scatter: "scatter",
  Table: "table",
} as const;

export type ChartType = (typeof ChartType)[keyof typeof ChartType];

/** Validation rule kinds attached to variables. */
export const ValidationType = {
  Required: "required",
  Min: "min",
  Max: "max",
  MinLength: "min_length",
  MaxLength: "max_length",
  Regex: "regex",
  OneOf: "one_of",
  Custom: "custom",
} as const;

export type ValidationType =
  (typeof ValidationType)[keyof typeof ValidationType];

/** Axis orientation for chart configuration. */
export const ChartAxisType = {
  Category: "category",
  Value: "value",
  Time: "time",
  Log: "log",
} as const;

export type ChartAxisType = (typeof ChartAxisType)[keyof typeof ChartAxisType];
