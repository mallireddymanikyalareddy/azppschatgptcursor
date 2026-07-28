export const BUILDER_SCHEMA_VERSION = "1.0.0" as const;

export const BuilderStep = {
  Metadata: "metadata",
  Inputs: "inputs",
  Formulas: "formulas",
  Results: "results",
  Charts: "charts",
  Seo: "seo",
  Content: "content",
  Preview: "preview",
  Json: "json",
} as const;

export type BuilderStep = (typeof BuilderStep)[keyof typeof BuilderStep];

export const BuilderValidationSeverity = {
  Error: "error",
  Warning: "warning",
} as const;

export type BuilderValidationSeverity =
  (typeof BuilderValidationSeverity)[keyof typeof BuilderValidationSeverity];
