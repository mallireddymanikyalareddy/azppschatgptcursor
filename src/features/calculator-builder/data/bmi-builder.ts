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

/** Complete builder example — BMI. */
export const bmiBuilderDefinition: CalculatorBuilderDefinition = {
  schemaVersion: BUILDER_SCHEMA_VERSION,
  definitionVersion: "1.0.0",
  metadata: {
    id: "calc_bmi",
    name: "BMI Calculator",
    slug: "bmi",
    description: "Calculate Body Mass Index from weight and height.",
    categoryId: "cat_health",
    categorySlug: "health",
    categoryName: "Health",
    subcategory: "Fitness",
    difficulty: CalculatorDifficulty.Beginner,
    version: "1.0.0",
    status: CalculatorStatus.Draft,
    visibility: Visibility.Private,
    tags: ["bmi", "health", "fitness"],
    icon: "activity",
  },
  inputs: [
    {
      id: "input_weight",
      label: "Weight (kg)",
      name: "weightKg",
      type: FieldType.Number,
      defaultValue: 70,
      required: true,
      validation: [
        { type: ValidationRuleType.Required, message: "Weight is required." },
      ],
      suffix: "kg",
      min: 1,
      max: 400,
      order: 1,
    },
    {
      id: "input_height",
      label: "Height (m)",
      name: "heightM",
      type: FieldType.Number,
      defaultValue: 1.75,
      required: true,
      validation: [
        { type: ValidationRuleType.Required, message: "Height is required." },
      ],
      suffix: "m",
      min: 0.5,
      max: 2.5,
      step: 0.01,
      order: 2,
    },
  ],
  formulas: [
    {
      id: "f_bmi",
      name: "BMI",
      key: "bmi",
      expression: "weightKg / (heightM ^ 2)",
      variables: ["weightKg", "heightM"],
      dependencies: [],
      precision: 2,
      order: 1,
    },
  ],
  results: [
    {
      id: "m_bmi",
      key: "bmi",
      label: "BMI",
      type: ResultValueType.Decimal,
      format: OutputFormat.Decimal,
      precision: 2,
      emphasize: true,
      order: 1,
    },
  ],
  charts: [
    {
      id: "chart_bmi",
      title: "BMI gauge",
      kind: ChartKind.Gauge,
      seriesMappings: [
        { id: "s_bmi", name: "BMI", dataKey: "bmi", color: "#0f766e" },
      ],
      showLegend: false,
      order: 1,
    },
  ],
  seo: {
    title: "BMI Calculator",
    description: "Calculate Body Mass Index using weight and height.",
    keywords: ["bmi", "body mass index", "health"],
    canonical: "https://azpps.example/calculators/bmi",
    ogTitle: "BMI Calculator",
  },
  content: {
    introduction: "Estimate BMI from metric weight and height.",
    formulaExplanation: "BMI = weightKg ÷ (heightM²).",
    howItWorks: "Enter weight in kilograms and height in metres.",
    examples: [
      {
        title: "70 kg at 1.75 m",
        description: "BMI ≈ 22.86 (healthy range for many adults).",
      },
    ],
    faqs: [
      {
        id: "faq_bmi_1",
        question: "Is BMI a diagnosis?",
        answer: "No. BMI is a screening metric, not a clinical diagnosis.",
        order: 1,
      },
    ],
    tips: ["Use metres for height (e.g. 1.75), not centimetres."],
    references: [
      { title: "WHO BMI classification", url: "https://www.who.int" },
    ],
  },
  breakdowns: [],
  recommendations: [
    {
      id: "rec_bmi_1",
      title: "Talk to a clinician",
      body: "Interpret BMI alongside other health indicators.",
      tone: RecommendationTone.Suggestion,
    },
  ],
  createdAt: now,
  updatedAt: now,
};
