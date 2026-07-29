import {
  ArticleCard,
  CalculatorCard,
  CategoryCard,
  CollectionCard,
} from "@/features/homepage/components/cards";
import { AdvertisementSection } from "@/features/homepage/components/advertisement";
import { AiPromoSection } from "@/features/homepage/components/ai-promo";
import {
  BenefitsSection,
  TestimonialsSection,
  WhyAzppsSection,
} from "@/features/homepage/components/content-blocks";
import { HeroSection } from "@/features/homepage/components/hero-section";
import { HomepageFooter } from "@/features/homepage/components/homepage-footer";
import { NewsletterSection } from "@/features/homepage/components/newsletter";
import { HomepageSection } from "@/features/homepage/components/section";
import { StatisticsSection } from "@/features/homepage/components/statistics";
import { GlobalCalculatorSearch } from "@/features/homepage/components/global-search";
import type { HomepagePayload } from "@/features/homepage/types";

export function HomepageView({ data }: { data: HomepagePayload }) {
  return (
    <div className="pb-4">
      <HeroSection hero={data.hero} recentSearches={data.recentSearches} />

      <HomepageSection
        id="search"
        eyebrow="Discovery"
        title="Find the right calculator instantly"
        description="Search by calculator name, category, keyword, or long-tail intent."
      >
        <div className="border-border/80 bg-card/40 mx-auto max-w-3xl rounded-xl border p-4 md:p-6">
          <GlobalCalculatorSearch
            popularSearches={data.popularSearches}
            recentSearches={data.recentSearches}
            id="section-search"
          />
        </div>
      </HomepageSection>

      <HomepageSection
        id="categories"
        eyebrow="Popular categories"
        title="Browse by domain"
        description="Twelve premium categories spanning money, health, STEM, and everyday utilities."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.categories.map((category) => (
            <div key={category.id} id={`category-${category.id}`}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </HomepageSection>

      <HomepageSection
        id="featured"
        eyebrow="Featured"
        title="Featured calculators"
        description="High-signal tools with clear formulas and strong demand."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.featuredCalculators.map((calculator) => (
            <CalculatorCard key={calculator.id} calculator={calculator} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection
        id="trending"
        eyebrow="Trending"
        title="What people are calculating now"
        description="Trending, most used, recently updated, and editor’s picks."
      >
        <div className="space-y-8">
          <TrendBlock
            title="Trending calculators"
            items={data.trendingCalculators}
          />
          <TrendBlock title="Most used" items={data.mostUsedCalculators} />
          <TrendBlock
            title="Recently updated"
            items={data.recentlyUpdatedCalculators}
          />
          <TrendBlock title="Editor’s picks" items={data.editorsPicks} />
        </div>
      </HomepageSection>

      <HomepageSection
        id="recently-added"
        eyebrow="New"
        title="Recently added"
        description="Fresh tools landing in the AZPPS catalog."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.recentlyAdded.map((calculator) => (
            <CalculatorCard key={calculator.id} calculator={calculator} />
          ))}
        </div>
      </HomepageSection>

      <AiPromoSection promo={data.aiPromo} />
      <WhyAzppsSection items={data.whyItems} />
      <BenefitsSection benefits={data.benefits} />

      <HomepageSection
        id="collections"
        eyebrow="Collections"
        title="Curated calculator collections"
        description="Start from a job-to-be-done, not a blank search box."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data.collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection
        id="articles"
        eyebrow="Learn"
        title="Featured articles"
        description="Practical guides that pair with high-intent calculators."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.articles.slice(0, 8).map((article) => (
            <div key={article.id} id={`article-${article.slug}`}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </HomepageSection>

      <StatisticsSection statistics={data.statistics} />
      <TestimonialsSection testimonials={data.testimonials} />
      <NewsletterSection newsletter={data.newsletter} />
      <AdvertisementSection ad={data.ad} />
      <HomepageFooter
        categories={data.categories}
        popularCalculators={data.mostUsedCalculators}
      />
    </div>
  );
}

function TrendBlock({
  title,
  items,
}: {
  title: string;
  items: HomepagePayload["trendingCalculators"];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold tracking-tight">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.slice(0, 3).map((calculator) => (
          <CalculatorCard
            key={`${title}-${calculator.id}`}
            calculator={calculator}
          />
        ))}
      </div>
    </div>
  );
}
