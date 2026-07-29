import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { PublicHeroContent } from "@/features/public-calculator-page/types";

export function CalculatorHeroSection({ hero }: { hero: PublicHeroContent }) {
  return (
    <header className="space-y-6" aria-labelledby="calculator-hero-title">
      <Breadcrumb>
        <BreadcrumbList>
          {hero.breadcrumbs.map((crumb, index) => {
            const isLast = index === hero.breadcrumbs.length - 1;
            return (
              <BreadcrumbItem key={`${crumb.label}-${index}`}>
                {index > 0 ? <BreadcrumbSeparator /> : null}
                {isLast || !crumb.href ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
        <div className="space-y-4">
          <Badge variant="secondary">{hero.category}</Badge>
          <h1
            id="calculator-hero-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {hero.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            {hero.description}
          </p>
          <div className="text-muted-foreground flex flex-wrap gap-3 text-xs">
            <span>~{hero.estimatedReadingMinutes} min read</span>
            <span aria-hidden>·</span>
            <span>
              Updated{" "}
              {new Date(hero.lastUpdated).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hero.trustBadges.map((badge) => (
              <Badge key={badge.id} variant="outline">
                {badge.label}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={hero.primaryCta.href}>{hero.primaryCta.label}</a>
            </Button>
            {hero.secondaryCta ? (
              <Button asChild variant="outline">
                <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
              </Button>
            ) : null}
          </div>
        </div>
        <div
          className="bg-muted flex aspect-[4/3] items-center justify-center rounded-md border"
          role="img"
          aria-label={hero.heroImageAlt ?? hero.title}
        >
          <span className="text-muted-foreground text-sm">Hero visual</span>
        </div>
      </div>
    </header>
  );
}
