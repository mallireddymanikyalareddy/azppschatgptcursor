"use client";

import { PageHeader } from "@/components/common/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemplateBuilder } from "@/features/calculator-templates/components/template-builder";
import {
  TemplateCategories,
  TemplateSpotlight,
} from "@/features/calculator-templates/components/template-categories";
import { TemplateDetails } from "@/features/calculator-templates/components/template-details";
import { TemplateFilters } from "@/features/calculator-templates/components/template-filters";
import { TemplateGrid } from "@/features/calculator-templates/components/template-grid";
import { TemplatePreview } from "@/features/calculator-templates/components/template-preview";
import { TemplateTable } from "@/features/calculator-templates/components/template-table";
import { TemplateToolbar } from "@/features/calculator-templates/components/template-toolbar";
import { TemplateViewMode } from "@/features/calculator-templates/constants/enums";
import { useTemplateLibrary } from "@/features/calculator-templates/hooks/use-template-library";
import { templateService } from "@/features/calculator-templates/services";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";

function downloadExport(template: CalculatorTemplate) {
  const pkg = templateService.exportJson(template);
  const blob = new Blob([pkg.content], { type: pkg.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = pkg.filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Template Library — manage reusable calculator blueprints.
 * Mock-backed; generator projects templates into CalculatorBuilderDefinition.
 */
export function TemplateLibraryPage() {
  const library = useTemplateLibrary();
  const items = library.result?.items ?? [];

  const openDetails = async (id: string) => {
    const template = await templateService.getById(id);
    library.setActiveTemplate(template);
  };

  const handleImport = async (file: File) => {
    try {
      const raw = await file.text();
      const imported = templateService.importJson(raw);
      imported.metadata.id = `tpl_import_${Date.now()}`;
      imported.metadata.slug = `${imported.metadata.slug}-imported`;
      const saved = await templateService.create(imported);
      library.setNotice(`Imported “${saved.metadata.name}” (mock).`);
      library.refresh();
      library.setBuilderTemplate(saved);
    } catch {
      library.setNotice("Import failed — invalid template JSON.");
    }
  };

  const handleCreate = async () => {
    const blank = templateService.createBlankTemplate();
    const saved = await templateService.create(blank);
    library.setNotice(`Created “${saved.metadata.name}” (draft).`);
    library.refresh();
    library.setBuilderTemplate(saved);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calculator Management"
        title="Calculator Templates"
        description="Reusable blueprints for rapid calculator creation — inputs, formulas, results, charts, SEO, and content."
        actions={
          <Badge variant="secondary">
            {(library.result?.total ?? 0).toLocaleString("en-IN")} templates
          </Badge>
        }
      />

      {library.notice ? (
        <Alert>
          <AlertTitle>Template notice</AlertTitle>
          <AlertDescription>{library.notice}</AlertDescription>
        </Alert>
      ) : null}

      {library.result ? (
        <div className="space-y-4">
          <TemplateSpotlight
            title="Featured templates"
            items={library.result.featured}
            onOpen={(template) => library.setActiveTemplate(template)}
          />
          <TemplateSpotlight
            title="Popular templates"
            items={library.result.popular}
            onOpen={(template) => library.setActiveTemplate(template)}
          />
          <TemplateSpotlight
            title="Recently updated"
            items={library.result.recentlyUpdated}
            onOpen={(template) => library.setActiveTemplate(template)}
          />
          <TemplateSpotlight
            title="Newest templates"
            items={library.result.newest}
            onOpen={(template) => library.setActiveTemplate(template)}
          />
        </div>
      ) : null}

      <TemplateCategories
        categories={library.result?.categories ?? []}
        active={library.filters.category}
        onSelect={(category) => library.patchFilters({ category })}
      />

      <TemplateFilters
        filters={library.filters}
        categories={library.result?.categories ?? []}
        onChange={library.patchFilters}
      />

      <TemplateToolbar
        viewMode={library.viewMode}
        onViewModeChange={library.setViewMode}
        onRefresh={library.refresh}
        onCreate={() => void handleCreate()}
        onImport={(file) => void handleImport(file)}
        total={library.result?.total ?? 0}
      />

      {library.loading ? (
        <p className="text-muted-foreground text-sm">Loading templates…</p>
      ) : library.viewMode === TemplateViewMode.Table ? (
        <TemplateTable
          items={items}
          onOpen={(template) => library.setActiveTemplate(template)}
          onPreview={(template) => library.setPreviewTemplate(template)}
          onEdit={(template) => library.setBuilderTemplate(template)}
        />
      ) : (
        <TemplateGrid
          items={items}
          onOpen={(template) => library.setActiveTemplate(template)}
          onPreview={(template) => library.setPreviewTemplate(template)}
          onEdit={(template) => library.setBuilderTemplate(template)}
        />
      )}

      {library.result && library.result.totalPages > 1 ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-muted-foreground text-sm">
            Page {library.page} of {library.result.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={library.page <= 1}
              onClick={() => library.setPage(library.page - 1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={library.page >= library.result.totalPages}
              onClick={() => library.setPage(library.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <TemplateDetails
        template={library.activeTemplate}
        open={Boolean(library.activeTemplate)}
        onOpenChange={(open) => {
          if (!open) library.setActiveTemplate(null);
        }}
        onPreview={(template) => {
          library.setPreviewTemplate(template);
        }}
        onEdit={(template) => library.setBuilderTemplate(template)}
        onDuplicate={(id) => void library.duplicate(id)}
        onArchive={(id) => void library.archive(id)}
        onDelete={(id) => void library.remove(id)}
        onExport={downloadExport}
        onVersionChange={(template) => {
          library.setActiveTemplate(template);
          library.refresh();
        }}
      />

      <TemplatePreview
        template={library.previewTemplate}
        open={Boolean(library.previewTemplate)}
        onOpenChange={(open) => {
          if (!open) library.setPreviewTemplate(null);
        }}
      />

      <TemplateBuilder
        template={library.builderTemplate}
        open={Boolean(library.builderTemplate)}
        onOpenChange={(open) => {
          if (!open) library.setBuilderTemplate(null);
        }}
        onSaved={(template) => {
          library.setNotice(`Saved “${template.metadata.name}”.`);
          library.refresh();
          void openDetails(template.metadata.id);
        }}
      />
    </div>
  );
}
