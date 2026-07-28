import {
  ResultLayout,
  ResultValueType,
} from "@/features/results-engine/constants/enums";
import type { ResultsViewDefinition } from "@/features/results-engine/types";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

/**
 * Maps builder results/charts/content → Results Engine view definition.
 */
export function toResultsViewDefinition(
  definition: CalculatorBuilderDefinition,
): ResultsViewDefinition {
  const { metadata, results, charts, breakdowns, recommendations, content } =
    definition;

  return {
    id: `view_${metadata.slug || metadata.id}`,
    calculatorId: metadata.id,
    calculatorSlug: metadata.slug || metadata.id,
    title: `${metadata.name || "Calculator"} Results`,
    summary: content.introduction || metadata.description || undefined,
    layout: ResultLayout.CardGrid,
    printTitle: metadata.name || undefined,
    metrics: [...results]
      .sort((a, b) => a.order - b.order)
      .map((metric) => ({
        id: metric.id,
        key: metric.key,
        label: metric.label,
        type: metric.type,
        emphasize: metric.emphasize,
        format: {
          currency: metric.currency,
          precision: metric.precision,
        },
      })),
    charts: [...charts]
      .sort((a, b) => a.order - b.order)
      .map((chart) => ({
        id: chart.id,
        title: chart.title,
        description:
          [chart.xAxisLabel, chart.yAxisLabel].filter(Boolean).join(" · ") ||
          undefined,
        kind: chart.kind,
        series: chart.seriesMappings.map((series) => ({
          id: series.id,
          name: series.name,
          color: series.color,
          /** Placeholder points — live values come from calculation in preview metrics. */
          data: [{ label: series.dataKey, value: 0 }],
        })),
      })),
    breakdowns: breakdowns.map((bd) => ({
      id: bd.id,
      title: bd.title,
      items: bd.items.map((item) => ({
        id: item.id,
        label: item.label,
        value: 0,
        type:
          results.find((r) => r.key === item.dataKey)?.type ??
          ResultValueType.Number,
      })),
    })),
    recommendations:
      recommendations.length > 0
        ? {
            id: `recs_${metadata.slug || metadata.id}`,
            title: "Recommendations",
            items: recommendations.map((rec) => ({
              id: rec.id,
              title: rec.title,
              body: rec.body,
              tone: rec.tone,
            })),
          }
        : undefined,
  };
}
