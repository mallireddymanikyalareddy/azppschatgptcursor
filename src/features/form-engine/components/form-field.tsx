"use client";

import * as React from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
} from "react-hook-form";

import { FieldControl } from "@/features/form-engine/components/field-control";
import { FieldDescription } from "@/features/form-engine/components/field-description";
import { FieldLabel } from "@/features/form-engine/components/field-label";
import { FieldWrapper } from "@/features/form-engine/components/field-wrapper";
import { ValidationMessage } from "@/features/form-engine/components/validation-message";
import { FieldType } from "@/features/form-engine/constants/enums";
import { mergeFieldClassName } from "@/features/form-engine/lib/layout";
import type {
  FieldDefinition,
  ResolvedFieldState,
} from "@/features/form-engine/types";

export type FormFieldProps = {
  field: FieldDefinition;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  state: ResolvedFieldState;
};

export function FormField({ field, control, errors, state }: FormFieldProps) {
  if (!state.visible || field.type === FieldType.Hidden) {
    if (field.type === FieldType.Hidden) {
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: rhfField }) => (
            <FieldControl
              field={field}
              control={rhfField}
              disabled={state.disabled}
              readonly={state.readonly}
            />
          )}
        />
      );
    }
    return null;
  }

  const error = errors[field.name];
  const message =
    typeof error?.message === "string" ? error.message : undefined;
  const descriptionId = `${field.id}-description`;
  const errorId = `${field.id}-error`;
  const describedBy =
    [
      field.description || field.helpText ? descriptionId : null,
      message ? errorId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const showInlineLabel =
    field.type !== FieldType.Checkbox && field.type !== FieldType.Toggle;

  return (
    <FieldWrapper id={field.id} className={mergeFieldClassName(field.colSpan)}>
      {showInlineLabel ? (
        <FieldLabel
          htmlFor={field.id}
          label={field.label}
          required={state.required}
          tooltip={field.tooltip}
        />
      ) : null}

      <Controller
        name={field.name}
        control={control}
        render={({ field: rhfField }) => (
          <FieldControl
            field={field}
            control={rhfField}
            disabled={state.disabled}
            readonly={state.readonly}
            invalid={Boolean(message)}
            describedBy={describedBy}
          />
        )}
      />

      <FieldDescription id={descriptionId}>
        {field.description ?? field.helpText}
      </FieldDescription>
      <ValidationMessage id={errorId} message={message} />
    </FieldWrapper>
  );
}
