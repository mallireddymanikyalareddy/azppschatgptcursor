"use client";

import { LayoutGrid, List, Plus, RefreshCw, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TemplateViewMode } from "@/features/calculator-templates/constants/enums";
import type { TemplateViewMode as ViewMode } from "@/features/calculator-templates/constants/enums";

export type TemplateToolbarProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRefresh: () => void;
  onCreate: () => void;
  onImport: (file: File) => void;
  total: number;
};

export function TemplateToolbar({
  viewMode,
  onViewModeChange,
  onRefresh,
  onCreate,
  onImport,
  total,
}: TemplateToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-muted-foreground text-sm">
        <span className="text-foreground font-medium tabular-nums">
          {total.toLocaleString("en-IN")}
        </span>{" "}
        templates
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" variant="outline" onClick={onRefresh}>
          <RefreshCw className="size-4" />
          Refresh
        </Button>
        <Button type="button" size="sm" variant="outline" asChild>
          <label className="cursor-pointer">
            <Upload className="size-4" />
            Import
            <input
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onImport(file);
                event.target.value = "";
              }}
            />
          </label>
        </Button>
        <Button type="button" size="sm" onClick={onCreate}>
          <Plus className="size-4" />
          Create template
        </Button>
        <div className="flex overflow-hidden rounded-md border">
          <Button
            type="button"
            size="sm"
            variant={viewMode === TemplateViewMode.Grid ? "secondary" : "ghost"}
            className="rounded-none"
            onClick={() => onViewModeChange(TemplateViewMode.Grid)}
            aria-label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={
              viewMode === TemplateViewMode.Table ? "secondary" : "ghost"
            }
            className="rounded-none"
            onClick={() => onViewModeChange(TemplateViewMode.Table)}
            aria-label="Table view"
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
