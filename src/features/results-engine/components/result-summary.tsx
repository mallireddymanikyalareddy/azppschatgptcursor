"use client";

import * as React from "react";

import { ResultGrid } from "@/features/results-engine/components/result-grid";
import type { MappedMetric } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ResultSummaryProps = {
  title?: string;
  description?: string;
  metrics: MappedMetric[];
  className?: string;
};

export function ResultSummary({
  title = "Summary",
  description,
  metrics,
  className,
}: ResultSummaryProps) {
  const primary = metrics.filter((m) => m.definition.emphasize);
  const rest = metrics.filter((m) => !m.definition.emphasize);

  return (
    <section
      data-slot="result-summary"
      className={cn("space-y-4", className)}
      aria-label={title}
    >
      <header className="space-y-1">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </header>
      {primary.length > 0 ? (
        <ResultGrid metrics={primary} columns={primary.length > 1 ? 2 : 1} />
      ) : null}
      {rest.length > 0 ? <ResultGrid metrics={rest} columns={3} /> : null}
    </section>
  );
}
