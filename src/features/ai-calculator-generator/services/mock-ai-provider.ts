import type { GeneratorPromptInput } from "@/features/ai-calculator-generator/types";
import { PromptIndustry } from "@/features/ai-calculator-generator/constants/enums";

/**
 * Mock AI provider — deterministic text generation.
 * Future: replace with OpenAI / Gemini / Claude adapters implementing the same interface.
 */
export interface AIProvider {
  readonly name: string;
  complete(system: string, user: string): Promise<string>;
  analyzeIntent(prompt: GeneratorPromptInput): Promise<{
    category: string;
    calculatorType: string;
    industry: PromptIndustry;
    keywords: string[];
    confidence: number;
  }>;
}

const INDUSTRY_HINTS: {
  match: RegExp;
  industry: PromptIndustry;
  category: string;
  type: string;
}[] = [
  {
    match: /\b(emi|loan|mortgage|home\s*loan|personal\s*loan)\b/i,
    industry: PromptIndustry.Finance,
    category: "Loans",
    type: "emi",
  },
  {
    match: /\b(sip|swp|cagr|fd|rd|ppf|nps|invest)/i,
    industry: PromptIndustry.Investment,
    category: "Investments",
    type: "investment",
  },
  {
    match: /\b(gst|income\s*tax|tax\s*slab|tds)\b/i,
    industry: PromptIndustry.Tax,
    category: "Tax",
    type: "tax",
  },
  {
    match: /\b(bmi|bmr|body\s*fat|calorie|health)\b/i,
    industry: PromptIndustry.Health,
    category: "Health",
    type: "health",
  },
  {
    match: /\b(retire|pension|annuity)\b/i,
    industry: PromptIndustry.Finance,
    category: "Retirement",
    type: "retirement",
  },
  {
    match: /\b(fuel|mileage|petrol|diesel)\b/i,
    industry: PromptIndustry.Utility,
    category: "Utilities",
    type: "utility",
  },
];

export class MockAIProvider implements AIProvider {
  readonly name = "mock";

  async complete(system: string, user: string): Promise<string> {
    await delay(40);
    return `[mock:${this.name}] ${system.slice(0, 40)}… → ${user.slice(0, 120)}`;
  }

  async analyzeIntent(prompt: GeneratorPromptInput): Promise<{
    category: string;
    calculatorType: string;
    industry: PromptIndustry;
    keywords: string[];
    confidence: number;
  }> {
    await delay(60);
    const text = prompt.prompt;
    const hit = INDUSTRY_HINTS.find((item) => item.match.test(text));

    if (prompt.industry !== "auto") {
      return {
        category: prompt.industry,
        calculatorType: hit?.type ?? "custom",
        industry: prompt.industry,
        keywords: extractKeywords(text),
        confidence: 0.82,
      };
    }

    if (hit) {
      return {
        category: hit.category,
        calculatorType: hit.type,
        industry: hit.industry,
        keywords: extractKeywords(text),
        confidence: 0.91,
      };
    }

    return {
      category: "General",
      calculatorType: "custom",
      industry: PromptIndustry.General,
      keywords: extractKeywords(text),
      confidence: 0.55,
    };
  }
}

export const mockAIProvider = new MockAIProvider();

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .slice(0, 8);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
