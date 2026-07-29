import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import type { ContentLength } from "@/features/ai-calculator-generator/constants/enums";
import type {
  GeneratorPromptInput,
  IntentAnalysisResult,
} from "@/features/ai-calculator-generator/types";

/**
 * Mock long-form content generator.
 * Future LLM: implement ContentGeneratorPort with the same method signatures.
 */
export class ContentGenerator {
  generate(args: {
    prompt: GeneratorPromptInput;
    intent: IntentAnalysisResult;
    definition: CalculatorBuilderDefinition;
  }): CalculatorBuilderDefinition["content"] {
    const name = args.definition.metadata.name;
    const words = wordBudget(args.prompt.contentLength);
    const country = args.prompt.country;
    const audience = args.prompt.audience;

    const introduction = `This ${name} helps ${audience} in ${country} estimate results quickly from a few clear inputs. Generated with mock AI for Sprint 5.3 — replace this copy with editorial review before publish.`;

    const howItWorks = `Enter the required values, run the calculation, and review the summary metrics. Assumptions are configuration-driven and can be refined in the Calculator Builder.`;

    const formulaExplanation =
      args.definition.formulas[0]?.description ||
      args.definition.formulas[0]?.expression ||
      `Core formulas for ${name} are defined in the generated definition and validated before review.`;

    const articleBody = buildArticle(name, words, args.intent);

    return {
      introduction: `${introduction}\n\n${articleBody}`,
      formulaExplanation,
      howItWorks,
      examples: [
        {
          title: "Sample scenario",
          description: `A typical ${args.intent.category.toLowerCase()} scenario using default inputs for ${name}.`,
        },
        {
          title: "Sensitivity check",
          description:
            "Adjust the primary rate or amount input to see how outputs respond.",
        },
      ],
      faqs: [
        {
          id: "faq_ai_1",
          question: `What does the ${name} calculate?`,
          answer: introduction,
          order: 1,
        },
        {
          id: "faq_ai_2",
          question: "Are the results financial advice?",
          answer:
            "No. Results are estimates for educational purposes and require human review before publishing.",
          order: 2,
        },
        {
          id: "faq_ai_3",
          question: "Can I edit the generated calculator?",
          answer:
            "Yes. Open Builder Review to edit metadata, inputs, formulas, SEO, and content before saving as a draft.",
          order: 3,
        },
      ],
      tips: [
        "Validate units and currency before publishing.",
        "Confirm formula precision for your market.",
        "Keep SEO title under 60 characters where possible.",
      ],
      references: [
        {
          title: "AZPPS Calculator Builder definition schema",
        },
        {
          title: "Internal mock AI generation notes",
        },
      ],
    };
  }
}

export const contentGenerator = new ContentGenerator();

function wordBudget(length: ContentLength): number {
  switch (length) {
    case "short":
      return 400;
    case "long":
      return 1400;
    default:
      return 1100;
  }
}

function buildArticle(
  name: string,
  targetWords: number,
  intent: IntentAnalysisResult,
): string {
  const paragraphs = [
    `${name} is designed for the ${intent.category} domain with ${intent.complexity} calculation complexity.`,
    `Required inputs typically include ${intent.requiredInputs.join(", ") || "basic parameters"}.`,
    `Primary outputs include ${intent.requiredOutputs.join(", ") || "summary metrics"}.`,
    `This article scaffold expands to approximately ${targetWords} words for SEO and content completeness checks.`,
    `Editors should rewrite mock AI prose, add local regulations for the selected country, and cite authoritative sources.`,
    `Benefits include faster time-to-draft, consistent structure across the catalog, and Builder-compatible definitions.`,
    `Tips: keep defaults realistic, label units clearly, and surface confidence scores during review.`,
    `Worked examples should mirror common user journeys for ${intent.industry} audiences.`,
  ];

  const filler =
    "Additional educational context covers assumptions, limitations, edge cases, and how related calculators can support decision-making. ";

  let body = paragraphs.join(" ");
  while (body.split(/\s+/).length < targetWords) {
    body += filler;
  }
  return body.split(/\s+/).slice(0, targetWords).join(" ");
}
