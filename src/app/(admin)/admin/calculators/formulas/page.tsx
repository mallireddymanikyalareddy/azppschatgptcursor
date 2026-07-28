import type { Metadata } from "next";

import { AdminPlaceholderPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Formula Library",
};

export default function Page() {
  return <AdminPlaceholderPage href="/admin/calculators/formulas" />;
}
