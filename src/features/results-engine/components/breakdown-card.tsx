"use client";

import * as React from "react";

import { ResultCard } from "@/features/results-engine/components/result-card";
import { formatResultValue } from "@/features/results-engine/lib/format-result-value";
import { ResultValueType } from "@/features/results-engine/constants/enums";
import type { BreakdownDefinition } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type BreakdownCardProps = {
  breakdown: BreakdownDefinition;
  className?: string;
};

export function BreakdownCard({ breakdown, className }: BreakdownCardProps) {
  const total = breakdown.items.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResultCard
      title={breakdown.title}
      description={breakdown.description}
      className={className}
      printSafe
    >
      <ul data-slot="breakdown-card" className="space-y-3">
        {breakdown.items.map((item) => {
          const share =
            item.share ?? (total === 0 ? 0 : (item.value / total) * 100);
          return (
            <li key={item.id} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span>{item.label}</span>
                <span className="font-medium tabular-nums">
                  {formatResultValue(
                    item.value,
                    item.type ?? ResultValueType.Currency,
                    item.format,
                  )}
                </span>
              </div>
              <div className="bg-muted h-1.5 rounded-full">
                <div
                  className={cn("bg-primary/70 h-1.5 rounded-full")}
                  style={{
                    width: `${Math.max(0, Math.min(100, share))}%`,
                    backgroundColor: item.color,
                  }}
                  aria-hidden="true"
                />
              </div>
            </li>
          );
        })}
      </ul>
      {breakdown.totalLabel ? (
        <p className="text-muted-foreground mt-4 flex justify-between border-t pt-3 text-sm">
          <span>{breakdown.totalLabel}</span>
          <span className="text-foreground font-semibold tabular-nums">
            {formatResultValue(total, ResultValueType.Currency, {
              currency: breakdown.items[0]?.format?.currency ?? "INR",
            })}
          </span>
        </p>
      ) : null}
    </ResultCard>
  );
}
