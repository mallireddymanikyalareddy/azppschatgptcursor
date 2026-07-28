"use client";

import * as React from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio, RadioItem } from "@/components/ui/radio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FieldType } from "@/features/form-engine/constants/enums";
import type { FieldDefinition } from "@/features/form-engine/types";
import { cn } from "@/lib/utils/index";

export type FieldControlProps = {
  field: FieldDefinition;
  control: ControllerRenderProps<FieldValues, string>;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

function AffixInput({
  field,
  control,
  disabled,
  readonly,
  invalid,
  describedBy,
  inputType,
}: FieldControlProps & { inputType: React.HTMLInputTypeAttribute }) {
  return (
    <div className="relative flex items-center">
      {field.prefix || field.unit ? (
        <span className="text-muted-foreground pointer-events-none absolute left-3 text-sm">
          {field.prefix ?? field.unit}
        </span>
      ) : null}
      <Input
        id={field.id}
        name={control.name}
        type={inputType}
        value={
          control.value === undefined || control.value === null
            ? ""
            : String(control.value)
        }
        onChange={(event) => {
          const raw = event.target.value;
          if (
            inputType === "number" ||
            field.type === FieldType.Currency ||
            field.type === FieldType.Percentage ||
            field.type === FieldType.Number
          ) {
            control.onChange(raw === "" ? undefined : Number(raw));
          } else {
            control.onChange(raw);
          }
        }}
        onBlur={control.onBlur}
        ref={control.ref}
        placeholder={field.placeholder}
        disabled={disabled}
        readOnly={readonly}
        min={field.min}
        max={field.max}
        step={field.step}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className={cn(
          (field.prefix || field.unit) && "pl-8",
          field.suffix && "pr-10",
          "w-full",
        )}
        {...field.inputProps}
      />
      {field.suffix ? (
        <span className="text-muted-foreground pointer-events-none absolute right-3 text-sm">
          {field.suffix}
        </span>
      ) : null}
    </div>
  );
}

function SelectControl({
  field,
  control,
  disabled,
  invalid,
  describedBy,
}: FieldControlProps) {
  const value =
    control.value === undefined || control.value === null
      ? ""
      : String(control.value);

  return (
    <Select
      value={value || undefined}
      onValueChange={(next) => control.onChange(next)}
      disabled={disabled}
    >
      <SelectTrigger
        id={field.id}
        className="w-full"
        aria-invalid={invalid}
        aria-describedby={describedBy}
      >
        <SelectValue placeholder={field.placeholder ?? "Select…"} />
      </SelectTrigger>
      <SelectContent>
        {(field.options ?? []).map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MultiSelectControl({ field, control, disabled }: FieldControlProps) {
  const selected = Array.isArray(control.value)
    ? (control.value as string[])
    : [];

  return (
    <div className="space-y-2" role="group" aria-labelledby={field.id}>
      {(field.options ?? []).map((option) => {
        const checked = selected.includes(option.value);
        const optionId = `${field.id}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className="flex items-start gap-2 text-sm"
          >
            <Checkbox
              id={optionId}
              checked={checked}
              disabled={disabled || option.disabled}
              onCheckedChange={(next) => {
                const isChecked = next === true;
                const nextValues = isChecked
                  ? [...selected, option.value]
                  : selected.filter((value) => value !== option.value);
                control.onChange(nextValues);
              }}
            />
            <span>
              <span className="font-medium">{option.label}</span>
              {option.description ? (
                <span className="text-muted-foreground block text-xs">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function RadioControl({ field, control, disabled }: FieldControlProps) {
  return (
    <Radio
      value={control.value ? String(control.value) : undefined}
      onValueChange={(next) => control.onChange(next)}
      disabled={disabled}
      className="gap-3"
    >
      {(field.options ?? []).map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 text-sm"
          htmlFor={`${field.id}-${option.value}`}
        >
          <RadioItem
            id={`${field.id}-${option.value}`}
            value={option.value}
            disabled={option.disabled}
          />
          {option.label}
        </label>
      ))}
    </Radio>
  );
}

function SliderControl({
  field,
  control,
  disabled,
  readonly,
  invalid,
  describedBy,
}: FieldControlProps) {
  const value =
    typeof control.value === "number"
      ? control.value
      : ((field.defaultValue as number | undefined) ?? field.min ?? 0);

  return (
    <div className="space-y-2">
      <input
        id={field.id}
        name={control.name}
        type="range"
        min={field.min ?? 0}
        max={field.max ?? 100}
        step={field.step ?? 1}
        value={value}
        disabled={disabled || readonly}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onChange={(event) => control.onChange(Number(event.target.value))}
        onBlur={control.onBlur}
        ref={control.ref}
        className="accent-primary w-full"
      />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>{field.min ?? 0}</span>
        <span className="text-foreground font-medium">
          {value}
          {field.suffix ?? field.unit ?? ""}
        </span>
        <span>{field.max ?? 100}</span>
      </div>
    </div>
  );
}

function RangeControl({
  field,
  control,
  disabled,
  readonly,
}: FieldControlProps) {
  const tuple = Array.isArray(control.value)
    ? (control.value as number[])
    : [field.min ?? 0, field.max ?? 100];
  const [low, high] = tuple;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <Label htmlFor={`${field.id}-min`} className="text-xs">
          Min
        </Label>
        <Input
          id={`${field.id}-min`}
          type="number"
          value={low}
          min={field.min}
          max={high}
          step={field.step}
          disabled={disabled || readonly}
          onChange={(event) =>
            control.onChange([Number(event.target.value), high])
          }
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${field.id}-max`} className="text-xs">
          Max
        </Label>
        <Input
          id={`${field.id}-max`}
          type="number"
          value={high}
          min={low}
          max={field.max}
          step={field.step}
          disabled={disabled || readonly}
          onChange={(event) =>
            control.onChange([low, Number(event.target.value)])
          }
        />
      </div>
    </div>
  );
}

function FileControl({
  field,
  control,
  disabled,
  invalid,
  describedBy,
}: FieldControlProps) {
  return (
    <Input
      id={field.id}
      name={control.name}
      type="file"
      disabled={disabled}
      aria-invalid={invalid}
      aria-describedby={describedBy}
      onChange={(event) => {
        const file = event.target.files?.[0];
        // Placeholder: store file name only — no upload pipeline.
        control.onChange(file?.name ?? "");
      }}
      onBlur={control.onBlur}
      ref={control.ref}
      {...field.inputProps}
    />
  );
}

/**
 * Renders the control for a field type.
 * Register additional types via `registerFieldRenderer` later.
 */
export function FieldControl(props: FieldControlProps) {
  const { field, control, disabled, readonly, invalid, describedBy } = props;

  switch (field.type) {
    case FieldType.Text:
      return <AffixInput {...props} inputType="text" />;
    case FieldType.Number:
    case FieldType.Currency:
    case FieldType.Percentage:
      return <AffixInput {...props} inputType="number" />;
    case FieldType.Textarea:
      return (
        <Textarea
          id={field.id}
          name={control.name}
          value={control.value ? String(control.value) : ""}
          onChange={(event) => control.onChange(event.target.value)}
          onBlur={control.onBlur}
          ref={control.ref}
          placeholder={field.placeholder}
          disabled={disabled}
          readOnly={readonly}
          aria-invalid={invalid}
          aria-describedby={describedBy}
        />
      );
    case FieldType.Select:
      return <SelectControl {...props} />;
    case FieldType.MultiSelect:
      return <MultiSelectControl {...props} />;
    case FieldType.Radio:
      return <RadioControl {...props} />;
    case FieldType.Checkbox:
      return (
        <label className="flex items-center gap-2 text-sm" htmlFor={field.id}>
          <Checkbox
            id={field.id}
            checked={Boolean(control.value)}
            disabled={disabled}
            onCheckedChange={(next) => control.onChange(next === true)}
          />
          <span>{field.placeholder ?? field.label}</span>
        </label>
      );
    case FieldType.Toggle:
      return (
        <div className="flex items-center gap-2">
          <Switch
            id={field.id}
            checked={Boolean(control.value)}
            disabled={disabled}
            onCheckedChange={(next) => control.onChange(next)}
          />
          <Label htmlFor={field.id}>{field.placeholder ?? "Enabled"}</Label>
        </div>
      );
    case FieldType.Slider:
      return <SliderControl {...props} />;
    case FieldType.Range:
      return <RangeControl {...props} />;
    case FieldType.Date:
      return <AffixInput {...props} inputType="date" />;
    case FieldType.Time:
      return <AffixInput {...props} inputType="time" />;
    case FieldType.DateTime:
      return <AffixInput {...props} inputType="datetime-local" />;
    case FieldType.Color:
      return (
        <Input
          id={field.id}
          type="color"
          value={control.value ? String(control.value) : "#000000"}
          disabled={disabled || readonly}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => control.onChange(event.target.value)}
          onBlur={control.onBlur}
          ref={control.ref}
          className="h-10 w-20 p-1"
        />
      );
    case FieldType.File:
      return <FileControl {...props} />;
    case FieldType.Hidden:
      return (
        <input
          type="hidden"
          id={field.id}
          name={control.name}
          value={control.value ? String(control.value) : ""}
          ref={control.ref}
          onChange={control.onChange}
        />
      );
    default:
      return <AffixInput {...props} inputType="text" />;
  }
}
