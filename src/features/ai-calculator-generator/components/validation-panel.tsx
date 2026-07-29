"use client";

import { Badge } from "@/components/ui/badge";
import type { GenerationValidationReport } from "@/features/ai-calculator-generator/types";

export type ValidationPanelProps = {
  report: GenerationValidationReport;
};

export function ValidationPanel({ report }: ValidationPanelProps) {
  return (
    <section className="space-y-3 rounded-md border p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Validation</h2>
        <Badge variant={report.valid ? "secondary" : "destructive"}>
          {report.valid ? "Passed" : "Needs fixes"}
        </Badge>
      </div>
      {report.issues.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No issues — ready for human review.
        </p>
      ) : (
        <ul className="space-y-2 text-sm">
          {report.issues.map((issue) => (
            <li
              key={`${issue.code}-${issue.path}`}
              className="rounded-md border px-3 py-2"
            >
              <span className="capitalize">{issue.severity}</span>:{" "}
              {issue.message}
              {issue.path ? (
                <span className="text-muted-foreground font-mono text-xs">
                  {" "}
                  · {issue.path}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
