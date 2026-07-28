import {
  ChartKind,
  RecommendationTone,
  ResultLayout,
  ResultValueType,
  StatusTone,
} from "@/features/results-engine/constants/enums";
import type {
  ResultDataBag,
  ResultsViewDefinition,
} from "@/features/results-engine/types";

export const homeLoanEmiResultsView: ResultsViewDefinition = {
  id: "view_home_loan_emi",
  calculatorId: "calc_home_loan_emi",
  calculatorSlug: "home-loan-emi",
  title: "Home Loan EMI Results",
  summary: "Mock EMI outputs for visualisation validation.",
  layout: ResultLayout.CardGrid,
  printTitle: "Home Loan EMI — Print Summary",
  metrics: [
    {
      id: "m_emi",
      key: "emi",
      label: "Monthly EMI",
      type: ResultValueType.Currency,
      emphasize: true,
      format: { currency: "INR", precision: 2 },
    },
    {
      id: "m_interest",
      key: "totalInterest",
      label: "Total interest",
      type: ResultValueType.Currency,
      format: { currency: "INR", precision: 2 },
    },
    {
      id: "m_payment",
      key: "totalPayment",
      label: "Total payment",
      type: ResultValueType.Currency,
      format: { currency: "INR", precision: 2 },
    },
    {
      id: "m_interest_pct",
      key: "interestPercentage",
      label: "Interest %",
      type: ResultValueType.Percentage,
      format: { precision: 2 },
    },
  ],
  sections: [
    {
      id: "sec_details",
      title: "Detailed breakdown",
      expandable: true,
      defaultOpen: true,
      metricIds: ["m_interest", "m_payment", "m_interest_pct"],
    },
  ],
  breakdowns: [
    {
      id: "bd_emi",
      title: "Payment composition",
      totalLabel: "Total outflow",
      items: [
        {
          id: "principal",
          label: "Principal",
          value: 5000000,
          type: ResultValueType.Currency,
          format: { currency: "INR" },
        },
        {
          id: "interest",
          label: "Interest",
          value: 5413868.8,
          type: ResultValueType.Currency,
          format: { currency: "INR" },
        },
      ],
    },
  ],
  charts: [
    {
      id: "chart_split",
      title: "Principal vs interest",
      kind: ChartKind.Donut,
      series: [
        {
          id: "split",
          name: "Split",
          data: [
            { label: "Principal", value: 5000000 },
            { label: "Interest", value: 5413868 },
          ],
        },
      ],
    },
    {
      id: "chart_balance",
      title: "Outstanding balance (mock)",
      kind: ChartKind.Area,
      height: 180,
      series: [
        {
          id: "balance",
          name: "Balance",
          data: [
            { label: "Y1", value: 4800000 },
            { label: "Y5", value: 3900000 },
            { label: "Y10", value: 2500000 },
            { label: "Y15", value: 1200000 },
            { label: "Y20", value: 0 },
          ],
        },
      ],
    },
  ],
  tables: [
    {
      id: "tbl_schedule",
      title: "Sample amortization rows",
      pageSize: 3,
      stickyHeader: true,
      columns: [
        { id: "year", header: "Year", accessorKey: "year", sortable: true },
        {
          id: "emi",
          header: "EMI",
          accessorKey: "emi",
          sortable: true,
          formatType: ResultValueType.Currency,
          format: { currency: "INR" },
        },
        {
          id: "balance",
          header: "Balance",
          accessorKey: "balance",
          sortable: true,
          formatType: ResultValueType.Currency,
          format: { currency: "INR", abbreviate: true },
        },
      ],
      rows: [
        { id: "1", year: 1, emi: 43391, balance: 4800000 },
        { id: "2", year: 5, emi: 43391, balance: 3900000 },
        { id: "3", year: 10, emi: 43391, balance: 2500000 },
        { id: "4", year: 15, emi: 43391, balance: 1200000 },
      ],
    },
  ],
  comparisons: [
    {
      id: "cmp_tenure",
      title: "Tenure comparison",
      description: "Mock side-by-side loan options.",
      options: [
        {
          id: "opt_20",
          title: "20 years",
          badge: "Current",
          highlighted: true,
          metrics: [
            {
              id: "c1",
              key: "emi",
              label: "EMI",
              type: ResultValueType.Currency,
              format: { currency: "INR" },
            },
          ],
          values: { emi: 43391 },
        },
        {
          id: "opt_15",
          title: "15 years",
          badge: "Faster",
          metrics: [
            {
              id: "c2",
              key: "emi",
              label: "EMI",
              type: ResultValueType.Currency,
              format: { currency: "INR" },
            },
          ],
          values: { emi: 49267 },
        },
      ],
    },
  ],
  timelines: [
    {
      id: "tl_steps",
      title: "Calculation steps",
      items: [
        {
          id: "s1",
          title: "Inputs collected",
          timestamp: "Step 1",
          tone: StatusTone.Info,
        },
        {
          id: "s2",
          title: "EMI computed",
          timestamp: "Step 2",
          value: 43391,
          valueType: ResultValueType.Currency,
          format: { currency: "INR" },
          tone: StatusTone.Success,
        },
      ],
    },
  ],
  recommendations: {
    id: "rec_emi",
    title: "Tips",
    items: [
      {
        id: "t1",
        title: "Consider a shorter tenure",
        body: "A 15-year plan reduces total interest in this mock scenario.",
        tone: RecommendationTone.Suggestion,
      },
      {
        id: "t2",
        title: "Prepayment opportunity",
        body: "Even small annual prepayments can cut interest significantly.",
        tone: RecommendationTone.Tip,
      },
    ],
  },
  infoCards: [
    {
      id: "info_1",
      title: "Disclaimer",
      body: "Figures are illustrative mock data for UI validation only.",
      tone: StatusTone.Warning,
    },
  ],
};

