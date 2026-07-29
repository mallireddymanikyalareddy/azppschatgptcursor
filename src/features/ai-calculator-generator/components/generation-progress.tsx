"use client";

import { Badge } from "@/components/ui/badge";
import type { PipelineStageState } from "@/features/ai-calculator-generator/types";

export type GenerationProgressProps = {
  stages: PipelineStageState[];
  currentStage: string | null;
  generating: boolean;
};

export function GenerationProgress({
  stages,
  currentStage,
  generating,
}: GenerationProgressProps) {
  if (stages.length === 0 && !generating) return null;

  const completed = stages.filter((s) => s.status === "completed").length;
  const percent = stages.length
    ? Math.round((completed / stages.length) * 100)
    : 0;

  return (
    <section className="space-y-3 rounded-md border p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Generation pipeline</h2>
        <Badge variant="secondary">{percent}%</Badge>
      </div>
      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {stages.map((stage) => (
          <li
            key={stage.stage}
            className="flex items-start justify-between gap-2 rounded-md border px-3 py-2 text-sm"
          >
            <div>
              <p
                className={
                  stage.stage === currentStage ? "font-medium" : undefined
                }
              >
                {stage.stage.replaceAll("_", " ")}
              </p>
              {stage.message ? (
                <p className="text-muted-foreground text-xs">{stage.message}</p>
              ) : null}
            </div>
            <Badge
              variant={
                stage.status === "completed"
                  ? "secondary"
                  : stage.status === "failed"
                    ? "destructive"
                    : "outline"
              }
              className="capitalize"
            >
              {stage.status}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
