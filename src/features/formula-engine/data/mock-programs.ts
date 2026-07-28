import type { FormulaProgram } from "@/features/formula-engine/types";

/**
 * Home Loan EMI program.
 * monthlyRate = annualRate / 12 / 100
 * emi = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export const homeLoanEmiProgram: FormulaProgram = {
  id: "prog_home_loan_emi",
  name: "Home Loan EMI",
  description: "Reducing-balance EMI with intermediate monthly rate.",
  formulas: [
    {
      id: "f_monthly_rate",
      key: "r",
      name: "Monthly rate",
      expression: "annualRate / 12 / 100",
      variables: ["annualRate"],
      precision: 10,
    },
    {
      id: "f_emi",
      key: "emi",
      name: "Monthly EMI",
      expression: "P * r * (1 + r)^n / ((1 + r)^n - 1)",
      variables: ["P", "n"],
      dependencies: ["f_monthly_rate"],
      precision: 2,
      currency: true,
    },
    {
      id: "f_total_payment",
      key: "totalPayment",
      name: "Total payment",
      expression: "emi * n",
      dependencies: ["f_emi"],
      precision: 2,
      currency: true,
    },
    {
      id: "f_total_interest",
      key: "totalInterest",
      name: "Total interest",
      expression: "totalPayment - P",
      variables: ["P"],
      dependencies: ["f_total_payment"],
      precision: 2,
      currency: true,
    },
  ],
};

/** Simple Interest: SI = P * R * T / 100 */
export const simpleInterestProgram: FormulaProgram = {
  id: "prog_simple_interest",
  name: "Simple Interest",
  formulas: [
    {
      id: "f_si",
      key: "si",
      name: "Simple interest",
      expression: "P * R * T / 100",
      variables: ["P", "R", "T"],
      precision: 2,
      currency: true,
    },
    {
      id: "f_amount",
      key: "amount",
      name: "Total amount",
      expression: "P + si",
      variables: ["P"],
      dependencies: ["f_si"],
      precision: 2,
      currency: true,
    },
  ],
};

/** Compound Interest: A = P * (1 + R/100)^T ; CI = A - P */
export const compoundInterestProgram: FormulaProgram = {
  id: "prog_compound_interest",
  name: "Compound Interest",
  formulas: [
    {
      id: "f_amount",
      key: "amount",
      name: "Compound amount",
      expression: "P * (1 + R / 100)^T",
      variables: ["P", "R", "T"],
      precision: 2,
      currency: true,
    },
    {
      id: "f_ci",
      key: "ci",
      name: "Compound interest",
      expression: "amount - P",
      variables: ["P"],
      dependencies: ["f_amount"],
      precision: 2,
      currency: true,
    },
  ],
};

/** BMI = weightKg / (heightM ^ 2) */
export const bmiProgram: FormulaProgram = {
  id: "prog_bmi",
  name: "Body Mass Index",
  formulas: [
    {
      id: "f_bmi",
      key: "bmi",
      name: "BMI",
      expression: "weightKg / (heightM ^ 2)",
      variables: ["weightKg", "heightM"],
      precision: 2,
    },
  ],
};

export const mockFormulaPrograms: FormulaProgram[] = [
  homeLoanEmiProgram,
  simpleInterestProgram,
  compoundInterestProgram,
  bmiProgram,
];
