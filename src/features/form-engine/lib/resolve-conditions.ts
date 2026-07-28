import {
  ConditionLogic,
  ConditionOperator,
} from "@/features/form-engine/constants/enums";
import type {
  ConditionGroup,
  FieldCondition,
  FieldConditions,
  FieldDefinition,
  FormPrimitive,
  FormValues,
  ResolvedFieldState,
} from "@/features/form-engine/types";

function isEmpty(value: FormPrimitive): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function toNumber(value: FormPrimitive): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function evaluateCondition(
  condition: FieldCondition,
  values: FormValues,
): boolean {
  const current = values[condition.field];
  const expected = condition.value;

  switch (condition.operator) {
    case ConditionOperator.Eq:
      return current === expected;
    case ConditionOperator.Neq:
      return current !== expected;
    case ConditionOperator.Gt: {
      const a = toNumber(current);
      const b = toNumber(expected);
      return a !== null && b !== null && a > b;
    }
    case ConditionOperator.Gte: {
      const a = toNumber(current);
      const b = toNumber(expected);
      return a !== null && b !== null && a >= b;
    }
    case ConditionOperator.Lt: {
      const a = toNumber(current);
      const b = toNumber(expected);
      return a !== null && b !== null && a < b;
    }
    case ConditionOperator.Lte: {
      const a = toNumber(current);
      const b = toNumber(expected);
      return a !== null && b !== null && a <= b;
    }
    case ConditionOperator.In: {
      if (!Array.isArray(expected)) return false;
      return expected.map(String).includes(String(current ?? ""));
    }
    case ConditionOperator.NotIn: {
      if (!Array.isArray(expected)) return true;
      return !expected.map(String).includes(String(current ?? ""));
    }
    case ConditionOperator.Truthy:
      return Boolean(current);
    case ConditionOperator.Falsy:
      return !current;
    case ConditionOperator.Empty:
      return isEmpty(current);
    case ConditionOperator.NotEmpty:
      return !isEmpty(current);
    default:
      return true;
  }
}

export function evaluateConditionGroup(
  group: ConditionGroup | undefined,
  values: FormValues,
): boolean {
  if (!group || group.conditions.length === 0) return true;
  const logic = group.logic ?? ConditionLogic.And;
  if (logic === ConditionLogic.Or) {
    return group.conditions.some((c) => evaluateCondition(c, values));
  }
  return group.conditions.every((c) => evaluateCondition(c, values));
}

/**
 * Resolves visibility / disabled / required from static flags + conditions.
 * Ready for calculator business rules later — none applied here.
 */
export function resolveFieldState(
  field: FieldDefinition,
  values: FormValues,
): ResolvedFieldState {
  const conditions: FieldConditions = field.conditions ?? {};

  let visible = field.visible !== false;
  if (conditions.showWhen) {
    visible = visible && evaluateConditionGroup(conditions.showWhen, values);
  }
  if (conditions.hideWhen) {
    visible = visible && !evaluateConditionGroup(conditions.hideWhen, values);
  }

  let disabled = Boolean(field.disabled);
  if (conditions.disableWhen) {
    disabled =
      disabled || evaluateConditionGroup(conditions.disableWhen, values);
  }
  if (conditions.enableWhen) {
    disabled =
      disabled || !evaluateConditionGroup(conditions.enableWhen, values);
  }

  let required = Boolean(field.required);
  if (conditions.requiredWhen) {
    required =
      required || evaluateConditionGroup(conditions.requiredWhen, values);
  }

  return {
    visible,
    disabled,
    readonly: Boolean(field.readonly),
    required,
  };
}

export function resolveSectionVisible(
  conditions: FieldConditions | undefined,
  values: FormValues,
): boolean {
  if (!conditions) return true;
  let visible = true;
  if (conditions.showWhen) {
    visible = evaluateConditionGroup(conditions.showWhen, values);
  }
  if (conditions.hideWhen) {
    visible = visible && !evaluateConditionGroup(conditions.hideWhen, values);
  }
  return visible;
}
