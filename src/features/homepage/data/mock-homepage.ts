import {
  CalculatorPopularity,
  HomepageAdPlacement,
  HomepageCategoryId,
  TrustBadgeId,
} from "@/features/homepage/constants/enums";
import { HOMEPAGE_ROUTES } from "@/features/homepage/constants/routes";
import type {
  HomepageArticleCard,
  HomepageCalculatorCard,
  HomepageCategory,
  HomepageCollection,
  HomepagePayload,
  HomepageTestimonial,
} from "@/features/homepage/types";

const CATEGORY_META: Array<{
  id: HomepageCategoryId;
  name: string;
  description: string;
  icon: string;
}> = [
  {
    id: HomepageCategoryId.Finance,
    name: "Finance",
    description: "Loans, EMI, budgets, and everyday money math.",
    icon: "Wallet",
  },
  {
    id: HomepageCategoryId.Investment,
    name: "Investment",
    description: "SIP, returns, compounding, and portfolio planning.",
    icon: "TrendingUp",
  },
  {
    id: HomepageCategoryId.Tax,
    name: "Tax",
    description: "Income tax, GST, and compliance estimates.",
    icon: "Receipt",
  },
  {
    id: HomepageCategoryId.Health,
    name: "Health",
    description: "BMI, calories, and wellness metrics.",
    icon: "HeartPulse",
  },
  {
    id: HomepageCategoryId.Fitness,
    name: "Fitness",
    description: "Macros, pace, and training load tools.",
    icon: "Dumbbell",
  },
  {
    id: HomepageCategoryId.Engineering,
    name: "Engineering",
    description: "Structures, circuits, and technical sizing.",
    icon: "Cpu",
  },
  {
    id: HomepageCategoryId.Construction,
    name: "Construction",
    description: "Materials, paint, concrete, and site estimates.",
    icon: "HardHat",
  },
  {
    id: HomepageCategoryId.Education,
    name: "Education",
    description: "GPA, grades, and learning productivity.",
    icon: "GraduationCap",
  },
  {
    id: HomepageCategoryId.Science,
    name: "Science",
    description: "Physics, chemistry, and lab helpers.",
    icon: "FlaskConical",
  },
  {
    id: HomepageCategoryId.Business,
    name: "Business",
    description: "Margins, break-even, and growth planning.",
    icon: "Briefcase",
  },
  {
    id: HomepageCategoryId.Utilities,
    name: "Utilities",
    description: "Everyday helpers for time, dates, and bills.",
    icon: "Wrench",
  },
  {
    id: HomepageCategoryId.Conversions,
    name: "Conversions",
    description: "Units, currency, and measurement converters.",
    icon: "ArrowLeftRight",
  },
];

