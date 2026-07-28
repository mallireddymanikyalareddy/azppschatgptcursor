"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type UseFormReturn } from "react-hook-form";

import { buildDefaultValues } from "@/features/form-engine/lib/default-values";
import { buildZodSchema } from "@/features/form-engine/lib/build-zod-schema";
import { resolveFieldState } from "@/features/form-engine/lib/resolve-conditions";
import type {
  DynamicFormSubmitHandler,
  FormDefinition,
  FormValues,
  ResolvedFieldState,
} from "@/features/form-engine/types";

export type UseDynamicFormOptions = {
  definition: FormDefinition;
  defaultValues?: FormValues;
  onSubmit?: DynamicFormSubmitHandler;
  mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
};

export type UseDynamicFormResult = {
  form: UseFormReturn<FieldValues>;
  values: FormValues;
  resolvedFields: Record<string, ResolvedFieldState>;
  handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  reset: (values?: FormValues) => void;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
};

function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/**
 * Wires React Hook Form + Zod to a FormDefinition.
 * Conditional required is enforced on submit via resolved field state.
 */
export function useDynamicForm(
  options: UseDynamicFormOptions,
): UseDynamicFormResult {
  const { definition, defaultValues, onSubmit, mode = "onChange" } = options;

  const initialValues = React.useMemo(
    () => buildDefaultValues(definition, defaultValues),
    [definition, defaultValues],
  );

  const schema = React.useMemo(() => buildZodSchema(definition), [definition]);

  const form = useForm<FieldValues>({
    resolver: zodResolver(schema),
    mode,
    defaultValues: initialValues,
  });

  const values = form.watch() as FormValues;

  const resolvedFields = React.useMemo(() => {
    const map: Record<string, ResolvedFieldState> = {};
    for (const field of definition.fields) {
      map[field.name] = resolveFieldState(field, values);
    }
    return map;
  }, [definition.fields, values]);

  const handleSubmit = form.handleSubmit(async (data) => {
    let blocked = false;

    for (const field of definition.fields) {
      const state = resolvedFields[field.name];
      if (!state?.visible) continue;
      if (state.required && isEmptyValue(data[field.name])) {
        form.setError(field.name, {
          type: "required",
          message: `${field.label} is required`,
        });
        blocked = true;
      }
    }

    if (blocked) return;

    const visibleValues: FormValues = {};
    for (const field of definition.fields) {
      const state = resolvedFields[field.name];
      if (state && !state.visible) continue;
      visibleValues[field.name] = data[field.name] as FormValues[string];
    }
    await onSubmit?.(visibleValues);
  });

  const reset = React.useCallback(
    (next?: FormValues) => {
      form.reset(buildDefaultValues(definition, next ?? defaultValues));
    },
    [defaultValues, definition, form],
  );

  return {
    form,
    values,
    resolvedFields,
    handleSubmit,
    reset,
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}
