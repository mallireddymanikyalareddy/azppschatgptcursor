"use client";

import * as React from "react";

import { DynamicForm } from "@/features/form-engine";
import { ResultContainer } from "@/features/results-engine";
import type { FormValues } from "@/features/form-engine/types";
import type { UsePreviewResult } from "@/features/calculator-builder/hooks/use-preview";

export type PreviewPanelProps = {
  preview: UsePreviewResult;
};

/**
 * Live preview using Dynamic Form Engine + Calculation Engine + Results Engine.
 * Definitions recompute when builder config changes; values auto-run on change.
 */
export function PreviewPanel({ preview }: PreviewPanelProps) {
  const {
    formDefinition,
    resultsView,
    resultData,
    result,
    isCalculating,
    error,
    runFromFormValues,
    reset,
  } = preview;

  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const formKey = formDefinition.id + ":" + formDefinition.fields.length;

  React.useEffect(() => {
    reset();
  }, [formKey, reset]);

  const handleChange = React.useCallback(
    (values: FormValues) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        void runFromFormValues(values);
      }, 300);
    },
    [runFromFormValues],
  );

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Live preview</h2>
        <p className="text-muted-foreground text-sm">
          Form, calculation, and results update from the current builder
          configuration.
        </p>
      </div>

      {formDefinition.fields.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Add inputs to enable preview.
        </p>
      ) : (
        <DynamicForm
          key={formKey}
          definition={formDefinition}
          onSubmit={async (values) => {
            await runFromFormValues(values);
          }}
          onChange={handleChange}
        />
      )}

      {isCalculating ? (
        <p className="text-muted-foreground text-sm">Calculating…</p>
      ) : null}
      {error ? <p className="text-destructive text-sm">{error}</p> : null}

      {result?.success ? (
        <ResultContainer definition={resultsView} data={resultData} />
      ) : null}
    </div>
  );
}
