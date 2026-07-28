"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/index";

export type ResultCardProps = {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  printSafe?: boolean;
};

export function ResultCard({
  title,
  description,
  className,
  children,
  printSafe,
}: ResultCardProps) {
  return (
    <Card
      data-slot="result-card"
      className={cn(printSafe && "print:break-inside-avoid", className)}
    >
      {title || description ? (
        <CardHeader>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className={cn(!(title || description) && "pt-0")}>
        {children}
      </CardContent>
    </Card>
  );
}