export const homeLoanEmiResultData: ResultDataBag = {
  emi: 43391.12,
  totalInterest: 5413868.8,
  totalPayment: 10413868.8,
  interestPercentage: 108.28,
};

export const bmiResultsView: ResultsViewDefinition = {
  id: "view_bmi",
  calculatorId: "calc_bmi",
  calculatorSlug: "bmi",
  title: "BMI Results",
  metrics: [
    {
      id: "m_bmi",
      key: "bmi",
      label: "BMI",
      type: ResultValueType.Decimal,
      emphasize: true,
      format: { precision: 2 },
    },
    {
      id: "m_status",
      key: "category",
      label: "Category",
      type: ResultValueType.Status,
      statusMap: {
        normal: { label: "Normal", tone: StatusTone.Success },
        overweight: { label: "Overweight", tone: StatusTone.Warning },
      },
    },
  ],
  charts: [
    {
      id: "chart_bmi_gauge",
      title: "BMI gauge",
      kind: ChartKind.Gauge,
      progress: 45,
      unit: "",
      series: [
        { id: "g", name: "BMI", data: [{ label: "BMI", value: 22.86 }] },
      ],
    },
  ],
  recommendations: {
    id: "rec_bmi",
    items: [
      {
        id: "b1",
        title: "Maintain balance",
        body: "Mock insight: keep a consistent activity routine.",
        tone: RecommendationTone.Insight,
        aiGenerated: true,
      },
    ],
  },
};

export const bmiResultData: ResultDataBag = {
  bmi: 22.86,
  category: "normal",
};

