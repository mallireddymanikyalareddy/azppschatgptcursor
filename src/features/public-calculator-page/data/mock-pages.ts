import { homeLoanEmiProductionDefinition } from "@/features/calculators/definitions/home-loan-emi";
import { InterpretationBand } from "@/features/public-calculator-page/constants/enums";
import { buildPublicPage } from "@/features/public-calculator-page/data/page-factory";
import { engineFromTemplateSlug } from "@/features/public-calculator-page/lib/engine-from-template";
import type { PublicCalculatorPageDefinition } from "@/features/public-calculator-page/types";

const homeLoan = buildPublicPage({
  engine: {
    ...homeLoanEmiProductionDefinition,
    slug: "home-loan-emi",
  },
  category: "Loans",
  lastUpdated: "2026-07-20T00:00:00.000Z",
  readingMinutes: 8,
  aboutLead:
    "The Home Loan EMI Calculator estimates monthly instalments, total interest, and overall payable amount for reducing-balance home loans. Enter principal, rate, and tenure to compare scenarios before you apply.",
  formula: {
    title: "EMI formula & methodology",
    formula: "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)",
    variables: [
      { symbol: "P", meaning: "Principal (net of prepayment)", unit: "INR" },
      { symbol: "r", meaning: "Monthly interest rate", unit: "decimal" },
      { symbol: "n", meaning: "Tenure", unit: "months" },
    ],
    workedExample:
      "For ₹50,00,000 at 8.5% for 20 years, monthly rate r = 0.085/12 and n = 240.",
    steps: [
      "Convert annual rate to monthly rate r.",
      "Convert tenure to months n.",
      "Apply the EMI formula.",
      "Derive total payable = EMI × n and interest = total − P.",
    ],
    unitsNote: "Currency in INR; rates as percent per annum.",
  },
  benefits: [
    {
      id: "b1",
      title: "Instant EMI estimate",
      description: "Compare loan offers without spreadsheet work.",
    },
    {
      id: "b2",
      title: "Interest visibility",
      description: "See how rate and tenure affect total cost.",
    },
    {
      id: "b3",
      title: "Amortisation ready",
      description: "Production engine supports schedule enrichment.",
    },
  ],
  tips: [
    {
      id: "t1",
      title: "Match tenure units",
      body: "Confirm whether tenure is entered in months or years.",
    },
    {
      id: "t2",
      title: "Include fees carefully",
      body: "Processing fees change effective cost but not always EMI.",
    },
  ],
  examples: [
    {
      id: "ex1",
      title: "Standard 20-year home loan",
      inputs: [
        { label: "Loan amount", value: "₹50,00,000" },
        { label: "Rate", value: "8.5% p.a." },
        { label: "Tenure", value: "20 years" },
      ],
      outputs: [
        { label: "EMI", value: "~₹43,391" },
        { label: "Total interest", value: "See results panel" },
      ],
      steps: [
        "Enter principal and rate.",
        "Set tenure to 20 years.",
        "Review EMI and interest breakdown.",
      ],
    },
  ],
  interpretation: {
    title: "How to read your EMI",
    metricLabel: "EMI affordability vs income",
    ranges: [
      {
        id: "r1",
        band: InterpretationBand.Excellent,
        label: "Comfortable",
        max: 30,
        description: "EMI under ~30% of income is often considered manageable.",
      },
      {
        id: "r2",
        band: InterpretationBand.Normal,
        label: "Moderate",
        min: 30,
        max: 40,
        description: "Watch cash-flow buffers and rate reset risk.",
      },
      {
        id: "r3",
        band: InterpretationBand.High,
        label: "Stretched",
        min: 40,
        description: "Higher EMI share may stress monthly budgets.",
      },
    ],
  },
  mistakes: [
    {
      id: "m1",
      title: "Ignoring fees",
      description: "Upfront fees change effective cost of borrowing.",
    },
    {
      id: "m2",
      title: "Mixing tenure units",
      description: "Entering 20 months instead of 20 years understates EMI.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Is EMI fixed for floating-rate loans?",
      answer:
        "Floating rates can change EMI or tenure when the benchmark resets.",
      category: "Basics",
      order: 1,
    },
    {
      id: "f2",
      question: "Does prepayment reduce EMI or tenure?",
      answer:
        "Lenders may offer either option — confirm with your loan agreement.",
      category: "Prepayment",
      order: 2,
    },
  ],
  relatedCalculatorSlugs: ["sip", "gst", "income-tax"],
  relatedArticles: [
    {
      id: "a1",
      title: "How lenders calculate home loan EMI",
      excerpt: "A plain-language walkthrough of reducing-balance interest.",
      href: "#",
      readingMinutes: 6,
    },
  ],
  references: [
    {
      id: "ref1",
      title: "RBI retail lending guidance (mock)",
      kind: "government",
      publisher: "RBI",
    },
  ],
  popularSlugs: ["sip", "bmi", "gst"],
  sameCategorySlugs: ["sip"],
});

