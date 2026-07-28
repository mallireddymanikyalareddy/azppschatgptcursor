"use client";

import { PageHeader } from "@/components/common/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LibraryBulkBar } from "@/features/calculator-library/components/library-bulk-bar";
import { LibraryDetailDrawer } from "@/features/calculator-library/components/library-detail-drawer";
import { LibraryEmptyState } from "@/features/calculator-library/components/library-empty-state";
import { LibraryFiltersPanel } from "@/features/calculator-library/components/library-filters";
import { LibraryGrid } from "@/features/calculator-library/components/library-grid";
import { LibraryPagination } from "@/features/calculator-library/components/library-pagination";
import { LibraryPreviewSheet } from "@/features/calculator-library/components/library-preview-sheet";
import { CalculatorLibraryStats } from "@/features/calculator-library/components/library-stats";
import { LibraryTable } from "@/features/calculator-library/components/library-table";
import { LibraryToolbar } from "@/features/calculator-library/components/library-toolbar";
import { useCalculatorLibrary } from "@/features/calculator-library/hooks/use-calculator-library";
import { LibraryViewMode } from "@/features/calculator-library/types";
import type { LibraryCalculator } from "@/features/calculator-library/types";

/**
 * Calculator Library — central management hub for the calculator catalog.
 * Mock-backed; repository/service seams ready for future DB integration.
 */
export function CalculatorLibraryPage() {
  const library = useCalculatorLibrary();
  const items = library.result?.items ?? [];
  const pageIds = items.map((item) => item.id);

  const notify = (message: string) => {
    library.setNotice(message);
  };

  const handleAction = (action: string, item: LibraryCalculator) => {
    const labels: Record<string, string> = {
      duplicate: `Duplicated “${item.name}” (mock — not persisted).`,
      versions: `Version history for “${item.name}” is prepared for a later sprint.`,
      export: `Export JSON prepared for “${item.slug}” (interface only).`,
      archive: `Archived “${item.name}” (mock — not persisted).`,
      delete: `Deleted “${item.name}” (mock — not persisted).`,
    };
    notify(labels[action] ?? `Action “${action}” acknowledged.`);
  };

  const handleBulk = (action: string) => {
    notify(
      `Bulk ${action} on ${library.selectionApi.selectedCount} calculator(s) (mock — not persisted).`,
    );
    library.selectionApi.clear();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calculator Management"
        title="Calculator Library"
        description="Search, filter, and manage the full calculator catalog. Built for 10,000+ definitions with mock data today."
        actions={
          <Badge variant="secondary">
            {(library.result?.stats.total ?? 0).toLocaleString("en-IN")} total
          </Badge>
        }
      />

      {library.notice ? (
        <Alert variant="info">
          <AlertTitle>Library notice</AlertTitle>
          <AlertDescription>{library.notice}</AlertDescription>
        </Alert>
      ) : null}

      {library.result ? (
        <CalculatorLibraryStats stats={library.result.stats} />
      ) : null}

      <LibraryToolbar
        searchInput={library.searchApi.searchInput}
        onSearchChange={library.searchApi.setSearchInput}
        viewMode={library.viewMode}
        onViewModeChange={library.setViewMode}
        onRefresh={library.refresh}
        onExport={() => notify("Catalog export prepared (interface only).")}
        onImport={() => notify("Import is prepared for a later sprint.")}
        onToggleFilters={() =>
          library.filtersApi.setAdvancedOpen(!library.filtersApi.advancedOpen)
        }
        filtersOpen={library.filtersApi.advancedOpen}
        resultCount={library.result?.total ?? 0}
      />

      <LibraryFiltersPanel
        open={library.filtersApi.advancedOpen}
        filters={library.filtersApi.filters}
        facets={library.result?.facets}
        onPatch={library.filtersApi.patchFilters}
        onReset={library.filtersApi.resetFilters}
      />

      <LibraryBulkBar
        count={library.selectionApi.selectedCount}
        onPublish={() => handleBulk("publish")}
        onArchive={() => handleBulk("archive")}
        onDelete={() => handleBulk("delete")}
        onExport={() => handleBulk("export")}
        onAssignCategory={() => handleBulk("assign category")}
        onDuplicate={() => handleBulk("duplicate")}
        onClear={library.selectionApi.clear}
      />

      {!library.loading && items.length === 0 ? (
        <LibraryEmptyState
          totalCatalog={library.result?.stats.total ?? 0}
          filters={library.filtersApi.filters}
        />
      ) : library.viewMode === LibraryViewMode.Grid ? (
        <LibraryGrid
          items={items}
          isSelected={library.selectionApi.isSelected}
          onToggle={library.selectionApi.toggle}
          onOpenDetail={library.setActiveCalculator}
          onPreview={library.setPreviewCalculator}
        />
      ) : (
        <LibraryTable
          items={items}
          loading={library.loading}
          isSelected={library.selectionApi.isSelected}
          allPageSelected={library.selectionApi.allPageSelected(pageIds)}
          onToggle={library.selectionApi.toggle}
          onTogglePage={() => library.selectionApi.togglePage(pageIds)}
          onOpenDetail={library.setActiveCalculator}
          onPreview={library.setPreviewCalculator}
          onAction={handleAction}
        />
      )}

      {library.result ? (
        <LibraryPagination
          page={library.result.page}
          pageSize={library.result.pageSize}
          total={library.result.total}
          totalPages={library.result.totalPages}
          onPageChange={library.setPage}
          onPageSizeChange={library.setPageSize}
        />
      ) : null}

      <LibraryDetailDrawer
        calculator={library.activeCalculator}
        open={Boolean(library.activeCalculator)}
        onOpenChange={(open) => {
          if (!open) library.setActiveCalculator(null);
        }}
        onPreview={(item) => {
          library.setPreviewCalculator(item);
        }}
      />

      <LibraryPreviewSheet
        calculator={library.previewCalculator}
        open={Boolean(library.previewCalculator)}
        onOpenChange={(open) => {
          if (!open) library.setPreviewCalculator(null);
        }}
      />
    </div>
  );
}
