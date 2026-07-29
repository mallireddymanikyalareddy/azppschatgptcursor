"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCalculatorSearch } from "@/features/homepage/hooks";
import { cn } from "@/lib/utils";

export function GlobalCalculatorSearch({
  popularSearches,
  recentSearches,
  className,
  autoFocus = false,
  id = "homepage-search",
}: {
  popularSearches: string[];
  recentSearches: string[];
  className?: string;
  autoFocus?: boolean;
  id?: string;
}) {
  const { query, setQuery, results } = useCalculatorSearch();
  const [open, setOpen] = React.useState(false);
  const listId = `${id}-results`;

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor={id} className="sr-only">
        Search calculators by name, category, or keyword
      </label>
      <div className="relative">
        <Search
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          aria-hidden
        />
        <Input
          id={id}
          role="combobox"
          aria-expanded={open && query.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          autoFocus={autoFocus}
          value={query}
          placeholder="Search EMI, SIP, BMI, GST…"
          className="h-12 pr-10 pl-10"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
        />
        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>

      {open && query.trim() ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className="border-border bg-popover absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-lg border p-1 shadow-md"
        >
          {results.length === 0 ? (
            <li className="text-muted-foreground px-3 py-2 text-sm">
              No calculators matched “{query}”.
            </li>
          ) : (
            results.map((item) => (
              <li key={item.id} role="option" aria-selected={false}>
                <Link
                  href={item.href}
                  className="hover:bg-accent block rounded-md px-3 py-2 text-sm"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {item.categoryName}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}

      {!query ? (
        <div className="mt-3 space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Popular searches
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                className="border-border bg-background hover:bg-accent rounded-full border px-3 py-1 text-xs"
                onClick={() => {
                  setQuery(term);
                  setOpen(true);
                }}
              >
                {term}
              </button>
            ))}
          </div>
          {recentSearches.length > 0 ? (
            <>
              <p className="text-muted-foreground pt-2 text-xs font-medium tracking-wide uppercase">
                Recent searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="text-muted-foreground hover:text-foreground text-xs underline-offset-2 hover:underline"
                    onClick={() => {
                      setQuery(term);
                      setOpen(true);
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