const CALCULATOR_SEEDS: Array<{
  name: string;
  slug: string;
  categoryId: HomepageCategoryId;
  description: string;
  href?: string;
}> = [
  {
    name: "Home Loan EMI",
    slug: "home-loan-emi",
    categoryId: HomepageCategoryId.Finance,
    description: "Monthly EMI, interest, and amortisation estimates.",
    href: "/home-loan-emi",
  },
  {
    name: "SIP Calculator",
    slug: "sip",
    categoryId: HomepageCategoryId.Investment,
    description: "Project corpus growth from monthly investments.",
    href: "/calculators/sip",
  },
  {
    name: "BMI Calculator",
    slug: "bmi",
    categoryId: HomepageCategoryId.Health,
    description: "Body mass index with healthy range guidance.",
    href: "/calculators/bmi",
  },
  {
    name: "GST Calculator",
    slug: "gst",
    categoryId: HomepageCategoryId.Tax,
    description: "Inclusive and exclusive GST amount breakdowns.",
    href: "/calculators/gst",
  },
  {
    name: "Income Tax Calculator",
    slug: "income-tax",
    categoryId: HomepageCategoryId.Tax,
    description: "Simplified new-regime tax estimate blueprint.",
    href: "/calculators/income-tax",
  },
  {
    name: "Personal Loan EMI",
    slug: "personal-loan-emi",
    categoryId: HomepageCategoryId.Finance,
    description: "Compare personal loan EMIs across tenures.",
  },
  {
    name: "Car Loan EMI",
    slug: "car-loan-emi",
    categoryId: HomepageCategoryId.Finance,
    description: "Estimate auto loan payments and total interest.",
  },
  {
    name: "Credit Card Interest",
    slug: "credit-card-interest",
    categoryId: HomepageCategoryId.Finance,
    description: "Understand revolving interest on outstanding balances.",
  },
  {
    name: "Compound Interest",
    slug: "compound-interest",
    categoryId: HomepageCategoryId.Investment,
    description: "Compound growth with configurable frequency.",
  },
  {
    name: "Lumpsum Mutual Fund",
    slug: "lumpsum-mf",
    categoryId: HomepageCategoryId.Investment,
    description: "Future value of a one-time mutual fund investment.",
  },
  {
    name: "FD Maturity",
    slug: "fd-maturity",
    categoryId: HomepageCategoryId.Investment,
    description: "Fixed deposit maturity with compounding options.",
  },
  {
    name: "RD Calculator",
    slug: "rd-calculator",
    categoryId: HomepageCategoryId.Investment,
    description: "Recurring deposit maturity projections.",
  },
  {
    name: "Retirement Corpus",
    slug: "retirement-corpus",
    categoryId: HomepageCategoryId.Investment,
    description: "Estimate retirement savings goals and gaps.",
  },
  {
    name: "Capital Gains Tax",
    slug: "capital-gains-tax",
    categoryId: HomepageCategoryId.Tax,
    description: "Quick LTCG / STCG estimates for mock scenarios.",
  },
  {
    name: "Salary Hike",
    slug: "salary-hike",
    categoryId: HomepageCategoryId.Business,
    description: "Convert percentage hike into take-home impact.",
  },
  {
    name: "Break-even Point",
    slug: "break-even",
    categoryId: HomepageCategoryId.Business,
    description: "Find units needed to cover fixed and variable costs.",
  },
  {
    name: "Profit Margin",
    slug: "profit-margin",
    categoryId: HomepageCategoryId.Business,
    description: "Gross and net margin from revenue and cost inputs.",
  },
  {
    name: "Calorie Needs",
    slug: "calorie-needs",
    categoryId: HomepageCategoryId.Health,
    description: "Daily calorie estimate from activity and goals.",
  },
  {
    name: "Body Fat Estimate",
    slug: "body-fat",
    categoryId: HomepageCategoryId.Health,
    description: "Approximate body-fat percentage from measurements.",
  },
  {
    name: "Macro Split",
    slug: "macro-split",
    categoryId: HomepageCategoryId.Fitness,
    description: "Protein, carbs, and fat targets from calories.",
  },
  {
    name: "Running Pace",
    slug: "running-pace",
    categoryId: HomepageCategoryId.Fitness,
    description: "Pace and finish-time planner for race distances.",
  },
  {
    name: "One-Rep Max",
    slug: "one-rep-max",
    categoryId: HomepageCategoryId.Fitness,
    description: "Estimate 1RM from working sets and reps.",
  },
  {
    name: "Concrete Volume",
    slug: "concrete-volume",
    categoryId: HomepageCategoryId.Construction,
    description: "Slab and footing concrete volume estimates.",
  },
  {
    name: "Paint Calculator",
    slug: "paint-calculator",
    categoryId: HomepageCategoryId.Construction,
    description: "Paint quantity from wall area and coats.",
  },
  {
    name: "Tile Quantity",
    slug: "tile-quantity",
    categoryId: HomepageCategoryId.Construction,
    description: "Floor and wall tile counts with wastage.",
  },
  {
    name: "Beam Load",
    slug: "beam-load",
    categoryId: HomepageCategoryId.Engineering,
    description: "Simple beam reaction and bending estimates.",
  },
  {
    name: "Ohm's Law",
    slug: "ohms-law",
    categoryId: HomepageCategoryId.Engineering,
    description: "Voltage, current, and resistance relationships.",
  },
  {
    name: "Gear Ratio",
    slug: "gear-ratio",
    categoryId: HomepageCategoryId.Engineering,
    description: "Mechanical advantage from tooth counts.",
  },
  {
    name: "GPA Calculator",
    slug: "gpa-calculator",
    categoryId: HomepageCategoryId.Education,
    description: "Weighted GPA from credits and grades.",
  },
  {
    name: "Percentage Score",
    slug: "percentage-score",
    categoryId: HomepageCategoryId.Education,
    description: "Marks obtained to percentage conversion.",
  },
  {
    name: "Study Time Planner",
    slug: "study-time",
    categoryId: HomepageCategoryId.Education,
    description: "Distribute study hours across subjects.",
  },
  {
    name: "Ideal Gas Law",
    slug: "ideal-gas",
    categoryId: HomepageCategoryId.Science,
    description: "PV = nRT helper for classroom scenarios.",
  },
  {
    name: "pH Calculator",
    slug: "ph-calculator",
    categoryId: HomepageCategoryId.Science,
    description: "Approximate pH from hydrogen ion concentration.",
  },
  {
    name: "Velocity Converter",
    slug: "velocity-converter",
    categoryId: HomepageCategoryId.Science,
    description: "Convert between m/s, km/h, and mph.",
  },
  {
    name: "Currency Converter",
    slug: "currency-converter",
    categoryId: HomepageCategoryId.Conversions,
    description: "Mock FX conversion for popular currency pairs.",
  },
  {
    name: "Length Converter",
    slug: "length-converter",
    categoryId: HomepageCategoryId.Conversions,
    description: "Metric and imperial length unit conversion.",
  },
  {
    name: "Weight Converter",
    slug: "weight-converter",
    categoryId: HomepageCategoryId.Conversions,
    description: "Convert kg, lb, g, and oz quickly.",
  },
  {
    name: "Temperature Converter",
    slug: "temperature-converter",
    categoryId: HomepageCategoryId.Conversions,
    description: "Celsius, Fahrenheit, and Kelvin conversions.",
  },
  {
    name: "Time Zone Diff",
    slug: "timezone-diff",
    categoryId: HomepageCategoryId.Utilities,
    description: "Mock time difference between major cities.",
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    categoryId: HomepageCategoryId.Utilities,
    description: "Exact age in years, months, and days.",
  },
  {
    name: "Date Difference",
    slug: "date-difference",
    categoryId: HomepageCategoryId.Utilities,
    description: "Days between two dates with weekday context.",
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    categoryId: HomepageCategoryId.Utilities,
    description: "Final price after percentage discounts.",
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    categoryId: HomepageCategoryId.Utilities,
    description: "Split tips fairly across a dining group.",
  },
  {
    name: "Fuel Cost",
    slug: "fuel-cost",
    categoryId: HomepageCategoryId.Utilities,
    description: "Trip fuel spend from mileage and distance.",
  },
  {
    name: "Electricity Bill",
    slug: "electricity-bill",
    categoryId: HomepageCategoryId.Utilities,
    description: "Mock slab-based electricity bill estimate.",
  },
  {
    name: "Mortgage Affordability",
    slug: "mortgage-affordability",
    categoryId: HomepageCategoryId.Finance,
    description: "Estimate affordable home loan from income.",
  },
  {
    name: "Debt Payoff",
    slug: "debt-payoff",
    categoryId: HomepageCategoryId.Finance,
    description: "Snowball and avalanche payoff timelines.",
  },
  {
    name: "Inflation Impact",
    slug: "inflation-impact",
    categoryId: HomepageCategoryId.Finance,
    description: "Purchasing power over multi-year horizons.",
  },
  {
    name: "ROI Calculator",
    slug: "roi-calculator",
    categoryId: HomepageCategoryId.Business,
    description: "Return on investment for campaigns and assets.",
  },
  {
    name: "CAC Payback",
    slug: "cac-payback",
    categoryId: HomepageCategoryId.Business,
    description: "Months to recover customer acquisition cost.",
  },
];

