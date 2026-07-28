/**
 * Cache contracts only — no implementations.
 * Ready for Redis / memory / edge caches later.
 */

export interface FormulaCache {
  get(expression: string): Promise<unknown | null>;
  set(expression: string, value: unknown, ttlSeconds?: number): Promise<void>;
  invalidate(expression?: string): Promise<void>;
}

export interface ResultCache {
  get(key: string): Promise<unknown | null>;
  set(key: string, value: unknown, ttlSeconds?: number): Promise<void>;
  invalidate(key?: string): Promise<void>;
}

export interface ConfigurationCache {
  getCalculator(idOrSlug: string): Promise<unknown | null>;
  setCalculator(
    idOrSlug: string,
    definition: unknown,
    ttlSeconds?: number,
  ): Promise<void>;
  invalidate(idOrSlug?: string): Promise<void>;
}

export type CalculationCacheBundle = {
  formulaCache?: FormulaCache;
  resultCache?: ResultCache;
  configurationCache?: ConfigurationCache;
};
