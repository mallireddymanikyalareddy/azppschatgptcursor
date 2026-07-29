"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  TemplateDifficulty,
  TemplateLifecycleStatus,
  TemplateType,
} from "@/features/calculator-templates/constants/enums";
import type { TemplateLibraryFilters } from "@/features/calculator-templates/types";

export type TemplateFiltersProps = {
  filters: TemplateLibraryFilters;
  categories: { name: string; count: number }[];
  onChange: (patch: Partial<TemplateLibraryFilters>) => void;
};

const TYPE_OPTIONS = Object.values(TemplateType);
const STATUS_OPTIONS = Object.values(TemplateLifecycleStatus);
const DIFFICULTY_OPTIONS = Object.values(TemplateDifficulty);

export function TemplateFilters({
  filters,
  categories,
  onChange,
}: TemplateFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <div className="space-y-1.5 md:col-span-2 xl:col-span-1">
        <Label htmlFor="tpl-search">Search</Label>
        <Input
          id="tpl-search"
          value={filters.search}
          placeholder="Search templates…"
          onChange={(event) => onChange({ search: event.target.value })}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Type</Label>
        <Select
          value={filters.templateType}
          onValueChange={(value) =>
            onChange({
              templateType: value as TemplateLibraryFilters["templateType"],
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {TYPE_OPTIONS.map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Category</Label>
        <Select
          value={filters.category}
          onValueChange={(value) => onChange({ category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Status</Label>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            onChange({ status: value as TemplateLibraryFilters["status"] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Difficulty</Label>
        <Select
          value={filters.difficulty}
          onValueChange={(value) =>
            onChange({
              difficulty: value as TemplateLibraryFilters["difficulty"],
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All difficulties</SelectItem>
            {DIFFICULTY_OPTIONS.map((difficulty) => (
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

      <div className="space-y-1.5">
        <Label>Sort</Label>
        <Select
          value={`${filters.sortBy}:${filters.sortDirection}`}
          onValueChange={(value) => {
            const [sortBy, sortDirection] = value.split(":") as [
              TemplateLibraryFilters["sortBy"],
              TemplateLibraryFilters["sortDirection"],
            ];
            onChange({ sortBy, sortDirection });
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updatedAt:desc">Recently updated</SelectItem>
            <SelectItem value="createdAt:desc">Newest</SelectItem>
            <SelectItem value="usageCount:desc">Popular</SelectItem>
            <SelectItem value="name:asc">Name A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3 pt-6">
        <Switch
          id="tpl-featured"
          checked={filters.featuredOnly}
          onCheckedChange={(checked) => onChange({ featuredOnly: checked })}
        />
        <Label htmlFor="tpl-featured">Featured only</Label>
      </div>
    </div>
  );
}
