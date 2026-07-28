"use client";

import * as React from "react";

import {
  createDefaultLibraryFilters,
  type LibraryFilters,
} from "@/features/calculator-library/types";

export type UseCalculatorFiltersResult = {
  filters: LibraryFilters;
  setFilters: React.Dispatch<React.SetStateAction<LibraryFilters>>;
  patchFilters: (patch: Partial<LibraryFilters>) => void;
  resetFilters: () => void;
  advancedOpen: boolean;
  setAdvancedOpen: (open: boolean) => void;
};

export function useCalculatorFilters(): UseCalculatorFiltersResult {
  const [filters, setFilters] = React.useState<LibraryFilters>(
    createDefaultLibraryFilters,
  );
  const [advancedOpen, setAdvancedOpen] = React.useState(false);

  const patchFilters = React.useCallback((patch: Partial<LibraryFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = React.useCallback(() => {
    setFilters(createDefaultLibraryFilters());
  }, []);

  return {
    filters,
    setFilters,
    patchFilters,
    resetFilters,
    advancedOpen,
    setAdvancedOpen,
  };
}
