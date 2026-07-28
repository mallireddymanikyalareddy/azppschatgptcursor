"use client";

import * as React from "react";

import {
  mapMetrics,
  mapResultsView,
} from "@/features/results-engine/lib/map-results";
import type {
  ChartDefinition,
  ComparisonDefinition,
  MappedMetric,
  ResultDataBag,
  ResultsViewDefinition,
} from "@/features/results-engine/types";

export type UseResultsOptions = {
  definition: ResultsViewDefinition;
  data: ResultDataBag;
};

export type UseResultsResult = {
  definition: ResultsViewDefinition;
  data: ResultDataBag;
  metrics: MappedMetric[];
  getMetric: (id: string) => MappedMetric | undefined;
};

export function useResults({
  definition,
  data,
}: UseResultsOptions): UseResultsResult {
  const mapped = React.useMemo(
    () => mapResultsView(definition, data),
    [definition, data],
  );

  const getMetric = React.useCallback(
    (id: string) => mapped.metrics.find((m) => m.definition.id === id),
    [mapped.metrics],
  );

  return {
    definition: mapped.definition,
    data: mapped.data,
    metrics: mapped.metrics,
    getMetric,
  };
}

export type UseChartResult = {
  chart: ChartDefinition;
  seriesCount: number;
  pointCount: number;
};

export function useChart(chart: ChartDefinition): UseChartResult {
  return React.useMemo(
    () => ({
      chart,
      seriesCount: chart.series.length,
      pointCount: chart.series.reduce((sum, s) => sum + s.data.length, 0),
    }),
    [chart],
  );
}

export type UseComparisonResult = {
  comparison: ComparisonDefinition;
  optionCount: number;
  highlightedId?: string;
};

export function useComparison(
  comparison: ComparisonDefinition,
): UseComparisonResult {
  return React.useMemo(
    () => ({
      comparison,
      optionCount: comparison.options.length,
      highlightedId: comparison.options.find((o) => o.highlighted)?.id,
    }),
    [comparison],
  );
}

/** Helper for callers that only need metric mapping. */
export function useMappedMetrics(
  definition: ResultsViewDefinition,
  data: ResultDataBag,
): MappedMetric[] {
  return React.useMemo(
    () => mapMetrics(definition.metrics, data),
    [definition.metrics, data],
  );
}
