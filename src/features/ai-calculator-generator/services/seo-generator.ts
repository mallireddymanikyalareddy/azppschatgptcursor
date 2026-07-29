import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import { slugify } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  GeneratorPromptInput,
  IntentAnalysisResult,
} from "@/features/ai-calculator-generator/types";

/**
 * Mock SEO metadata generator.
 * Future LLM: swap implementation behind the same public methods.
 */
export class SEOGenerator {
  generate(args: {
    prompt: GeneratorPromptInput;
    intent: IntentAnalysisResult;
    name: string;
  }): CalculatorBuilderDefinition["seo"] {
    const baseSlug =
      slugify(args.name) || slugify(args.prompt.prompt) || "calculator";
    const target = args.prompt.seoTarget?.trim();
    const title = target
      ? `${target} | AZPPS`
      : `${args.name} Calculator | Free Online Tool | AZPPS`;
    const description = `Free ${args.name.toLowerCase()} calculator for ${args.prompt.country}. Instant results for ${args.prompt.audience}. Mock AI SEO — review before publish.`;
    const keywords = [
      ...new Set([
        args.name.toLowerCase(),
        "calculator",
        args.intent.category.toLowerCase(),
        args.prompt.country.toLowerCase(),
        ...args.intent.keywords,
        `${args.name.toLowerCase()} online`,
        `free ${args.name.toLowerCase()} calculator`,
      ]),
    ].slice(0, 12);

    return {
      title: title.slice(0, 70),
      description: description.slice(0, 160),
      keywords,
      canonical: `https://azpps.example/${baseSlug}`,
      ogTitle: `${args.name} Calculator`,
      ogDescription: description.slice(0, 160),
      schemaPlaceholder: {
        "@type": "WebApplication",
        name: `${args.name} Calculator`,
        applicationCategory: args.intent.category,
        operatingSystem: "Web",
      },
    };
  }
}

export const seoGenerator = new SEOGenerator();
