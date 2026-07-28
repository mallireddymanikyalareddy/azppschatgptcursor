"use client";

import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils/index";
import type { StatusTone } from "@/features/results-engine/constants/enums";

export type ResultAlertProps = {
  title: string;
  description?: string;
  tone?: StatusTone;
  className?: string;
};

function alertVariant(
  tone: StatusTone,
): "default" | "destructive" | "success" | "warning" | "info" {
  switch (tone) {
    case "danger":
      return "destructive";
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "default";
  }
}

export function ResultAlert({
  title,
  description,
  tone = "info",
  className,
}: ResultAlertProps) {
  return (
    <Alert
      variant={alertVariant(tone)}
      className={cn(className)}
      data-slot="result-alert"
      role="status"
    >
      <AlertTitle>{title}</AlertTitle>
      {description ? <AlertDescription>{description}</AlertDescription> : null}
    </Alert>
  );
}