const sip = buildPublicPage({
  engine: engineFromTemplateSlug("sip", {
    name: "SIP Calculator",
    slug: "sip",
  }),
  category: "Investments",
  lastUpdated: "2026-07-18T00:00:00.000Z",
  readingMinutes: 7,
  aboutLead:
    "The SIP Calculator projects the future value of monthly investments using expected annual returns. It helps visualise corpus growth and estimated gains over your horizon.",
  formula: {
    title: "SIP future value",
    formula: "FV = P × (((1+r)^n − 1) / r) × (1+r)",
    variables: [
      { symbol: "P", meaning: "Monthly investment", unit: "INR" },
      { symbol: "r", meaning: "Monthly return rate", unit: "decimal" },
      { symbol: "n", meaning: "Number of months" },
    ],
    workedExample: "₹10,000 monthly for 10 years at 12% expected return.",
    steps: [
      "Convert annual return to monthly rate.",
      "Compute number of instalments.",
      "Apply SIP future-value formula.",
    ],
  },
  benefits: [
    {
      id: "b1",
      title: "Plan systematically",
      description: "See how consistency compounds over time.",
    },
    {
      id: "b2",
      title: "Compare horizons",
      description: "Test 5, 10, or 20 year goals quickly.",
    },
  ],
  tips: [
    {
      id: "t1",
      title: "Returns are assumptions",
      body: "Expected returns are not guaranteed.",
    },
  ],
  examples: [
    {
      id: "ex1",
      title: "₹10k for a decade",
      inputs: [
        { label: "Monthly", value: "₹10,000" },
        { label: "Return", value: "12%" },
        { label: "Years", value: "10" },
      ],
      outputs: [{ label: "Future value", value: "See results" }],
      steps: ["Enter monthly amount", "Set return and years", "Run calculate"],
    },
  ],
  interpretation: {
    title: "Reading SIP projections",
    metricLabel: "Gains vs invested",
    ranges: [
      {
        id: "r1",
        band: InterpretationBand.Low,
        label: "Conservative",
        description: "Lower assumed returns keep projections cautious.",
      },
      {
        id: "r2",
        band: InterpretationBand.Normal,
        label: "Balanced",
        description: "Mid-range equity-like assumptions.",
      },
      {
        id: "r3",
        band: InterpretationBand.High,
        label: "Optimistic",
        description: "High returns increase projection risk.",
      },
    ],
  },
  mistakes: [
    {
      id: "m1",
      title: "Ignoring inflation",
      description: "Nominal corpus is not the same as real purchasing power.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Is SIP return guaranteed?",
      answer: "No. Market-linked SIPs can vary widely.",
      category: "Basics",
      order: 1,
    },
  ],
  relatedCalculatorSlugs: ["home-loan-emi", "income-tax", "bmi"],
  relatedArticles: [
    {
      id: "a1",
      title: "SIP vs lump sum (mock)",
      excerpt: "When staggered investing may help.",
      href: "#",
    },
  ],
  references: [
    {
      id: "ref1",
      title: "SEBI investor education (mock)",
      kind: "government",
    },
  ],
  popularSlugs: ["home-loan-emi", "gst", "bmi"],
  sameCategorySlugs: ["income-tax"],
});

