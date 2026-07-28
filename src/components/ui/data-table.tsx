"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Columns3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { TableLoader } from "@/components/ui/loaders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  id: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  className?: string;
  hideable?: boolean;
};

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
  className?: string;
};

type SortState = {
  id: string;
  direction: "asc" | "desc";
} | null;

export function DataTable<T>({
  data,
  columns,
  getRowId,
  loading = false,
  emptyTitle = "No data",
  emptyDescription = "There are no rows to display.",
  pageSize = 5,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null);
  const [page, setPage] = React.useState(1);
  const [visible, setVisible] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(columns.map((column) => [column.id, true])),
  );

  const visibleColumns = columns.filter(
    (column) => visible[column.id] !== false,
  );

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const column = columns.find((item) => item.id === sort.id);
    if (!column) return data;

    const getValue =
      column.sortValue ??
      ((row: T) => {
        const value = column.accessor(row);
        return typeof value === "string" || typeof value === "number"
          ? value
          : String(value ?? "");
      });

    return [...data].sort((a, b) => {
      const left = getValue(a);
      const right = getValue(b);
      if (left === right) return 0;
      if (left > right) return sort.direction === "asc" ? 1 : -1;
      return sort.direction === "asc" ? -1 : 1;
    });
  }, [columns, data, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);

  const toggleSort = (columnId: string) => {
    setSort((current) => {
      if (!current || current.id !== columnId) {
        return { id: columnId, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { id: columnId, direction: "desc" };
      }
      return null;
    });
  };

  if (loading) {
    return <TableLoader rows={pageSize} columns={visibleColumns.length || 3} />;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {sorted.length} {sorted.length === 1 ? "row" : "rows"}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Columns3 className="size-4" aria-hidden="true" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={visible[column.id] !== false}
                disabled={column.hideable === false}
                onCheckedChange={(checked) =>
                  setVisible((current) => ({
                    ...current,
                    [column.id]: checked === true,
                  }))
                }
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {pageRows.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => {
                  const isSorted = sort?.id === column.id;
                  const SortIcon = !isSorted
                    ? ArrowUpDown
                    : sort.direction === "asc"
                      ? ArrowUp
                      : ArrowDown;

                  return (
                    <TableHead key={column.id} className={column.className}>
                      {column.sortable ? (
                        <button
                          type="button"
                          className="hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                          onClick={() => toggleSort(column.id)}
                          aria-label={`Sort by ${column.header}`}
                        >
                          {column.header}
                          <SortIcon
                            className="size-3.5 opacity-60"
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        column.header
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((row) => (
                <TableRow key={getRowId(row)}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id} className={column.className}>
                      {column.accessor(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                aria-label="Next page"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
