import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Permissions",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/administration/permissions" />;
}
