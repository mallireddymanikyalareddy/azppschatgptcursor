import {
  ChartKind,
  RecommendationTone,
  ResultLayout,
  ResultValueType,
  StatusTone,
} from "@/features/results-engine/constants/enums";
import type { ResultsViewDefinition } from "@/features/results-engine/types";

/**
 * Presentation schema for Home Loan EMI.
 * Chart series and amortisation rows are hydrated at runtime.
 */
export const homeLoanEmiProductionResultsView: ResultsViewDefinition = {
  id: "view_home_loan_emi_production",
  calculatorId: "calc_home_loan_emi",
  calculatorSlug: "home-loan-emi",
  title: "Home Loan EMI Results",
  summary: "Summary cards, payment breakdown, schedule, and recommendations.",
  layout: ResultLayout.CardGrid,
  printTitle: "Home Loan EMI — Summary",
  metrics: [
    {
      id: "m_emi",
      key: "emi",
      label: "Monthly EMI",
      type: ResultValueType.Currency,
      emphasize: true,
      format: { currency: "INR", locale: "en-IN", precision: 2 },
    },
    {
      id: "m_principal",
      key: "principal",
      label: "Principal",
      type: ResultValueType.Currency,
      format: { currency: "INR", locale: "en-IN", precision: 2 },
    },
    {
      id: "m_interest",
      key: "totalInterest",
      label: "Interest paid",
      type: ResultValueType.Currency,
      format: { currency: "INR", locale: "en-IN", precision: 2 },
    },
    {
      id: "m_payment",
      key: "totalPayment",
      label: "Total payment",
      type: ResultValueType.Currency,
      format: { currency: "INR", locale: "en-IN", precision: 2 },
    },
    {
      id: "m_fee",
      key: "processingFee",
      label: "Processing fee",
      type: ResultValueType.Currency,
      format: { currency: "INR", locale: "en-IN", precision: 2 },
    },
    {
      id: "m_effective",
      key: "effectiveLoanCost",
      label: "Effective loan cost",
      type: ResultValueType.Currency,
      format: { currency: "INR", locale: "en-IN", precision: 2 },
    },
    {
      id: "m_interest_pct",
      key: "interestPercentage",
      label: "Interest %",
      type: ResultValueType.Percentage,
      format: { precision: 2, locale: "en-IN" },
    },
    {
      id: "m_principal_pct",
      key: "principalPercentage",
      label: "Principal %",
      type: ResultValueType.Percentage,
      format: { precision: 2, locale: "en-IN" },
    },
  ],
  sections: [
    {
      id: "sec_loan_summary",
      title: "Loan summary",
      description: "Cost composition and share of principal vs interest.",
      expandable: true,
      defaultOpen: true,
      metricIds: [
        "m_principal",
        "m_interest",
        "m_payment",
        "m_fee",
        "m_effective",
        "m_interest_pct",
        "m_principal_pct",
      ],
    },
  ],
  breakdowns: [
    {
      id: "bd_payment",
      title: "Payment breakdown",
      totalLabel: "Effective loan cost",
      items: [
        {
          id: "principal",
          label: "Principal",
          value: 0,
          type: ResultValueType.Currency,
          format: { currency: "INR", locale: "en-IN" },
        },
        {
          id: "interest",
          label: "Interest",
          value: 0,
          type: ResultValueType.Currency,
          format: { currency: "INR", locale: "en-IN" },
        },
        {
          id: "fee",
          label: "Processing fee",
          value: 0,
          type: ResultValueType.Currency,
          format: { currency: "INR", locale: "en-IN" },
        },
      ],
    },
  ],
  charts: [
    {
      id: "chart_principal_interest",
      title: "Principal vs interest",
      description: "Donut split of principal and interest paid.",
      kind: ChartKind.Donut,
      series: [
        {
          id: "split",
          name: "Split",
          data: [
            { label: "Principal", value: 0 },
            { label: "Interest", value: 0 },
          ],
        },
      ],
    },
    {
      id: "chart_balance",
      title: "Outstanding balance",
      description: "Line chart of remaining principal over the loan life.",
      kind: ChartKind.Line,
      height: 200,
      series: [{ id: "balance", name: "Outstanding balance", data: [] }],
    },
    {
      id: "chart_annual",
      title: "Annual principal vs interest",
      description: "Bar chart of yearly principal and interest components.",
      kind: ChartKind.Bar,
      height: 200,
      series: [
        { id: "annual_principal", name: "Principal", data: [] },
        { id: "annual_interest", name: "Interest", data: [] },
      ],
    },
  ],
  tables: [],
  recommendations: {
    id: "rec_emi",
    title: "Recommendations",
    items: [
      {
        id: "t1",
        title: "Compare tenures",
        body: "A shorter tenure raises EMI but usually lowers total interest.",
        tone: RecommendationTone.Suggestion,
      },
      {
        id: "t2",
        title: "Use prepayments wisely",
        body: "Even modest prepayments early in the schedule cut interest sharply.",
        tone: RecommendationTone.Tip,
      },
      {
        id: "t3",
        title: "Include processing fees",
        body: "Effective loan cost includes fees that EMI alone does not show.",
        tone: RecommendationTone.Insight,
      },
    ],
  },
  infoCards: [
    {
      id: "info_disclaimer",
      title: "Calculation metadata",
      body: "Results use reducing-balance EMI with locale-aware INR formatting (en-IN). Amortisation is generated from the same inputs as the formula program.",
      tone: StatusTone.Info,
    },
  ],
};
