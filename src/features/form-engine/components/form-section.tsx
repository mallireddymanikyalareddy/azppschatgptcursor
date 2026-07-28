"use client";

import * as React from "react";

import { FieldDescription } from "@/features/form-engine/components/field-description";
import { layoutGridClass } from "@/features/form-engine/lib/layout";
import type { FormLayout } from "@/features/form-engine/constants/enums";
import { cn } from "@/lib/utils/index";

export type FormSectionProps = {
  id: string;
  title?: string;
  description?: string;
  layout?: FormLayout;
  className?: string;
  children: React.ReactNode;
  hidden?: boolean;
};

export function FormSection({
  id,
  title,
  description,
  layout,
  className,
  children,
  hidden,
}: FormSectionProps) {
  if (hidden) return null;

  return (
    <section
      data-slot="form-section"
      data-section-id={id}
      className={cn("space-y-4", className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      {title || description ? (
        <header className="space-y-1">
          {title ? (
            <h3
              id={`${id}-title`}
              className="text-foreground text-sm font-semibold tracking-tight"
            >
              {title}
            </h3>
          ) : null}
          <FieldDescription>{description}</FieldDescription>
        </header>
      ) : null}
      <div className={layoutGridClass(layout)}>{children}</div>
    </section>
  );
}
