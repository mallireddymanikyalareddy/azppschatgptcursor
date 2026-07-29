import { PUBLIC_CALCULATOR_BASE_PATH } from "@/features/public-calculator-page/constants/enums";

/** Public calculator path — Sprint 6.1 convention. */
export function getPublicCalculatorPath(slug: string): string {
  const normalized = slug.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${PUBLIC_CALCULATOR_BASE_PATH}/${normalized}`;
}

export function getPublicCalculatorUrl(
  slug: string,
  origin = "https://azpps.example",
): string {
  return `${origin.replace(/\/+$/, "")}${getPublicCalculatorPath(slug)}`;
}

export function buildBreadcrumbSchema(
  items: { name: string; item?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      ...(entry.item ? { item: entry.item } : {}),
    })),
  };
}

export function buildFaqSchema(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema(args: {
  headline: string;
  description: string;
  dateModified: string;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    dateModified: args.dateModified,
    mainEntityOfPage: args.url,
    author: { "@type": "Organization", name: "AZPPS" },
  };
}