const bmi = buildPublicPage({
  engine: engineFromTemplateSlug("bmi", {
    name: "BMI Calculator",
    slug: "bmi",
  }),
  category: "Health",
  lastUpdated: "2026-07-15T00:00:00.000Z",
  readingMinutes: 5,
  aboutLead:
    "The BMI Calculator estimates body mass index from height and weight. Use it as a screening metric — not a diagnosis.",
  formula: {
    title: "BMI methodology",
    formula: "BMI = weight(kg) / (height(m))²",
    variables: [
      { symbol: "weight", meaning: "Body weight", unit: "kg" },
      { symbol: "height", meaning: "Standing height", unit: "m" },
    ],
    workedExample: "70 kg at 1.70 m → BMI ≈ 24.2",
    steps: [
      "Convert height to metres.",
      "Square the height.",
      "Divide weight by height².",
    ],
  },
  benefits: [
    {
      id: "b1",
      title: "Quick screening",
      description: "Standardised height-weight index.",
    },
  ],
  tips: [
    {
      id: "t1",
      title: "Athletes differ",
      body: "Muscle mass can elevate BMI without excess fat.",
    },
  ],
  examples: [
    {
      id: "ex1",
      title: "Adult example",
      inputs: [
        { label: "Weight", value: "70 kg" },
        { label: "Height", value: "170 cm" },
      ],
      outputs: [{ label: "BMI", value: "~24.2" }],
      steps: ["Enter weight and height", "Review BMI band"],
    },
  ],
  interpretation: {
    title: "BMI categories",
    metricLabel: "BMI",
    ranges: [
      {
        id: "r1",
        band: InterpretationBand.Low,
        label: "Underweight",
        max: 18.5,
        description: "BMI below 18.5.",
      },
      {
        id: "r2",
        band: InterpretationBand.Normal,
        label: "Normal",
        min: 18.5,
        max: 24.9,
        description: "Common healthy range for many adults.",
      },
      {
        id: "r3",
        band: InterpretationBand.High,
        label: "Overweight",
        min: 25,
        max: 29.9,
        description: "Elevated BMI range.",
      },
      {
        id: "r4",
        band: InterpretationBand.Poor,
        label: "Obese",
        min: 30,
        description: "Seek clinical guidance for personal context.",
      },
    ],
  },
  mistakes: [
    {
      id: "m1",
      title: "Wrong height units",
      description: "Mixing cm and metres skews BMI sharply.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Is BMI accurate for everyone?",
      answer: "It is a population screening tool with known limitations.",
      category: "Basics",
      order: 1,
    },
  ],
  relatedCalculatorSlugs: ["sip", "gst"],
  relatedArticles: [],
  references: [
    {
      id: "ref1",
      title: "WHO BMI classification (mock)",
      kind: "scientific",
    },
  ],
  popularSlugs: ["home-loan-emi", "sip", "gst"],
  sameCategorySlugs: [],
});

const gst = buildPublicPage({
  engine: engineFromTemplateSlug("gst", {
    name: "GST Calculator",
    slug: "gst",
  }),
  category: "Tax",
  lastUpdated: "2026-07-22T00:00:00.000Z",
  readingMinutes: 4,
  aboutLead:
    "The GST Calculator computes tax amount and inclusive totals from a base price and GST rate for India-oriented workflows.",
  formula: {
    title: "GST calculation",
    formula: "GST = amount × rate/100; Total = amount + GST",
    variables: [
      { symbol: "amount", meaning: "Taxable value", unit: "INR" },
      { symbol: "rate", meaning: "GST rate", unit: "%" },
    ],
    workedExample: "₹10,000 at 18% → GST ₹1,800; total ₹11,800.",
    steps: [
      "Enter exclusive amount",
      "Select GST rate",
      "Review tax and total",
    ],
  },
  benefits: [
    {
      id: "b1",
      title: "Fast inclusive pricing",
      description: "Quote customers with tax included.",
    },
  ],
  tips: [
    {
      id: "t1",
      title: "Confirm HSN rate",
      body: "Use the correct slab for your goods or services.",
    },
  ],
  examples: [
    {
      id: "ex1",
      title: "18% standard rate",
      inputs: [
        { label: "Amount", value: "₹10,000" },
        { label: "Rate", value: "18%" },
      ],
      outputs: [
        { label: "GST", value: "₹1,800" },
        { label: "Total", value: "₹11,800" },
      ],
      steps: ["Enter amount", "Set 18%", "Calculate"],
    },
  ],
  interpretation: {
    title: "GST rate context",
    metricLabel: "Rate band",
    ranges: [
      {
        id: "r1",
        band: InterpretationBand.Low,
        label: "5%",
        description: "Lower slab goods/services.",
      },
      {
        id: "r2",
        band: InterpretationBand.Normal,
        label: "12–18%",
        description: "Common mid slabs.",
      },
      {
        id: "r3",
        band: InterpretationBand.High,
        label: "28%",
        description: "Higher slab items.",
      },
    ],
  },
  mistakes: [
    {
      id: "m1",
      title: "Applying GST on inclusive price twice",
      description: "Confirm whether amount is already tax-inclusive.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Does this handle CGST/SGST split?",
      answer: "This mock shows combined GST; split can be added later.",
      category: "Basics",
      order: 1,
    },
  ],
  relatedCalculatorSlugs: ["income-tax", "home-loan-emi"],
  relatedArticles: [],
  references: [
    {
      id: "ref1",
      title: "GST portal guidance (mock)",
      kind: "government",
    },
  ],
  popularSlugs: ["home-loan-emi", "sip", "bmi"],
  sameCategorySlugs: ["income-tax"],
});

