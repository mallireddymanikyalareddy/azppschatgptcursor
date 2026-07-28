"use client";

import * as React from "react";

import { BuilderHistory } from "@/features/calculator-builder/lib/history";
import { createEmptyBuilderDefinition } from "@/features/calculator-builder/lib/create-empty-definition";
import { validateBuilderDefinition } from "@/features/calculator-builder/lib/validate-definition";
import { autosaveService } from "@/features/calculator-builder/services/autosave-service";
import type {
  BuilderValidationReport,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type UseBuilderStateOptions = {
  initial?: CalculatorBuilderDefinition;
  /** When true, schedules no-op autosave on each change. */
  enableAutosave?: boolean;
};

export type UseBuilderStateResult = {
  definition: CalculatorBuilderDefinition;
  setDefinition: (
    next:
      | CalculatorBuilderDefinition
      | ((prev: CalculatorBuilderDefinition) => CalculatorBuilderDefinition),
    historyLabel?: string,
  ) => void;
  patchDefinition: (
    patch: Partial<CalculatorBuilderDefinition>,
    historyLabel?: string,
  ) => void;
  reset: (next?: CalculatorBuilderDefinition) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  validation: BuilderValidationReport;
  isDirty: boolean;
};

/**
 * Core builder document state with undo/redo architecture.
 */
export function useBuilderState(
  options: UseBuilderStateOptions = {},
): UseBuilderStateResult {
  const initial = React.useMemo(
    () => options.initial ?? createEmptyBuilderDefinition(),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed once
    [],
  );

  const historyRef = React.useRef(new BuilderHistory(initial));
  const [definition, setDefinitionState] =
    React.useState<CalculatorBuilderDefinition>(initial);
  const [baseline] = React.useState(JSON.stringify(initial));
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);

  const syncFlags = React.useCallback(() => {
    setCanUndo(historyRef.current.canUndo());
    setCanRedo(historyRef.current.canRedo());
  }, []);

  const setDefinition = React.useCallback(
    (
      next:
        | CalculatorBuilderDefinition
        | ((prev: CalculatorBuilderDefinition) => CalculatorBuilderDefinition),
      historyLabel?: string,
    ) => {
      setDefinitionState((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        const stamped: CalculatorBuilderDefinition = {
          ...resolved,
          updatedAt: new Date().toISOString(),
        };
        historyRef.current.push(stamped, historyLabel);
        if (options.enableAutosave) {
          autosaveService.schedule(stamped);
        }
        return stamped;
      });
      syncFlags();
    },
    [options.enableAutosave, syncFlags],
  );

  const patchDefinition = React.useCallback(
    (patch: Partial<CalculatorBuilderDefinition>, historyLabel?: string) => {
      setDefinition((prev) => ({ ...prev, ...patch }), historyLabel);
    },
    [setDefinition],
  );

  const reset = React.useCallback(
    (next?: CalculatorBuilderDefinition) => {
      const value = next ?? createEmptyBuilderDefinition();
      historyRef.current.replace(value);
      setDefinitionState(value);
      syncFlags();
    },
    [syncFlags],
  );

  const undo = React.useCallback(() => {
    const previous = historyRef.current.undo();
    if (previous) {
      setDefinitionState(previous);
      syncFlags();
    }
  }, [syncFlags]);

  const redo = React.useCallback(() => {
    const next = historyRef.current.redo();
    if (next) {
      setDefinitionState(next);
      syncFlags();
    }
  }, [syncFlags]);

  const validation = React.useMemo(
    () => validateBuilderDefinition(definition),
    [definition],
  );

  const isDirty = JSON.stringify(definition) !== baseline;

  return {
    definition,
    setDefinition,
    patchDefinition,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    validation,
    isDirty,
  };
}
