"use client";

import { Badge } from "@/components/ui/badge";
import type { BuilderValidationReport } from "@/features/calculator-builder/types";

export type ValidationPanelProps = {
  validation: BuilderValidationReport;
};

export function ValidationPanel({ validation }: ValidationPanelProps) {
  const errors = validation.issues.filter((i) => i.severity === "error");
  const warnings = validation.issues.filter((i) => i.severity === "warning");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">Validation</h2>
        <Badge variant={validation.valid ? "secondary" : "destructive"}>
          {validation.valid ? "Ready" : `${errors.length} error(s)`}
        </Badge>
        {warnings.length > 0 ? (
          <Badge variant="outline">{warnings.length} warning(s)</Badge>
        ) : null}
      </div>

      {validation.issues.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No validation issues. Definition is ready for JSON export.
        </p>
      ) : (
        <ul className="space-y-2">
          {validation.issues.map((issue, index) => (
            <li
              key={`${issue.code}-${index}`}
              className="border-border rounded-md border px-3 py-2 text-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    issue.severity === "error" ? "destructive" : "outline"
                  }
                >
                  {issue.severity}
                </Badge>
                <span className="text-muted-foreground font-mono text-xs">
                  {issue.code}
                </span>
              </div>
              <p className="mt-1">{issue.message}</p>
              {issue.path ? (
                <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                  {issue.path}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
