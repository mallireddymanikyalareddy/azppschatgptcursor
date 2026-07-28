"use client";

import * as React from "react";

import { ResultBadge } from "@/features/results-engine/components/result-badge";
import { ResultCard } from "@/features/results-engine/components/result-card";
import { ResultMetric } from "@/features/results-engine/components/result-metric";
import { mapMetrics } from "@/features/results-engine/lib/map-results";
import type { ComparisonDefinition } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ComparisonCardProps = {
  comparison: ComparisonDefinition;
  className?: string;
};

export function ComparisonCard({ comparison, className }: ComparisonCardProps) {
  return (
    <section
      data-slot="comparison-card"
      className={cn("space-y-4", className)}
      aria-labelledby={`${comparison.id}-title`}
    >
      <header className="space-y-1">
        <h3
          id={`${comparison.id}-title`}
          className="text-sm font-semibold tracking-tight"
        >
          {comparison.title}
        </h3>
        {comparison.description ? (
          <p className="text-muted-foreground text-sm">
            {comparison.description}
          </p>
        ) : null}
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {comparison.options.map((option) => {
          const metrics = mapMetrics(option.metrics, option.values);
          return (
            <ResultCard
              key={option.id}
              title={option.title}
              description={option.subtitle}
              className={cn(
                option.highlighted &&
                  "border-primary/50 ring-primary/20 ring-1",
              )}
              printSafe
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {option.badge ? (
                  <ResultBadge
                    label={option.badge}
                    tone={option.highlighted ? "success" : "neutral"}
                  />
                ) : null}
              </div>
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <ResultMetric key={metric.definition.id} metric={metric} />
                ))}
              </div>
            </ResultCard>
          );
        })}
      </div>
    </section>
  );
}
