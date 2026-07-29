import {
  PromptIndustry,
  PromptLibraryCategory,
} from "@/features/ai-calculator-generator/constants/enums";
import type { PromptLibraryItem } from "@/features/ai-calculator-generator/types";

/** Reusable prompt examples grouped by category. */
export const PROMPT_LIBRARY: PromptLibraryItem[] = [
  {
    id: "pl_home_loan",
    title: "Home Loan EMI",
    prompt: "Create a Home Loan EMI Calculator",
    category: PromptLibraryCategory.Loans,
    industry: PromptIndustry.Finance,
    tags: ["emi", "mortgage", "india"],
  },
  {
    id: "pl_uk_mortgage",
    title: "UK Mortgage",
    prompt: "Create a UK Mortgage Calculator",
    category: PromptLibraryCategory.Loans,
    industry: PromptIndustry.Finance,
    tags: ["mortgage", "uk"],
  },
  {
    id: "pl_gst",
    title: "GST India",
    prompt: "Create a GST Calculator for India",
    category: PromptLibraryCategory.Tax,
    industry: PromptIndustry.Tax,
    tags: ["gst", "india"],
  },
  {
    id: "pl_body_fat",
    title: "Body Fat",
    prompt: "Create a Body Fat Calculator",
    category: PromptLibraryCategory.Health,
    industry: PromptIndustry.Health,
    tags: ["fitness", "health"],
  },
  {
    id: "pl_retirement",
    title: "Retirement Planner",
    prompt: "Create a Retirement Planner",
    category: PromptLibraryCategory.Retirement,
    industry: PromptIndustry.Finance,
    tags: ["retirement", "corpus"],
  },
  {
    id: "pl_fuel",
    title: "Fuel Cost",
    prompt: "Create a Fuel Cost Calculator",
    category: PromptLibraryCategory.Utilities,
    industry: PromptIndustry.Utility,
    tags: ["fuel", "mileage"],
  },
  {
    id: "pl_sip",
    title: "SIP",
    prompt: "Create an SIP Calculator for monthly investments",
    category: PromptLibraryCategory.Investments,
    industry: PromptIndustry.Investment,
    tags: ["sip", "mutual funds"],
  },
  {
    id: "pl_cagr",
    title: "CAGR",
    prompt: "Create a CAGR Calculator",
    category: PromptLibraryCategory.Investments,
    industry: PromptIndustry.Investment,
    tags: ["cagr", "returns"],
  },
  {
    id: "pl_income_tax",
    title: "Income Tax",
    prompt: "Create an Income Tax Calculator",
    category: PromptLibraryCategory.Tax,
    industry: PromptIndustry.Tax,
    tags: ["income tax"],
  },
];
