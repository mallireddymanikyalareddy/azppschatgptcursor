"use client";

import * as React from "react";

import { ResultCard } from "@/features/results-engine/components/result-card";
import { formatResultValue } from "@/features/results-engine/lib/format-result-value";
import {
  ResultValueType,
  StatusTone,
} from "@/features/results-engine/constants/enums";
import type { TimelineDefinition } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type TimelineViewProps = {
  timeline: TimelineDefinition;
  className?: string;
};

const toneDot: Record<(typeof StatusTone)[keyof typeof StatusTone], string> = {
  neutral: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
  info: "bg-info",
};

export function TimelineView({ timeline, className }: TimelineViewProps) {
  return (
    <ResultCard
      title={timeline.title}
      description={timeline.description}
      className={className}
      printSafe
    >
      <ol
        data-slot="timeline-view"
        className="border-border/80 relative ml-2 space-y-4 border-l pl-4"
      >
        {timeline.items.map((item) => (
          <li key={item.id} className="relative">
            <span
              className={cn(
                "absolute top-1 -left-[1.4rem] size-2.5 rounded-full",
                toneDot[item.tone ?? StatusTone.Neutral],
              )}
              aria-hidden="true"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium">{item.title}</p>
                {item.timestamp ? (
                  <time className="text-muted-foreground text-xs">
                    {item.timestamp}
                  </time>
                ) : null}
              </div>
              {item.description ? (
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {item.description}
                </p>
              ) : null}
              {item.value !== undefined ? (
                <p className="text-sm tabular-nums">
                  {formatResultValue(
                    item.value,
                    item.valueType ?? ResultValueType.Text,
                    item.format,
                  )}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </ResultCard>
  );
}
