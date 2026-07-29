import type { Metadata } from "next";

import {
  HomepageJsonLd,
  HomepageView,
  homepageSeoService,
  homepageService,
} from "@/features/homepage";

export const metadata: Metadata = (() => {
  const seo = homepageSeoService.getSeo();
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      url: seo.openGraph.url,
      siteName: "AZPPS",
      type: "website",
      images: seo.openGraph.images,
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: seo.twitter.images,
    },
  };
})();

export default function HomePage() {
  const data = homepageService.getHomepage();
  const seo = homepageSeoService.getSeo();

  return (
    <>
      <HomepageJsonLd seo={seo} />
      <HomepageView data={data} />
    </>
  );
}
