"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type LibraryPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function LibraryPagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: LibraryPaginationProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Label htmlFor="library-page-size">Page size</Label>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger id="library-page-size" className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-xs tabular-nums">
          {total.toLocaleString("en-IN")} total
        </p>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="First page"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(1);
              }}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            >
              First
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(Math.max(1, page - 1));
              }}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page} / {totalPages}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(Math.min(totalPages, page + 1));
              }}
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Last page"
              onClick={(event) => {
                event.preventDefault();
                onPageChange(totalPages);
              }}
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            >
              Last
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
