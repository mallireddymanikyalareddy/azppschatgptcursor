import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Integrations",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/system/integrations" />;
}
