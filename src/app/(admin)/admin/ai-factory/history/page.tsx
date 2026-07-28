import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "AI History",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/ai-factory/history" />;
}
