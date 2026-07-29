"use client";

import * as React from "react";

import type { CalculatorPageBundle } from "@/features/public-calculator-page/types";
import { calculatorPageService } from "@/features/public-calculator-page/services";

export function useCalculatorPage(slug: string): {
  bundle: CalculatorPageBundle | null;
  loading: boolean;
} {
  const [bundle, setBundle] = React.useState<CalculatorPageBundle | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const next = calculatorPageService.getBySlug(slug);
    if (next) {
      calculatorPageService.related.trackView(slug);
      next.recentlyViewed =
        calculatorPageService.related.getRecentlyViewed(slug);
    }
    setBundle(next);
    setLoading(false);
  }, [slug]);

  return { bundle, loading };
}

export function useRelatedCalculators(bundle: CalculatorPageBundle | null) {
  return {
    related: bundle?.related ?? [],
    popular: bundle?.popular ?? [],
    sameCategory: bundle?.sameCategory ?? [],
    recentlyViewed: bundle?.recentlyViewed ?? [],
  };
}

export function useSEO(bundle: CalculatorPageBundle | null) {
  return React.useMemo(() => {
    if (!bundle) return null;
    return {
      metadata: calculatorPageService.seo.getMetadata(bundle.page),
      jsonLd: calculatorPageService.seo.getJsonLdScripts(bundle.page),
    };
  }, [bundle]);
}

export function useArticle(bundle: CalculatorPageBundle | null) {
  return bundle?.page.aboutBlocks ?? [];
}

export function useCalculatorContent(bundle: CalculatorPageBundle | null) {
  return {
    formula: bundle?.page.formula ?? null,
    benefits: bundle?.page.benefits ?? [],
    tips: bundle?.page.tips ?? [],
    examples: bundle?.page.examples ?? [],
    interpretation: bundle?.page.interpretation ?? null,
    mistakes: bundle?.page.mistakes ?? [],
    faqs: bundle?.page.faqs ?? [],
    references: bundle?.page.references ?? [],
    relatedArticles: bundle?.page.relatedArticles ?? [],
  };
}
