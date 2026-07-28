import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import { homeLoanEmiProductionForm } from "@/features/calculators/definitions/home-loan-emi/form";
import { homeLoanEmiProductionWorkflow } from "@/features/calculators/definitions/home-loan-emi/workflow";
import { homeLoanEmiProductionResultsView } from "@/features/calculators/definitions/home-loan-emi/results";

/**
 * Complete production definition for Home Loan EMI.
 * Consumed by the generic calculator runtime — no EMI-specific React UI.
 */
export const homeLoanEmiProductionDefinition: ProductionCalculatorDefinition = {
  id: "calc_home_loan_emi",
  slug: "home-loan-emi",
  name: "Home Loan EMI Calculator",
  description:
    "Calculate monthly EMI, interest, total cost, and amortisation for home loans.",
  locale: "en-IN",
  currency: "INR",
  form: homeLoanEmiProductionForm,
  workflow: homeLoanEmiProductionWorkflow,
  resultsView: homeLoanEmiProductionResultsView,
  inputMapping: {
    fields: {
      loanAmount: "P",
      interestRate: "annualRate",
      processingFee: "processingFeeInput",
    },
    tenure: {
      tenureField: "loanTenure",
      tenureTypeField: "tenureType",
      targetInput: "n",
      maxMonths: 480,
    },
    principalNetOfPrepayment: {
      principalField: "loanAmount",
      prepaymentField: "prepayment",
      targetInput: "P",
    },
  },
  seo: {
    title: "Home Loan EMI Calculator | AZPPS",
    description:
      "Free home loan EMI calculator with amortisation schedule, payment breakdown, and effective loan cost.",
    keywords: [
      "home loan emi",
      "emi calculator",
      "amortisation schedule",
      "loan interest",
    ],
  },
  content: {
    introduction:
      "Estimate your monthly EMI and total interest for a reducing-balance home loan.",
    howItWorks:
      "Enter loan amount, annual rate, and tenure (months or years). Optional processing fee and prepayment adjust effective cost and net principal.",
    formulaExplanation:
      "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where r is the monthly rate and n is tenure in months. When rate is 0, EMI = P / n.",
  },
  amortisation: {
    enabled: true,
    tableId: "tbl_amortisation",
    balanceChartId: "chart_balance",
    annualChartId: "chart_annual",
    pageSize: 12,
  },
};
