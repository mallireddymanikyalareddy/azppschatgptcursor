/**
 * Public Homepage — discovery, education, and conversion surface for AZPPS.
 *
 * Architecture:
 * Route (SSR) → HomepageService / SEOService → repositories + mock data
 * Interactive islands: GlobalCalculatorSearch, Statistics, Newsletter, NavActions
 *
 * Future CMS: replace HomepageRepository with API-backed content adapters.
 */

export type * from "@/features/homepage/types";
export * from "@/features/homepage/constants";
export * from "@/features/homepage/services";
export * from "@/features/homepage/hooks";
export {
  HomepageView,
  HomepageJsonLd,
  HomepageNavActions,
  GlobalCalculatorSearch,
} from "@/features/homepage/components";
export { homepageRepository } from "@/features/homepage/repositories/homepage-repository";
