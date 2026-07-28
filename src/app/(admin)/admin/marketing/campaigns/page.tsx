import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Campaigns",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/marketing/campaigns" />;
}
