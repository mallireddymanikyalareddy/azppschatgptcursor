import type { PublicCalculatorPageDefinition } from "@/features/public-calculator-page/types";
import { calculatorPageService } from "@/features/public-calculator-page/services";

export function PublicCalculatorJsonLd({
  page,
}: {
  page: PublicCalculatorPageDefinition;
}) {
  const scripts = calculatorPageService.seo.getJsonLdScripts(page);
  return (
    <>
      {scripts.map((schema, index) => (
        <script
          // JSON-LD placeholders for search engines
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
