import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Audit Logs",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/administration/audit-logs" />;
}
