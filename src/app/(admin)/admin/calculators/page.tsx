import type { Metadata } from "next";

import { CalculatorLibraryPage } from "@/features/calculator-library";

export const metadata: Metadata = {
  title: "Calculator Library",
};

export default function Page() {
  return <CalculatorLibraryPage />;
}
