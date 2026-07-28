export type GlobalSearchResult = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: "Calculators" | "Users" | "Categories" | "Content" | "Commands";
};

/** Mock global search corpus — no backend. */
export const MOCK_SEARCH_RESULTS: GlobalSearchResult[] = [
  {
    id: "s1",
    title: "Compound Interest Calculator",
    subtitle: "Finance · Published",
    href: "/admin/calculators",
    category: "Calculators",
  },
  {
    id: "s2",
    title: "BMI Calculator",
    subtitle: "Health · Draft",
    href: "/admin/calculators",
    category: "Calculators",
  },
  {
    id: "s3",
    title: "Demo User",
    subtitle: "demo@azpps.com · Editor",
    href: "/admin/administration/users",
    category: "Users",
  },
  {
    id: "s4",
    title: "Finance",
    subtitle: "Category · 128 calculators",
    href: "/admin/calculators/categories",
    category: "Categories",
  },
  {
    id: "s5",
    title: "How mortgage rates work",
    subtitle: "Article · Content",
    href: "/admin/content/articles",
    category: "Content",
  },
  {
    id: "s6",
    title: "Go to Roles",
    subtitle: "Command · Administration",
    href: "/admin/administration/roles",
    category: "Commands",
  },
  {
    id: "s7",
    title: "Open Settings",
    subtitle: "Command · System",
    href: "/admin/system/settings",
    category: "Commands",
  },
];
