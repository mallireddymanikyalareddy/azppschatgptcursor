import {
  CalculatorDifficulty,
  CalculatorStatus,
  CategoryType,
  ChartAxisType,
  ChartType,
  FormulaType,
  InputType,
  OutputType,
  ValidationType,
  Visibility,
} from "@/features/calculators/constants/enums";
import type {
  Calculator,
  Category,
  CalculatorSummary,
} from "@/features/calculators/types";

const NOW = "2026-07-28T12:00:00.000Z";

/** Finance → Loans category tree (minimal hierarchy for domain validation). */
export const mockFinanceCategory: Category = {
  id: "cat_finance",
  slug: "finance",
  name: "Finance",
  description: "Personal and business finance calculators.",
  type: CategoryType.Root,
  parentId: null,
  order: 1,
  icon: "wallet",
  seo: {
    title: "Finance Calculators | AZPPS",
    description:
      "EMI, interest, and investment calculators for personal finance.",
    keywords: ["finance", "emi", "loan", "interest"],
    canonical: "/calculators/finance",
    schemaPlaceholder: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Finance Calculators",
    },
  },
  createdAt: NOW,
  updatedAt: NOW,
  children: [
    {
      id: "cat_loans",
      slug: "loans",
      name: "Loans",
      description: "Home, personal, and auto loan calculators.",
      type: CategoryType.Group,
      parentId: "cat_finance",
      order: 1,
      icon: "landmark",
      seo: {
        title: "Loan Calculators | AZPPS",
        description: "Estimate EMIs and total interest for common loan types.",
        keywords: ["loan", "emi", "home loan", "mortgage"],
        canonical: "/calculators/finance/loans",
      },
      createdAt: NOW,
      updatedAt: NOW,
      children: [
        {
          id: "cat_home_loans",
          slug: "home-loans",
          name: "Home Loans",
          description: "Mortgage and home loan EMI tools.",
          type: CategoryType.Leaf,
          parentId: "cat_loans",
          order: 1,
          seo: {
            title: "Home Loan Calculators | AZPPS",
            description: "Home loan EMI and amortization calculators.",
            keywords: ["home loan", "mortgage", "emi"],
            canonical: "/calculators/finance/loans/home-loans",
          },
          createdAt: NOW,
          updatedAt: NOW,
        },
      ],
    },
  ],
};

export const mockHomeLoanEmiCategoryLeaf: Category = {
  id: "cat_home_loans",
  slug: "home-loans",
  name: "Home Loans",
  description: "Mortgage and home loan EMI tools.",
  type: CategoryType.Leaf,
  parentId: "cat_loans",
  order: 1,
  seo: {
    title: "Home Loan Calculators | AZPPS",
    description: "Home loan EMI and amortization calculators.",
    keywords: ["home loan", "mortgage", "emi"],
    canonical: "/calculators/finance/loans/home-loans",
  },
  createdAt: NOW,
  updatedAt: NOW,
};

/**
 * Home Loan EMI Calculator — schema-only mock to validate the domain model.
 * No evaluation / engine logic.
 */
