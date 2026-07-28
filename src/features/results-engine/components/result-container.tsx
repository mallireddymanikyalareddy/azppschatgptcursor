"use client";

import * as React from "react";

import { BreakdownCard } from "@/features/results-engine/components/breakdown-card";
import { ChartView } from "@/features/results-engine/components/chart-view";
import { ComparisonCard } from "@/features/results-engine/components/comparison-card";
import { InfoCard } from "@/features/results-engine/components/info-card";
import { RecommendationCard } from "@/features/results-engine/components/recommendation-card";
import { ResultSection } from "@/features/results-engine/components/result-section";
import { ResultSummary } from "@/features/results-engine/components/result-summary";
import { ResultTable } from "@/features/results-engine/components/result-table";
import { TimelineView } from "@/features/results-engine/components/timeline-view";
import { mapMetrics } from "@/features/results-engine/lib/map-results";
import type {
  ResultDataBag,
  ResultsViewDefinition,
} from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ResultContainerProps = {
  definition: ResultsViewDefinition;
  data: ResultDataBag;
  className?: string;
  /** Enables print-oriented wrappers. */
  printMode?: boolean;
};

/**
 * Configuration-driven results surface for any calculator.
 * Renders metrics, charts, tables, comparisons, timelines, etc.
 */
export function ResultContainer({
  definition,
  data,
  className,
  printMode,
}: ResultContainerProps) {
  const metrics = React.useMemo(
    () => mapMetrics(definition.metrics, data),
    [definition.metrics, data],
  );

  return (
    <div
      data-slot="result-container"
      data-print-mode={printMode ? "true" : "false"}
      className={cn(
        "space-y-6",
        printMode && "print:bg-white print:text-black",
        className,
      )}
    >
      <header className="space-y-1 print:mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          {printMode
            ? (definition.printTitle ?? definition.title)
            : definition.title}
        </h2>
        {definition.summary ? (
          <p className="text-muted-foreground text-sm">{definition.summary}</p>
        ) : null}
      </header>

      <ResultSummary
        title="Key results"
        description={definition.summary}
        metrics={metrics}
      />

      {definition.sections?.map((section) => (
        <ResultSection key={section.id} section={section} metrics={metrics} />
      ))}

      {definition.breakdowns?.map((breakdown) => (
        <BreakdownCard key={breakdown.id} breakdown={breakdown} />
      ))}

      {definition.charts?.map((chart) => (
        <ChartView key={chart.id} chart={chart} />
      ))}

      {definition.tables?.map((table) => (
        <ResultTable key={table.id} table={table} />
      ))}

      {definition.comparisons?.map((comparison) => (
        <ComparisonCard key={comparison.id} comparison={comparison} />
      ))}

      {definition.timelines?.map((timeline) => (
        <TimelineView key={timeline.id} timeline={timeline} />
      ))}

      {definition.infoCards?.map((info) => (
        <InfoCard key={info.id} info={info} />
      ))}

      {definition.recommendations ? (
        <RecommendationCard recommendations={definition.recommendations} />
      ) : null}
    </div>
  );
}
