import type { Metadata } from "next";

import { AdminDashboardOverview } from "@/features/admin";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminDashboardPage() {
  return <AdminDashboardOverview />;
}