function categoryName(id: HomepageCategoryId): string {
  return CATEGORY_META.find((item) => item.id === id)?.name ?? "General";
}

function buildCalculators(): HomepageCalculatorCard[] {
  return CALCULATOR_SEEDS.map((seed, index) => {
    const usageCount = 180000 - index * 2750 + ((index * 97) % 500);
    const popularity =
      usageCount > 140000
        ? CalculatorPopularity.Viral
        : usageCount > 100000
          ? CalculatorPopularity.High
          : usageCount > 60000
            ? CalculatorPopularity.Medium
            : CalculatorPopularity.Low;

    const day = String((index % 27) + 1).padStart(2, "0");
    const tones = [
      "from-sky-500/25 via-transparent to-transparent",
      "from-emerald-500/25 via-transparent to-transparent",
      "from-amber-500/25 via-transparent to-transparent",
      "from-rose-500/20 via-transparent to-transparent",
      "from-indigo-500/25 via-transparent to-transparent",
    ];
    return {
      id: `calc_${seed.slug}`,
      slug: seed.slug,
      name: seed.name,
      description: seed.description,
      categoryId: seed.categoryId,
      categoryName: categoryName(seed.categoryId),
      href: seed.href ?? `/calculators/${seed.slug}`,
      popularity,
      usageCount,
      readingMinutes: 3 + (index % 6),
      imageTone: tones[index % tones.length]!,
      featured: index < 8,
      trending: index % 5 === 0 || index < 6,
      recentlyAdded: index >= 40,
      editorsPick: index % 7 === 0,
      updatedAt: `2026-07-${day}T10:00:00.000Z`,
    };
  });
}

