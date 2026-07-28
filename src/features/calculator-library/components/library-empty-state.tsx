"use client";

import { Calculator, SearchX } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import type { LibraryFilters } from "@/features/calculator-library/types";

export function LibraryEmptyState({
  totalCatalog,
  filters,
}: {
  totalCatalog: number;
  filters: LibraryFilters;
}) {
  if (totalCatalog === 0) {
    return (
      <EmptyState
        icon={Calculator}
        title="No calculators yet"
        description="Create your first calculator to start building the catalog."
      />
    );
  }

  if (filters.search.trim()) {
    return (
      <EmptyState
        icon={SearchX}
        title="No search results"
        description={`Nothing matched “${filters.search.trim()}”. Try another keyword or clear filters.`}
      />
    );
  }

  if (filters.categorySlug !== "all") {
    return (
      <EmptyState
        icon={SearchX}
        title="No category matches"
        description="No calculators in this category with the current filters."
      />
    );
  }

  return (
    <EmptyState
      icon={SearchX}
      title="No matching calculators"
      description="Adjust or reset filters to broaden the results."
    />
  );
}
