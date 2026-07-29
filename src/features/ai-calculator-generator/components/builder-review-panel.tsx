"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import type { GenerationResult } from "@/features/ai-calculator-generator/types";

export type BuilderReviewPanelProps = {
  result: GenerationResult;
  onSave: (definition: CalculatorBuilderDefinition) => void;
  onApprove: () => void;
  onReject: () => void;
};

/**
 * Human review — edit metadata / SEO / content before saving draft.
 * Never publishes.
 */
export function BuilderReviewPanel({
  result,
  onSave,
  onApprove,
  onReject,
}: BuilderReviewPanelProps) {
  const [draft, setDraft] = React.useState(() =>
    structuredClone(result.definition),
  );

  React.useEffect(() => {
    setDraft(structuredClone(result.definition));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset draft when generation identity/version changes
  }, [result.id, result.definition.updatedAt]);

  return (
    <section className="space-y-4 rounded-md border p-4">
      <div>
        <h2 className="text-base font-semibold">Builder review</h2>
        <p className="text-muted-foreground text-sm">
          Edit the generated draft. Saving keeps status as unpublished draft.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="rev-name">Name</Label>
          <Input
            id="rev-name"
            value={draft.metadata.name}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                metadata: { ...prev.metadata, name: event.target.value },
              }))
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rev-slug">Slug</Label>
          <Input
            id="rev-slug"
            value={draft.metadata.slug}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                metadata: { ...prev.metadata, slug: event.target.value },
              }))
            }
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="rev-desc">Description</Label>
          <Textarea
            id="rev-desc"
            rows={2}
            value={draft.metadata.description}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                metadata: {
                  ...prev.metadata,
                  description: event.target.value,
                },
              }))
            }
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="rev-seo-title">SEO title</Label>
          <Input
            id="rev-seo-title"
            value={draft.seo.title}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                seo: { ...prev.seo, title: event.target.value },
              }))
            }
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="rev-seo-desc">Meta description</Label>
          <Textarea
            id="rev-seo-desc"
            rows={2}
            value={draft.seo.description}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                seo: { ...prev.seo, description: event.target.value },
              }))
            }
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="rev-intro">Introduction</Label>
          <Textarea
            id="rev-intro"
            rows={5}
            value={draft.content.introduction}
            onChange={(event) =>
              setDraft((prev) => ({
                ...prev,
                content: {
                  ...prev.content,
                  introduction: event.target.value,
                },
              }))
            }
          />
        </div>
      </div>

      <div className="rounded-md border p-3 text-sm">
        <p className="font-medium">Structure snapshot</p>
        <p className="text-muted-foreground text-xs">
          Inputs: {draft.inputs.length} · Formulas: {draft.formulas.length} ·
          Results: {draft.results.length} · Charts: {draft.charts.length}
        </p>
        <ul className="text-muted-foreground mt-2 list-inside list-disc text-xs">
          {draft.formulas.slice(0, 3).map((formula) => (
            <li key={formula.id}>
              {formula.name}:{" "}
              <span className="font-mono">{formula.expression}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => onSave(draft)}>
          Save draft edits
        </Button>
        <Button type="button" variant="secondary" onClick={onApprove}>
          Approve draft
        </Button>
        <Button type="button" variant="outline" onClick={onReject}>
          Reject
        </Button>
      </div>
    </section>
  );
}
