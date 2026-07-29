"use client";

import { Button } from "@/components/ui/button";
import { PromptLibraryCategory } from "@/features/ai-calculator-generator/constants/enums";
import { usePromptLibrary } from "@/features/ai-calculator-generator/hooks/use-prompt-library";

export type PromptLibraryPanelProps = {
  onSelect: (prompt: string, industry?: string) => void;
};

export function PromptLibraryPanel({ onSelect }: PromptLibraryPanelProps) {
  const library = usePromptLibrary();

  return (
    <section className="space-y-3 rounded-md border p-4">
      <div>
        <h2 className="text-base font-semibold">Prompt library</h2>
        <p className="text-muted-foreground text-sm">
          Reusable examples by category.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={library.category === "all" ? "secondary" : "outline"}
          onClick={() => library.setCategory("all")}
        >
          All
        </Button>
        {Object.values(PromptLibraryCategory).map((category) => (
          <Button
            key={category}
            type="button"
            size="sm"
            variant={library.category === category ? "secondary" : "outline"}
            className="capitalize"
            onClick={() => library.setCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <ul className="space-y-2">
        {library.filtered.map((item) => (
          <li key={item.id}>
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-2 py-2 text-left whitespace-normal"
              onClick={() => onSelect(item.prompt, item.industry)}
            >
              <span>
                <span className="font-medium">{item.title}</span>
                <span className="text-muted-foreground mt-0.5 block text-xs">
                  {item.prompt}
                </span>
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
