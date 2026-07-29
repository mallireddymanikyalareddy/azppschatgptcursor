"use client";

import type {
  BenefitItem,
  CommonMistake,
  FormulaSectionContent,
  InterpretationRange,
  TipItem,
  WorkedExample,
  ReferenceItem,
  RelatedArticleCard,
  RelatedCalculatorCard,
  FaqItem,
} from "@/features/public-calculator-page/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import * as React from "react";

export function FormulaSection({
  formula,
}: {
  formula: FormulaSectionContent;
}) {
  return (
    <section aria-labelledby="formula-heading" className="space-y-3">
      <h2 id="formula-heading" className="text-lg font-semibold">
        {formula.title}
      </h2>
      <pre className="bg-muted overflow-x-auto rounded-md border p-4 font-mono text-sm">
        {formula.formula}
      </pre>
      <dl className="grid gap-2 sm:grid-cols-2">
        {formula.variables.map((variable) => (
          <div key={variable.symbol} className="rounded-md border p-3 text-sm">
            <dt className="font-mono font-medium">{variable.symbol}</dt>
            <dd className="text-muted-foreground">
              {variable.meaning}
              {variable.unit ? ` (${variable.unit})` : ""}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-sm">{formula.workedExample}</p>
      <ol className="text-muted-foreground list-inside list-decimal space-y-1 text-sm">
        {formula.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {formula.unitsNote ? (
        <p className="text-muted-foreground text-xs">{formula.unitsNote}</p>
      ) : null}
    </section>
  );
}

export function BenefitsSection({ items }: { items: BenefitItem[] }) {
  return (
    <section aria-labelledby="benefits-heading" className="space-y-3">
      <h2 id="benefits-heading" className="text-lg font-semibold">
        Benefits
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TipsSection({ items }: { items: TipItem[] }) {
  return (
    <section aria-labelledby="tips-heading" className="space-y-3">
      <h2 id="tips-heading" className="text-lg font-semibold">
        Tips & best practices
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ExamplesSection({ items }: { items: WorkedExample[] }) {
  return (
    <section aria-labelledby="examples-heading" className="space-y-3">
      <h2 id="examples-heading" className="text-lg font-semibold">
        Worked examples
      </h2>
      <div className="space-y-4">
        {items.map((example) => (
          <article key={example.id} className="space-y-3 rounded-md border p-4">
            <h3 className="font-medium">{example.title}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h4 className="text-muted-foreground text-xs uppercase">
                  Inputs
                </h4>
                <ul className="mt-1 space-y-1 text-sm">
                  {example.inputs.map((row) => (
                    <li key={row.label}>
                      {row.label}: <strong>{row.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-muted-foreground text-xs uppercase">
                  Outputs
                </h4>
                <ul className="mt-1 space-y-1 text-sm">
                  {example.outputs.map((row) => (
                    <li key={row.label}>
                      {row.label}: <strong>{row.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ol className="text-muted-foreground list-inside list-decimal text-sm">
              {example.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}

export function InterpretationSection({
  title,
  metricLabel,
  ranges,
}: {
  title: string;
  metricLabel: string;
  ranges: InterpretationRange[];
}) {
  return (
    <section aria-labelledby="interpretation-heading" className="space-y-3">
      <h2 id="interpretation-heading" className="text-lg font-semibold">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm">Metric: {metricLabel}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ranges.map((range) => (
          <article key={range.id} className="rounded-md border p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-medium">{range.label}</h3>
              <Badge variant="outline" className="capitalize">
                {range.band}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              {range.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MistakesSection({ items }: { items: CommonMistake[] }) {
  return (
    <section aria-labelledby="mistakes-heading" className="space-y-3">
      <h2 id="mistakes-heading" className="text-lg font-semibold">
        Common mistakes
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-md border p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const categories = React.useMemo(() => {
    const set = new Set(
      faqs
        .map((faq) => faq.category)
        .filter((value): value is string => Boolean(value)),
    );
    return ["all", ...set];
  }, [faqs]);

  const filtered = faqs
    .filter((faq) => (category === "all" ? true : faq.category === category))
    .filter((faq) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return `${faq.question} ${faq.answer}`.toLowerCase().includes(q);
    })
    .sort((a, b) => a.order - b.order);

  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <h2 id="faq-heading" className="text-lg font-semibold">
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search FAQs"
          aria-label="Search FAQs"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={category === item ? "secondary" : "outline"}
              className="capitalize"
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {filtered.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No FAQs match your search.
        </p>
      ) : null}
    </section>
  );
}

export function RelatedCalculatorsSection({
  related,
  popular,
  sameCategory,
  recentlyViewed,
}: {
  related: RelatedCalculatorCard[];
  popular: RelatedCalculatorCard[];
  sameCategory: RelatedCalculatorCard[];
  recentlyViewed: RelatedCalculatorCard[];
}) {
  return (
    <section aria-labelledby="related-heading" className="space-y-6">
      <h2 id="related-heading" className="text-lg font-semibold">
        Related calculators
      </h2>
      <CardGrid title="Related" items={related} />
      <CardGrid title="Popular" items={popular} />
      <CardGrid title="Same category" items={sameCategory} />
      <CardGrid title="Recently viewed" items={recentlyViewed} />
    </section>
  );
}

function CardGrid({
  title,
  items,
}: {
  title: string;
  items: RelatedCalculatorCard[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="hover:bg-muted/40 rounded-md border p-4 transition-colors"
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
              {item.description}
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              {item.category}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function RelatedArticlesSection({
  items,
}: {
  items: RelatedArticleCard[];
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="articles-heading" className="space-y-3">
      <h2 id="articles-heading" className="text-lg font-semibold">
        Related articles
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border p-4">
            <h3 className="font-medium">
              <Link
                href={item.href}
                className="underline-offset-4 hover:underline"
              >
                {item.title}
              </Link>
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReferencesSection({ items }: { items: ReferenceItem[] }) {
  return (
    <section aria-labelledby="references-heading" className="space-y-3">
      <h2 id="references-heading" className="text-lg font-semibold">
        References
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded-md border p-3 text-sm">
            <span className="capitalize">{item.kind}</span> · {item.title}
            {item.publisher ? (
              <span className="text-muted-foreground"> — {item.publisher}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FeedbackSection() {
  const [sentiment, setSentiment] = React.useState<"like" | "dislike" | null>(
    null,
  );
  const [note, setNote] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section aria-labelledby="feedback-heading" className="space-y-3">
      <h2 id="feedback-heading" className="text-lg font-semibold">
        Was this helpful?
      </h2>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant={sentiment === "like" ? "secondary" : "outline"}
          onClick={() => setSentiment("like")}
        >
          Like
        </Button>
        <Button
          type="button"
          variant={sentiment === "dislike" ? "secondary" : "outline"}
          onClick={() => setSentiment("dislike")}
        >
          Dislike
        </Button>
      </div>
      <Input
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Suggestion or issue (mock — not sent)"
        aria-label="Feedback suggestion"
      />
      <Button
        type="button"
        onClick={() => setSubmitted(true)}
        disabled={!sentiment}
      >
        Submit feedback
      </Button>
      {submitted ? (
        <p className="text-muted-foreground text-sm" role="status">
          Thanks — feedback captured locally (mock only).
        </p>
      ) : null}
    </section>
  );
}
