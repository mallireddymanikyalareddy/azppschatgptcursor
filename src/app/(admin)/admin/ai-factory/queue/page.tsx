import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "AI Queue",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/ai-factory/queue" />;
}
