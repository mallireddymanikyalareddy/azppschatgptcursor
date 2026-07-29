"use client";

import { Badge } from "@/components/ui/badge";
import type { GenerationConfidence } from "@/features/ai-calculator-generator/types";

export type ConfidencePanelProps = {
  confidence: GenerationConfidence;
};

export function ConfidencePanel({ confidence }: ConfidencePanelProps) {
  const rows: { label: string; value: number }[] = [
    { label: "Template match", value: confidence.templateMatch },
    { label: "Formula", value: confidence.formula },
    { label: "SEO", value: confidence.seo },
    { label: "Content", value: confidence.content },
    { label: "Overall", value: confidence.overall },
  ];

  return (
    <section className="space-y-3 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">AI confidence</h2>
        <Badge variant="secondary">
          {(confidence.overall * 100).toFixed(0)}% overall
        </Badge>
      </div>
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={row.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{row.label}</span>
              <span className="tabular-nums">
                {(row.value * 100).toFixed(0)}%
              </span>
            </div>
            <div className="bg-muted h-1.5 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full"
                style={{ width: `${Math.round(row.value * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
