import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlobalCalculatorSearch } from "@/features/homepage/components/global-search";
import type { HomepageHeroContent } from "@/features/homepage/types";

export function HeroSection({
  hero,
  recentSearches,
}: {
  hero: HomepageHeroContent;
  recentSearches: string[];
}) {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="homepage-hero-heading"
    >
      <div
        className="brand-wash pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_30%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_55%)] lg:block"
        aria-hidden
      />

      <div className="relative container py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <p className="text-caption text-muted-foreground font-medium tracking-wide uppercase">
              {hero.eyebrow}
            </p>
            <h1
              id="homepage-hero-heading"
              className="text-display max-w-xl text-balance"
            >
              {hero.headline}
            </h1>
            <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
              {hero.subheadline}
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </div>

            <ul className="flex flex-wrap gap-3 pt-1">
              {hero.trustBadges.map((badge) => (
                <li
                  key={badge.id}
                  className="text-muted-foreground flex items-center gap-1.5 text-xs"
                >
                  <ShieldCheck className="text-primary size-3.5" aria-hidden />
                  <span>{badge.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border/80 bg-card/50 rounded-xl border p-5 backdrop-blur-sm md:p-6">
            <h2 className="text-sm font-semibold tracking-tight">
              Global calculator search
            </h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Search by name, category, or long-tail keyword.
            </p>
            <div className="mt-4">
              <GlobalCalculatorSearch
                popularSearches={hero.popularSearches}
                recentSearches={recentSearches}
                id="hero-search"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {hero.trendingTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-[11px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
