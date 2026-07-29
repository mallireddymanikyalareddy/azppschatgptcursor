"use client";

import { PreviewPanel } from "@/features/calculator-builder/components/preview-panel";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { useTemplatePreview } from "@/features/calculator-templates/hooks/use-template-preview";

export type TemplatePreviewProps = {
  template: CalculatorTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function TemplatePreviewBody({ template }: { template: CalculatorTemplate }) {
  const { preview, seoPreview, contentSections } = useTemplatePreview(template);

  return (
    <div className="space-y-6 px-4 pb-6">
      <PreviewPanel preview={preview} />

      <section className="space-y-2 rounded-md border p-3">
        <h3 className="text-sm font-medium">SEO preview</h3>
        <p className="text-sm font-medium">{seoPreview.title}</p>
        <p className="text-muted-foreground text-sm">
          {seoPreview.description}
        </p>
        <p className="text-muted-foreground font-mono text-xs">
          {seoPreview.canonical ?? `/${template.metadata.slug}`}
        </p>
        <p className="text-muted-foreground text-xs">
          Keywords: {seoPreview.keywords.join(", ")}
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium">Content sections</h3>
        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium">Introduction</h4>
            <p className="text-muted-foreground">
              {contentSections.introduction || "—"}
            </p>
          </div>
          <div>
            <h4 className="font-medium">How it works</h4>
            <p className="text-muted-foreground">
              {contentSections.howItWorks || "—"}
            </p>
          </div>
          <div>
            <h4 className="font-medium">Formula explanation</h4>
            <p className="text-muted-foreground">
              {contentSections.formulaExplanation || "—"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TemplatePreview({
  template,
  open,
  onOpenChange,
}: TemplatePreviewProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        {template ? (
          <>
            <SheetHeader>
              <SheetTitle>Preview · {template.metadata.name}</SheetTitle>
              <SheetDescription>
                Live form, calculation, results, content, and SEO from this
                template blueprint.
              </SheetDescription>
            </SheetHeader>
            <TemplatePreviewBody
              key={template.metadata.id + template.metadata.updatedAt}
              template={template}
            />
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
