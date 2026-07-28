"use client";

import * as React from "react";

export type UseCalculatorSelectionResult = {
  selectedIds: Set<string>;
  selectedCount: number;
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  selectMany: (ids: string[]) => void;
  clear: () => void;
  togglePage: (pageIds: string[]) => void;
  allPageSelected: (pageIds: string[]) => boolean;
};

export function useCalculatorSelection(): UseCalculatorSelectionResult {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    () => new Set(),
  );

  const toggle = React.useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectMany = React.useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clear = React.useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const togglePage = React.useCallback((pageIds: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = pageIds.every((id) => prev.has(id));
      const next = new Set(prev);
      if (allSelected) {
        for (const id of pageIds) next.delete(id);
      } else {
        for (const id of pageIds) next.add(id);
      }
      return next;
    });
  }, []);

  const isSelected = React.useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds],
  );

  const allPageSelected = React.useCallback(
    (pageIds: string[]) =>
      pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id)),
    [selectedIds],
  );

  return {
    selectedIds,
    selectedCount: selectedIds.size,
    isSelected,
    toggle,
    selectMany,
    clear,
    togglePage,
    allPageSelected,
  };
}
