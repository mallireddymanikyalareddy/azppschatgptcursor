"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBuilderId } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  BuilderContent,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type ContentBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (content: BuilderContent) => void;
};

export function ContentBuilder({ definition, onChange }: ContentBuilderProps) {
  const { content } = definition;

  const update = (patch: Partial<BuilderContent>) => {
    onChange({ ...content, ...patch });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Content builder</h2>
        <p className="text-muted-foreground text-sm">
          Introduction, formula explanation, how it works, examples, FAQs, tips,
          and references.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Introduction</Label>
        <Textarea
          value={content.introduction}
          onChange={(e) => update({ introduction: e.target.value })}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>Formula explanation</Label>
        <Textarea
          value={content.formulaExplanation}
          onChange={(e) => update({ formulaExplanation: e.target.value })}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>How it works</Label>
        <Textarea
          value={content.howItWorks}
          onChange={(e) => update({ howItWorks: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Examples</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              update({
                examples: [...content.examples, { title: "", description: "" }],
              })
            }
          >
            Add example
          </Button>
        </div>
        {content.examples.map((example, index) => (
          <div key={index} className="grid gap-2 rounded-lg border p-3">
            <Input
              value={example.title}
              onChange={(e) => {
                const next = [...content.examples];
                next[index] = { ...example, title: e.target.value };
                update({ examples: next });
              }}
              placeholder="Example title"
            />
            <Textarea
              value={example.description}
              onChange={(e) => {
                const next = [...content.examples];
                next[index] = { ...example, description: e.target.value };
                update({ examples: next });
              }}
              rows={2}
              placeholder="Example description"
            />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>FAQs</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              update({
                faqs: [
                  ...content.faqs,
                  {
                    id: createBuilderId("faq"),
                    question: "",
                    answer: "",
                    order: content.faqs.length + 1,
                  },
                ],
              })
            }
          >
            Add FAQ
          </Button>
        </div>
        {content.faqs.map((faq) => (
          <div key={faq.id} className="grid gap-2 rounded-lg border p-3">
            <Input
              value={faq.question}
              onChange={(e) =>
                update({
                  faqs: content.faqs.map((item) =>
                    item.id === faq.id
                      ? { ...item, question: e.target.value }
                      : item,
                  ),
                })
              }
              placeholder="Question"
            />
            <Textarea
              value={faq.answer}
              onChange={(e) =>
                update({
                  faqs: content.faqs.map((item) =>
                    item.id === faq.id
                      ? { ...item, answer: e.target.value }
                      : item,
                  ),
                })
              }
              rows={2}
              placeholder="Answer"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Tips (one per line)</Label>
        <Textarea
          value={content.tips.join("\n")}
          onChange={(e) =>
            update({
              tips: e.target.value
                .split("\n")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>References</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              update({
                references: [...content.references, { title: "", url: "" }],
              })
            }
          >
            Add reference
          </Button>
        </div>
        {content.references.map((ref, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-2">
            <Input
              value={ref.title}
              onChange={(e) => {
                const next = [...content.references];
                next[index] = { ...ref, title: e.target.value };
                update({ references: next });
              }}
              placeholder="Title"
            />
            <Input
              value={ref.url ?? ""}
              onChange={(e) => {
                const next = [...content.references];
                next[index] = { ...ref, url: e.target.value || undefined };
                update({ references: next });
              }}
              placeholder="URL"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
