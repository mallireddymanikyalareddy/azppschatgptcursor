"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { LibraryCalculator } from "@/features/calculator-library/types";

export type LibraryPreviewSheetProps = {
  calculator: LibraryCalculator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * In-page quick preview of configuration — does not leave the library.
 */
export function LibraryPreviewSheet({
  calculator,
  open,
  onOpenChange,
}: LibraryPreviewSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        {calculator ? (
          <>
            <SheetHeader>
              <SheetTitle>Preview · {calculator.name}</SheetTitle>
              <SheetDescription>
                Configuration snapshot without leaving the library.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-5 px-4 pb-6">
              <Section title="Metadata">
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>Slug: {calculator.slug}</li>
                  <li>Category: {calculator.category.name}</li>
                  <li>Version: {calculator.version}</li>
                  <li>Status: {calculator.status}</li>
                  <li>Visibility: {calculator.visibility}</li>
                </ul>
              </Section>

              <Section title="Input summary">
                <p className="text-sm">
                  {calculator.inputCount} configured input
                  {calculator.inputCount === 1 ? "" : "s"}
                  {calculator.templateBased ? " · template-based" : ""}
                  {calculator.aiGenerated ? " · AI assisted" : ""}
                </p>
              </Section>

              <Section title="Result configuration">
                <p className="text-sm">
                  {calculator.resultCount} result metric
                  {calculator.resultCount === 1 ? "" : "s"} ·{" "}
                  {calculator.formulaCount} formula
                  {calculator.formulaCount === 1 ? "" : "s"}
                </p>
              </Section>

              <Section title="Charts">
                <p className="text-sm">
                  {calculator.chartCount > 0
                    ? `${calculator.chartCount} chart configuration${calculator.chartCount === 1 ? "" : "s"}`
                    : "No charts configured"}
                </p>
              </Section>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}