function buildCategories(
  calculators: HomepageCalculatorCard[],
): HomepageCategory[] {
  return CATEGORY_META.map((meta) => {
    const count = calculators.filter((c) => c.categoryId === meta.id).length;
    return {
      id: meta.id,
      name: meta.name,
      slug: meta.id,
      description: meta.description,
      icon: meta.icon,
      calculatorCount: Math.max(count, 3),
      href: `/#category-${meta.id}`,
    };
  });
}

function buildArticles(): HomepageArticleCard[] {
  const topics = [
    ["EMI Planning", "Finance"],
    ["SIP Discipline", "Investment"],
    ["GST Basics", "Tax"],
    ["BMI Myths", "Health"],
    ["Macro Timing", "Fitness"],
    ["Concrete Mix Tips", "Construction"],
    ["Beam Safety Checks", "Engineering"],
    ["GPA Strategies", "Education"],
    ["Lab Unit Pitfalls", "Science"],
    ["Margin Math", "Business"],
    ["Utility Bill Savings", "Utilities"],
    ["Unit Conversion Habits", "Conversions"],
    ["Prepayment Timing", "Finance"],
    ["Retirement Runway", "Investment"],
    ["Form 16 Checklist", "Tax"],
    ["Hydration Targets", "Health"],
    ["Race Pace Blocks", "Fitness"],
    ["Paint Coverage", "Construction"],
    ["Ohm's Law Intuition", "Engineering"],
    ["Study Sprint Plans", "Education"],
  ] as const;

  return topics.map(([title, category], index) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const tones = [
      "from-cyan-500/20 via-transparent to-transparent",
      "from-violet-500/20 via-transparent to-transparent",
      "from-lime-500/20 via-transparent to-transparent",
      "from-orange-500/20 via-transparent to-transparent",
    ];
    return {
      id: `article_${index + 1}`,
      slug,
      title: `${title}: a practical AZPPS guide`,
      excerpt:
        "Configuration-driven calculators pair with clear explanations so every estimate stays transparent and teachable.",
      category,
      author: index % 2 === 0 ? "AZPPS Editorial" : "Maya Reddy",
      publishedAt: `2026-0${(index % 6) + 1}-${String((index % 25) + 1).padStart(2, "0")}T09:00:00.000Z`,
      readingMinutes: 4 + (index % 7),
      href: `/#article-${slug}`,
      imageTone: tones[index % tones.length]!,
    };
  });
}

function buildTestimonials(): HomepageTestimonial[] {
  return [
    {
      id: "t1",
      name: "Ananya Sharma",
      role: "Product Manager",
      company: "FinServe",
      quote:
        "AZPPS feels like a calculator OS — fast, consistent, and trustworthy for customer-facing estimates.",
      rating: 5,
    },
    {
      id: "t2",
      name: "Rahul Mehta",
      role: "Founder",
      company: "BuildRight",
      quote:
        "We replaced scattered spreadsheets with AZPPS calculators. The construction tools alone paid for the switch.",
      rating: 5,
    },
    {
      id: "t3",
      name: "Sofia Alvarez",
      role: "SEO Lead",
      company: "ContentForge",
      quote:
        "SEO-first pages with clear formulas made our educational traffic compound week after week.",
      rating: 5,
    },
    {
      id: "t4",
      name: "Dev Patel",
      role: "Engineer",
      company: "CircuitLab",
      quote:
        "The engineering set is surprisingly polished. Clean inputs, instant results, zero clutter.",
      rating: 4,
    },
    {
      id: "t5",
      name: "Priya Nair",
      role: "CA",
      company: "Nair & Co.",
      quote:
        "Clients understand GST and tax estimates faster when we walk through AZPPS results together.",
      rating: 5,
    },
    {
      id: "t6",
      name: "Marcus Chen",
      role: "Coach",
      company: "Pulse Athletics",
      quote:
        "Fitness calculators are accurate enough for planning and simple enough for athletes to reuse.",
      rating: 4,
    },
    {
      id: "t7",
      name: "Leena Kapoor",
      role: "Teacher",
      company: "Horizon Academy",
      quote:
        "Students finally see why formulas matter. The education and science tools are classroom-ready.",
      rating: 5,
    },
    {
      id: "t8",
      name: "Omar Haddad",
      role: "Ops Lead",
      company: "RetailGrid",
      quote:
        "Business margin and ROI calculators help our managers decide without waiting on finance.",
      rating: 5,
    },
    {
      id: "t9",
      name: "Grace Okonkwo",
      role: "Designer",
      company: "Northlane",
      quote:
        "The homepage experience feels premium — search, categories, and trust signals are all in the right place.",
      rating: 5,
    },
    {
      id: "t10",
      name: "Vikram Joshi",
      role: "Analyst",
      company: "CapitalNest",
      quote:
        "Investment tools are consistent across SIP, FD, and retirement scenarios. Exactly what we needed.",
      rating: 4,
    },
  ];
}

