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
import { PublicPageViewTracker } from "@/features/public-calculator-page/components/view-tracker";
import type { CalculatorPageBundle } from "@/features/public-calculator-page/types";

const CalculatorEngineSection = dynamic(
  () =>
    import("@/features/public-calculator-page/components/engine-section").then(
      (mod) => mod.CalculatorEngineSection,
    ),
  {
    loading: () => (
      <div className="space-y-3" aria-label="Loading calculator">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    ),
  },
);

export type PublicCalculatorPageProps = {
  bundle: CalculatorPageBundle;
};

/**
 * SEO-first public calculator page — rendered on the server with a
 * deferred client calculator engine (no client data-fetch waterfall).
 */
export function PublicCalculatorPage({ bundle }: PublicCalculatorPageProps) {
  const { page } = bundle;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8 pb-24 lg:pb-10">
      <PublicPageViewTracker slug={page.slug} />

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

          <AboutSection blocks={page.aboutBlocks} />

          <AdSlotsByPlacement
            slots={page.ads}
            placement={AdPlacement.InContent}
          />

          {page.formula ? <FormulaSection formula={page.formula} /> : null}
          <BenefitsSection items={page.benefits} />
          <TipsSection items={page.tips} />
          <ExamplesSection items={page.examples} />
          {page.interpretation ? (
            <InterpretationSection
              title={page.interpretation.title}
              metricLabel={page.interpretation.metricLabel}
              ranges={page.interpretation.ranges}
            />
          ) : null}
          <MistakesSection items={page.mistakes} />
          <FaqSection faqs={page.faqs} />
          <RelatedCalculatorsSection
            related={bundle.related}
            popular={bundle.popular}
            sameCategory={bundle.sameCategory}
            recentlyViewed={bundle.recentlyViewed}
          />
          <RelatedArticlesSection items={page.relatedArticles} />
          <ReferencesSection items={page.references} />
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
