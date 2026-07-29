/**
 * Template type catalog — maps marketplace / taxonomy buckets.
 */
export const TemplateType = {
  Finance: "finance",
  Investment: "investment",
  Loan: "loan",
  Mortgage: "mortgage",
  Tax: "tax",
  Business: "business",
  Health: "health",
  Fitness: "fitness",
  Medical: "medical",
  Construction: "construction",
  Engineering: "engineering",
  Education: "education",
  Mathematics: "mathematics",
  Utility: "utility",
  Conversion: "conversion",
  Insurance: "insurance",
  Retirement: "retirement",
  Savings: "savings",
  Scientific: "scientific",
  Custom: "custom",
} as const;

export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];

export const TemplateLifecycleStatus = {
  Draft: "draft",
  Published: "published",
  Archived: "archived",
} as const;

export type TemplateLifecycleStatus =
  (typeof TemplateLifecycleStatus)[keyof typeof TemplateLifecycleStatus];

export const TemplateDifficulty = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Expert: "expert",
} as const;

export type TemplateDifficulty =
  (typeof TemplateDifficulty)[keyof typeof TemplateDifficulty];

export const TemplateViewMode = {
  Grid: "grid",
  Table: "table",
} as const;

export type TemplateViewMode =
  (typeof TemplateViewMode)[keyof typeof TemplateViewMode];

export const TemplateSortField = {
  Name: "name",
  UpdatedAt: "updatedAt",
  Usage: "usageCount",
  Newest: "createdAt",
  Popular: "usageCount",
} as const;

export type TemplateSortField =
  (typeof TemplateSortField)[keyof typeof TemplateSortField];