function buildCollections(): HomepageCollection[] {
  return [
    {
      id: "col_personal_finance",
      name: "Personal Finance",
      description: "Budgets, EMI, and everyday money decisions.",
      calculatorCount: 12,
      href: "/#category-finance",
      accent: "from-sky-500/20 to-transparent",
    },
    {
      id: "col_loans",
      name: "Loans",
      description: "Home, car, and personal loan affordability.",
      calculatorCount: 8,
      href: "/home-loan-emi",
      accent: "from-indigo-500/20 to-transparent",
    },
    {
      id: "col_tax",
      name: "Tax",
      description: "GST and income tax estimate blueprints.",
      calculatorCount: 6,
      href: "/#category-tax",
      accent: "from-amber-500/20 to-transparent",
    },
    {
      id: "col_health",
      name: "Health",
      description: "BMI, calories, and wellness baselines.",
      calculatorCount: 7,
      href: "/#category-health",
      accent: "from-emerald-500/20 to-transparent",
    },
    {
      id: "col_construction",
      name: "Construction",
      description: "Materials and site quantity planning.",
      calculatorCount: 5,
      href: "/#category-construction",
      accent: "from-orange-500/20 to-transparent",
    },
    {
      id: "col_business",
      name: "Business",
      description: "Margins, break-even, and growth math.",
      calculatorCount: 6,
      href: "/#category-business",
      accent: "from-violet-500/20 to-transparent",
    },
    {
      id: "col_education",
      name: "Education",
      description: "GPA and study planning helpers.",
      calculatorCount: 4,
      href: "/#category-education",
      accent: "from-cyan-500/20 to-transparent",
    },
    {
      id: "col_engineering",
      name: "Engineering",
      description: "Technical sizing without spreadsheet friction.",
      calculatorCount: 5,
      href: "/#category-engineering",
      accent: "from-rose-500/20 to-transparent",
    },
    {
      id: "col_retirement",
      name: "Retirement",
      description: "Corpus and runway planning tools.",
      calculatorCount: 3,
      href: "/#featured",
      accent: "from-teal-500/20 to-transparent",
    },
    {
      id: "col_insurance",
      name: "Insurance",
      description: "Coverage and premium estimate starters.",
      calculatorCount: 3,
      href: "/#collections",
      accent: "from-fuchsia-500/20 to-transparent",
    },
  ];
}

