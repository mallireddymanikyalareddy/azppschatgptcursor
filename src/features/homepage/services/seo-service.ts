import { siteConfig } from "@/config/site";
import { HOMEPAGE_SEO } from "@/features/homepage/constants/routes";
import type { HomepageSeoModel } from "@/features/homepage/types";

export class HomepageSeoService {
  getSeo(): HomepageSeoModel {
    const canonical = `${siteConfig.url}${HOMEPAGE_SEO.canonicalPath}`;
    return {
      title: HOMEPAGE_SEO.title,
      description: HOMEPAGE_SEO.description,
      canonical,
      keywords: [...HOMEPAGE_SEO.keywords],
      openGraph: {
        title: HOMEPAGE_SEO.title,
        description: HOMEPAGE_SEO.description,
        url: canonical,
        images: [
          {
            url: siteConfig.ogImage,
            width: 1200,
            height: 630,
            alt: siteConfig.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: HOMEPAGE_SEO.title,
        description: HOMEPAGE_SEO.description,
        images: [siteConfig.ogImage],
      },
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/apple-touch-icon.png`,
          sameAs: [siteConfig.links.github],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: HOMEPAGE_SEO.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  }
}

export const homepageSeoService = new HomepageSeoService();
