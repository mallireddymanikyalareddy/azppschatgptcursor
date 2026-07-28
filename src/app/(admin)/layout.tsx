import type { Metadata } from "next";

import { AdminShell } from "@/features/admin";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · AZPPS Admin",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
