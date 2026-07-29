import type { Metadata } from "next";

import { TemplateLibraryPage } from "@/features/calculator-templates";

export const metadata: Metadata = {
  title: "Calculator Templates",
};

export default function Page() {
  return <TemplateLibraryPage />;
}
