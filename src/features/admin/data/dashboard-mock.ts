export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  trend?: string;
};

export type DashboardActivity = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

/** Mock-only dashboard metrics — no backend. */
export const MOCK_DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "total-calculators",
    label: "Total Calculators",
    value: "1,248",
    hint: "Across all categories",
    trend: "+12 this week",
  },
  {
    id: "drafts",
    label: "Drafts",
    value: "86",
    hint: "Awaiting review",
    trend: "14 updated today",
  },
  {
    id: "published",
    label: "Published",
    value: "1,102",
    hint: "Live on platform",
    trend: "+8 published",
  },
  {
    id: "categories",
    label: "Categories",
    value: "42",
    hint: "Active taxonomies",
  },
  {
    id: "ai-jobs",
    label: "AI Jobs",
    value: "19",
    hint: "Queued + running (mock)",
    trend: "3 failed",
  },
  {
    id: "traffic",
    label: "Traffic",
    value: "284k",
    hint: "Visits (30d mock)",
    trend: "+6.2%",
  },
];

export const MOCK_RECENT_ACTIVITY: DashboardActivity[] = [
  {
    id: "a1",
    title: "Mortgage calculator published",
    detail: "Editor · Calculator Management",
    time: "12 min ago",
  },
  {
    id: "a2",
    title: "Category “Finance” updated",
    detail: "Admin · Categories",
    time: "41 min ago",
  },
  {
    id: "a3",
    title: "AI queue item completed",
    detail: "System · AI Factory (mock)",
    time: "1 hr ago",
  },
  {
    id: "a4",
    title: "SEO metadata draft saved",
    detail: "Author · SEO",
    time: "2 hr ago",
  },
  {
    id: "a5",
    title: "Role permissions reviewed",
    detail: "Super Admin · Administration",
    time: "Yesterday",
  },
];
