"use client";

import * as React from "react";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { ResultCard } from "@/features/results-engine/components/result-card";
import { formatResultValue } from "@/features/results-engine/lib/format-result-value";
import { ResultValueType } from "@/features/results-engine/constants/enums";
import type { TableDefinition } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ResultTableProps = {
  table: TableDefinition;
  className?: string;
};

type Row = Record<string, string | number | boolean | null | undefined> & {
  __id: string;
};

/**
 * Reusable result table — sorting/pagination via DataTable.
 * Export preparation is interface-only elsewhere.
 */
export function ResultTable({ table, className }: ResultTableProps) {
  const rows: Row[] = table.rows.map((row, index) => ({
    ...row,
    __id: String(row.id ?? `${table.id}-${index}`),
  }));

  const columns: DataTableColumn<Row>[] = table.columns.map((column) => ({
    id: column.id,
    header: column.header,
    sortable: column.sortable,
    sortValue: (row) => {
      const value = row[column.accessorKey];
      if (typeof value === "number") return value;
      return String(value ?? "");
    },
    className: cn(
      column.align === "right" && "text-right",
      column.align === "center" && "text-center",
      table.stickyHeader && "sticky top-0",
    ),
    accessor: (row) => {
      const raw = row[column.accessorKey];
      if (!column.formatType) return String(raw ?? "—");
      return formatResultValue(
        raw,
        column.formatType ?? ResultValueType.Text,
        column.format,
      );
    },
  }));

  return (
    <ResultCard
      title={table.title}
      description={table.description}
      className={className}
      printSafe
    >
      <div data-slot="result-table" className="overflow-x-auto">
        <DataTable
          data={rows}
          columns={columns}
          getRowId={(row) => row.__id}
          pageSize={table.pageSize ?? 5}
        />
      </div>
    </ResultCard>
  );
}
