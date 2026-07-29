import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import type {
  AdPlacement,
  ContentBlockType,
  InterpretationBand,
} from "@/features/public-calculator-page/constants/enums";

export type PublicBreadcrumbItem = {
  label: string;
  href?: string;
};

export type TrustBadge = {
  id: string;
  label: string;
  description?: string;
};

export type PublicHeroContent = {
  title: string;
  description: string;
  category: string;
  categoryHref?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  breadcrumbs: PublicBreadcrumbItem[];
  trustBadges: TrustBadge[];
  estimatedReadingMinutes: number;
  lastUpdated: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type TrustSectionContent = {
  reviewedBy: string;
  verified: boolean;
  version: string;
  calculationAccuracy: string;
  contentQuality: string;
};

export type RichContentBlock = {
  id: string;
  type: ContentBlockType;
  /** Heading level 2–4 when type is heading */
  level?: 2 | 3 | 4;
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  href?: string;
  tone?: "info" | "tip" | "warning";
};

export type FormulaSectionContent = {
  title: string;
  formula: string;
  variables: { symbol: string; meaning: string; unit?: string }[];
  workedExample: string;
  steps: string[];
  unitsNote?: string;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
};

export type TipItem = {
  id: string;
  title: string;
  body: string;
};

export type WorkedExample = {
  id: string;
  title: string;
  inputs: { label: string; value: string }[];
  outputs: { label: string; value: string }[];
  steps: string[];
};

export type InterpretationRange = {
  id: string;
  band: InterpretationBand;
  label: string;
  min?: number;
  max?: number;
  description: string;
};

export type CommonMistake = {
  id: string;
  title: string;
  description: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
};

export type RelatedCalculatorCard = {
  slug: string;
  name: string;
  description: string;
  category: string;
  href: string;
};

export type RelatedArticleCard = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  readingMinutes?: number;
};

export type ReferenceItem = {
  id: string;
  title: string;
  kind: "government" | "scientific" | "documentation" | "other";
  url?: string;
  publisher?: string;
};

export type PublicSeoDefinition = {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  breadcrumbSchema: Record<string, unknown>;
  faqSchema: Record<string, unknown>;
  articleSchema: Record<string, unknown>;
  jsonLdExtras?: Record<string, unknown>[];
};

export type AdSlotConfig = {
  id: string;
  placement: AdPlacement;
  label: string;
  /** Mock size hint for layout only — not real ad network. */
  sizeHint: string;
  enabled: boolean;
};

export type PublicCalculatorPageDefinition = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  /** Engine-compatible runtime definition (form + workflow + results). */
  engine: ProductionCalculatorDefinition;
  hero: PublicHeroContent;
  trust: TrustSectionContent;
  aboutBlocks: RichContentBlock[];
  formula: FormulaSectionContent;
  benefits: BenefitItem[];
  tips: TipItem[];
  examples: WorkedExample[];
  interpretation: {
    title: string;
    metricLabel: string;
    ranges: InterpretationRange[];
  };
  mistakes: CommonMistake[];
  faqs: FaqItem[];
  relatedCalculatorSlugs: string[];
  relatedArticles: RelatedArticleCard[];
  references: ReferenceItem[];
  seo: PublicSeoDefinition;
  ads: AdSlotConfig[];
  popularSlugs: string[];
  sameCategorySlugs: string[];
};

export type CalculatorPageBundle = {
  page: PublicCalculatorPageDefinition;
  related: RelatedCalculatorCard[];
  popular: RelatedCalculatorCard[];
  sameCategory: RelatedCalculatorCard[];
  recentlyViewed: RelatedCalculatorCard[];
};
