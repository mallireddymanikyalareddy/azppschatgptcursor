import type { HomepageSeoModel } from "@/features/homepage/types";

export function HomepageJsonLd({ seo }: { seo: HomepageSeoModel }) {
  return (
    <>
      {seo.jsonLd.map((schema, index) => (
        <script
          key={`homepage-jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
