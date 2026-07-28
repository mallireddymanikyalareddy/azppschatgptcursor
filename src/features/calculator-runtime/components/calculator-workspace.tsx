"use client";

import * as React from "react";

import { DynamicForm } from "@/features/form-engine";
import { ResultContainer } from "@/features/results-engine";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import { useCalculatorWorkspace } from "@/features/calculator-runtime/hooks/use-calculator-workspace";
import { cn } from "@/lib/utils/index";

export type CalculatorWorkspaceProps = {
  definition: ProductionCalculatorDefinition;
  className?: string;
};

/**
 * Generic, configuration-driven calculator surface.
 * Reuses Dynamic Form Engine + Calculation Engine + Results Engine.
 * No per-calculator React branches.
 */
export function CalculatorWorkspace({
  definition,
  className,
}: CalculatorWorkspaceProps) {
  const workspace = useCalculatorWorkspace(definition);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const defaultValues = React.useMemo(() => {
    const values: Record<string, string | number | boolean | null> = {};
    for (const field of definition.form.fields) {
      if (field.defaultValue !== undefined) {
        values[field.name] = field.defaultValue as
          string | number | boolean | null;
      }
    }
    return values;
  }, [definition.form.fields]);

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div
      className={cn("grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr]", className)}
      data-slot="calculator-workspace"
      data-calculator-slug={definition.slug}
    >
      <section aria-label={`${definition.name} inputs`} className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {definition.name}
          </h1>
          <p className="text-muted-foreground text-sm">
            {definition.content.introduction}
          </p>
        </div>

        <DynamicForm
          key={definition.id}
          definition={definition.form}
          defaultValues={defaultValues}
          onSubmit={async (values) => {
            await workspace.run(values);
          }}
          onChange={(values) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
              void workspace.run(values);
            }, 350);
          }}
        />

        {workspace.validationIssues.length > 0 ? (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Check your inputs</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {workspace.validationIssues.map((issue) => (
                  <li key={issue.code}>{issue.message}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : null}

        {workspace.error ? (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Calculation failed</AlertTitle>
            <AlertDescription>{workspace.error}</AlertDescription>
          </Alert>
        ) : null}

        <details className="text-muted-foreground text-sm">
          <summary className="text-foreground cursor-pointer font-medium">
            How it works
          </summary>
          <p className="mt-2 leading-relaxed">
            {definition.content.howItWorks}
          </p>
          <p className="mt-2 font-mono text-xs leading-relaxed">
            {definition.content.formulaExplanation}
          </p>
        </details>
      </section>

      <section aria-label={`${definition.name} results`} className="min-w-0">
        {workspace.isCalculating ? (
          <p className="text-muted-foreground text-sm" aria-live="polite">
            Calculating…
          </p>
        ) : null}

        {Object.keys(workspace.resultData).length > 0 ? (
          <div className="space-y-4">
            <ResultContainer
              definition={workspace.resultsView}
              data={workspace.resultData}
            />
            {workspace.metadata ? (
              <p
                className="text-muted-foreground text-xs"
                aria-label="Calculation metadata"
              >
                Locale {workspace.metadata.locale} · Currency{" "}
                {workspace.metadata.currency}
                {workspace.metadata.tenureMonths != null
                  ? ` · Tenure ${workspace.metadata.tenureMonths} months`
                  : ""}
                {workspace.metadata.loanStartDate
                  ? ` · Start ${workspace.metadata.loanStartDate}`
                  : ""}
                {workspace.metadata.durationMs != null
                  ? ` · Engine ${Math.round(workspace.metadata.durationMs)}ms`
                  : ""}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Enter loan details and calculate to see EMI, breakdown, charts, and
            amortisation schedule.
          </p>
        )}
      </section>
    </div>
  );
}
