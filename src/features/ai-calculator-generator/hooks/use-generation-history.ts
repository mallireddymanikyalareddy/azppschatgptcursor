"use client";

import * as React from "react";

import type { GenerationHistoryItem } from "@/features/ai-calculator-generator/types";
import { aiGeneratorService } from "@/features/ai-calculator-generator/services";

export type UseGenerationHistoryResult = {
  items: GenerationHistoryItem[];
  loading: boolean;
  refresh: () => void;
};

export function useGenerationHistory(): UseGenerationHistoryResult {
  const [items, setItems] = React.useState<GenerationHistoryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void aiGeneratorService.listHistory().then((data) => {
      if (!cancelled) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const refresh = React.useCallback(() => {
    setToken((value) => value + 1);
  }, []);

  return { items, loading, refresh };
}
