"use client";

import type { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

import type { ResolvedFieldState } from "@/features/form-engine/types";

export type UseFieldStateOptions = {
  name: string;
  form: UseFormReturn<FieldValues>;
  resolved?: ResolvedFieldState;
};

export type UseFieldStateResult = {
  value: unknown;
  error?: string;
  isDirty: boolean;
  isTouched: boolean;
  isInvalid: boolean;
  visible: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
};

/**
 * Derives per-field UI state from RHF + resolved conditions.
 */
export function useFieldState({
  name,
  form,
  resolved,
}: UseFieldStateOptions): UseFieldStateResult {
  const value = form.watch(name);
  const errors = form.formState.errors as FieldErrors<FieldValues>;
  const dirtyFields = form.formState.dirtyFields as Record<string, boolean>;
  const touchedFields = form.formState.touchedFields as Record<string, boolean>;

  const error = errors[name];
  const message =
    typeof error?.message === "string" ? error.message : undefined;

  return {
    value,
    error: message,
    isDirty: Boolean(dirtyFields[name]),
    isTouched: Boolean(touchedFields[name]),
    isInvalid: Boolean(message),
    visible: resolved?.visible ?? true,
    disabled: resolved?.disabled ?? false,
    readonly: resolved?.readonly ?? false,
    required: resolved?.required ?? false,
  };
}
