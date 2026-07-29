"use client";

import { TemplateCard } from "@/features/calculator-templates/components/template-card";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";

export type TemplateGridProps = {
  items: CalculatorTemplate[];
  onOpen: (template: CalculatorTemplate) => void;
  onPreview: (template: CalculatorTemplate) => void;
  onEdit: (template: CalculatorTemplate) => void;
};

export function TemplateGrid({
  items,
  onOpen,
  onPreview,
  onEdit,
}: TemplateGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground py-10 text-center text-sm">
        No templates match the current filters.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((template) => (
        <TemplateCard
          key={template.metadata.id}
          template={template}
          onOpen={onOpen}
          onPreview={onPreview}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
