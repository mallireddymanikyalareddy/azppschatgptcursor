import { formatResultValue } from "@/features/results-engine/lib/format-result-value";
import type {
  MappedMetric,
  ResultDataBag,
  ResultMetricDefinition,
  ResultsViewDefinition,
} from "@/features/results-engine/types";

export function mapMetrics(
  metrics: ResultMetricDefinition[],
  data: ResultDataBag,
): MappedMetric[] {
  return metrics.map((definition) => {
    const raw = data[definition.key];
    return {
      definition,
      raw,
      formatted: formatResultValue(
        raw,
        definition.type,
        definition.format ?? {},
      ),
    };
  });
}

export function mapResultsView(
  definition: ResultsViewDefinition,
  data: ResultDataBag,
): {
  definition: ResultsViewDefinition;
  metrics: MappedMetric[];
  data: ResultDataBag;
} {
  return {
    definition,
    metrics: mapMetrics(definition.metrics, data),
    data,
  };
}
