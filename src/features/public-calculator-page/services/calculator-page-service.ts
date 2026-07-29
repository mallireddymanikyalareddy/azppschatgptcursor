import type {
  AdSlotConfig,
  CalculatorPageBundle,
  RelatedCalculatorCard,
} from "@/features/public-calculator-page/types";
import type { CalculatorPageRepository } from "@/features/public-calculator-page/repositories/page-repository";
import { calculatorPageRepository } from "@/features/public-calculator-page/repositories/page-repository";
import { getPublicCalculatorPath } from "@/features/public-calculator-page/lib/seo-builders";
import type { AdPlacement } from "@/features/public-calculator-page/constants/enums";

const RECENT_KEY = "azpps.public.recent-calculators";

export class RelatedCalculatorService {
  constructor(private readonly repository: CalculatorPageRepository) {}

  toCard(slug: string): RelatedCalculatorCard | null {
    const page = this.repository.getBySlug(slug);
    if (!page) return null;
    return {
      slug: page.slug,
      name: page.name,
      description: page.description,
      category: page.category,
      href: getPublicCalculatorPath(page.slug),
    };
  }

  resolveMany(slugs: string[]): RelatedCalculatorCard[] {
    return slugs
      .map((slug) => this.toCard(slug))
      .filter((card): card is RelatedCalculatorCard => Boolean(card));
  }

  getRecentlyViewed(excludeSlug?: string): RelatedCalculatorCard[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.sessionStorage.getItem(RECENT_KEY);
      const slugs = raw ? (JSON.parse(raw) as string[]) : [];
      return this.resolveMany(
        slugs.filter((slug) => slug !== excludeSlug).slice(0, 4),
      );
    } catch {
      return [];
    }
  }

  trackView(slug: string): void {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(RECENT_KEY);
      const existing = raw ? (JSON.parse(raw) as string[]) : [];
      const next = [slug, ...existing.filter((item) => item !== slug)].slice(
        0,
        8,
      );
      window.sessionStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      // ignore storage failures
    }
  }
}

export class AdvertisementService {
  getEnabled(slots: AdSlotConfig[], placement?: AdPlacement): AdSlotConfig[] {
    return slots.filter(
      (slot) =>
        slot.enabled && (placement ? slot.placement === placement : true),
    );
  }
}

export class SEOService {
  getMetadata(page: CalculatorPageBundle["page"]) {
    return {
      title: page.seo.title,
      description: page.seo.description,
      keywords: page.seo.keywords,
      alternates: { canonical: page.seo.canonical },
      openGraph: {
        title: page.seo.ogTitle ?? page.seo.title,
        description: page.seo.ogDescription ?? page.seo.description,
        images: page.seo.ogImage ? [{ url: page.seo.ogImage }] : undefined,
      },
      twitter: {
        card: page.seo.twitterCard ?? "summary_large_image",
        title: page.seo.ogTitle ?? page.seo.title,
        description: page.seo.ogDescription ?? page.seo.description,
      },
    };
  }

  getJsonLdScripts(
    page: CalculatorPageBundle["page"],
  ): Record<string, unknown>[] {
    return [
      page.seo.breadcrumbSchema,
      page.seo.faqSchema,
      page.seo.articleSchema,
      ...(page.seo.jsonLdExtras ?? []),
    ];
  }
}

export class ContentService {
  getAbout(page: CalculatorPageBundle["page"]) {
    return page.aboutBlocks;
  }

  getFaqs(page: CalculatorPageBundle["page"], query = "", category = "all") {
    const q = query.trim().toLowerCase();
    return page.faqs
      .filter((faq) => (category === "all" ? true : faq.category === category))
      .filter((faq) =>
        q ? `${faq.question} ${faq.answer}`.toLowerCase().includes(q) : true,
      )
      .sort((a, b) => a.order - b.order);
  }
}

/**
 * Facade for public calculator pages — mock repository today, CMS later.
 */
export class CalculatorPageService {
  readonly related: RelatedCalculatorService;
  readonly ads: AdvertisementService;
  readonly seo: SEOService;
  readonly content: ContentService;

  constructor(private readonly repository: CalculatorPageRepository) {
    this.related = new RelatedCalculatorService(repository);
    this.ads = new AdvertisementService();
    this.seo = new SEOService();
    this.content = new ContentService();
  }

  getSlugs(): string[] {
    return this.repository.getSlugs();
  }

  getBySlug(slug: string): CalculatorPageBundle | null {
    const page = this.repository.getBySlug(slug);
    if (!page) return null;
    return {
      page,
      related: this.related.resolveMany(page.relatedCalculatorSlugs),
      popular: this.related.resolveMany(page.popularSlugs),
      sameCategory: this.related.resolveMany(page.sameCategorySlugs),
      recentlyViewed: [],
    };
  }
}

export const calculatorPageService = new CalculatorPageService(
  calculatorPageRepository,
);
