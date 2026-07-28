import type { InputType } from "@/features/calculators/constants/enums";
import type {
  EntityId,
  UnitDefinition,
  VariableOption,
} from "@/features/calculators/types/common";
import type { ValidationRule } from "@/features/calculators/types/validation-rule";

/**
 * Input variable definition for a calculator formula.
 * Values are schema-only here — no runtime evaluation.
 */
export type Variable = {
  id: EntityId;
  /** Machine name used in formula expressions (unique within a calculator). */
  name: string;
  /** User-facing label. */
  label: string;
  type: InputType;
  defaultValue?: number | string | boolean | null;
  required: boolean;
  validation: ValidationRule[];
  unit?: UnitDefinition;
  placeholder?: string;
  helpText?: string;
  /** Options for select / multi-select inputs. */
  options?: VariableOption[];
  /** Display order within the input form. */
  order: number;
  /** Group key for multi-section forms (future UI). */
  group?: string;
  /** Whether the field is visible by default. */
  visible?: boolean;
};
