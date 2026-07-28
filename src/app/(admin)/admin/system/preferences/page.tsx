import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Preferences",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/system/preferences" />;
}
