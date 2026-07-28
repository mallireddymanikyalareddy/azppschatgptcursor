import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Users",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/administration/users" />;
}
