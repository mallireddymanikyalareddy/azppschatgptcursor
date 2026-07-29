export const HOMEPAGE_ROUTES = {
  home: "/",
  categories: "/#categories",
  calculators: "/#featured",
  articles: "/#articles",
  aiGenerator: "/admin/ai-factory",
  about: "/#why-azpps",
  contact: "/#newsletter",
  signIn: "/login",
  dashboard: "/admin",
} as const;

export const HOMEPAGE_SEO = {
  title: "AZPPS — AI-Powered Calculator Platform",
  description:
    "Calculate smarter and learn faster with thousands of accurate, free calculators across finance, tax, health, engineering, and more — powered by AZPPS.",
  canonicalPath: "/",
  keywords: [
    "AI calculator",
    "online calculator",
    "EMI calculator",
    "tax calculator",
    "BMI calculator",
    "AZPPS",
    "free calculators",
  ],
} as const;
