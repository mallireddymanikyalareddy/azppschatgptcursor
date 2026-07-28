import type {
  DomainResult,
  ValidationRule,
  Variable,
} from "@/features/calculators/types";

/** Input bag keyed by variable `name`. */
export type VariableInputMap = Record<
  string,
  number | string | boolean | null | undefined
>;

export type FieldValidationIssue = {
  variableName: string;
  ruleId: string;
  message: string;
  severity: "error" | "warning";
};

export type ValidationReport = {
  valid: boolean;
  issues: FieldValidationIssue[];
};

/**
 * Application service contract for declarative validation.
 * No rule engine implementation in this foundation — interface only.
 */
export interface ValidationService {
  validateVariable(
    variable: Variable,
    value: number | string | boolean | null | undefined,
  ): Promise<DomainResult<ValidationReport>>;
  validateInputs(
    variables: Variable[],
    inputs: VariableInputMap,
  ): Promise<DomainResult<ValidationReport>>;
  /** Allows callers to inspect rules without evaluating. */
  getRulesForVariable(
    variable: Variable,
  ): Promise<DomainResult<ValidationRule[]>>;
}
