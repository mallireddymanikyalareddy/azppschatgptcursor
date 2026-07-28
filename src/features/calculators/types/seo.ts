/**
 * SEO metadata for calculators and categories.
 * Schema markup payload is a placeholder for a future SEO engine.
 */
export type SeoMetadata = {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  /** JSON-LD / schema.org document placeholder. */
  schemaPlaceholder?: Record<string, unknown>;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
};
