"use client";

import * as React from "react";

import { DynamicForm } from "@/features/form-engine";
import { ResultContainer } from "@/features/results-engine";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import { useCalculatorWorkspace } from "@/features/calculator-runtime/hooks/use-calculator-workspace";

export type CalculatorEngineSectionProps = {
  definition: ProductionCalculatorDefinition;
};

/**
 * Configuration-driven calculator + results.
 * Reuses Form / Calculation / Results engines via runtime workspace hook.
 */
export function CalculatorEngineSection({
  definition,
}: CalculatorEngineSectionProps) {
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
    <section
      id="calculator"
      aria-labelledby="calculator-engine-heading"
      className="scroll-mt-24 space-y-4"
    >
      <div>
        <h2 id="calculator-engine-heading" className="text-lg font-semibold">
          Calculator
        </h2>
        <p className="text-muted-foreground text-sm">
          Enter inputs to calculate instantly. Results update as you type.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="space-y-3">
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
                <ul className="list-inside list-disc">
                  {workspace.validationIssues.map((issue) => (
                    <li key={issue.code}>{issue.message}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : null}
          {workspace.error ? (
            <Alert variant="error" role="alert">
              <AlertTitle>Calculation error</AlertTitle>
              <AlertDescription>{workspace.error}</AlertDescription>
            </Alert>
          ) : null}
        </div>

        <div aria-live="polite" aria-busy={workspace.isCalculating}>
          {workspace.isCalculating ? (
            <div className="space-y-3" aria-label="Loading results">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : (
            <ResultContainer
              definition={workspace.resultsView}
              data={workspace.resultData}
            />
          )}
        </div>
      </div>
    </section>
  );
}
