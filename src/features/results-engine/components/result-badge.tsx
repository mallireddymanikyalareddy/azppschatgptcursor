"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/index";
import type { StatusTone } from "@/features/results-engine/constants/enums";

export type ResultBadgeProps = {
  label: string;
  tone?: StatusTone;
  className?: string;
};

const toneVariant: Record<
  StatusTone,
  "default" | "secondary" | "destructive" | "outline"
> = {
  neutral: "outline",
  success: "default",
  warning: "secondary",
  danger: "destructive",
  info: "secondary",
};

export function ResultBadge({
  label,
  tone = "neutral",
  className,
}: ResultBadgeProps) {
  return (
    <Badge
      variant={toneVariant[tone]}
      className={cn(className)}
      data-slot="result-badge"
    >
      {label}
    </Badge>
  );
}
