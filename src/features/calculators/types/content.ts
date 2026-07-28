/**
 * Long-form educational content for a calculator page.
 * CMS / AI Factory can populate these fields later.
 */
export type CalculatorContent = {
  introduction: string;
  formulaExplanation: string;
  examples: ContentExample[];
  tips: string[];
  references: ContentReference[];
};

export type ContentExample = {
  title: string;
  description: string;
  /** Sample input map keyed by variable name. */
  inputs?: Record<string, number | string | boolean>;
  /** Expected highlight for authors (not computed). */
  expectedHighlight?: string;
};

export type ContentReference = {
  title: string;
  url?: string;
  citation?: string;
};
