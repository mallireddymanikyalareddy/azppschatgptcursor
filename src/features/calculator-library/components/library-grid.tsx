"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LibraryBadges } from "@/features/calculator-library/components/library-badges";
import type { LibraryCalculator } from "@/features/calculator-library/types";

export type LibraryGridProps = {
  items: LibraryCalculator[];
  isSelected: (id: string) => boolean;
  onToggle: (id: string) => void;
  onOpenDetail: (item: LibraryCalculator) => void;
  onPreview: (item: LibraryCalculator) => void;
};

export function LibraryGrid({
  items,
  isSelected,
  onToggle,
  onOpenDetail,
  onPreview,
}: LibraryGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground py-10 text-center text-sm">
        No calculators match the current filters.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="gap-3 py-4">
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <Checkbox
                checked={isSelected(item.id)}
                onCheckedChange={() => onToggle(item.id)}
                aria-label={`Select ${item.name}`}
              />
              <LibraryBadges calculator={item} limit={2} />
            </div>
            <CardTitle className="text-base leading-snug">
              {item.name}
            </CardTitle>
            <p className="text-muted-foreground font-mono text-xs">
              {item.slug}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {item.description}
            </p>
            <dl className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd>{item.category.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Usage</dt>
                <dd className="tabular-nums">
                  {item.usageCount.toLocaleString("en-IN")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="capitalize">{item.status}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Version</dt>
                <dd className="font-mono">{item.version}</dd>
              </div>
            </dl>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => onOpenDetail(item)}
              >
                View
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onPreview(item)}
              >
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