export const mockHomeLoanEmiCalculator: Calculator = {
  id: "calc_home_loan_emi",
  slug: "home-loan-emi",
  name: "Home Loan EMI Calculator",
  description:
    "Estimate monthly EMI, total interest, and total payment for a home loan using the standard reducing-balance formula.",
  category: {
    id: mockHomeLoanEmiCategoryLeaf.id,
    slug: mockHomeLoanEmiCategoryLeaf.slug,
    name: mockHomeLoanEmiCategoryLeaf.name,
  },
  status: CalculatorStatus.Published,
  difficulty: CalculatorDifficulty.Beginner,
  version: "1.0.0",
  visibility: Visibility.Public,
  primaryFormulaId: "formula_emi",
  tags: ["emi", "home-loan", "mortgage", "finance"],
  createdAt: NOW,
  updatedAt: NOW,
  variables: [
    {
      id: "var_principal",
      name: "principal",
      label: "Loan amount",
      type: InputType.Currency,
      defaultValue: 5000000,
      required: true,
      order: 1,
      unit: { code: "INR", label: "Indian Rupee", symbol: "₹" },
      placeholder: "e.g. 5000000",
      helpText: "Total home loan principal disbursed by the lender.",
      validation: [
        {
          id: "rule_principal_required",
          type: ValidationType.Required,
          message: "Loan amount is required.",
        },
        {
          id: "rule_principal_min",
          type: ValidationType.Min,
          value: 100000,
          message: "Loan amount must be at least ₹1,00,000.",
        },
        {
          id: "rule_principal_max",
          type: ValidationType.Max,
          value: 100000000,
          message: "Loan amount cannot exceed ₹10,00,00,000.",
        },
      ],
    },
    {
      id: "var_annual_rate",
      name: "annualRate",
      label: "Annual interest rate",
      type: InputType.Percentage,
      defaultValue: 8.5,
      required: true,
      order: 2,
      unit: { code: "percent", label: "Percent", symbol: "%" },
      placeholder: "e.g. 8.5",
      helpText: "Nominal annual rate charged by the lender.",
      validation: [
        {
          id: "rule_rate_required",
          type: ValidationType.Required,
          message: "Interest rate is required.",
        },
        {
          id: "rule_rate_min",
          type: ValidationType.Min,
          value: 0.1,
          message: "Interest rate must be greater than 0.",
        },
        {
          id: "rule_rate_max",
          type: ValidationType.Max,
          value: 30,
          message: "Interest rate cannot exceed 30%.",
        },
      ],
    },
    {
      id: "var_tenure_months",
      name: "tenureMonths",
      label: "Tenure (months)",
      type: InputType.Integer,
      defaultValue: 240,
      required: true,
      order: 3,
      unit: { code: "months", label: "Months" },
      placeholder: "e.g. 240",
      helpText: "Loan tenure in months (e.g. 240 for 20 years).",
      validation: [
        {
          id: "rule_tenure_required",
          type: ValidationType.Required,
          message: "Tenure is required.",
        },
        {
          id: "rule_tenure_min",
          type: ValidationType.Min,
          value: 12,
          message: "Tenure must be at least 12 months.",
        },
        {
          id: "rule_tenure_max",
          type: ValidationType.Max,
          value: 480,
          message: "Tenure cannot exceed 480 months.",
        },
      ],
    },
  ],
  formulas: [
    {
      id: "formula_emi",
      name: "Monthly EMI",
      type: FormulaType.Financial,
      expression:
        "principal * monthlyRate * (1 + monthlyRate) ^ tenureMonths / ((1 + monthlyRate) ^ tenureMonths - 1)",
      variables: ["principal", "annualRate", "tenureMonths"],
      precision: 2,
      unit: { code: "INR", label: "Indian Rupee", symbol: "₹" },
      dependencies: [],
      description:
        "Standard EMI where monthlyRate = annualRate / 12 / 100. Expression is declarative only.",
      notes: "monthlyRate is a derived intermediate for a future engine.",
    },
    {
      id: "formula_total_payment",
      name: "Total payment",
      type: FormulaType.Algebraic,
      expression: "emi * tenureMonths",
      variables: ["tenureMonths"],
      precision: 2,
      unit: { code: "INR", label: "Indian Rupee", symbol: "₹" },
      dependencies: ["formula_emi"],
      description: "Total amount paid over the full tenure.",
    },
    {
      id: "formula_total_interest",
      name: "Total interest",
      type: FormulaType.Algebraic,
      expression: "totalPayment - principal",
      variables: ["principal"],
      precision: 2,
      unit: { code: "INR", label: "Indian Rupee", symbol: "₹" },
      dependencies: ["formula_total_payment"],
      description: "Interest portion of the total payment.",
    },
  ],
  results: [
    {
      id: "result_emi",
      key: "emi",
      label: "Monthly EMI",
      outputType: OutputType.Currency,
      currency: "INR",
      precision: 2,
      format: "currency",
      visibility: Visibility.Public,
      formulaId: "formula_emi",
      order: 1,
      value: null,
    },
    {
      id: "result_total_interest",
      key: "totalInterest",
      label: "Total interest",
      outputType: OutputType.Currency,
      currency: "INR",
      precision: 2,
      format: "currency",
      visibility: Visibility.Public,
      formulaId: "formula_total_interest",
      order: 2,
      value: null,
    },
    {
      id: "result_total_payment",
      key: "totalPayment",
      label: "Total payment",
      outputType: OutputType.Currency,
      currency: "INR",
      precision: 2,
      format: "currency",
      visibility: Visibility.Public,
      formulaId: "formula_total_payment",
      order: 3,
      value: null,
    },
  ],
  charts: [
    {
      id: "chart_payment_split",
      title: "Principal vs interest",
      type: ChartType.Donut,
      series: [
        {
          id: "series_principal",
          name: "Principal",
          dataKey: "principal",
          color: "#38bdf8",
        },
        {
          id: "series_interest",
          name: "Interest",
          dataKey: "totalInterest",
          color: "#94a3b8",
        },
      ],
      colours: ["#38bdf8", "#94a3b8"],
      legend: { show: true, position: "bottom" },
      xAxis: {
        id: "axis_x_split",
        type: ChartAxisType.Category,
        label: "Component",
      },
      yAxis: {
        id: "axis_y_split",
        type: ChartAxisType.Value,
        label: "Amount",
        format: "currency",
      },
    },
  ],
  faqs: [
    {
      id: "faq_emi_1",
      question: "What is EMI?",
      answer:
        "Equated Monthly Instalment is the fixed amount you pay each month toward principal and interest.",
      order: 1,
    },
    {
      id: "faq_emi_2",
      question: "Does this calculator include processing fees?",
      answer:
        "No. Fees, insurance, and prepayment charges are excluded from this estimate.",
      order: 2,
    },
  ],
  seo: {
    title: "Home Loan EMI Calculator | AZPPS",
    description:
      "Calculate home loan EMI, total interest, and total payment instantly.",
    keywords: ["home loan emi", "emi calculator", "mortgage calculator"],
    canonical: "/calculators/home-loan-emi",
    schemaPlaceholder: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Home Loan EMI Calculator",
      applicationCategory: "FinanceApplication",
    },
    ogTitle: "Home Loan EMI Calculator",
    ogDescription: "Estimate your monthly home loan EMI in seconds.",
  },
  content: {
    introduction:
      "Use this calculator to estimate your monthly home loan EMI before you apply with a lender.",
    formulaExplanation:
      "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is principal, r is monthly rate, and n is tenure in months.",
    examples: [
      {
        title: "₹50L over 20 years at 8.5%",
        description: "A typical mid-sized home loan with a 20-year tenure.",
        inputs: {
          principal: 5000000,
          annualRate: 8.5,
          tenureMonths: 240,
        },
        expectedHighlight: "EMI in the mid ₹40,000 range (illustrative).",
      },
    ],
    tips: [
      "A longer tenure lowers EMI but increases total interest.",
      "Compare offers using the same principal and tenure.",
    ],
    references: [
      {
        title: "RBI retail lending guidance (illustrative)",
        url: "https://www.rbi.org.in/",
      },
    ],
  },
};

export const mockHomeLoanEmiSummary: CalculatorSummary = {
  id: mockHomeLoanEmiCalculator.id,
  slug: mockHomeLoanEmiCalculator.slug,
  name: mockHomeLoanEmiCalculator.name,
  description: mockHomeLoanEmiCalculator.description,
  category: mockHomeLoanEmiCalculator.category,
  status: mockHomeLoanEmiCalculator.status,
  difficulty: mockHomeLoanEmiCalculator.difficulty,
  version: mockHomeLoanEmiCalculator.version,
  visibility: mockHomeLoanEmiCalculator.visibility,
  tags: mockHomeLoanEmiCalculator.tags,
  updatedAt: mockHomeLoanEmiCalculator.updatedAt,
};

export const mockCalculators: Calculator[] = [mockHomeLoanEmiCalculator];

export const mockCalculatorSummaries: CalculatorSummary[] = [
  mockHomeLoanEmiSummary,
];

export const mockCategories: Category[] = [mockFinanceCategory];
