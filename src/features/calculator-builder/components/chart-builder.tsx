"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartKind } from "@/features/results-engine/constants/enums";
import { createBuilderId } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  BuilderChart,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type ChartBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (charts: BuilderChart[]) => void;
};

function createEmptyChart(order: number): BuilderChart {
  return {
    id: createBuilderId("chart"),
    title: "",
    kind: ChartKind.Bar,
    seriesMappings: [
      {
        id: createBuilderId("series"),
        name: "Series",
        dataKey: "",
      },
    ],
    showLegend: true,
    order,
  };
}

export function ChartBuilder({ definition, onChange }: ChartBuilderProps) {
  const charts = [...definition.charts].sort((a, b) => a.order - b.order);

  const updateAt = (id: string, patch: Partial<BuilderChart>) => {
    onChange(
      definition.charts.map((chart) =>
        chart.id === id ? { ...chart, ...patch } : chart,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Chart builder</h2>
          <p className="text-muted-foreground text-sm">
            Configure chart type, series mapping, axes, legends, and colours.
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            onChange([
              ...definition.charts,
              createEmptyChart(definition.charts.length + 1),
            ])
          }
        >
          Add chart
        </Button>
      </div>

      {charts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No charts configured.</p>
      ) : null}

      <div className="space-y-4">
        {charts.map((chart, index) => (
          <div
            key={chart.id}
            className="border-border space-y-3 rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Chart {index + 1}</p>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() =>
                  onChange(
                    definition.charts
                      .filter((c) => c.id !== chart.id)
                      .map((c, i) => ({ ...c, order: i + 1 })),
                  )
                }
              >
                Delete
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={chart.title}
                  onChange={(e) =>
                    updateAt(chart.id, { title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Chart type</Label>
                <Select
                  value={chart.kind}
                  onValueChange={(value) =>
                    updateAt(chart.id, {
                      kind: value as BuilderChart["kind"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ChartKind).map((kind) => (
                      <SelectItem key={kind} value={kind}>
                        {kind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>X axis label</Label>
                <Input
                  value={chart.xAxisLabel ?? ""}
                  onChange={(e) =>
                    updateAt(chart.id, {
                      xAxisLabel: e.target.value || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Y axis label</Label>
                <Input
                  value={chart.yAxisLabel ?? ""}
                  onChange={(e) =>
                    updateAt(chart.id, {
                      yAxisLabel: e.target.value || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Colours (comma-separated)</Label>
                <Input
                  value={(chart.colours ?? []).join(", ")}
                  onChange={(e) =>
                    updateAt(chart.id, {
                      colours: e.target.value
                        .split(",")
                        .map((c) => c.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="#0f766e, #b45309"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={chart.showLegend ?? true}
                  onCheckedChange={(checked) =>
                    updateAt(chart.id, { showLegend: checked })
                  }
                />
                <Label>Show legend</Label>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Series mapping</Label>
                {chart.seriesMappings.map((series, seriesIndex) => (
                  <div key={series.id} className="grid gap-2 sm:grid-cols-3">
                    <Input
                      value={series.name}
                      onChange={(e) => {
                        const next = [...chart.seriesMappings];
                        next[seriesIndex] = {
                          ...series,
                          name: e.target.value,
                        };
                        updateAt(chart.id, { seriesMappings: next });
                      }}
                      placeholder="Series name"
                    />
                    <Input
                      value={series.dataKey}
                      onChange={(e) => {
                        const next = [...chart.seriesMappings];
                        next[seriesIndex] = {
                          ...series,
                          dataKey: e.target.value,
                        };
                        updateAt(chart.id, { seriesMappings: next });
                      }}
                      placeholder="dataKey (e.g. emi)"
                    />
                    <Input
                      value={series.color ?? ""}
                      onChange={(e) => {
                        const next = [...chart.seriesMappings];
                        next[seriesIndex] = {
                          ...series,
                          color: e.target.value || undefined,
                        };
                        updateAt(chart.id, { seriesMappings: next });
                      }}
                      placeholder="Colour"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Display rules (placeholder)</Label>
                <Textarea
                  value={chart.displayRulesPlaceholder ?? ""}
                  onChange={(e) =>
                    updateAt(chart.id, {
                      displayRulesPlaceholder: e.target.value || undefined,
                    })
                  }
                  rows={2}
                  placeholder="Future: visibility / breakpoint rules"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
