import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "AZPPS enterprise design system — tokens, themes, and reusable UI components.",
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
