"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  BuilderSeo,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type SEOBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (seo: BuilderSeo) => void;
};

export function SEOBuilder({ definition, onChange }: SEOBuilderProps) {
  const { seo } = definition;

  const update = (patch: Partial<BuilderSeo>) => {
    onChange({ ...seo, ...patch });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">SEO builder</h2>
        <p className="text-muted-foreground text-sm">
          Title, meta description, keywords, canonical, and Open Graph / JSON-LD
          placeholders.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="seo-title">Title</Label>
          <Input
            id="seo-title"
            value={seo.title}
            onChange={(e) => update({ title: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="seo-description">Meta description</Label>
          <Textarea
            id="seo-description"
            value={seo.description}
            onChange={(e) => update({ description: e.target.value })}
            rows={3}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="seo-keywords">Keywords (comma-separated)</Label>
          <Input
            id="seo-keywords"
            value={seo.keywords.join(", ")}
            onChange={(e) =>
              update({
                keywords: e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="seo-canonical">Canonical URL</Label>
          <Input
            id="seo-canonical"
            value={seo.canonical ?? ""}
            onChange={(e) => update({ canonical: e.target.value || undefined })}
            placeholder="https://azpps.example/home-loan-emi"
          />
        </div>
        <div className="space-y-2">
          <Label>Open Graph title</Label>
          <Input
            value={seo.ogTitle ?? ""}
            onChange={(e) => update({ ogTitle: e.target.value || undefined })}
          />
        </div>
        <div className="space-y-2">
          <Label>Open Graph image</Label>
          <Input
            value={seo.ogImage ?? ""}
            onChange={(e) => update({ ogImage: e.target.value || undefined })}
            placeholder="/og/home-loan-emi.png"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Open Graph description</Label>
          <Textarea
            value={seo.ogDescription ?? ""}
            onChange={(e) =>
              update({ ogDescription: e.target.value || undefined })
            }
            rows={2}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>JSON-LD placeholder</Label>
          <Textarea
            value={
              seo.schemaPlaceholder
                ? JSON.stringify(seo.schemaPlaceholder, null, 2)
                : ""
            }
            onChange={(e) => {
              const raw = e.target.value.trim();
              if (!raw) {
                update({ schemaPlaceholder: undefined });
                return;
              }
              try {
                update({
                  schemaPlaceholder: JSON.parse(raw) as Record<string, unknown>,
                });
              } catch {
                // Keep typing until JSON is valid.
              }
            }}
            placeholder='{"@type":"WebApplication"}'
            rows={4}
            className="font-mono text-xs"
          />
        </div>
      </div>
    </div>
  );
}
