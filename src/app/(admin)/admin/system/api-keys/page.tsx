import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "API Keys",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/system/api-keys" />;
}