export function createHomepagePayload(): HomepagePayload {
  const allCalculators = buildCalculators();
  const categories = buildCategories(allCalculators);
  const byUsage = [...allCalculators].sort(
    (a, b) => b.usageCount - a.usageCount,
  );
  const byUpdated = [...allCalculators].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );

  return {
    hero: {
      eyebrow: "AZPPS",
      headline: "Calculate Smarter. Learn Faster.",
      subheadline:
        "The AI-powered calculator platform for accurate estimates, transparent formulas, and educational clarity — across finance, tax, health, engineering, and more.",
      primaryCta: { label: "Explore calculators", href: "/#featured" },
      secondaryCta: {
        label: "Try AI Generator",
        href: HOMEPAGE_ROUTES.aiGenerator,
      },
      popularSearches: [
        "home loan emi",
        "sip calculator",
        "bmi",
        "gst inclusive",
        "income tax",
      ],
      trendingTags: ["EMI", "SIP", "GST", "BMI", "FD", "GPA"],
      trustBadges: [
        {
          id: TrustBadgeId.Free,
          label: "Free to use",
          description: "No paywall for core calculators",
        },
        {
          id: TrustBadgeId.Accurate,
          label: "Formula-transparent",
          description: "Clear methodology on every page",
        },
        {
          id: TrustBadgeId.Private,
          label: "Privacy-minded",
          description: "Mock-first, no account required",
        },
        {
          id: TrustBadgeId.Expert,
          label: "Expert content",
          description: "Guides paired with every tool",
        },
      ],
    },
    categories,
    featuredCalculators: allCalculators.filter((c) => c.featured).slice(0, 8),
    trendingCalculators: allCalculators.filter((c) => c.trending).slice(0, 8),
    mostUsedCalculators: byUsage.slice(0, 6),
    recentlyUpdatedCalculators: byUpdated.slice(0, 6),
    editorsPicks: allCalculators.filter((c) => c.editorsPick).slice(0, 6),
    recentlyAdded: allCalculators.filter((c) => c.recentlyAdded).slice(0, 8),
    collections: buildCollections(),
    articles: buildArticles(),
    statistics: [
      { id: "s1", label: "Calculators", value: 10000, suffix: "+" },
      { id: "s2", label: "Categories", value: 100, suffix: "+" },
      { id: "s3", label: "Monthly calculations", value: 1, suffix: "M+" },
      {
        id: "s4",
        label: "Accuracy target",
        value: 99.9,
        suffix: "%",
        decimals: 1,
      },
    ],
    testimonials: buildTestimonials(),
    whyItems: [
      {
        id: "w1",
        title: "AI Powered",
        description:
          "Generate calculator blueprints from natural language prompts.",
        icon: "Sparkles",
      },
      {
        id: "w2",
        title: "Accurate",
        description: "Configuration-driven engines keep formulas consistent.",
        icon: "Target",
      },
      {
        id: "w3",
        title: "Fast",
        description: "Instant results with a mobile-first interaction model.",
        icon: "Zap",
      },
      {
        id: "w4",
        title: "Trusted",
        description:
          "Transparent methodology and educational context on every page.",
        icon: "ShieldCheck",
      },
      {
        id: "w5",
        title: "Thousands of Calculators",
        description:
          "A growing catalog across finance, health, STEM, and business.",
        icon: "Layers",
      },
      {
        id: "w6",
        title: "Expert Content",
        description:
          "Articles and worked examples that teach while you calculate.",
        icon: "BookOpen",
      },
      {
        id: "w7",
        title: "Free to Use",
        description: "Start estimating immediately — no subscription required.",
        icon: "BadgeCheck",
      },
    ],
    benefits: [
      {
        id: "b1",
        title: "Search once, find everything",
        description:
          "Global discovery across names, categories, and long-tail keywords.",
        icon: "Search",
      },
      {
        id: "b2",
        title: "Learn while you calculate",
        description: "SEO-ready pages pair results with formulas and guidance.",
        icon: "Lightbulb",
      },
      {
        id: "b3",
        title: "Built for return visits",
        description:
          "Trending, collections, and recent tools keep the catalog fresh.",
        icon: "RefreshCw",
      },
      {
        id: "b4",
        title: "Enterprise craft",
        description:
          "Accessible, responsive, and configuration-driven by design.",
        icon: "Building2",
      },
    ],
    aiPromo: {
      title: "AI Calculator Generator",
      description:
        "Describe a calculator in plain language and generate a reviewable blueprint — never auto-published.",
      benefits: [
        "Natural-language prompts",
        "Template-aware generation",
        "Human review before publish",
      ],
      examplePrompt:
        "Create a home renovation budget calculator with paint, tiles, and labour inputs.",
      cta: {
        label: "Open AI Factory",
        href: HOMEPAGE_ROUTES.aiGenerator,
      },
    },
    newsletter: {
      title: "Get smarter calculation tips",
      description:
        "Monthly product updates, featured calculators, and practical money/health/STEM guides.",
      benefits: [
        "New calculator alerts",
        "Editorial deep-dives",
        "No spam — unsubscribe anytime",
      ],
      privacyNote:
        "Mock signup only. No email is stored or sent in this foundation build.",
      placeholder: "you@company.com",
    },
    popularSearches: [
      "home loan emi",
      "sip returns",
      "gst calculator",
      "bmi calculator",
      "income tax",
      "fd maturity",
    ],
    recentSearches: ["paint calculator", "gpa", "compound interest"],
    searchSuggestions: allCalculators.slice(0, 12).map((calc) => ({
      id: `sug_${calc.id}`,
      label: calc.name,
      href: calc.href,
      kind: "calculator" as const,
    })),
    ad: {
      id: "ad_home_banner",
      placement: HomepageAdPlacement.Banner,
      label: "Homepage banner",
      size: "970×90",
      enabled: true,
    },
    allCalculators,
  };
}
