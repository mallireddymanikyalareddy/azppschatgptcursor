"use client";

import * as React from "react";

import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { reorderWithOrder } from "@/features/calculator-templates/lib/template-card";
import { templateService } from "@/features/calculator-templates/services";
import type { TemplateValidationReport } from "@/features/calculator-templates/types";

export type UseTemplateBuilderResult = {
  draft: CalculatorTemplate;
  setDraft: React.Dispatch<React.SetStateAction<CalculatorTemplate>>;
  dirty: boolean;
  saving: boolean;
  validation: TemplateValidationReport;
  save: () => Promise<CalculatorTemplate>;
  resetFrom: (template: CalculatorTemplate) => void;
  moveInput: (from: number, to: number) => void;
  moveFormula: (from: number, to: number) => void;
  updateMetadata: (patch: Partial<CalculatorTemplate["metadata"]>) => void;
};

export function useTemplateBuilder(
  initial: CalculatorTemplate,
): UseTemplateBuilderResult {
  const [draft, setDraft] = React.useState(() => structuredClone(initial));
  const [baselineId, setBaselineId] = React.useState(initial.metadata.id);
  const [baselineJson, setBaselineJson] = React.useState(() =>
    JSON.stringify(initial),
  );
  const [saving, setSaving] = React.useState(false);

  const dirty = JSON.stringify(draft) !== baselineJson;

  const validation = React.useMemo(
    () => templateService.validate(draft),
    [draft],
  );

  const resetFrom = React.useCallback((template: CalculatorTemplate) => {
    const clone = structuredClone(template);
    setDraft(clone);
    setBaselineId(clone.metadata.id);
    setBaselineJson(JSON.stringify(clone));
  }, []);

  React.useEffect(() => {
    if (initial.metadata.id !== baselineId) {
      resetFrom(initial);
    }
  }, [initial, baselineId, resetFrom]);

  const save = React.useCallback(async () => {
    setSaving(true);
    try {
      const saved = await templateService.update(draft);
      setDraft(saved);
      setBaselineJson(JSON.stringify(saved));
      return saved;
    } finally {
      setSaving(false);
    }
  }, [draft]);

  const moveInput = React.useCallback((from: number, to: number) => {
    setDraft((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        inputs: reorderWithOrder(prev.inputs.inputs, from, to),
      },
    }));
  }, []);

  const moveFormula = React.useCallback((from: number, to: number) => {
    setDraft((prev) => ({
      ...prev,
      formulas: {
        ...prev.formulas,
        formulas: reorderWithOrder(prev.formulas.formulas, from, to),
      },
    }));
  }, []);

  const updateMetadata = React.useCallback(
    (patch: Partial<CalculatorTemplate["metadata"]>) => {
      setDraft((prev) => ({
        ...prev,
        metadata: { ...prev.metadata, ...patch },
      }));
    },
    [],
  );

  return {
    draft,
    setDraft,
    dirty,
    saving,
    validation,
    save,
    resetFrom,
    moveInput,
    moveFormula,
    updateMetadata,
  };
}
