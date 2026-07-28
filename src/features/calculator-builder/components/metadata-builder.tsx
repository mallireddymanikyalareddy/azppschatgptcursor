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
  CalculatorDifficulty,
  CalculatorStatus,
  Visibility,
} from "@/features/calculators/constants/enums";
import { slugify } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  BuilderMetadata,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type MetadataBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (metadata: BuilderMetadata) => void;
};

export function MetadataBuilder({
  definition,
  onChange,
}: MetadataBuilderProps) {
  const { metadata } = definition;

  const update = (patch: Partial<BuilderMetadata>) => {
    onChange({ ...metadata, ...patch });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Calculator metadata</h2>
        <p className="text-muted-foreground text-sm">
          Identity, taxonomy, status, and visibility for this calculator.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="meta-name">Name</Label>
          <Input
            id="meta-name"
            value={metadata.name}
            onChange={(e) => {
              const name = e.target.value;
              update({
                name,
                slug: metadata.slug || slugify(name),
              });
            }}
            placeholder="Home Loan EMI"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-slug">Slug</Label>
          <div className="flex gap-2">
            <Input
              id="meta-slug"
              value={metadata.slug}
              onChange={(e) => update({ slug: e.target.value })}
              placeholder="home-loan-emi"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => update({ slug: slugify(metadata.name) })}
            >
              Generate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-icon">Icon</Label>
          <Input
            id="meta-icon"
            value={metadata.icon ?? ""}
            onChange={(e) => update({ icon: e.target.value || undefined })}
            placeholder="calculator"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="meta-description">Description</Label>
          <Textarea
            id="meta-description"
            value={metadata.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Short description of what this calculator does."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-category">Category name</Label>
          <Input
            id="meta-category"
            value={metadata.categoryName}
            onChange={(e) =>
              update({
                categoryName: e.target.value,
                categorySlug: slugify(e.target.value) || metadata.categorySlug,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-subcategory">Subcategory</Label>
          <Input
            id="meta-subcategory"
            value={metadata.subcategory ?? ""}
            onChange={(e) =>
              update({ subcategory: e.target.value || undefined })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={metadata.difficulty}
            onValueChange={(value) =>
              update({
                difficulty: value as BuilderMetadata["difficulty"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CalculatorDifficulty).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-version">Version</Label>
          <Input
            id="meta-version"
            value={metadata.version}
            onChange={(e) => update({ version: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={metadata.status}
            onValueChange={(value) =>
              update({ status: value as BuilderMetadata["status"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CalculatorStatus).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Visibility</Label>
          <Select
            value={metadata.visibility}
            onValueChange={(value) =>
              update({ visibility: value as BuilderMetadata["visibility"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Visibility).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="meta-tags">Tags (comma-separated)</Label>
          <Input
            id="meta-tags"
            value={metadata.tags.join(", ")}
            onChange={(e) =>
              update({
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
            placeholder="emi, loan, finance"
          />
        </div>
      </div>
    </div>
  );
}
