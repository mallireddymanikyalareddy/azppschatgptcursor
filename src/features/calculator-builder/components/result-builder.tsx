"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OutputFormat } from "@/features/calculation-engine/constants/enums";
import { ResultValueType } from "@/features/results-engine/constants/enums";
import { createBuilderId } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  BuilderResultMetric,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type ResultBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (results: BuilderResultMetric[]) => void;
  onBreakdownsChange?: (
    breakdowns: CalculatorBuilderDefinition["breakdowns"],
  ) => void;
  onRecommendationsChange?: (
    recommendations: CalculatorBuilderDefinition["recommendations"],
  ) => void;
};

function createEmptyResult(order: number): BuilderResultMetric {
  return {
    id: createBuilderId("result"),
    key: "",
    label: "",
    type: ResultValueType.Number,
    format: OutputFormat.Decimal,
    precision: 2,
    order,
  };
}

export function ResultBuilder({
  definition,
  onChange,
  onBreakdownsChange,
  onRecommendationsChange,
}: ResultBuilderProps) {
  const results = [...definition.results].sort((a, b) => a.order - b.order);
  const formulaKeys = definition.formulas.map((f) => f.key).filter(Boolean);

  const updateAt = (id: string, patch: Partial<BuilderResultMetric>) => {
    onChange(
      definition.results.map((result) =>
        result.id === id ? { ...result, ...patch } : result,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Result builder</h2>
          <p className="text-muted-foreground text-sm">
            Configure result cards, metrics, summaries, breakdowns, and
            recommendations.
          </p>
        </div>
        <Button
          type="button"
          onClick={() =>
            onChange([
              ...definition.results,
              createEmptyResult(definition.results.length + 1),
            ])
          }
        >
          Add metric
        </Button>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={result.id}
            className="border-border grid gap-3 rounded-lg border p-4 sm:grid-cols-2"
          >
            <div className="flex items-center justify-between sm:col-span-2">
              <p className="text-sm font-medium">Metric {index + 1}</p>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() =>
                  onChange(
                    definition.results
                      .filter((r) => r.id !== result.id)
                      .map((r, i) => ({ ...r, order: i + 1 })),
                  )
                }
              >
                Delete
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={result.label}
                onChange={(e) => updateAt(result.id, { label: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Output key</Label>
              <Select
                value={result.key || undefined}
                onValueChange={(value) => updateAt(result.id, { key: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select formula output" />
                </SelectTrigger>
                <SelectContent>
                  {formulaKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={result.type}
                onValueChange={(value) =>
                  updateAt(result.id, {
                    type: value as BuilderResultMetric["type"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ResultValueType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Format</Label>
              <Select
                value={result.format}
                onValueChange={(value) =>
                  updateAt(result.id, {
                    format: value as BuilderResultMetric["format"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OutputFormat).map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Input
                value={result.currency ?? ""}
                onChange={(e) =>
                  updateAt(result.id, {
                    currency: e.target.value || undefined,
                  })
                }
                placeholder="INR"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                checked={Boolean(result.emphasize)}
                onCheckedChange={(checked) =>
                  updateAt(result.id, { emphasize: checked })
                }
              />
              <Label>Emphasize card</Label>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Breakdowns</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onBreakdownsChange?.([
                ...definition.breakdowns,
                {
                  id: createBuilderId("breakdown"),
                  title: "Breakdown",
                  items: [],
                },
              ])
            }
          >
            Add breakdown
          </Button>
        </div>
        {definition.breakdowns.map((bd) => (
          <div key={bd.id} className="space-y-2 rounded-lg border p-3">
            <Input
              value={bd.title}
              onChange={(e) =>
                onBreakdownsChange?.(
                  definition.breakdowns.map((item) =>
                    item.id === bd.id
                      ? { ...item, title: e.target.value }
                      : item,
                  ),
                )
              }
              placeholder="Breakdown title"
            />
            <p className="text-muted-foreground text-xs">
              Items: {bd.items.length} (map data keys in JSON / future UI)
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Recommendations</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onRecommendationsChange?.([
                ...definition.recommendations,
                {
                  id: createBuilderId("rec"),
                  title: "Tip",
                  body: "",
                  tone: "tip",
                },
              ])
            }
          >
            Add recommendation
          </Button>
        </div>
        {definition.recommendations.map((rec) => (
          <div key={rec.id} className="grid gap-2 rounded-lg border p-3">
            <Input
              value={rec.title}
              onChange={(e) =>
                onRecommendationsChange?.(
                  definition.recommendations.map((item) =>
                    item.id === rec.id
                      ? { ...item, title: e.target.value }
                      : item,
                  ),
                )
              }
              placeholder="Title"
            />
            <Input
              value={rec.body}
              onChange={(e) =>
                onRecommendationsChange?.(
                  definition.recommendations.map((item) =>
                    item.id === rec.id
                      ? { ...item, body: e.target.value }
                      : item,
                  ),
                )
              }
              placeholder="Body"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