export const sipResultsView: ResultsViewDefinition = {
  id: "view_sip",
  calculatorId: "calc_sip",
  calculatorSlug: "sip",
  title: "SIP Results",
  metrics: [
    {
      id: "m_maturity",
      key: "maturityAmount",
      label: "Maturity amount",
      type: ResultValueType.Currency,
      emphasize: true,
      format: { currency: "INR", abbreviate: true },
    },
    {
      id: "m_invested",
      key: "invested",
      label: "Invested",
      type: ResultValueType.Currency,
      format: { currency: "INR" },
    },
    {
      id: "m_gains",
      key: "gains",
      label: "Estimated gains",
      type: ResultValueType.Currency,
      format: { currency: "INR" },
    },
  ],
  charts: [
    {
      id: "chart_sip_growth",
      title: "Investment growth (mock)",
      kind: ChartKind.Line,
      series: [
        {
          id: "growth",
          name: "Corpus",
          data: [
            { label: "Y1", value: 120000 },
            { label: "Y3", value: 420000 },
            { label: "Y5", value: 800000 },
            { label: "Y10", value: 2300000 },
          ],
        },
      ],
    },
    {
      id: "chart_sip_spark",
      title: "Trend",
      kind: ChartKind.Sparkline,
      height: 80,
      series: [
        {
          id: "spark",
          name: "Trend",
          data: [
            { label: "1", value: 10 },
            { label: "2", value: 14 },
            { label: "3", value: 13 },
            { label: "4", value: 18 },
            { label: "5", value: 22 },
          ],
        },
      ],
    },
  ],
  timelines: [
    {
      id: "tl_sip",
      title: "Investment timeline",
      items: [
        {
          id: "i1",
          title: "Start SIP",
          timestamp: "Year 0",
          tone: StatusTone.Info,
        },
        {
          id: "i2",
          title: "Projected corpus",
          timestamp: "Year 10",
          value: 2300000,
          valueType: ResultValueType.Currency,
          format: { currency: "INR", abbreviate: true },
          tone: StatusTone.Success,
        },
      ],
    },
  ],
};

export const sipResultData: ResultDataBag = {
  maturityAmount: 2300000,
  invested: 1200000,
  gains: 1100000,
};

export const gstResultsView: ResultsViewDefinition = {
  id: "view_gst",
  calculatorId: "calc_gst",
  calculatorSlug: "gst",
  title: "GST Results",
  metrics: [
    {
      id: "m_base",
      key: "baseAmount",
      label: "Base amount",
      type: ResultValueType.Currency,
      format: { currency: "INR" },
    },
    {
      id: "m_gst",
      key: "gstAmount",
      label: "GST",
      type: ResultValueType.Currency,
      emphasize: true,
      format: { currency: "INR" },
    },
    {
      id: "m_total",
      key: "totalAmount",
      label: "Total",
      type: ResultValueType.Currency,
      format: { currency: "INR" },
    },
    {
      id: "m_rate",
      key: "gstRate",
      label: "Rate",
      type: ResultValueType.Percentage,
    },
  ],
  breakdowns: [
    {
      id: "bd_gst",
      title: "Tax breakdown",
      items: [
        { id: "cgst", label: "CGST", value: 900, format: { currency: "INR" } },
        { id: "sgst", label: "SGST", value: 900, format: { currency: "INR" } },
      ],
      totalLabel: "Total GST",
    },
  ],
  charts: [
    {
      id: "chart_gst_bar",
      title: "Amount composition",
      kind: ChartKind.Bar,
      series: [
        {
          id: "amt",
          name: "Amount",
          data: [
            { label: "Base", value: 10000 },
            { label: "GST", value: 1800 },
            { label: "Total", value: 11800 },
          ],
        },
      ],
    },
  ],
  comparisons: [
    {
      id: "cmp_regimes",
      title: "Tax regime comparison (mock)",
      options: [
        {
          id: "inclusive",
          title: "Tax inclusive",
          metrics: [
            {
              id: "r1",
              key: "total",
              label: "Payable",
              type: ResultValueType.Currency,
              format: { currency: "INR" },
            },
          ],
          values: { total: 11800 },
        },
        {
          id: "exclusive",
          title: "Tax exclusive",
          highlighted: true,
          badge: "Selected",
          metrics: [
            {
              id: "r2",
              key: "total",
              label: "Payable",
              type: ResultValueType.Currency,
              format: { currency: "INR" },
            },
          ],
          values: { total: 11800 },
        },
      ],
    },
  ],
};

export const gstResultData: ResultDataBag = {
  baseAmount: 10000,
  gstAmount: 1800,
  totalAmount: 11800,
  gstRate: 18,
};

export const mockResultsBundles = [
  { view: homeLoanEmiResultsView, data: homeLoanEmiResultData },
  { view: bmiResultsView, data: bmiResultData },
  { view: sipResultsView, data: sipResultData },
  { view: gstResultsView, data: gstResultData },
] as const;
