"use client";

import Link from "next/link";
import {
  Download,
  LayoutGrid,
  List,
  Plus,
  RefreshCw,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LibraryViewMode,
  type LibraryViewMode as ViewMode,
} from "@/features/calculator-library/types";
import { ADMIN_ROUTES } from "@/features/admin/constants/routes";

export type LibraryToolbarProps = {
  searchInput: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRefresh: () => void;
  onExport: () => void;
  onImport: () => void;
  onToggleFilters: () => void;
  filtersOpen: boolean;
  resultCount: number;
};

export function LibraryToolbar({
  searchInput,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onRefresh,
  onExport,
  onImport,
  onToggleFilters,
  filtersOpen,
  resultCount,
}: LibraryToolbarProps) {
  return (
    <section
      aria-label="Library toolbar"
      className="border-border flex flex-col gap-3 rounded-lg border p-3"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={searchInput}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, slug, category, tags…"
            aria-label="Search calculators"
            className="sm:max-w-md"
          />
          <p className="text-muted-foreground text-xs tabular-nums">
            {resultCount.toLocaleString("en-IN")} matches
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
          >
            {filtersOpen ? "Hide filters" : "Advanced filters"}
          </Button>
          <Button
            type="button"
            variant={
              viewMode === LibraryViewMode.Table ? "secondary" : "outline"
            }
            size="sm"
            onClick={() => onViewModeChange(LibraryViewMode.Table)}
            aria-pressed={viewMode === LibraryViewMode.Table}
          >
            <List className="size-4" aria-hidden />
            Table
          </Button>
          <Button
            type="button"
            variant={
              viewMode === LibraryViewMode.Grid ? "secondary" : "outline"
            }
            size="sm"
            onClick={() => onViewModeChange(LibraryViewMode.Grid)}
            aria-pressed={viewMode === LibraryViewMode.Grid}
          >
            <LayoutGrid className="size-4" aria-hidden />
            Grid
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="size-4" aria-hidden />
            Refresh
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onImport}>
            <Upload className="size-4" aria-hidden />
            Import
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onExport}>
            <Download className="size-4" aria-hidden />
            Export
          </Button>
          <Button type="button" size="sm" asChild>
            <Link href={ADMIN_ROUTES.calculatorBuilder}>
              <Plus className="size-4" aria-hidden />
              Create Calculator
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
