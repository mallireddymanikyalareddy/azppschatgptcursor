"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LibraryStats } from "@/features/calculator-library/types";

const STATS: { key: keyof LibraryStats; label: string; hint: string }[] = [
  { key: "total", label: "Total Calculators", hint: "Full catalog size" },
  { key: "published", label: "Published", hint: "Live on platform" },
  { key: "draft", label: "Draft", hint: "Work in progress" },
  { key: "archived", label: "Archived", hint: "Retired definitions" },
  { key: "recentlyUpdated", label: "Recently Updated", hint: "Last 14 days" },
  { key: "aiGenerated", label: "AI Generated", hint: "Mock AI flag" },
  {
    key: "templateBased",
    label: "Template Based",
    hint: "Started from template",
  },
];

export function CalculatorLibraryStats({ stats }: { stats: LibraryStats }) {
  return (
    <section aria-label="Library statistics">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card
            key={stat.key}
            className="hover:border-border/90 gap-3 py-4 transition-colors"
          >
            <CardHeader className="pb-0">
              <CardDescription className="text-xs tracking-wide uppercase">
                {stat.label}
              </CardDescription>
              <CardTitle className="font-mono text-3xl tracking-tight tabular-nums">
                {stats[stat.key].toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
