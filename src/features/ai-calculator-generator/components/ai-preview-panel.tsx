"use client";

import { PreviewPanel } from "@/features/calculator-builder/components/preview-panel";
import { usePreview } from "@/features/calculator-builder/hooks/use-preview";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

export type AIPreviewPanelProps = {
  definition: CalculatorBuilderDefinition;
};

function LivePreview({
  definition,
}: {
  definition: CalculatorBuilderDefinition;
}) {
  const preview = usePreview(definition);
  return (
    <div className="space-y-4">
      <PreviewPanel preview={preview} />
      <section className="space-y-2 rounded-md border p-3">
        <h3 className="text-sm font-medium">SEO preview</h3>
        <p className="text-sm font-medium">{definition.seo.title}</p>
        <p className="text-muted-foreground text-sm">
          {definition.seo.description}
        </p>
        <p className="text-muted-foreground font-mono text-xs">
          {definition.seo.canonical ?? `/${definition.metadata.slug}`}
        </p>
        <p className="text-muted-foreground text-xs">
          Keywords: {definition.seo.keywords.join(", ")}
        </p>
      </section>
      <section className="space-y-2 rounded-md border p-3">
        <h3 className="text-sm font-medium">Content preview</h3>
        <p className="text-muted-foreground line-clamp-6 text-sm">
          {definition.content.introduction}
        </p>
        <p className="text-muted-foreground text-xs">
          FAQs: {definition.content.faqs.length} · Tips:{" "}
          {definition.content.tips.length} · Examples:{" "}
          {definition.content.examples.length}
        </p>
      </section>
    </div>
  );
}

export function AIPreviewPanel({ definition }: AIPreviewPanelProps) {
  return (
    <section className="space-y-3 rounded-md border p-4">
      <h2 className="text-base font-semibold">Preview</h2>
      <LivePreview
        key={definition.metadata.id + definition.updatedAt}
        definition={definition}
      />
    </section>
  );
}
