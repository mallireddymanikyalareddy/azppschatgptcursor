"use client";

import { Button } from "@/components/ui/button";

export type LibraryBulkBarProps = {
  count: number;
  onPublish: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onExport: () => void;
  onAssignCategory: () => void;
  onDuplicate: () => void;
  onClear: () => void;
};

export function LibraryBulkBar({
  count,
  onPublish,
  onArchive,
  onDelete,
  onExport,
  onAssignCategory,
  onDuplicate,
  onClear,
}: LibraryBulkBarProps) {
  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-label="Bulk actions"
      className="bg-muted/50 border-border flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2"
    >
      <p className="text-sm font-medium tabular-nums">{count} selected</p>
      <Button type="button" size="sm" variant="secondary" onClick={onPublish}>
        Publish
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={onArchive}>
        Archive
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={onExport}>
        Export
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={onAssignCategory}
      >
        Assign category
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={onDuplicate}>
        Duplicate
      </Button>
      <Button type="button" size="sm" variant="destructive" onClick={onDelete}>
        Delete
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={onClear}>
        Clear
      </Button>
    </div>
  );
}
