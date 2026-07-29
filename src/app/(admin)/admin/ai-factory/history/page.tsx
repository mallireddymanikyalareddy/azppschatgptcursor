import type { Metadata } from "next";

import { AIHistoryPage } from "@/features/ai-calculator-generator";

export const metadata: Metadata = {
  title: "AI History",
};

export default function Page() {
  return <AIHistoryPage />;
}
