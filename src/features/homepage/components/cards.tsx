import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resolveHomepageIcon } from "@/features/homepage/lib/icons";
import type {
  HomepageArticleCard,
  HomepageCalculatorCard,
  HomepageCategory,
  HomepageCollection,
} from "@/features/homepage/types";

export function CategoryCard({ category }: { category: HomepageCategory }) {
  const Icon = resolveHomepageIcon(category.icon);
  return (
    <Link
      href={category.href}
      className="group focus-visible:ring-ring block rounded-lg outline-none focus-visible:ring-2"
      aria-label={`${category.name} category, ${category.calculatorCount} calculators`}
    >
      <Card className="group-hover:border-foreground/20 h-full transition-colors">
        <CardHeader>
          <div className="bg-muted text-foreground mb-2 flex size-10 items-center justify-center rounded-lg">
            <Icon className="size-5" aria-hidden />
          </div>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>{category.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <span className="text-muted-foreground text-xs">
            {category.calculatorCount} calculators
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function CalculatorCard({
  calculator,
}: {
  calculator: HomepageCalculatorCard;
}) {
  return (
    <Card className="h-full overflow-hidden">
      <div
        className={`bg-muted relative h-28 bg-gradient-to-br ${calculator.imageTone}`}
        role="img"
        aria-label={`${calculator.name} illustration`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--card)_0%,transparent_55%)]" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{calculator.categoryName}</Badge>
          <Badge variant="outline" className="capitalize">
            {calculator.popularity}
          </Badge>
        </div>
        <CardTitle className="mt-2">{calculator.name}</CardTitle>
        <CardDescription>{calculator.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex gap-4 text-xs">
        <span>{calculator.usageCount.toLocaleString("en-IN")} uses</span>
        <span>{calculator.readingMinutes} min read</span>
      </CardContent>
      <CardFooter>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href={calculator.href}>
            Open
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ArticleCard({ article }: { article: HomepageArticleCard }) {
  return (
    <Card className="h-full overflow-hidden">
      <div
        className={`bg-muted relative h-24 bg-gradient-to-br ${article.imageTone}`}
        role="img"
        aria-label={`${article.title} cover`}
      />
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          {article.category}
        </Badge>
        <CardTitle className="mt-2 text-base leading-snug">
          <Link
            href={article.href}
            className="hover:text-primary transition-colors"
          >
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription>{article.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-xs">
        {article.author} · {article.readingMinutes} min ·{" "}
        {new Date(article.publishedAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </CardContent>
    </Card>
  );
}

export function CollectionCard({
  collection,
}: {
  collection: HomepageCollection;
}) {
  return (
    <Link
      href={collection.href}
      className="group focus-visible:ring-ring block rounded-xl outline-none focus-visible:ring-2"
    >
      <div
        className={`border-border/80 bg-gradient-to-br ${collection.accent} group-hover:border-foreground/25 rounded-xl border p-5 transition-colors`}
      >
        <h3 className="font-semibold tracking-tight">{collection.name}</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {collection.description}
        </p>
        <p className="text-muted-foreground mt-4 text-xs">
          {collection.calculatorCount} calculators
        </p>
      </div>
    </Link>
  );
}
