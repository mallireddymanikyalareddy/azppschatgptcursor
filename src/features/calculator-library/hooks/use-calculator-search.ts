"use client";

import * as React from "react";

import type { UseCalculatorFiltersResult } from "@/features/calculator-library/hooks/use-calculator-filters";

export type UseCalculatorSearchResult = {
  searchInput: string;
  setSearchInput: (value: string) => void;
};

/**
 * Debounces search input into the shared filters.search field.
 */
export function useCalculatorSearch(
  filtersApi: UseCalculatorFiltersResult,
  debounceMs = 250,
): UseCalculatorSearchResult {
  const [searchInput, setSearchInput] = React.useState(
    filtersApi.filters.search,
  );

  const patchFilters = filtersApi.patchFilters;

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      patchFilters({ search: searchInput });
    }, debounceMs);
    return () => window.clearTimeout(timer);
  }, [searchInput, debounceMs, patchFilters]);

  return { searchInput, setSearchInput };
}
