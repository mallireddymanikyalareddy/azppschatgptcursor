import { z } from "zod";

import {
  FieldType,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";
import type {
  FieldDefinition,
  FieldValidationRule,
  FormDefinition,
  ResolvedFieldState,
} from "@/features/form-engine/types";

function hasRule(
  rules: FieldValidationRule[] | undefined,
  type: FieldValidationRule["type"],
): FieldValidationRule | undefined {
  return rules?.find((rule) => rule.type === type);
}

function emptyToUndefined(value: unknown): unknown {
  if (value === "" || value === null) return undefined;
  return value;
}

function buildStringSchema(
  field: FieldDefinition,
  required: boolean,
): z.ZodType {
  const rules = field.validation ?? [];
  let schema: z.ZodType = z.string();

  const minLength = hasRule(rules, ValidationRuleType.MinLength);
  if (minLength && typeof minLength.value === "number") {
    schema = (schema as z.ZodString).min(minLength.value, minLength.message);
  }

  const maxLength = hasRule(rules, ValidationRuleType.MaxLength);
  if (maxLength && typeof maxLength.value === "number") {
    schema = (schema as z.ZodString).max(maxLength.value, maxLength.message);
  }

  const pattern = hasRule(rules, ValidationRuleType.Pattern);
  if (pattern?.pattern) {
    schema = (schema as z.ZodString).regex(
      new RegExp(pattern.pattern, pattern.flags),
      pattern.message,
    );
  }

  if (required) {
    const requiredRule = hasRule(rules, ValidationRuleType.Required);
    schema = (schema as z.ZodString).min(
      1,
      requiredRule?.message ?? `${field.label} is required`,
    );
  } else {
    schema = z.preprocess(emptyToUndefined, (schema as z.ZodString).optional());
  }

  // Custom validator placeholder — always passes until registered.
  const custom = hasRule(rules, ValidationRuleType.Custom);
  if (custom) {
    schema = schema.superRefine((_value, ctx) => {
      if (custom.customValidatorKey) {
        // Intentionally no-op: plug-in registry comes later.
        void ctx;
      }
    });
  }

  return schema;
}

function buildNumberSchema(
  field: FieldDefinition,
  required: boolean,
): z.ZodType {
  const rules = field.validation ?? [];
  const requiredRule = hasRule(rules, ValidationRuleType.Required);

  let numberSchema = z.number({
    error: requiredRule?.message ?? `${field.label} must be a number`,
  });

  const minRule = hasRule(rules, ValidationRuleType.Min);
  if (minRule && typeof minRule.value === "number") {
    numberSchema = numberSchema.min(minRule.value, minRule.message);
  } else if (typeof field.min === "number") {
    numberSchema = numberSchema.min(
      field.min,
      `${field.label} must be at least ${field.min}`,
    );
  }

  const maxRule = hasRule(rules, ValidationRuleType.Max);
  if (maxRule && typeof maxRule.value === "number") {
    numberSchema = numberSchema.max(maxRule.value, maxRule.message);
  } else if (typeof field.max === "number") {
    numberSchema = numberSchema.max(
      field.max,
      `${field.label} must be at most ${field.max}`,
    );
  }

  const coerced = z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) return undefined;
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const n = Number(value);
      return Number.isFinite(n) ? n : value;
    }
    return value;
  }, numberSchema);

  if (required) {
    return coerced.refine(
      (value) => value !== undefined && value !== null && !Number.isNaN(value),
      {
        message: requiredRule?.message ?? `${field.label} is required`,
      },
    );
  }

  return coerced.optional();
}

function buildBooleanSchema(
  field: FieldDefinition,
  required: boolean,
): z.ZodType {
  const rules = field.validation ?? [];
  const requiredRule = hasRule(rules, ValidationRuleType.Required);
  let schema: z.ZodType = z.boolean();

  if (required) {
    schema = z.literal(true, {
      error: requiredRule?.message ?? `${field.label} is required`,
    });
  }

  return schema;
}

function buildArraySchema(
  field: FieldDefinition,
  required: boolean,
): z.ZodType {
  const rules = field.validation ?? [];
  const requiredRule = hasRule(rules, ValidationRuleType.Required);
  let schema: z.ZodType = z.array(z.string());

  if (required) {
    schema = (schema as z.ZodArray<z.ZodString>).min(
      1,
      requiredRule?.message ?? `${field.label} is required`,
    );
  }

  const minLength = hasRule(rules, ValidationRuleType.MinLength);
  if (minLength && typeof minLength.value === "number") {
    schema = (schema as z.ZodArray<z.ZodString>).min(
      minLength.value,
      minLength.message,
    );
  }

  const maxLength = hasRule(rules, ValidationRuleType.MaxLength);
  if (maxLength && typeof maxLength.value === "number") {
    schema = (schema as z.ZodArray<z.ZodString>).max(
      maxLength.value,
      maxLength.message,
    );
  }

  return schema;
}

function buildRangeSchema(
  field: FieldDefinition,
  required: boolean,
): z.ZodType {
  const rules = field.validation ?? [];
  const requiredRule = hasRule(rules, ValidationRuleType.Required);
  const schema = z.tuple([z.number(), z.number()]);

  if (required) {
    return schema.refine(([a, b]) => Number.isFinite(a) && Number.isFinite(b), {
      message: requiredRule?.message ?? `${field.label} is required`,
    });
  }

  return schema.optional();
}

function buildFieldSchema(
  field: FieldDefinition,
  required: boolean,
): z.ZodType {
  switch (field.type) {
    case FieldType.Number:
    case FieldType.Currency:
    case FieldType.Percentage:
    case FieldType.Slider:
      return buildNumberSchema(field, required);
    case FieldType.Checkbox:
    case FieldType.Toggle:
      return buildBooleanSchema(field, required);
    case FieldType.MultiSelect:
      return buildArraySchema(field, required);
    case FieldType.Range:
      return buildRangeSchema(field, required);
    case FieldType.File:
      // Placeholder — accepts string path/name or undefined.
      return required
        ? z.string().min(1, `${field.label} is required`)
        : z.string().optional();
    case FieldType.Hidden:
      return z.any().optional();
    default:
      return buildStringSchema(field, required);
  }
}

/**
 * Builds a Zod object schema from a form definition.
 * When `resolved` is provided, required/visibility follow conditional state.
 */
export function buildZodSchema(
  definition: FormDefinition,
  resolved?: Record<string, ResolvedFieldState>,
): z.ZodObject<Record<string, z.ZodType>> {
  const shape: Record<string, z.ZodType> = {};

  for (const field of definition.fields) {
    const state = resolved?.[field.name];
    if (state && !state.visible) {
      shape[field.name] = z.any().optional();
      continue;
    }
    const required = state?.required ?? Boolean(field.required);
    shape[field.name] = buildFieldSchema(field, required);
  }

  return z.object(shape);
}

export type DynamicFormSchema = ReturnType<typeof buildZodSchema>;
