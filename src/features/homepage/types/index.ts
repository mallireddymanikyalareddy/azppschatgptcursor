import type {
  CalculatorPopularity,
  HomepageAdPlacement,
  HomepageCategoryId,
  TrustBadgeId,
} from "@/features/homepage/constants/enums";

export type HomepageCategory = {
  id: HomepageCategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  calculatorCount: number;
  href: string;
};

export type HomepageCalculatorCard = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: HomepageCategoryId;
  categoryName: string;
  href: string;
  popularity: CalculatorPopularity;
  usageCount: number;
  readingMinutes: number;
  /** Decorative visual key — CMS can later map to CDN assets. */
  imageTone: string;
  featured?: boolean;
  trending?: boolean;
  recentlyAdded?: boolean;
  editorsPick?: boolean;
  updatedAt: string;
};

export type HomepageArticleCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  href: string;
  imageTone: string;
};

export type HomepageCollection = {
  id: string;
  name: string;
  description: string;
  calculatorCount: number;
  href: string;
  accent: string;
};

export type HomepageTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export type HomepageStatistic = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

export type HomepageBenefit = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type HomepageWhyItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type HomepageTrustBadge = {
  id: TrustBadgeId;
  label: string;
  description: string;
};

export type HomepageSearchSuggestion = {
  id: string;
  label: string;
  href: string;
  kind: "calculator" | "category" | "keyword";
};

export type HomepageAdSlot = {
  id: string;
  placement: HomepageAdPlacement;
  label: string;
  size: string;
  enabled: boolean;
};

export type HomepageHeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  popularSearches: string[];
  trendingTags: string[];
  trustBadges: HomepageTrustBadge[];
};

export type HomepageAiPromo = {
  title: string;
  description: string;
  benefits: string[];
  examplePrompt: string;
  cta: { label: string; href: string };
};

export type HomepageNewsletter = {
  title: string;
  description: string;
  benefits: string[];
  privacyNote: string;
  placeholder: string;
};

export type HomepagePayload = {
  hero: HomepageHeroContent;
  categories: HomepageCategory[];
  featuredCalculators: HomepageCalculatorCard[];
  trendingCalculators: HomepageCalculatorCard[];
  mostUsedCalculators: HomepageCalculatorCard[];
  recentlyUpdatedCalculators: HomepageCalculatorCard[];
  editorsPicks: HomepageCalculatorCard[];
  recentlyAdded: HomepageCalculatorCard[];
  collections: HomepageCollection[];
  articles: HomepageArticleCard[];
  statistics: HomepageStatistic[];
  testimonials: HomepageTestimonial[];
  whyItems: HomepageWhyItem[];
  benefits: HomepageBenefit[];
  aiPromo: HomepageAiPromo;
  newsletter: HomepageNewsletter;
  popularSearches: string[];
  recentSearches: string[];
  searchSuggestions: HomepageSearchSuggestion[];
  ad: HomepageAdSlot;
  allCalculators: HomepageCalculatorCard[];
};

export type HomepageSeoModel = {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    url: string;
    images: Array<{ url: string; width: number; height: number; alt: string }>;
  };
  twitter: {
    card: "summary_large_image";
    title: string;
    description: string;
    images: string[];
  };
  jsonLd: Record<string, unknown>[];
};
