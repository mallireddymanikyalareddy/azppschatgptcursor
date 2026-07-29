"use client";

import type { RelatedSuggestion } from "@/features/ai-calculator-generator/types";

export type SuggestionPanelProps = {
  items: RelatedSuggestion[];
};

export function SuggestionPanel({ items }: SuggestionPanelProps) {
  return (
    <section className="space-y-3 rounded-md border p-4">
      <h2 className="text-base font-semibold">Suggestions</h2>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No suggestions.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-md border px-3 py-2 text-sm">
              <p className="font-medium">
                <span className="text-muted-foreground capitalize">
                  {item.kind}
                </span>{" "}
                · {item.title}
              </p>
              <p className="text-muted-foreground text-xs">{item.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
