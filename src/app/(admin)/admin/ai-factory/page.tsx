import type { Metadata } from "next";

import { AIGeneratorDashboard } from "@/features/ai-calculator-generator";

export const metadata: Metadata = {
  title: "AI Generator",
};

export default function Page() {
  return <AIGeneratorDashboard />;
}
