"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGenerationHistory } from "@/features/ai-calculator-generator/hooks/use-generation-history";

export type HistoryPanelProps = {
  onOpen: (id: string) => void;
  refreshToken?: number;
};

export function HistoryPanel({ onOpen, refreshToken = 0 }: HistoryPanelProps) {
  const history = useGenerationHistory();

  React.useEffect(() => {
    history.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh when parent token changes
  }, [refreshToken]);

  return (
    <section className="space-y-3 rounded-md border p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">AI history</h2>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={history.refresh}
        >
          Refresh
        </Button>
      </div>
      {history.loading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {history.items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-2 rounded-md border px-3 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {item.calculatorName}
                </p>
                <p className="text-muted-foreground line-clamp-1 text-xs">
                  {item.promptText}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {new Date(item.createdAt).toLocaleString("en-IN")} ·{" "}
                  {(item.durationMs / 1000).toFixed(1)}s ·{" "}
                  {(item.overallConfidence * 100).toFixed(0)}%
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge variant="outline" className="capitalize">
                  {item.reviewStatus.replaceAll("_", " ")}
                </Badge>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => onOpen(item.id)}
                >
                  Open
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
