import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Calculators",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/calculators" />;
}
