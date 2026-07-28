import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/system/settings" />;
}
