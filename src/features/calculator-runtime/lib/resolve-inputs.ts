import type { FormValues } from "@/features/form-engine/types";
import type { CalculationInputValues } from "@/features/calculation-engine/types";
import type { CalculatorInputMapping } from "@/features/calculator-runtime/types";

export type ResolvedCalculatorInputs = {
  values: CalculationInputValues;
  tenureMonths: number;
  principal: number;
  annualRate: number;
  processingFee: number;
  prepayment: number;
  loanStartDate?: string;
};

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return NaN;
}

/**
 * Maps form values → calculation inputs using a declarative mapping config.
 */
export function resolveCalculatorInputs(
  formValues: FormValues,
  mapping: CalculatorInputMapping,
): ResolvedCalculatorInputs {
  const values: CalculationInputValues = {};

  for (const [formField, calcName] of Object.entries(mapping.fields)) {
    values[calcName] = formValues[formField] as
      number | string | boolean | null | undefined;
  }

  let tenureMonths = 0;
  if (mapping.tenure) {
    const rawTenure = toNumber(formValues[mapping.tenure.tenureField]);
    const unit = String(
      formValues[mapping.tenure.tenureTypeField] ?? "months",
    ).toLowerCase();
    tenureMonths =
      unit === "years" ? Math.round(rawTenure * 12) : Math.round(rawTenure);
    values[mapping.tenure.targetInput] = tenureMonths;
  }

  let principal = toNumber(values.P);
  let prepayment = 0;
  if (mapping.principalNetOfPrepayment) {
    const gross = toNumber(
      formValues[mapping.principalNetOfPrepayment.principalField],
    );
    prepayment = Math.max(
      0,
      toNumber(formValues[mapping.principalNetOfPrepayment.prepaymentField]) ||
        0,
    );
    principal = gross - prepayment;
    values[mapping.principalNetOfPrepayment.targetInput] = principal;
  }

  const annualRate = toNumber(values.annualRate);
  const processingFee = Math.max(0, toNumber(formValues.processingFee) || 0);
  const loanStartDate =
    typeof formValues.loanStartDate === "string"
      ? formValues.loanStartDate
      : undefined;

  return {
    values,
    tenureMonths,
    principal,
    annualRate,
    processingFee,
    prepayment,
    loanStartDate,
  };
}
