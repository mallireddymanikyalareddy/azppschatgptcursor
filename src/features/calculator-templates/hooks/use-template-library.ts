"use client";

import * as React from "react";

import {
  TemplateViewMode,
  type TemplateViewMode as ViewMode,
} from "@/features/calculator-templates/constants/enums";
import {
  createDefaultTemplateFilters,
  type CalculatorTemplate,
  type TemplateLibraryFilters,
  type TemplateLibraryPageResult,
} from "@/features/calculator-templates/types";
import { templateService } from "@/features/calculator-templates/services";

const VIEW_STORAGE_KEY = "azpps.template-library.view";

export type UseTemplateLibraryResult = {
  loading: boolean;
  result: TemplateLibraryPageResult | null;
  filters: TemplateLibraryFilters;
  setFilters: React.Dispatch<React.SetStateAction<TemplateLibraryFilters>>;
  patchFilters: (patch: Partial<TemplateLibraryFilters>) => void;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  refresh: () => void;
  notice: string | null;
  setNotice: (message: string | null) => void;
  activeTemplate: CalculatorTemplate | null;
  setActiveTemplate: (template: CalculatorTemplate | null) => void;
  previewTemplate: CalculatorTemplate | null;
  setPreviewTemplate: (template: CalculatorTemplate | null) => void;
  builderTemplate: CalculatorTemplate | null;
  setBuilderTemplate: (template: CalculatorTemplate | null) => void;
  duplicate: (id: string) => Promise<void>;
  archive: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export function useTemplateLibrary(): UseTemplateLibraryResult {
  const [filters, setFilters] = React.useState(createDefaultTemplateFilters);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState<TemplateLibraryPageResult | null>(
    null,
  );
  const [refreshToken, setRefreshToken] = React.useState(0);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] =
    React.useState<CalculatorTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] =
    React.useState<CalculatorTemplate | null>(null);
  const [builderTemplate, setBuilderTemplate] =
    React.useState<CalculatorTemplate | null>(null);

  const [viewMode, setViewModeState] = React.useState<ViewMode>(() => {
    if (typeof window === "undefined") return TemplateViewMode.Grid;
    const stored = window.sessionStorage.getItem(VIEW_STORAGE_KEY);
    return stored === TemplateViewMode.Table
      ? TemplateViewMode.Table
      : TemplateViewMode.Grid;
  });

  const setViewMode = React.useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    window.sessionStorage.setItem(VIEW_STORAGE_KEY, mode);
  }, []);

  const patchFilters = React.useCallback(
    (patch: Partial<TemplateLibraryFilters>) => {
      setFilters((prev) => ({ ...prev, ...patch }));
    },
    [],
  );

  React.useEffect(() => {
    setPage(1);
  }, [filters, pageSize]);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void templateService
      .query(filters, page, pageSize)
      .then((data) => {
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters, page, pageSize, refreshToken]);

  const refresh = React.useCallback(() => {
    setRefreshToken((value) => value + 1);
    setNotice("Template library refreshed from mock repository.");
  }, []);

  const duplicate = React.useCallback(async (id: string) => {
    const copy = await templateService.duplicate(id);
    if (copy) {
      setNotice(`Duplicated “${copy.metadata.name}” (mock).`);
      setRefreshToken((value) => value + 1);
    }
  }, []);

  const archive = React.useCallback(async (id: string) => {
    const archived = await templateService.archive(id);
    if (archived) {
      setNotice(`Archived “${archived.metadata.name}” (mock).`);
      setRefreshToken((value) => value + 1);
    }
  }, []);

  const remove = React.useCallback(async (id: string) => {
    const ok = await templateService.delete(id);
    if (ok) {
      setNotice("Template deleted (mock — session only).");
      setActiveTemplate(null);
      setRefreshToken((value) => value + 1);
    }
  }, []);

  return {
    loading,
    result,
    filters,
    setFilters,
    patchFilters,
    page,
    pageSize,
    setPage,
    setPageSize,
    viewMode,
    setViewMode,
    refresh,
    notice,
    setNotice,
    activeTemplate,
    setActiveTemplate,
    previewTemplate,
    setPreviewTemplate,
    builderTemplate,
    setBuilderTemplate,
    duplicate,
    archive,
    remove,
  };
}
