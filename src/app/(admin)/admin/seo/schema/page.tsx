import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Schema",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/seo/schema" />;
}
