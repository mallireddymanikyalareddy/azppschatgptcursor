"use client";

import * as React from "react";

import { cn } from "@/lib/utils/index";

export type ValidationMessageProps = {
  id?: string;
  message?: string;
  className?: string;
};

export function ValidationMessage({
  id,
  message,
  className,
}: ValidationMessageProps) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      data-slot="validation-message"
      className={cn("text-destructive text-xs", className)}
    >
      {message}
    </p>
  );
}
