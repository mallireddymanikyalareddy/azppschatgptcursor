import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Social Posts",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/marketing/social-posts" />;
}
