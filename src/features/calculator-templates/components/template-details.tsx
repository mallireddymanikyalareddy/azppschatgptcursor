"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { toTemplateCard } from "@/features/calculator-templates/lib/template-card";
import { TemplateVersionPanel } from "@/features/calculator-templates/components/template-version-panel";

export type TemplateDetailsProps = {
  template: CalculatorTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreview: (template: CalculatorTemplate) => void;
  onEdit: (template: CalculatorTemplate) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (template: CalculatorTemplate) => void;
  onVersionChange: (template: CalculatorTemplate) => void;
};

export function TemplateDetails({
  template,
  open,
  onOpenChange,
  onPreview,
  onEdit,
  onDuplicate,
  onArchive,
  onDelete,
  onExport,
  onVersionChange,
}: TemplateDetailsProps) {
  const card = template ? toTemplateCard(template) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        {template && card ? (
          <>
            <SheetHeader>
              <SheetTitle>{card.name}</SheetTitle>
              <SheetDescription className="font-mono text-xs">
                {template.metadata.slug} · v{card.version}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 px-4 pb-4">
              <p className="text-sm leading-relaxed">{card.description}</p>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Category", card.category],
                  ["Type", card.templateType],
                  ["Difficulty", card.difficulty],
                  ["Status", card.status],
                  ["Inputs", String(card.inputCount)],
                  ["Formulas", String(card.formulaCount)],
                  ["Charts", card.chartsIncluded ? "Included" : "None"],
                  ["SEO ready", card.seoReady ? "Yes" : "No"],
                  ["Content ready", card.contentReady ? "Yes" : "No"],
                  ["Build time", `~${card.estimatedBuildMinutes} min`],
                  ["Usage", card.usageCount.toLocaleString("en-IN")],
                  ["Updated", new Date(card.updatedAt).toLocaleString("en-IN")],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-muted-foreground text-xs">{label}</dt>
                    <dd className="capitalize">{value}</dd>
                  </div>
                ))}
              </dl>

              <section className="space-y-2">
                <h3 className="text-sm font-medium">Blueprint summary</h3>
                <ul className="text-muted-foreground list-inside list-disc text-sm">
                  <li>
                    Input groups: {template.inputs.groups.length} · fields:{" "}
                    {template.inputs.inputs.length}
                  </li>
                  <li>
                    Formula groups: {template.formulas.groups.length} ·
                    formulas: {template.formulas.formulas.length}
                  </li>
                  <li>Result metrics: {template.results.metrics.length}</li>
                  <li>Charts: {template.charts.charts.length}</li>
                  <li>Validation rules: {template.validation.rules.length}</li>
                  <li>FAQs: {template.content.faqs.length}</li>
                </ul>
              </section>

              <TemplateVersionPanel
                template={template}
                onChanged={onVersionChange}
              />
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-col">
              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={() => onPreview(template)}>
                  Preview
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onEdit(template)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onExport(template)}
                >
                  Export JSON
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onDuplicate(template.metadata.id)}
                >
                  Duplicate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onArchive(template.metadata.id)}
                >
                  Archive
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(template.metadata.id)}
                >
                  Delete
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
