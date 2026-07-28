"use client";

import * as React from "react";

import { calculatorLibraryService } from "@/features/calculator-library/services";
import { useCalculatorFilters } from "@/features/calculator-library/hooks/use-calculator-filters";
import { useCalculatorSearch } from "@/features/calculator-library/hooks/use-calculator-search";
import { useCalculatorSelection } from "@/features/calculator-library/hooks/use-calculator-selection";
import {
  LibraryViewMode,
  type LibraryCalculator,
  type LibraryPageResult,
  type LibraryViewMode as ViewMode,
} from "@/features/calculator-library/types";

const VIEW_STORAGE_KEY = "azpps.calculator-library.view";

export type UseCalculatorLibraryResult = {
  loading: boolean;
  result: LibraryPageResult | null;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  refresh: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filtersApi: ReturnType<typeof useCalculatorFilters>;
  searchApi: ReturnType<typeof useCalculatorSearch>;
  selectionApi: ReturnType<typeof useCalculatorSelection>;
  activeCalculator: LibraryCalculator | null;
  setActiveCalculator: (item: LibraryCalculator | null) => void;
  previewCalculator: LibraryCalculator | null;
  setPreviewCalculator: (item: LibraryCalculator | null) => void;
  notice: string | null;
  setNotice: (message: string | null) => void;
};

export function useCalculatorLibrary(): UseCalculatorLibraryResult {
  const filtersApi = useCalculatorFilters();
  const searchApi = useCalculatorSearch(filtersApi);
  const selectionApi = useCalculatorSelection();

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState<LibraryPageResult | null>(null);
  const [refreshToken, setRefreshToken] = React.useState(0);
  const [activeCalculator, setActiveCalculator] =
    React.useState<LibraryCalculator | null>(null);
  const [previewCalculator, setPreviewCalculator] =
    React.useState<LibraryCalculator | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  const [viewMode, setViewModeState] = React.useState<ViewMode>(() => {
    if (typeof window === "undefined") return LibraryViewMode.Table;
    const stored = window.sessionStorage.getItem(VIEW_STORAGE_KEY);
    return stored === LibraryViewMode.Grid
      ? LibraryViewMode.Grid
      : LibraryViewMode.Table;
  });

  const setViewMode = React.useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    window.sessionStorage.setItem(VIEW_STORAGE_KEY, mode);
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [filtersApi.filters, pageSize]);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void calculatorLibraryService
      .query({
        filters: filtersApi.filters,
        page,
        pageSize,
      })
      .then((data) => {
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filtersApi.filters, page, pageSize, refreshToken]);

  const refresh = React.useCallback(() => {
    setRefreshToken((value) => value + 1);
    setNotice("Library refreshed from mock repository.");
  }, []);

  return {
    loading,
    result,
    page,
    pageSize,
    setPage,
    setPageSize,
    refresh,
    viewMode,
    setViewMode,
    filtersApi,
    searchApi,
    selectionApi,
    activeCalculator,
    setActiveCalculator,
    previewCalculator,
    setPreviewCalculator,
    notice,
    setNotice,
  };
}
