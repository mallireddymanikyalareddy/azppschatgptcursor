import type { Metadata } from "next";

import {
  CalculatorBuilder,
  homeLoanEmiBuilderDefinition,
} from "@/features/calculator-builder";

export const metadata: Metadata = {
  title: "Calculator Builder",
};

/**
 * Hosts the Calculator Builder without changing admin dashboard chrome/nav.
 */
export default function CalculatorBuilderPage() {
  return (
    <div className="p-4 md:p-6">
      <CalculatorBuilder initial={homeLoanEmiBuilderDefinition} />
    </div>
  );
}
