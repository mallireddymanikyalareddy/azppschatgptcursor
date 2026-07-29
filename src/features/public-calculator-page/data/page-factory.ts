import {
  AdPlacement,
  ContentBlockType,
} from "@/features/public-calculator-page/constants/enums";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import type {
  FaqItem,
  PublicCalculatorPageDefinition,
  RichContentBlock,
} from "@/features/public-calculator-page/types";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  getPublicCalculatorPath,
  getPublicCalculatorUrl,
} from "@/features/public-calculator-page/lib/seo-builders";

type PageSeed = {
  engine: ProductionCalculatorDefinition;
  category: string;
  lastUpdated: string;
  readingMinutes: number;
  formula: PublicCalculatorPageDefinition["formula"];
  aboutLead: string;
  benefits: PublicCalculatorPageDefinition["benefits"];
  tips: PublicCalculatorPageDefinition["tips"];
  examples: PublicCalculatorPageDefinition["examples"];
  interpretation: PublicCalculatorPageDefinition["interpretation"];
  mistakes: PublicCalculatorPageDefinition["mistakes"];
  faqs: FaqItem[];
  relatedCalculatorSlugs: string[];
  relatedArticles: PublicCalculatorPageDefinition["relatedArticles"];
  references: PublicCalculatorPageDefinition["references"];
  popularSlugs: string[];
  sameCategorySlugs: string[];
  reviewedBy?: string;
  version?: string;
};

function padArticle(lead: string, name: string): RichContentBlock[] {
  const filler = [
    `${name} is designed for quick, transparent estimates. Always validate assumptions against your lender, adviser, or clinician before acting.`,
    `Configuration-driven calculators keep formulas, validation, and presentation consistent across the AZPPS catalog.`,
    `Use the worked examples below to understand how inputs flow into outputs, then adjust values to match your scenario.`,
    `Mobile-first layouts keep the calculator usable while educational content remains available without blocking interaction.`,
  ];

  const paragraphs: RichContentBlock[] = [
    {
      id: "about_h2",
      type: ContentBlockType.Heading,
      level: 2,
      text: `About the ${name}`,
    },
    { id: "about_p1", type: ContentBlockType.Paragraph, text: lead },
  ];

  // Keep mock SEO copy short — 1100-word padding bloated SSR/HTML and slowed pages.
  let words = lead.split(/\s+/).length;
  let i = 0;
  while (words < 180) {
    const chunk = filler[i % filler.length];
    paragraphs.push({
      id: `about_p_${i + 2}`,
      type: ContentBlockType.Paragraph,
      text: chunk,
    });
    words += chunk.split(/\s+/).length;
    i += 1;
  }

  paragraphs.push(
    {
      id: "about_h3",
      type: ContentBlockType.Heading,
      level: 3,
      text: "Who this calculator helps",
    },
    {
      id: "about_list",
      type: ContentBlockType.List,
      items: [
        "People comparing scenarios quickly",
        "Editors reviewing content completeness",
        "Teams validating formula presentation",
      ],
    },
    {
      id: "about_callout",
      type: ContentBlockType.Callout,
      tone: "info",
      text: "Educational estimates only — not personalised advice.",
    },
    {
      id: "about_quote",
      type: ContentBlockType.Quote,
      text: "Clear inputs and transparent formulas build trust at scale.",
    },
    {
      id: "about_link",
      type: ContentBlockType.InternalLink,
      text: "Browse related calculators",
      href: "/calculators/sip",
    },
    {
      id: "about_img",
      type: ContentBlockType.Image,
      src: "/placeholder-calculator.svg",
      alt: `${name} illustration placeholder`,
    },
  );

  return paragraphs;
}

function defaultAds(): PublicCalculatorPageDefinition["ads"] {
  return [
    {
      id: "ad_top",
      placement: AdPlacement.TopBanner,
      label: "Top banner",
      sizeHint: "728×90",
      enabled: true,
    },
    {
      id: "ad_between",
      placement: AdPlacement.BetweenSections,
      label: "Between sections",
      sizeHint: "300×250",
      enabled: true,
    },
    {
      id: "ad_sidebar",
      placement: AdPlacement.Sidebar,
      label: "Sidebar",
      sizeHint: "300×600",
      enabled: true,
    },
    {
      id: "ad_in_content",
      placement: AdPlacement.InContent,
      label: "In-content",
      sizeHint: "336×280",
      enabled: true,
    },
    {
      id: "ad_footer",
      placement: AdPlacement.FooterBanner,
      label: "Footer banner",
      sizeHint: "970×90",
      enabled: true,
    },
    {
      id: "ad_sticky",
      placement: AdPlacement.StickyMobile,
      label: "Sticky mobile",
      sizeHint: "320×50",
      enabled: true,
    },
  ];
}

/** Builds a complete public page definition from engine + editorial seed. */
export function buildPublicPage(
  seed: PageSeed,
): PublicCalculatorPageDefinition {
  const { engine } = seed;
  const path = getPublicCalculatorPath(engine.slug);
  const url = getPublicCalculatorUrl(engine.slug);
  const faqs = seed.faqs;

  return {
    id: `page_${engine.id}`,
    slug: engine.slug,
    name: engine.name,
    description: engine.description,
    category: seed.category,
    engine,
    hero: {
      title: engine.name,
      description: engine.seo.description,
      category: seed.category,
      categoryHref: path,
      heroImageSrc: "/placeholder-calculator.svg",
      heroImageAlt: engine.name,
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Calculators", href: "/calculators/home-loan-emi" },
        { label: engine.name },
      ],
      trustBadges: [
        { id: "tb1", label: "Verified formula" },
        { id: "tb2", label: "SEO ready" },
        { id: "tb3", label: "Mobile first" },
      ],
      estimatedReadingMinutes: seed.readingMinutes,
      lastUpdated: seed.lastUpdated,
      primaryCta: { label: "Start calculating", href: "#calculator" },
      secondaryCta: { label: "How it works", href: "#about" },
    },
    trust: {
      reviewedBy: seed.reviewedBy ?? "AZPPS Editorial",
      verified: true,
      version: seed.version ?? "1.0.0",
      calculationAccuracy: "High (configuration-validated)",
      contentQuality: "Editorial draft — mock CMS",
    },
    aboutBlocks: padArticle(seed.aboutLead, engine.name),
    formula: seed.formula,
    benefits: seed.benefits,
    tips: seed.tips,
    examples: seed.examples,
    interpretation: seed.interpretation,
    mistakes: seed.mistakes,
    faqs,
    relatedCalculatorSlugs: seed.relatedCalculatorSlugs,
    relatedArticles: seed.relatedArticles,
    references: seed.references,
    seo: {
      title: engine.seo.title,
      description: engine.seo.description,
      canonical: url,
      keywords: engine.seo.keywords,
      ogTitle: engine.seo.title,
      ogDescription: engine.seo.description,
      ogImage: "/placeholder-calculator.svg",
      twitterCard: "summary_large_image",
      breadcrumbSchema: buildBreadcrumbSchema([
        { name: "Home", item: "https://azpps.example/" },
        {
          name: "Calculators",
          item: "https://azpps.example/calculators/home-loan-emi",
        },
        { name: engine.name, item: url },
      ]),
      faqSchema: buildFaqSchema(faqs),
      articleSchema: buildArticleSchema({
        headline: engine.name,
        description: engine.seo.description,
        dateModified: seed.lastUpdated,
        url,
      }),
    },
    ads: defaultAds(),
    popularSlugs: seed.popularSlugs,
    sameCategorySlugs: seed.sameCategorySlugs,
  };
}
