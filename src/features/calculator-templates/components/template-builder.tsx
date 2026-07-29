"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TemplateDifficulty,
  TemplateType,
} from "@/features/calculator-templates/constants/enums";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { useTemplateBuilder } from "@/features/calculator-templates/hooks/use-template-builder";

export type TemplateBuilderProps = {
  template: CalculatorTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (template: CalculatorTemplate) => void;
};

function TemplateBuilderForm({
  template,
  onSaved,
  onClose,
}: {
  template: CalculatorTemplate;
  onSaved: (template: CalculatorTemplate) => void;
  onClose: () => void;
}) {
  const builder = useTemplateBuilder(template);
  const {
    draft,
    updateMetadata,
    moveInput,
    moveFormula,
    save,
    saving,
    dirty,
    validation,
  } = builder;

  return (
    <>
      <div className="grid max-h-[70vh] gap-4 overflow-y-auto px-1 py-2">
        <section className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="tpl-name">Name</Label>
            <Input
              id="tpl-name"
              value={draft.metadata.name}
              onChange={(event) => updateMetadata({ name: event.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tpl-slug">Slug</Label>
            <Input
              id="tpl-slug"
              value={draft.metadata.slug}
              onChange={(event) => updateMetadata({ slug: event.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tpl-category">Category</Label>
            <Input
              id="tpl-category"
              value={draft.metadata.category}
              onChange={(event) =>
                updateMetadata({ category: event.target.value })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label>Template type</Label>
            <Select
              value={draft.metadata.templateType}
              onValueChange={(value) =>
                updateMetadata({
                  templateType:
                    value as CalculatorTemplate["metadata"]["templateType"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TemplateType).map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Difficulty</Label>
            <Select
              value={draft.metadata.difficulty}
              onValueChange={(value) =>
                updateMetadata({
                  difficulty:
                    value as CalculatorTemplate["metadata"]["difficulty"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TemplateDifficulty).map((difficulty) => (
                  <SelectItem
                    key={difficulty}
                    value={difficulty}
                    className="capitalize"
                  >
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="tpl-desc">Description</Label>
            <Textarea
              id="tpl-desc"
              value={draft.metadata.description}
              onChange={(event) =>
                updateMetadata({ description: event.target.value })
              }
              rows={3}
            />
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-medium">Input blueprint</h3>
          <p className="text-muted-foreground text-xs">
            Drag order via Move up / Move down (configuration-driven ordering).
          </p>
          <ul className="space-y-2">
            {draft.inputs.inputs.map((input, index) => (
              <li
                key={input.id}
                className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm"
              >
                <span>
                  {input.label}{" "}
                  <span className="text-muted-foreground font-mono text-xs">
                    ({input.name})
                  </span>
                </span>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={index === 0}
                    onClick={() => moveInput(index, index - 1)}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={index === draft.inputs.inputs.length - 1}
                    onClick={() => moveInput(index, index + 1)}
                  >
                    Down
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-medium">Formula blueprint</h3>
          <ul className="space-y-2">
            {draft.formulas.formulas.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-muted-foreground font-mono text-xs">
                    {item.key}
                  </span>
                </span>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={index === 0}
                    onClick={() => moveFormula(index, index - 1)}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={index === draft.formulas.formulas.length - 1}
                    onClick={() => moveFormula(index, index + 1)}
                  >
                    Down
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-medium">Validation</h3>
          {validation.issues.length === 0 ? (
            <p className="text-muted-foreground text-sm">No issues.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {validation.issues.map((issue) => (
                <li key={`${issue.code}-${issue.path}`}>
                  <span className="capitalize">{issue.severity}</span>:{" "}
                  {issue.message}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="button"
          disabled={saving || !dirty || !validation.valid}
          onClick={async () => {
            const saved = await save();
            onSaved(saved);
          }}
        >
          {saving ? "Saving…" : "Save template"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function TemplateBuilder({
  template,
  open,
  onOpenChange,
  onSaved,
}: TemplateBuilderProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {template ? `Edit · ${template.metadata.name}` : "Template builder"}
          </DialogTitle>
          <DialogDescription>
            Configure metadata and blueprint ordering. Generator maps this into
            CalculatorBuilderDefinition.
          </DialogDescription>
        </DialogHeader>
        {template ? (
          <TemplateBuilderForm
            key={template.metadata.id + template.metadata.updatedAt}
            template={template}
            onSaved={(saved) => {
              onSaved(saved);
              onOpenChange(false);
            }}
            onClose={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
