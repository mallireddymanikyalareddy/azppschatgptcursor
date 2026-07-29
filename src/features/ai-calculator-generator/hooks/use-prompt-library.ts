"use client";

import * as React from "react";

import type { PromptLibraryItem } from "@/features/ai-calculator-generator/types";
import type { PromptLibraryCategory } from "@/features/ai-calculator-generator/constants/enums";
import { aiGeneratorService } from "@/features/ai-calculator-generator/services";

export type UsePromptLibraryResult = {
  items: PromptLibraryItem[];
  category: PromptLibraryCategory | "all";
  setCategory: (category: PromptLibraryCategory | "all") => void;
  filtered: PromptLibraryItem[];
};

export function usePromptLibrary(): UsePromptLibraryResult {
  const [items] = React.useState(() => aiGeneratorService.getPromptLibrary());
  const [category, setCategory] = React.useState<PromptLibraryCategory | "all">(
    "all",
  );

  const filtered = React.useMemo(() => {
    if (category === "all") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return { items, category, setCategory, filtered };
}
