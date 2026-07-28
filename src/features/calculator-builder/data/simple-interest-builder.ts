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

/** Complete builder example — Simple Interest. */
export const simpleInterestBuilderDefinition: CalculatorBuilderDefinition = {
  schemaVersion: BUILDER_SCHEMA_VERSION,
  definitionVersion: "1.0.0",
  metadata: {
    id: "calc_simple_interest",
    name: "Simple Interest",
    slug: "simple-interest",
    description: "Calculate simple interest and maturity amount.",
    categoryId: "cat_finance",
    categorySlug: "finance",
    categoryName: "Finance",
    subcategory: "Interest",
    difficulty: CalculatorDifficulty.Beginner,
    version: "1.0.0",
    status: CalculatorStatus.Draft,
    visibility: Visibility.Private,
    tags: ["interest", "simple-interest"],
    icon: "percent",
  },
  inputs: [
    {
      id: "input_P",
      label: "Principal",
      name: "P",
      type: FieldType.Currency,
      defaultValue: 100000,
      required: true,
      validation: [
        {
          type: ValidationRuleType.Required,
          message: "Principal is required.",
        },
      ],
      prefix: "₹",
      unit: "INR",
      min: 1,
      order: 1,
    },
    {
      id: "input_R",
      label: "Rate (%)",
      name: "R",
      type: FieldType.Percentage,
      defaultValue: 8,
      required: true,
      validation: [
        { type: ValidationRuleType.Required, message: "Rate is required." },
      ],
      suffix: "%",
      min: 0,
      order: 2,
    },
    {
      id: "input_T",
      label: "Time (years)",
      name: "T",
      type: FieldType.Number,
      defaultValue: 2,
      required: true,
      validation: [
        { type: ValidationRuleType.Required, message: "Time is required." },
      ],
      suffix: "years",
      min: 0,
      order: 3,
    },
  ],
  formulas: [
    {
      id: "f_si",
      name: "Simple interest",
      key: "si",
      expression: "P * R * T / 100",
      variables: ["P", "R", "T"],
      dependencies: [],
      precision: 2,
      currency: true,
      order: 1,
    },
    {
      id: "f_amount",
      name: "Total amount",
      key: "amount",
      expression: "P + si",
      variables: ["P"],
      dependencies: ["f_si"],
      precision: 2,
      currency: true,
      order: 2,
    },
  ],
  results: [
    {
      id: "m_si",
      key: "si",
      label: "Simple interest",
      type: ResultValueType.Currency,
      format: OutputFormat.Currency,
      currency: "INR",
      emphasize: true,
      order: 1,
    },
    {
      id: "m_amount",
      key: "amount",
      label: "Total amount",
      type: ResultValueType.Currency,
      format: OutputFormat.Currency,
      currency: "INR",
      order: 2,
    },
  ],
  charts: [
    {
      id: "chart_si",
      title: "Interest vs principal",
      kind: ChartKind.Bar,
      seriesMappings: [
        { id: "s1", name: "Interest", dataKey: "si" },
        { id: "s2", name: "Principal", dataKey: "P" },
      ],
      xAxisLabel: "Component",
      yAxisLabel: "Amount",
      showLegend: true,
      order: 1,
    },
  ],
  seo: {
    title: "Simple Interest Calculator",
    description: "Compute SI = P × R × T / 100 and maturity amount.",
    keywords: ["simple interest", "principal", "rate"],
    canonical: "https://azpps.example/calculators/simple-interest",
    ogTitle: "Simple Interest Calculator",
  },
  content: {
    introduction: "Quickly calculate simple interest on a principal amount.",
    formulaExplanation: "SI = P × R × T ÷ 100. Amount = P + SI.",
    howItWorks: "Provide principal, annual rate, and time in years.",
    examples: [
      {
        title: "₹1L at 8% for 2 years",
        description: "SI = 16,000; Amount = 1,16,000.",
      },
    ],
    faqs: [
      {
        id: "faq_si_1",
        question: "Does this include compounding?",
        answer: "No. Use the compound interest calculator for compounding.",
        order: 1,
      },
    ],
    tips: ["Use the same time unit as the rate period (years)."],
    references: [],
  },
  breakdowns: [],
  recommendations: [
    {
      id: "rec_si_1",
      title: "Compare with compound interest",
      body: "Longer tenures usually favour compound interest instruments.",
      tone: RecommendationTone.Insight,
    },
  ],
  createdAt: now,
  updatedAt: now,
};
