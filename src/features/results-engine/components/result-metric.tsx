"use client";

import * as React from "react";

import { ResultBadge } from "@/features/results-engine/components/result-badge";
import { ResultValueType } from "@/features/results-engine/constants/enums";
import type { MappedMetric } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ResultMetricProps = {
  metric: MappedMetric;
  className?: string;
};

export function ResultMetric({ metric, className }: ResultMetricProps) {
  const { definition, formatted, raw } = metric;
  const status =
    definition.type === ResultValueType.Status &&
    definition.statusMap &&
    raw !== null &&
    raw !== undefined
      ? definition.statusMap[String(raw)]
      : undefined;

  return (
    <div
      data-slot="result-metric"
      className={cn(
        "flex flex-col gap-1 rounded-md border border-transparent p-1",
        definition.emphasize && "bg-muted/40 border-border/60 p-3",
        className,
      )}
    >
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {definition.label}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <p
          className={cn(
            "text-foreground font-semibold tabular-nums",
            definition.emphasize ? "text-2xl" : "text-lg",
          )}
        >
          {status ? status.label : formatted}
        </p>
        {status ? (
          <ResultBadge label={status.label} tone={status.tone} />
        ) : null}
      </div>
      {definition.description ? (
        <p className="text-muted-foreground text-xs leading-relaxed">
          {definition.description}
        </p>
      ) : null}
    </div>
  );
}
