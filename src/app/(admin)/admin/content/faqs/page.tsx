import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "FAQs",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/content/faqs" />;
}
