import type { FormValues } from "@/features/form-engine/types";
import type { CalculatorInputMapping } from "@/features/calculator-runtime/types";
import { resolveCalculatorInputs } from "@/features/calculator-runtime/lib/resolve-inputs";

export type CalculatorValidationIssue = {
  code: string;
  message: string;
  field?: string;
};

export type CalculatorValidationResult = {
  valid: boolean;
  issues: CalculatorValidationIssue[];
};

/** Loan-specific cross-field rules need tenure / principal mapping. */
export function isLoanInputMapping(mapping: CalculatorInputMapping): boolean {
  return Boolean(mapping.tenure || mapping.principalNetOfPrepayment);
}

/**
 * Cross-field / business validation beyond per-field Zod rules.
 * Loan rules apply only when the calculator uses loan input mapping.
 */
export function validateCalculatorBusinessRules(
  formValues: FormValues,
  mapping: CalculatorInputMapping,
): CalculatorValidationResult {
  if (!isLoanInputMapping(mapping)) {
    return { valid: true, issues: [] };
  }

  const issues: CalculatorValidationIssue[] = [];
  const resolved = resolveCalculatorInputs(formValues, mapping);

  const loanAmount = Number(formValues.loanAmount);
  if (!(loanAmount > 0)) {
    issues.push({
      code: "LOAN_AMOUNT_POSITIVE",
      message: "Loan amount must be greater than 0.",
      field: "loanAmount",
    });
  }

  const rate = Number(formValues.interestRate);
  if (!(rate >= 0) || Number.isNaN(rate)) {
    issues.push({
      code: "RATE_NON_NEGATIVE",
      message: "Interest rate must be 0 or greater.",
      field: "interestRate",
    });
  }

  if (!(resolved.tenureMonths > 0)) {
    issues.push({
      code: "TENURE_POSITIVE",
      message: "Loan tenure must be greater than 0.",
      field: mapping.tenure?.tenureField ?? "loanTenure",
    });
  }

  if (mapping.tenure && resolved.tenureMonths > mapping.tenure.maxMonths) {
    issues.push({
      code: "TENURE_MAX",
      message: `Maximum supported tenure is ${mapping.tenure.maxMonths} months (${mapping.tenure.maxMonths / 12} years).`,
      field: mapping.tenure.tenureField,
    });
  }

  if (resolved.prepayment > 0 && resolved.prepayment >= loanAmount) {
    issues.push({
      code: "PREPAYMENT_INVALID",
      message: "Prepayment must be less than the loan amount.",
      field: "prepayment",
    });
  }

  if (resolved.principal <= 0 && loanAmount > 0) {
    issues.push({
      code: "NET_PRINCIPAL_INVALID",
      message: "Net principal after prepayment must be greater than 0.",
      field: "prepayment",
    });
  }

  const processingFee = Number(formValues.processingFee ?? 0);
  if (processingFee < 0) {
    issues.push({
      code: "PROCESSING_FEE_NEGATIVE",
      message: "Processing fee cannot be negative.",
      field: "processingFee",
    });
  }

  return { valid: issues.length === 0, issues };
}
