import { BUILDER_SCHEMA_VERSION } from "@/features/calculator-builder/constants/enums";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import {
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import {
  FieldType,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";
import { OutputFormat } from "@/features/calculation-engine/constants/enums";
import {
  ChartKind,
  RecommendationTone,
  ResultValueType,
} from "@/features/results-engine/constants/enums";

const now = "2026-07-28T00:00:00.000Z";

/** Complete builder example — Home Loan EMI. */
export const homeLoanEmiBuilderDefinition: CalculatorBuilderDefinition = {
  schemaVersion: BUILDER_SCHEMA_VERSION,
  definitionVersion: "1.0.0",
  metadata: {
    id: "calc_home_loan_emi",
    name: "Home Loan EMI",
    slug: "home-loan-emi",
    description:
      "Estimate monthly EMI, total interest, and total payment for a home loan.",
    categoryId: "cat_finance",
    categorySlug: "finance",
    categoryName: "Finance",
    subcategory: "Loans",
    difficulty: CalculatorDifficulty.Beginner,
    version: "1.0.0",
    status: CalculatorStatus.Draft,
    visibility: Visibility.Private,
    tags: ["emi", "home-loan", "finance"],
    icon: "home",
  },
  inputs: [
    {
      id: "input_P",
      label: "Loan amount",
      name: "P",
      type: FieldType.Currency,
      placeholder: "5000000",
      defaultValue: 5000000,
      required: true,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Loan amount is required.",
        },
        {
          type: ValidationRuleType.Min,
          value: 100000,
          message: "Minimum ₹1,00,000",
        },
      ],
      unit: "INR",
      prefix: "₹",
      helpText: "Sanctioned principal",
      tooltip: "Enter the loan principal",
      min: 100000,
      max: 100000000,
      order: 1,
    },
    {
      id: "input_annualRate",
      label: "Annual interest rate",
      name: "annualRate",
      type: FieldType.Percentage,
      placeholder: "8.5",
      defaultValue: 8.5,
      required: true,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Interest rate is required.",
        },
      ],
      suffix: "%",
      min: 0.1,
      max: 30,
      step: 0.05,
      order: 2,
    },
    {
      id: "input_n",
      label: "Tenure (months)",
      name: "n",
      type: FieldType.Number,
      placeholder: "240",
      defaultValue: 240,
      required: true,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Tenure is required.",
        },
      ],
      suffix: "months",
      min: 12,
      max: 480,
      order: 3,
    },
  ],
  formulas: [
    {
      id: "f_monthly_rate",
      name: "Monthly rate",
      key: "r",
      expression: "annualRate / 12 / 100",
      variables: ["annualRate"],
      dependencies: [],
      precision: 10,
      order: 1,
    },
    {
      id: "f_emi",
      name: "Monthly EMI",
      key: "emi",
      expression: "P * r * (1 + r)^n / ((1 + r)^n - 1)",
      variables: ["P", "n"],
      dependencies: ["f_monthly_rate"],
      precision: 2,
      currency: true,
      order: 2,
    },
    {
      id: "f_total_payment",
      name: "Total payment",
      key: "totalPayment",
      expression: "emi * n",
      variables: [],
      dependencies: ["f_emi"],
      precision: 2,
      currency: true,
      order: 3,
    },
    {
      id: "f_total_interest",
      name: "Total interest",
      key: "totalInterest",
      expression: "totalPayment - P",
      variables: ["P"],
      dependencies: ["f_total_payment"],
      precision: 2,
      currency: true,
      order: 4,
    },
  ],
  results: [
    {
      id: "m_emi",
      key: "emi",
      label: "Monthly EMI",
      type: ResultValueType.Currency,
      format: OutputFormat.Currency,
      precision: 2,
      currency: "INR",
      emphasize: true,
      order: 1,
    },
    {
      id: "m_interest",
      key: "totalInterest",
      label: "Total interest",
      type: ResultValueType.Currency,
      format: OutputFormat.Currency,
      precision: 2,
      currency: "INR",
      order: 2,
    },
    {
      id: "m_payment",
      key: "totalPayment",
      label: "Total payment",
      type: ResultValueType.Currency,
      format: OutputFormat.Currency,
      precision: 2,
      currency: "INR",
      order: 3,
    },
  ],
  charts: [
    {
      id: "chart_split",
      title: "Principal vs interest",
      kind: ChartKind.Donut,
      seriesMappings: [
        {
          id: "series_interest",
          name: "Interest",
          dataKey: "totalInterest",
          color: "#b45309",
        },
        {
          id: "series_principal",
          name: "Principal",
          dataKey: "P",
          color: "#0f766e",
        },
      ],
      showLegend: true,
      colours: ["#0f766e", "#b45309"],
      order: 1,
    },
  ],
  seo: {
    title: "Home Loan EMI Calculator",
    description: "Calculate EMI, total interest, and total payment.",
    keywords: ["emi", "home loan", "mortgage"],
    canonical: "https://azpps.example/calculators/home-loan-emi",
    ogTitle: "Home Loan EMI Calculator",
    ogDescription: "Estimate your monthly home loan EMI.",
    schemaPlaceholder: { "@type": "WebApplication", name: "Home Loan EMI" },
  },
  content: {
    introduction:
      "Use this calculator to estimate monthly EMI for a reducing-balance home loan.",
    formulaExplanation:
      "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where r is the monthly rate.",
    howItWorks:
      "Enter principal, annual rate, and tenure in months. The builder runs the formula program through the Calculation Engine.",
    examples: [
      {
        title: "₹50L @ 8.5% for 20 years",
        description: "Typical mid-size home loan scenario.",
      },
    ],
    faqs: [
      {
        id: "faq_emi_1",
        question: "Is this a reducing-balance EMI?",
        answer:
          "Yes. The formula uses monthly compounding on outstanding principal.",
        order: 1,
      },
    ],
    tips: [
      "A longer tenure lowers EMI but raises total interest.",
      "Compare offers by total payment, not EMI alone.",
    ],
    references: [
      { title: "RBI retail lending guidance", url: "https://www.rbi.org.in" },
    ],
  },
  breakdowns: [
    {
      id: "bd_emi",
      title: "Payment composition",
      items: [
        { id: "principal", label: "Principal", dataKey: "P" },
        { id: "interest", label: "Interest", dataKey: "totalInterest" },
      ],
    },
  ],
  recommendations: [
    {
      id: "rec_emi_1",
      title: "Prepay when possible",
      body: "Even small prepayments early in the tenure reduce total interest sharply.",
      tone: RecommendationTone.Tip,
    },
  ],
  createdAt: now,
  updatedAt: now,
};
