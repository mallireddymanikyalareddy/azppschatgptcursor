import { OutputFormat } from "@/features/calculation-engine/constants/enums";
import type { CalculatorWorkflowDefinition } from "@/features/calculation-engine/types";
import {
  bmiProgram,
  compoundInterestProgram,
  homeLoanEmiProgram,
  simpleInterestProgram,
} from "@/features/formula-engine";

/** Home Loan EMI workflow with derived interest percentage. */
export const homeLoanEmiCalculator: CalculatorWorkflowDefinition = {
  id: "calc_home_loan_emi",
  slug: "home-loan-emi",
  name: "Home Loan EMI",
  description: "EMI workflow orchestrated via Calculation Engine.",
  inputs: [
    {
      name: "P",
      label: "Loan amount",
      required: true,
      min: 100000,
      max: 100000000,
      coerceNumber: true,
    },
    {
      name: "annualRate",
      label: "Annual interest rate",
      required: true,
      min: 0.1,
      max: 30,
      coerceNumber: true,
    },
    {
      name: "n",
      label: "Tenure (months)",
      required: true,
      min: 12,
      max: 480,
      coerceNumber: true,
    },
  ],
  program: homeLoanEmiProgram,
  derived: [
    {
      id: "f_interest_pct",
      key: "interestPercentage",
      name: "Interest as % of principal",
      expression: "totalInterest / P * 100",
      variables: ["P"],
      precision: 2,
      percentage: true,
    },
  ],
  outputs: [
    {
      key: "emi",
      label: "Monthly EMI",
      format: OutputFormat.Currency,
      currency: "INR",
      precision: 2,
    },
    {
      key: "totalInterest",
      label: "Total interest",
      format: OutputFormat.Currency,
      currency: "INR",
      precision: 2,
    },
    {
      key: "totalPayment",
      label: "Total payment",
      format: OutputFormat.Currency,
      currency: "INR",
      precision: 2,
    },
    {
      key: "interestPercentage",
      label: "Interest percentage",
      format: OutputFormat.Percentage,
      precision: 2,
    },
  ],
};

export const simpleInterestCalculator: CalculatorWorkflowDefinition = {
  id: "calc_simple_interest",
  slug: "simple-interest",
  name: "Simple Interest",
  inputs: [
    { name: "P", label: "Principal", required: true, min: 1 },
    { name: "R", label: "Rate (%)", required: true, min: 0 },
    { name: "T", label: "Time (years)", required: true, min: 0 },
  ],
  program: simpleInterestProgram,
  outputs: [
    {
      key: "si",
      label: "Simple interest",
      format: OutputFormat.Currency,
      currency: "INR",
    },
    {
      key: "amount",
      label: "Total amount",
      format: OutputFormat.Currency,
      currency: "INR",
    },
  ],
};

export const compoundInterestCalculator: CalculatorWorkflowDefinition = {
  id: "calc_compound_interest",
  slug: "compound-interest",
  name: "Compound Interest",
  inputs: [
    { name: "P", label: "Principal", required: true, min: 1 },
    { name: "R", label: "Rate (%)", required: true, min: 0 },
    { name: "T", label: "Time (years)", required: true, min: 0 },
  ],
  program: compoundInterestProgram,
  outputs: [
    {
      key: "amount",
      label: "Amount",
      format: OutputFormat.Currency,
      currency: "INR",
    },
    {
      key: "ci",
      label: "Compound interest",
      format: OutputFormat.Currency,
      currency: "INR",
    },
  ],
};

export const bmiCalculator: CalculatorWorkflowDefinition = {
  id: "calc_bmi",
  slug: "bmi",
  name: "BMI",
  inputs: [
    { name: "weightKg", label: "Weight (kg)", required: true, min: 1 },
    {
      name: "heightM",
      label: "Height (m)",
      required: true,
      min: 0.5,
      max: 2.5,
    },
  ],
  program: bmiProgram,
  outputs: [
    {
      key: "bmi",
      label: "BMI",
      format: OutputFormat.Decimal,
      precision: 2,
    },
  ],
};

export const mockCalculators: CalculatorWorkflowDefinition[] = [
  homeLoanEmiCalculator,
  simpleInterestCalculator,
  compoundInterestCalculator,
  bmiCalculator,
];
