import {
  FieldType,
  FormLayout,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";
import type { FormDefinition } from "@/features/form-engine/types";

/**
 * Home Loan EMI — form definition only.
 * Collects inputs with validation; does not calculate EMI.
 */
export const homeLoanEmiFormDefinition: FormDefinition = {
  id: "form_home_loan_emi",
  name: "Home Loan EMI",
  description:
    "Enter loan details to prepare an EMI estimate. Calculation is not performed by this form engine.",
  calculatorId: "calc_home_loan_emi",
  calculatorSlug: "home-loan-emi",
  layout: FormLayout.TwoColumn,
  submitLabel: "Validate inputs",
  resetLabel: "Reset",
  showReset: true,
  sections: [
    {
      id: "section_loan_details",
      title: "Loan details",
      description: "Primary inputs used by a future EMI calculator engine.",
      layout: FormLayout.TwoColumn,
      order: 1,
    },
  ],
  fields: [
    {
      id: "field_loan_amount",
      name: "loanAmount",
      type: FieldType.Currency,
      label: "Loan amount",
      description: "Total principal disbursed by the lender.",
      placeholder: "5000000",
      defaultValue: 5000000,
      required: true,
      prefix: "₹",
      unit: "INR",
      helpText: "Minimum ₹1,00,000",
      tooltip: "Enter the sanctioned loan principal.",
      sectionId: "section_loan_details",
      order: 1,
      min: 100000,
      max: 100000000,
      colSpan: 1,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Loan amount is required.",
        },
        {
          type: ValidationRuleType.Min,
          value: 100000,
          message: "Loan amount must be at least ₹1,00,000.",
        },
        {
          type: ValidationRuleType.Max,
          value: 100000000,
          message: "Loan amount cannot exceed ₹10,00,00,000.",
        },
      ],
    },
    {
      id: "field_interest_rate",
      name: "interestRate",
      type: FieldType.Percentage,
      label: "Interest rate",
      description: "Nominal annual interest rate.",
      placeholder: "8.5",
      defaultValue: 8.5,
      required: true,
      suffix: "%",
      sectionId: "section_loan_details",
      order: 2,
      min: 0.1,
      max: 30,
      step: 0.05,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Interest rate is required.",
        },
        {
          type: ValidationRuleType.Min,
          value: 0.1,
          message: "Interest rate must be greater than 0.",
        },
        {
          type: ValidationRuleType.Max,
          value: 30,
          message: "Interest rate cannot exceed 30%.",
        },
      ],
    },
    {
      id: "field_loan_tenure",
      name: "loanTenure",
      type: FieldType.Number,
      label: "Loan tenure",
      description: "Tenure in months.",
      placeholder: "240",
      defaultValue: 240,
      required: true,
      suffix: "months",
      sectionId: "section_loan_details",
      order: 3,
      min: 12,
      max: 480,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Loan tenure is required.",
        },
        {
          type: ValidationRuleType.Min,
          value: 12,
          message: "Tenure must be at least 12 months.",
        },
        {
          type: ValidationRuleType.Max,
          value: 480,
          message: "Tenure cannot exceed 480 months.",
        },
      ],
    },
    {
      id: "field_loan_type",
      name: "loanType",
      type: FieldType.Select,
      label: "Loan type",
      description: "Select the home loan product type.",
      placeholder: "Select loan type",
      defaultValue: "floating",
      required: true,
      sectionId: "section_loan_details",
      order: 4,
      options: [
        { value: "floating", label: "Floating rate" },
        { value: "fixed", label: "Fixed rate" },
        { value: "hybrid", label: "Hybrid" },
      ],
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Loan type is required.",
        },
      ],
    },
  ],
};
