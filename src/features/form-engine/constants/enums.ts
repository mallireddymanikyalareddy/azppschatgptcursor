/**
 * Field type catalog for the Dynamic Form Engine.
 * Broader than calculator InputType — maps any JSON definition to a control.
 */

export const FieldType = {
  Text: "text",
  Number: "number",
  Currency: "currency",
  Percentage: "percentage",
  Slider: "slider",
  Range: "range",
  Select: "select",
  MultiSelect: "multi_select",
  Radio: "radio",
  Checkbox: "checkbox",
  Toggle: "toggle",
  Textarea: "textarea",
  Date: "date",
  Time: "time",
  DateTime: "datetime",
  Color: "color",
  File: "file",
  Hidden: "hidden",
} as const;

export type FieldType = (typeof FieldType)[keyof typeof FieldType];

export const FIELD_TYPES = Object.values(FieldType);

export const FormLayout = {
  SingleColumn: "single",
  TwoColumn: "two",
  ThreeColumn: "three",
} as const;

export type FormLayout = (typeof FormLayout)[keyof typeof FormLayout];

export const ValidationRuleType = {
  Required: "required",
  Min: "min",
  Max: "max",
  MinLength: "min_length",
  MaxLength: "max_length",
  Pattern: "pattern",
  Custom: "custom",
} as const;

export type ValidationRuleType =
  (typeof ValidationRuleType)[keyof typeof ValidationRuleType];

export const ConditionOperator = {
  Eq: "eq",
  Neq: "neq",
  Gt: "gt",
  Gte: "gte",
  Lt: "lt",
  Lte: "lte",
  In: "in",
  NotIn: "not_in",
  Truthy: "truthy",
  Falsy: "falsy",
  Empty: "empty",
  NotEmpty: "not_empty",
} as const;

export type ConditionOperator =
  (typeof ConditionOperator)[keyof typeof ConditionOperator];

export const ConditionLogic = {
  And: "and",
  Or: "or",
} as const;

export type ConditionLogic =
  (typeof ConditionLogic)[keyof typeof ConditionLogic];
