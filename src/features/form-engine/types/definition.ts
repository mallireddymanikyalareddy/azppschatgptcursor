import type {
  ConditionLogic,
  ConditionOperator,
  FieldType,
  FormLayout,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";

/** Primitive form value shapes supported by the engine. */
export type FormPrimitive =
  string | number | boolean | null | undefined | string[] | number[];

export type FormValues = Record<string, FormPrimitive>;

export type FieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

export type FieldValidationRule = {
  type: ValidationRuleType;
  message: string;
  value?: number | string | boolean | readonly string[];
  pattern?: string;
  flags?: string;
  /** Registry key for a future custom validator. */
  customValidatorKey?: string;
};

/**
 * Declarative condition against another field's current value.
 * Evaluation lives in resolve-conditions — no business rules here.
 */
export type FieldCondition = {
  field: string;
  operator: ConditionOperator;
  value?: FormPrimitive;
};

export type ConditionGroup = {
  logic?: ConditionLogic;
  conditions: FieldCondition[];
};

/** Conditional visibility / interactivity infrastructure. */
export type FieldConditions = {
  showWhen?: ConditionGroup;
  hideWhen?: ConditionGroup;
  enableWhen?: ConditionGroup;
  disableWhen?: ConditionGroup;
  requiredWhen?: ConditionGroup;
};

export type FieldDefinition = {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  description?: string;
  placeholder?: string;
  defaultValue?: FormPrimitive;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  visible?: boolean;
  helpText?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  unit?: string;
  icon?: string;
  options?: FieldOption[];
  /** Slider / number bounds. */
  min?: number;
  max?: number;
  step?: number;
  validation?: FieldValidationRule[];
  conditions?: FieldConditions;
  /** Grid column span hint within a section (1–3). */
  colSpan?: 1 | 2 | 3;
  /** Section / group membership. */
  sectionId?: string;
  groupId?: string;
  order?: number;
  /** Extra HTML attributes for native inputs. */
  inputProps?: Record<string, string | number | boolean | undefined>;
};

export type FormGroupDefinition = {
  id: string;
  title?: string;
  description?: string;
  order?: number;
};

export type FormSectionDefinition = {
  id: string;
  title?: string;
  description?: string;
  layout?: FormLayout;
  groups?: FormGroupDefinition[];
  order?: number;
  /** Optional section-level visibility. */
  conditions?: FieldConditions;
};

/**
 * Configuration-driven form definition.
 * One definition → any calculator without new React components.
 */
export type FormDefinition = {
  id: string;
  name: string;
  description?: string;
  /** Linked calculator id/slug when used with calculator domain. */
  calculatorId?: string;
  calculatorSlug?: string;
  layout?: FormLayout;
  sections: FormSectionDefinition[];
  fields: FieldDefinition[];
  /** Form-level submit / reset labels. */
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
};

/** Resolved runtime state for a single field after conditions. */
export type ResolvedFieldState = {
  visible: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
};

export type DynamicFormSubmitHandler = (
  values: FormValues,
) => void | Promise<void>;

export type DynamicFormChangeHandler = (values: FormValues) => void;
