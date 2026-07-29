/**
 * AI Calculator Generator — mock NL → CalculatorBuilderDefinition pipeline.
 *
 * Future LLM integration: implement AIProvider and wire via MockAIProvider swap.
 * Never auto-publishes; human review required.
 */

export type * from "@/features/ai-calculator-generator/types";
export * from "@/features/ai-calculator-generator/constants";
export { PROMPT_LIBRARY } from "@/features/ai-calculator-generator/data/prompt-library";
export { MOCK_GENERATION_HISTORY } from "@/features/ai-calculator-generator/data/mock-history";
export * from "@/features/ai-calculator-generator/services";
export * from "@/features/ai-calculator-generator/hooks";
export { AIGeneratorDashboard } from "@/features/ai-calculator-generator/components/ai-generator-dashboard";
export { AIHistoryPage } from "@/features/ai-calculator-generator/components/ai-history-page";
