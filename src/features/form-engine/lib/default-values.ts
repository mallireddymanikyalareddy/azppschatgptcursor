import { FieldType } from "@/features/form-engine/constants/enums";
import type {
  FieldDefinition,
  FormDefinition,
  FormPrimitive,
  FormValues,
} from "@/features/form-engine/types";

function defaultForType(type: FieldType): FormPrimitive {
  switch (type) {
    case FieldType.Checkbox:
    case FieldType.Toggle:
      return false;
    case FieldType.MultiSelect:
      return [];
    case FieldType.Range:
      return [0, 100];
    case FieldType.Number:
    case FieldType.Currency:
    case FieldType.Percentage:
    case FieldType.Slider:
      return undefined;
    case FieldType.Hidden:
      return "";
    default:
      return "";
  }
}

export function buildDefaultValues(
  definition: FormDefinition,
  overrides?: FormValues,
): FormValues {
  const values: FormValues = {};
  const fields = [...definition.fields].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  for (const field of fields) {
    if (field.defaultValue !== undefined) {
      values[field.name] = field.defaultValue;
    } else {
      values[field.name] = defaultForType(field.type);
    }
  }

  return { ...values, ...overrides };
}

export function listFieldsInOrder(
  fields: FieldDefinition[],
): FieldDefinition[] {
  return [...fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
