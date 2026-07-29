"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ContentLength,
  PromptAudience,
  PromptIndustry,
} from "@/features/ai-calculator-generator/constants/enums";
import type { GeneratorPromptInput } from "@/features/ai-calculator-generator/types";
import { aiGeneratorService } from "@/features/ai-calculator-generator/services";

export type PromptWorkspaceProps = {
  prompt: GeneratorPromptInput;
  onChange: (patch: Partial<GeneratorPromptInput>) => void;
  onGenerate: () => void;
  generating: boolean;
};

export function PromptWorkspace({
  prompt,
  onChange,
  onGenerate,
  generating,
}: PromptWorkspaceProps) {
  const templates = aiGeneratorService.getTemplateOptions();

  return (
    <section className="space-y-4 rounded-md border p-4">
      <div>
        <h2 className="text-base font-semibold">Prompt workspace</h2>
        <p className="text-muted-foreground text-sm">
          Describe the calculator. Mock AI runs a full generation pipeline —
          drafts never publish automatically.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ai-prompt">Free text prompt</Label>
        <Textarea
          id="ai-prompt"
          rows={4}
          value={prompt.prompt}
          placeholder="Create a Home Loan EMI Calculator"
          onChange={(event) => onChange({ prompt: event.target.value })}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FieldSelect
          label="Template"
          value={prompt.templateId ?? "auto"}
          onChange={(value) => onChange({ templateId: value })}
          options={[
            { value: "auto", label: "Auto-match" },
            ...templates.map((t) => ({
              value: t.id,
              label: `${t.name} (${t.type})`,
            })),
          ]}
        />
        <FieldSelect
          label="Industry"
          value={prompt.industry}
          onChange={(value) =>
            onChange({
              industry: value as GeneratorPromptInput["industry"],
            })
          }
          options={[
            { value: "auto", label: "Auto-detect" },
            ...Object.values(PromptIndustry).map((value) => ({
              value,
              label: value,
            })),
          ]}
        />
        <FieldSelect
          label="Audience"
          value={prompt.audience}
          onChange={(value) =>
            onChange({ audience: value as GeneratorPromptInput["audience"] })
          }
          options={Object.values(PromptAudience).map((value) => ({
            value,
            label: value,
          }))}
        />
        <div className="space-y-1.5">
          <Label htmlFor="ai-country">Country</Label>
          <Input
            id="ai-country"
            value={prompt.country}
            onChange={(event) => onChange({ country: event.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ai-lang">Language</Label>
          <Input
            id="ai-lang"
            value={prompt.language}
            onChange={(event) => onChange({ language: event.target.value })}
          />
        </div>
        <FieldSelect
          label="Difficulty"
          value={prompt.difficulty}
          onChange={(value) =>
            onChange({
              difficulty: value as GeneratorPromptInput["difficulty"],
            })
          }
          options={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
            { value: "expert", label: "Expert" },
          ]}
        />
        <FieldSelect
          label="Content length"
          value={prompt.contentLength}
          onChange={(value) =>
            onChange({
              contentLength: value as GeneratorPromptInput["contentLength"],
            })
          }
          options={Object.values(ContentLength).map((value) => ({
            value,
            label: value,
          }))}
        />
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="ai-seo">SEO target</Label>
          <Input
            id="ai-seo"
            value={prompt.seoTarget ?? ""}
            placeholder="Optional primary keyword / title target"
            onChange={(event) => onChange({ seoTarget: event.target.value })}
          />
        </div>
      </div>

      <Button type="button" disabled={generating} onClick={onGenerate}>
        {generating ? "Generating…" : "Generate calculator draft"}
      </Button>
    </section>
  );
}

function FieldSelect(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label>{props.label}</Label>
      <Select value={props.value} onValueChange={props.onChange}>
        <SelectTrigger className="w-full capitalize">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
