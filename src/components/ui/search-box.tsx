"use client";

import * as React from "react";
import { Loader2, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SearchBoxProps = Omit<React.ComponentProps<"input">, "type"> & {
  containerClassName?: string;
  loading?: boolean;
  showShortcut?: boolean;
  onClear?: () => void;
};

function useIsMac() {
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  return isMac;
}

export function SearchBox({
  className,
  containerClassName,
  placeholder = "Search…",
  loading = false,
  showShortcut = false,
  onClear,
  value,
  defaultValue,
  onChange,
  disabled,
  ...props
}: SearchBoxProps) {
  const isMac = useIsMac();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? ""),
  );
  const currentValue = isControlled ? String(value ?? "") : internalValue;
  const showClear = currentValue.length > 0 && !disabled;

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <Search
        aria-hidden="true"
        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
      />
      <Input
        type="search"
        placeholder={placeholder}
        disabled={disabled || loading}
        value={isControlled ? value : undefined}
        defaultValue={defaultValue}
        onChange={(event) => {
          if (!isControlled) {
            setInternalValue(event.target.value);
          }
          onChange?.(event);
        }}
        className={cn(
          "pl-9",
          showClear || loading || showShortcut ? "pr-20" : "pr-3",
          "[&::-webkit-search-cancel-button]:hidden",
          className,
        )}
        aria-label={props["aria-label"] ?? placeholder}
        aria-busy={loading || undefined}
        {...props}
      />
      <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-1">
        {loading ? (
          <Loader2
            className="text-muted-foreground size-4 animate-spin"
            aria-hidden="true"
          />
        ) : null}
        {showClear ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground size-6"
            aria-label="Clear search"
            onClick={() => {
              if (!isControlled) {
                setInternalValue("");
              }
              onClear?.();
              onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            <X className="size-3.5" />
          </Button>
        ) : null}
        {showShortcut && !showClear && !loading ? (
          <kbd className="bg-muted text-muted-foreground pointer-events-none hidden rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium sm:inline-block">
            {isMac ? "⌘" : "Ctrl"}K
          </kbd>
        ) : null}
      </div>
    </div>
  );
}
