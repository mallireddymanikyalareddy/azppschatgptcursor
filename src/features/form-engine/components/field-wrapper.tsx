"use client";

import * as React from "react";

import { cn } from "@/lib/utils/index";

export type FieldWrapperProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export function FieldWrapper({
  id,
  className,
  children,
  hidden,
}: FieldWrapperProps) {
  if (hidden) return null;

  return (
    <div
      data-slot="field-wrapper"
      data-field-id={id}
      className={cn("flex flex-col gap-2", className)}
    >
      {children}
    </div>
  );
}
