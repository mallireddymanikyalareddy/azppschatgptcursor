"use client";

import type { LucideIcon } from "lucide-react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorStateProps = {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  icon: Icon = AlertTriangle,
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "border-destructive/25 bg-destructive/5 flex flex-col items-center justify-center gap-4 rounded-lg border px-6 py-14 text-center",
        className,
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-destructive/10 text-destructive flex size-12 items-center justify-center rounded-full">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
