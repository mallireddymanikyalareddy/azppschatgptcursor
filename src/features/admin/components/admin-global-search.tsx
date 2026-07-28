"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MOCK_SEARCH_RESULTS } from "@/features/admin/data/search-mock";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Calculators",
  "Users",
  "Categories",
  "Content",
  "Commands",
] as const;

export function AdminGlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_SEARCH_RESULTS;
    return MOCK_SEARCH_RESULTS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground relative h-9 w-9 justify-start gap-2 px-0 sm:w-56 sm:px-3"
          aria-label="Open global search"
        >
          <Search className="size-4 shrink-0 sm:mr-0" aria-hidden />
          <span className="hidden flex-1 text-left text-sm sm:inline">
            Search…
          </span>
          <kbd className="bg-muted pointer-events-none absolute top-1.5 right-1.5 hidden h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>Global search</DialogTitle>
          <DialogDescription>
            Search calculators, users, categories, content, and commands.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 border-b px-3">
          <Search
            className="text-muted-foreground size-4 shrink-0"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search calculators, users, categories…"
            className="border-0 shadow-none focus-visible:ring-0"
            aria-label="Search query"
            autoFocus
          />
        </div>
        <div
          className="max-h-80 overflow-y-auto p-2"
          role="listbox"
          aria-label="Search results"
        >
          {filtered.length === 0 ? (
            <p className="text-muted-foreground px-3 py-8 text-center text-sm">
              No results for “{query}”.
            </p>
          ) : (
            CATEGORIES.map((category) => {
              const items = filtered.filter((r) => r.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="mb-2">
                  <p className="text-muted-foreground px-2 py-1.5 text-xs font-medium tracking-wide uppercase">
                    {category}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={cn(
                            "hover:bg-muted block rounded-md px-2 py-2 transition-colors",
                          )}
                          onClick={() => setOpen(false)}
                          role="option"
                        >
                          <span className="block text-sm font-medium">
                            {item.title}
                          </span>
                          <span className="text-muted-foreground block text-xs">
                            {item.subtitle}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
