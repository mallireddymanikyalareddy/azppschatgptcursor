"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  LibrarySortField,
  type LibraryFilters,
  type LibraryPageResult,
} from "@/features/calculator-library/types";

export type LibraryFiltersPanelProps = {
  open: boolean;
  filters: LibraryFilters;
  facets: LibraryPageResult["facets"] | undefined;
  onPatch: (patch: Partial<LibraryFilters>) => void;
  onReset: () => void;
};

export function LibraryFiltersPanel({
  open,
  filters,
  facets,
  onPatch,
  onReset,
}: LibraryFiltersPanelProps) {
  if (!open) return null;

  return (
    <section
      aria-label="Advanced filters"
      className="border-border grid gap-3 rounded-lg border p-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <FilterSelect
        label="Category"
        value={filters.categorySlug}
        onChange={(value) =>
          onPatch({ categorySlug: value as LibraryFilters["categorySlug"] })
        }
        options={[
          { value: "all", label: "All categories" },
          ...(facets?.categories.map((c) => ({
            value: c.slug,
            label: `${c.name} (${c.count})`,
          })) ?? []),
        ]}
      />
      <FilterSelect
        label="Subcategory"
        value={filters.subcategory}
        onChange={(value) =>
          onPatch({ subcategory: value as LibraryFilters["subcategory"] })
        }
        options={[
          { value: "all", label: "All subcategories" },
          ...(facets?.subcategories.map((s) => ({ value: s, label: s })) ?? []),
        ]}
      />
      <FilterSelect
        label="Status"
        value={filters.status}
        onChange={(value) =>
          onPatch({ status: value as LibraryFilters["status"] })
        }
        options={[
          { value: "all", label: "All statuses" },
          ...Object.values(CalculatorStatus).map((value) => ({
            value,
            label: value,
          })),
        ]}
      />
      <FilterSelect
        label="Visibility"
        value={filters.visibility}
        onChange={(value) =>
          onPatch({ visibility: value as LibraryFilters["visibility"] })
        }
        options={[
          { value: "all", label: "All visibility" },
          ...Object.values(Visibility).map((value) => ({
            value,
            label: value,
          })),
        ]}
      />
      <FilterSelect
        label="Difficulty"
        value={filters.difficulty}
        onChange={(value) =>
          onPatch({ difficulty: value as LibraryFilters["difficulty"] })
        }
        options={[
          { value: "all", label: "All difficulties" },
          ...Object.values(CalculatorDifficulty).map((value) => ({
            value,
            label: value,
          })),
        ]}
      />
      <FilterSelect
        label="Template"
        value={filters.templateBased}
        onChange={(value) =>
          onPatch({ templateBased: value as LibraryFilters["templateBased"] })
        }
        options={[
          { value: "all", label: "All" },
          { value: "yes", label: "Template based" },
          { value: "no", label: "Not template" },
        ]}
      />
      <FilterSelect
        label="AI Generated"
        value={filters.aiGenerated}
        onChange={(value) =>
          onPatch({ aiGenerated: value as LibraryFilters["aiGenerated"] })
        }
        options={[
          { value: "all", label: "All" },
          { value: "yes", label: "AI generated" },
          { value: "no", label: "Manual" },
        ]}
      />
      <FilterSelect
        label="Created by"
        value={filters.createdBy}
        onChange={(value) =>
          onPatch({ createdBy: value as LibraryFilters["createdBy"] })
        }
        options={[
          { value: "all", label: "All authors" },
          ...(facets?.authors.map((a) => ({ value: a, label: a })) ?? []),
        ]}
      />
      <div className="space-y-2">
        <Label>Updated from</Label>
        <Input
          type="date"
          value={filters.updatedFrom?.slice(0, 10) ?? ""}
          onChange={(event) =>
            onPatch({
              updatedFrom: event.target.value
                ? new Date(event.target.value).toISOString()
                : undefined,
            })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Updated to</Label>
        <Input
          type="date"
          value={filters.updatedTo?.slice(0, 10) ?? ""}
          onChange={(event) =>
            onPatch({
              updatedTo: event.target.value
                ? new Date(event.target.value).toISOString()
                : undefined,
            })
          }
        />
      </div>
      <FilterSelect
        label="Sort by"
        value={filters.sortBy}
        onChange={(value) =>
          onPatch({ sortBy: value as LibraryFilters["sortBy"] })
        }
        options={Object.values(LibrarySortField).map((value) => ({
          value,
          label: value,
        }))}
      />
      <FilterSelect
        label="Sort direction"
        value={filters.sortDirection}
        onChange={(value) =>
          onPatch({
            sortDirection: value as LibraryFilters["sortDirection"],
          })
        }
        options={[
          { value: "asc", label: "Ascending" },
          { value: "desc", label: "Descending" },
        ]}
      />
      <div className="flex items-end sm:col-span-2 xl:col-span-4">
        <Button type="button" variant="outline" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
