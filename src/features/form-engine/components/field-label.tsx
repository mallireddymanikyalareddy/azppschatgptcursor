"use client";

import * as React from "react";
import { CircleHelp } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/index";

export type FieldLabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  tooltip?: string;
  className?: string;
};

export function FieldLabel({
  htmlFor,
  label,
  required,
  tooltip,
  className,
}: FieldLabelProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground inline-flex"
                aria-label={`Help: ${label}`}
              >
                <CircleHelp className="size-3.5" aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  );
}
