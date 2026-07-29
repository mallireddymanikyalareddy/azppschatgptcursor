"use client";

import { Button } from "@/components/ui/button";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";

export type TemplateCategoriesProps = {
  categories: { name: string; count: number }[];
  active: string | "all";
  onSelect: (category: string | "all") => void;
};

export function TemplateCategories({
  categories,
  active,
  onSelect,
}: TemplateCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        size="sm"
        variant={active === "all" ? "secondary" : "outline"}
        onClick={() => onSelect("all")}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.name}
          type="button"
          size="sm"
          variant={active === category.name ? "secondary" : "outline"}
          onClick={() => onSelect(category.name)}
        >
          {category.name}
          <span className="text-muted-foreground tabular-nums">
            {category.count}
          </span>
        </Button>
      ))}
    </div>
  );
}

export type TemplateSpotlightProps = {
  title: string;
  items: CalculatorTemplate[];
  onOpen: (template: CalculatorTemplate) => void;
};

export function TemplateSpotlight({
  title,
  items,
  onOpen,
}: TemplateSpotlightProps) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((template) => (
          <Button
            key={template.metadata.id}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onOpen(template)}
          >
            {template.metadata.name}
          </Button>
        ))}
      </div>
    </section>
  );
}
