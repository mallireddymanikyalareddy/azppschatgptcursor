"use client";

import * as React from "react";

import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import { usePreview } from "@/features/calculator-builder/hooks/use-preview";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { templateService } from "@/features/calculator-templates/services";

export type UseTemplatePreviewResult = {
  definition: CalculatorBuilderDefinition;
  preview: ReturnType<typeof usePreview>;
  seoPreview: {
    title: string;
    description: string;
    keywords: string[];
    canonical?: string;
  };
  contentSections: CalculatorTemplate["content"];
};

/**
 * Preview a template by generating a builder definition and reusing
 * Form + Calculation + Results engines via the existing usePreview hook.
 */
export function useTemplatePreview(
  template: CalculatorTemplate,
): UseTemplatePreviewResult {
  const definition = React.useMemo(
    () => templateService.generateBuilderDefinition(template),
    [template],
  );

  const preview = usePreview(definition);

  const seoPreview = React.useMemo(
    () => ({
      title: definition.seo.title,
      description: definition.seo.description,
      keywords: definition.seo.keywords,
      canonical: definition.seo.canonical,
    }),
    [definition.seo],
  );

  return {
    definition,
    preview,
    seoPreview,
    contentSections: template.content,
  };
}
