"use client";

import * as React from "react";

import {
  calculatorDiscoveryService,
  categoryService,
  homepageService,
} from "@/features/homepage/services";
import type {
  HomepageCalculatorCard,
  HomepageCategory,
  HomepagePayload,
} from "@/features/homepage/types";

export function useHomepage(): HomepagePayload {
  return React.useMemo(() => homepageService.getHomepage(), []);
}

export function useFeaturedCalculators(): HomepageCalculatorCard[] {
  return React.useMemo(() => calculatorDiscoveryService.featured(), []);
}

export function useTrendingCalculators(): HomepageCalculatorCard[] {
  return React.useMemo(() => calculatorDiscoveryService.trending(), []);
}

export function useCategories(): HomepageCategory[] {
  return React.useMemo(() => categoryService.list(), []);
}

export function useCalculatorSearch(initialQuery = "") {
  const [query, setQuery] = React.useState(initialQuery);
  const results = React.useMemo(
    () => calculatorDiscoveryService.search(query),
    [query],
  );

  return { query, setQuery, results };
}
