"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LibraryBadges } from "@/features/calculator-library/components/library-badges";
import type { LibraryCalculator } from "@/features/calculator-library/types";
import { ADMIN_ROUTES } from "@/features/admin/constants/routes";

export type LibraryDetailDrawerProps = {
  calculator: LibraryCalculator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreview: (item: LibraryCalculator) => void;
};

export function LibraryDetailDrawer({
  calculator,
  open,
  onOpenChange,
  onPreview,
}: LibraryDetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        {calculator ? (
          <>
            <SheetHeader>
              <SheetTitle>{calculator.name}</SheetTitle>
              <SheetDescription className="font-mono text-xs">
                {calculator.slug}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 px-4 pb-4">
              <LibraryBadges calculator={calculator} />
              <p className="text-sm leading-relaxed">
                {calculator.description}
              </p>

              <MetaGrid
                rows={[
                  ["Category", calculator.category.name],
                  ["Subcategory", calculator.subcategory ?? "—"],
                  ["Status", calculator.status],
                  ["Visibility", calculator.visibility],
                  ["Difficulty", calculator.difficulty],
                  ["Version", calculator.version],
                  ["Created by", calculator.createdBy],
                  [
                    "Created",
                    new Date(calculator.createdAt).toLocaleString("en-IN"),
                  ],
                  [
                    "Updated",
                    new Date(calculator.updatedAt).toLocaleString("en-IN"),
                  ],
                  ["Usage", calculator.usageCount.toLocaleString("en-IN")],
                  ["Inputs", String(calculator.inputCount)],
                  ["Formulas", String(calculator.formulaCount)],
                  ["Charts", String(calculator.chartCount)],
                  ["Results", String(calculator.resultCount)],
                  ["SEO", calculator.seoComplete ? "Complete" : "Incomplete"],
                  [
                    "Content",
                    calculator.contentComplete ? "Complete" : "Incomplete",
                  ],
                  ["Public path", calculator.publicPath],
                ]}
              />

              <div>
                <p className="mb-2 text-sm font-medium">Tags</p>
                <p className="text-muted-foreground text-sm">
                  {calculator.tags.length > 0
                    ? calculator.tags.join(", ")
                    : "No tags"}
                </p>
              </div>
            </div>

            <SheetFooter>
              <Button type="button" variant="secondary" asChild>
                <Link href={ADMIN_ROUTES.calculatorBuilder}>
                  Edit in Builder
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onPreview(calculator)}
              >
                Quick preview
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={calculator.publicPath} target="_blank">
                  Open public page
                </Link>
              </Button>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function MetaGrid({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="capitalize">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
