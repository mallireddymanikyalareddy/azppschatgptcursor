export type AdminNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  category: "system" | "content" | "security" | "ai";
};

/** UI-only notifications — no backend. */
export const MOCK_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "n1",
    title: "Publish queue ready",
    body: "3 calculator drafts are ready for review.",
    time: "5m",
    read: false,
    category: "content",
  },
  {
    id: "n2",
    title: "AI job finished",
    body: "Mock generation job #4821 completed successfully.",
    time: "28m",
    read: false,
    category: "ai",
  },
  {
    id: "n3",
    title: "Security reminder",
    body: "Review API keys older than 90 days (placeholder).",
    time: "2h",
    read: true,
    category: "security",
  },
  {
    id: "n4",
    title: "System maintenance",
    body: "Scheduled window listed for Sunday 02:00 UTC.",
    time: "1d",
    read: true,
    category: "system",
  },
];
