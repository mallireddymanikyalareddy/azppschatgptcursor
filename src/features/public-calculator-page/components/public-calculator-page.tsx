"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { AdPlacement } from "@/features/public-calculator-page/constants/enums";
import { AdSlotsByPlacement } from "@/features/public-calculator-page/components/ad-slot";
import { CalculatorHeroSection } from "@/features/public-calculator-page/components/hero-section";
import { TrustSection } from "@/features/public-calculator-page/components/trust-section";
import { AboutSection } from "@/features/public-calculator-page/components/about-section";
import {
  BenefitsSection,
  ExamplesSection,
  FaqSection,
  FeedbackSection,
  FormulaSection,
  InterpretationSection,
  MistakesSection,
  ReferencesSection,
  RelatedArticlesSection,
  RelatedCalculatorsSection,
  TipsSection,
} from "@/features/public-calculator-page/components/content-sections";
import {
  useArticle,
  useCalculatorContent,
  useCalculatorPage,
  useRelatedCalculators,
} from "@/features/public-calculator-page/hooks";

const CalculatorEngineSection = dynamic(
  () =>
    import("@/features/public-calculator-page/components/engine-section").then(
      (mod) => mod.CalculatorEngineSection,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3" aria-label="Loading calculator">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    ),
  },
);

export type PublicCalculatorPageProps = {
  slug: string;
};

/**
 * SEO-first public calculator page — configuration-driven sections.
 */
export function PublicCalculatorPage({ slug }: PublicCalculatorPageProps) {
  const { bundle, loading } = useCalculatorPage(slug);
  const related = useRelatedCalculators(bundle);
  const article = useArticle(bundle);
  const content = useCalculatorContent(bundle);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-8">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Calculator not found</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          No public page is registered for “{slug}”.
        </p>
      </div>
    );
  }

  const { page } = bundle;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 lg:pb-10">
      <AdSlotsByPlacement slots={page.ads} placement={AdPlacement.TopBanner} />

      <CalculatorHeroSection hero={page.hero} />
      <TrustSection trust={page.trust} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-10">
          <CalculatorEngineSection definition={page.engine} />

          <AdSlotsByPlacement
            slots={page.ads}
            placement={AdPlacement.BetweenSections}
          />

          <AboutSection blocks={article} />

          <AdSlotsByPlacement
            slots={page.ads}
            placement={AdPlacement.InContent}
          />

          {content.formula ? (
            <FormulaSection formula={content.formula} />
          ) : null}
          <BenefitsSection items={content.benefits} />
          <TipsSection items={content.tips} />
          <ExamplesSection items={content.examples} />
          {content.interpretation ? (
            <InterpretationSection
              title={content.interpretation.title}
              metricLabel={content.interpretation.metricLabel}
              ranges={content.interpretation.ranges}
            />
          ) : null}
          <MistakesSection items={content.mistakes} />
          <FaqSection faqs={content.faqs} />
          <RelatedCalculatorsSection {...related} />
          <RelatedArticlesSection items={content.relatedArticles} />
          <ReferencesSection items={content.references} />
          <FeedbackSection />
        </div>

        <aside className="hidden space-y-4 lg:block" aria-label="Sidebar">
          <AdSlotsByPlacement
            slots={page.ads}
            placement={AdPlacement.Sidebar}
          />
        </aside>
      </div>

      <AdSlotsByPlacement
        slots={page.ads}
        placement={AdPlacement.FooterBanner}
      />
      <AdSlotsByPlacement
        slots={page.ads}
        placement={AdPlacement.StickyMobile}
      />
    </div>
  );
}
