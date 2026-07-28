"use client";

import * as React from "react";

import { FormActions } from "@/features/form-engine/components/form-actions";
import { FormField } from "@/features/form-engine/components/form-field";
import { FormSection } from "@/features/form-engine/components/form-section";
import { FormLayout } from "@/features/form-engine/constants/enums";
import { useDynamicForm } from "@/features/form-engine/hooks/use-dynamic-form";
import { listFieldsInOrder } from "@/features/form-engine/lib/default-values";
import { layoutGridClass } from "@/features/form-engine/lib/layout";
import { resolveSectionVisible } from "@/features/form-engine/lib/resolve-conditions";
import type {
  DynamicFormChangeHandler,
  DynamicFormSubmitHandler,
  FormDefinition,
  FormValues,
} from "@/features/form-engine/types";
import { cn } from "@/lib/utils/index";

export type DynamicFormProps = {
  definition: FormDefinition;
  defaultValues?: FormValues;
  onSubmit?: DynamicFormSubmitHandler;
  onChange?: DynamicFormChangeHandler;
  className?: string;
  /** Hide built-in actions when embedding. */
  hideActions?: boolean;
};

/**
 * Configuration-driven form renderer.
 * Pass any FormDefinition — no per-calculator React components required.
 */
export function DynamicForm({
  definition,
  defaultValues,
  onSubmit,
  onChange,
  className,
  hideActions,
}: DynamicFormProps) {
  const { form, values, resolvedFields, handleSubmit, reset, isSubmitting } =
    useDynamicForm({
      definition,
      defaultValues,
      onSubmit,
    });

  const {
    control,
    formState: { errors, isDirty },
  } = form;

  React.useEffect(() => {
    onChange?.(values);
  }, [onChange, values]);

  const sections = [...definition.sections].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const fields = listFieldsInOrder(definition.fields);
  const hasSections = sections.length > 0;

  return (
    <form
      data-slot="dynamic-form"
      data-form-id={definition.id}
      className={cn("space-y-6", className)}
      onSubmit={handleSubmit}
      noValidate
    >
      {definition.description ? (
        <p className="text-muted-foreground text-sm">
          {definition.description}
        </p>
      ) : null}

      {hasSections ? (
        sections.map((section) => {
          const sectionVisible = resolveSectionVisible(
            section.conditions,
            values,
          );
          const sectionFields = fields.filter(
            (field) => field.sectionId === section.id,
          );

          return (
            <FormSection
              key={section.id}
              id={section.id}
              title={section.title}
              description={section.description}
              layout={section.layout ?? definition.layout}
              hidden={!sectionVisible}
            >
              {sectionFields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  control={control}
                  errors={errors}
                  state={
                    resolvedFields[field.name] ?? {
                      visible: true,
                      disabled: false,
                      readonly: false,
                      required: Boolean(field.required),
                    }
                  }
                />
              ))}
            </FormSection>
          );
        })
      ) : (
        <div
          className={layoutGridClass(
            definition.layout ?? FormLayout.SingleColumn,
          )}
        >
          {fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              control={control}
              errors={errors}
              state={
                resolvedFields[field.name] ?? {
                  visible: true,
                  disabled: false,
                  readonly: false,
                  required: Boolean(field.required),
                }
              }
            />
          ))}
        </div>
      )}

      {/* Fields without a section still render when sections exist */}
      {hasSections
        ? (() => {
            const orphanFields = fields.filter((field) => !field.sectionId);
            if (orphanFields.length === 0) return null;
            return (
              <div
                className={layoutGridClass(
                  definition.layout ?? FormLayout.SingleColumn,
                )}
              >
                {orphanFields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    control={control}
                    errors={errors}
                    state={
                      resolvedFields[field.name] ?? {
                        visible: true,
                        disabled: false,
                        readonly: false,
                        required: Boolean(field.required),
                      }
                    }
                  />
                ))}
              </div>
            );
          })()
        : null}

      {hideActions ? null : (
        <FormActions
          submitLabel={definition.submitLabel ?? "Continue"}
          resetLabel={definition.resetLabel ?? "Reset"}
          showReset={definition.showReset ?? true}
          isSubmitting={isSubmitting}
          onReset={() => reset()}
          disableSubmit={false}
        />
      )}

      <span className="sr-only" aria-live="polite">
        {isDirty ? "Form has unsaved changes" : "Form is pristine"}
      </span>
    </form>
  );
}
