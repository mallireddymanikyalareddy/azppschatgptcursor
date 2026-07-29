import type { AIProvider } from "@/features/ai-calculator-generator/services/mock-ai-provider";
import type {
  GeneratorPromptInput,
  IntentAnalysisResult,
} from "@/features/ai-calculator-generator/types";

/**
 * Intent analysis — category, inputs/outputs, complexity.
 * Uses MockAIProvider today; LLM adapters plug in via AIProvider.
 */
export class PromptAnalyzer {
  constructor(private readonly provider: AIProvider) {}

  async analyze(prompt: GeneratorPromptInput): Promise<IntentAnalysisResult> {
    const base = await this.provider.analyzeIntent(prompt);
    const text = prompt.prompt.toLowerCase();

    const requiredInputs = inferInputs(text, base.calculatorType);
    const requiredOutputs = inferOutputs(text, base.calculatorType);
    const complexity = inferComplexity(requiredInputs.length, text);

    return {
      category: base.category,
      calculatorType: base.calculatorType,
      requiredInputs,
      requiredOutputs,
      complexity,
      industry: base.industry,
      keywords: base.keywords,
      confidence: base.confidence,
    };
  }
}

function inferInputs(text: string, type: string): string[] {
  if (type === "emi" || /loan|emi|mortgage/.test(text)) {
    return ["principal", "annualRate", "tenure"];
  }
  if (type === "investment" || /sip/.test(text)) {
    return ["monthlyInvestment", "annualRate", "years"];
  }
  if (type === "tax" || /gst|tax/.test(text)) {
    if (/gst/.test(text)) return ["amount", "gstRate"];
    return ["taxableIncome", "effectiveRate"];
  }
  if (type === "health" || /bmi|body fat/.test(text)) {
    return ["weightKg", "heightCm"];
  }
  if (/cagr/.test(text)) {
    return ["beginningValue", "endingValue", "years"];
  }
  if (/retire/.test(text)) {
    return ["targetCorpus", "annualRate", "years"];
  }
  if (/fuel/.test(text)) {
    return ["distanceKm", "mileageKmPerLitre", "fuelPrice"];
  }
  return ["value"];
}

function inferOutputs(text: string, type: string): string[] {
  if (type === "emi" || /loan|emi|mortgage/.test(text)) {
    return ["emi", "totalInterest", "totalPayable"];
  }
  if (/sip/.test(text)) return ["futureValue", "invested", "gains"];
  if (/gst/.test(text)) return ["gst", "total"];
  if (/tax/.test(text)) return ["tax"];
  if (/bmi/.test(text)) return ["bmi"];
  if (/cagr/.test(text)) return ["cagr"];
  if (/retire/.test(text)) return ["monthlySavings"];
  if (/fuel/.test(text)) return ["fuelCost", "litresNeeded"];
  return ["result"];
}

function inferComplexity(
  inputCount: number,
  text: string,
): "low" | "medium" | "high" {
  if (/amorti|slab|complex|advanced/.test(text) || inputCount >= 5) {
    return "high";
  }
  if (inputCount >= 3) return "medium";
  return "low";
}
