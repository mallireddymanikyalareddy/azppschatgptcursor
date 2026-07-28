import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Sitemap",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/seo/sitemap" />;
}
