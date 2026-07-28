"use client";

import * as React from "react";

import { ResultMetric } from "@/features/results-engine/components/result-metric";
import type { MappedMetric } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ResultGridProps = {
  metrics: MappedMetric[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
};

const columnClass: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function ResultGrid({
  metrics,
  columns = 3,
  className,
}: ResultGridProps) {
  return (
    <div
      data-slot="result-grid"
      className={cn("grid gap-4", columnClass[columns], className)}
      role="list"
    >
      {metrics.map((metric) => (
        <div
          key={metric.definition.id}
          role="listitem"
          className={cn(
            metric.definition.colSpan === 2 && "sm:col-span-2",
            metric.definition.colSpan === 3 && "lg:col-span-3",
          )}
        >
          <ResultMetric metric={metric} />
        </div>
      ))}
    </div>
  );
}
