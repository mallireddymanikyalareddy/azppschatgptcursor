"use client";

import * as React from "react";

import { cn } from "@/lib/utils/index";

export type FieldDescriptionProps = {
  id?: string;
  children?: React.ReactNode;
  className?: string;
};

export function FieldDescription({
  id,
  children,
  className,
}: FieldDescriptionProps) {
  if (!children) return null;

  return (
    <p
      id={id}
      data-slot="field-description"
      className={cn("text-muted-foreground text-xs leading-relaxed", className)}
    >
      {children}
    </p>
  );
}
