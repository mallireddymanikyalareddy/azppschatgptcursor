"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils/index";

export type FormActionsProps = {
  submitLabel?: string;
  resetLabel?: string;
  showReset?: boolean;
  isSubmitting?: boolean;
  isValid?: boolean;
  onReset?: () => void;
  className?: string;
  disableSubmit?: boolean;
};

export function FormActions({
  submitLabel = "Submit",
  resetLabel = "Reset",
  showReset = true,
  isSubmitting,
  onReset,
  className,
  disableSubmit,
}: FormActionsProps) {
  return (
    <div
      data-slot="form-actions"
      className={cn(
        "flex flex-wrap items-center justify-end gap-2 pt-2",
        className,
      )}
    >
      {showReset ? (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isSubmitting}
        >
          {resetLabel}
        </Button>
      ) : null}
      <Button type="submit" disabled={isSubmitting || disableSubmit}>
        {isSubmitting ? (
          <>
            <Spinner className="size-4" />
            Submitting…
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
}
