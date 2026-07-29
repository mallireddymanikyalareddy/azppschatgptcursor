/**
 * Public Calculator Page system — SEO-first, configuration-driven pages.
 *
 * Route: /calculators/[slug]
 * Engines: Form + Calculation + Results (via runtime workspace hook)
 * Future CMS: swap CalculatorPageRepository for API-backed content.
 */

export type * from "@/features/public-calculator-page/types";
export * from "@/features/public-calculator-page/constants";
export { MOCK_PUBLIC_CALCULATOR_PAGES } from "@/features/public-calculator-page/data/mock-pages";
export {
  getPublicCalculatorPath,
  getPublicCalculatorUrl,
} from "@/features/public-calculator-page/lib/seo-builders";
export * from "@/features/public-calculator-page/services";
export * from "@/features/public-calculator-page/hooks";
export { PublicCalculatorPage } from "@/features/public-calculator-page/components/public-calculator-page";
export { PublicCalculatorJsonLd } from "@/features/public-calculator-page/components/json-ld";
export { calculatorPageRepository } from "@/features/public-calculator-page/repositories/page-repository";