const incomeTax = buildPublicPage({
  engine: engineFromTemplateSlug("income-tax", {
    name: "Income Tax Calculator",
    slug: "income-tax",
  }),
  category: "Tax",
  lastUpdated: "2026-07-25T00:00:00.000Z",
  readingMinutes: 9,
  aboutLead:
    "The Income Tax Calculator provides a simplified effective-rate estimate for taxable income. Slab engines can replace this mock later without changing the public page shell.",
  formula: {
    title: "Simplified tax estimate",
    formula: "Tax ≈ taxableIncome × effectiveRate / 100",
    variables: [
      {
        symbol: "taxableIncome",
        meaning: "Income after deductions",
        unit: "INR",
      },
      { symbol: "effectiveRate", meaning: "Assumed effective rate", unit: "%" },
    ],
    workedExample: "₹12,00,000 at 15% effective → ≈ ₹1,80,000.",
    steps: [
      "Enter taxable income",
      "Provide effective rate assumption",
      "Review estimated tax",
    ],
  },
  benefits: [
    {
      id: "b1",
      title: "Fast planning input",
      description: "Rough liability before detailed slab modelling.",
    },
  ],
  tips: [
    {
      id: "t1",
      title: "Use accurate taxable income",
      body: "Deductions and exemptions change the base.",
    },
  ],
  examples: [
    {
      id: "ex1",
      title: "Salaried estimate",
      inputs: [
        { label: "Taxable income", value: "₹12,00,000" },
        { label: "Effective rate", value: "15%" },
      ],
      outputs: [{ label: "Estimated tax", value: "₹1,80,000" }],
      steps: ["Enter income", "Set rate", "Calculate"],
    },
  ],
  interpretation: {
    title: "Effective rate bands",
    metricLabel: "Effective rate",
    ranges: [
      {
        id: "r1",
        band: InterpretationBand.Low,
        label: "Lower",
        max: 10,
        description: "Lower effective rates.",
      },
      {
        id: "r2",
        band: InterpretationBand.Normal,
        label: "Mid",
        min: 10,
        max: 20,
        description: "Common mid assumptions.",
      },
      {
        id: "r3",
        band: InterpretationBand.High,
        label: "Higher",
        min: 20,
        description: "Higher effective burden.",
      },
    ],
  },
  mistakes: [
    {
      id: "m1",
      title: "Confusing gross with taxable",
      description: "Gross salary is not always the tax base.",
    },
  ],
  faqs: [
    {
      id: "f1",
      question: "Does this use new regime slabs?",
      answer:
        "This sprint uses an effective-rate mock — slabs can plug in later.",
      category: "Basics",
      order: 1,
    },
  ],
  relatedCalculatorSlugs: ["gst", "sip", "home-loan-emi"],
  relatedArticles: [],
  references: [
    {
      id: "ref1",
      title: "Income Tax Department (mock)",
      kind: "government",
    },
  ],
  popularSlugs: ["gst", "home-loan-emi", "sip"],
  sameCategorySlugs: ["gst"],
});

/** Mock public catalog — five complete SEO pages. */
export const MOCK_PUBLIC_CALCULATOR_PAGES: PublicCalculatorPageDefinition[] = [
  homeLoan,
  sip,
  bmi,
  gst,
  incomeTax,
];
