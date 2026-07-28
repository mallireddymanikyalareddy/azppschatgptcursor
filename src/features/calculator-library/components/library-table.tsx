"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LibraryBadges } from "@/features/calculator-library/components/library-badges";
import type { LibraryCalculator } from "@/features/calculator-library/types";
import { ADMIN_ROUTES } from "@/features/admin/constants/routes";

export type LibraryTableProps = {
  items: LibraryCalculator[];
  loading?: boolean;
  isSelected: (id: string) => boolean;
  allPageSelected: boolean;
  onToggle: (id: string) => void;
  onTogglePage: () => void;
  onOpenDetail: (item: LibraryCalculator) => void;
  onPreview: (item: LibraryCalculator) => void;
  onAction: (action: string, item: LibraryCalculator) => void;
};

export function LibraryTable({
  items,
  loading,
  isSelected,
  allPageSelected,
  onToggle,
  onTogglePage,
  onOpenDetail,
  onPreview,
  onAction,
}: LibraryTableProps) {
  return (
    <div className="border-border overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allPageSelected}
                onCheckedChange={() => onTogglePage()}
                aria-label="Select all on page"
              />
            </TableHead>
            <TableHead>Calculator</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Usage</TableHead>
            <TableHead className="w-12">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={12}
                className="text-muted-foreground py-8 text-center"
              >
                Loading calculators…
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} className="py-8 text-center">
                No calculators match the current filters.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow
                key={item.id}
                data-state={isSelected(item.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected(item.id)}
                    onCheckedChange={() => onToggle(item.id)}
                    aria-label={`Select ${item.name}`}
                  />
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="text-left hover:underline"
                    onClick={() => onOpenDetail(item)}
                  >
                    <span className="font-medium">{item.name}</span>
                  </button>
                  <div className="mt-1">
                    <LibraryBadges calculator={item} limit={3} />
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{item.slug}</TableCell>
                <TableCell>
                  <div>{item.category.name}</div>
                  {item.subcategory ? (
                    <div className="text-muted-foreground text-xs">
                      {item.subcategory}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {item.version}
                </TableCell>
                <TableCell className="capitalize">{item.status}</TableCell>
                <TableCell className="capitalize">{item.visibility}</TableCell>
                <TableCell className="capitalize">{item.difficulty}</TableCell>
                <TableCell>{item.createdBy}</TableCell>
                <TableCell className="text-xs tabular-nums">
                  {new Date(item.updatedAt).toLocaleDateString("en-IN")}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {item.usageCount.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label={`Actions for ${item.name}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onOpenDetail(item)}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onPreview(item)}>
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={ADMIN_ROUTES.calculatorBuilder}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAction("duplicate", item)}
                      >
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAction("versions", item)}
                      >
                        Version history
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAction("export", item)}
                      >
                        Export JSON
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onAction("archive", item)}
                      >
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onAction("delete", item)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
