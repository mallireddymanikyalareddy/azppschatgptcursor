"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResultGrid } from "@/features/results-engine/components/result-grid";
import type {
  MappedMetric,
  ResultSectionDefinition,
} from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ResultSectionProps = {
  section: ResultSectionDefinition;
  metrics: MappedMetric[];
  className?: string;
};

export function ResultSection({
  section,
  metrics,
  className,
}: ResultSectionProps) {
  const sectionMetrics = section.metricIds
    ? metrics.filter((m) => section.metricIds?.includes(m.definition.id))
    : metrics;

  const body = (
    <div className="space-y-3">
      {section.description && !section.expandable ? (
        <p className="text-muted-foreground text-sm">{section.description}</p>
      ) : null}
      <ResultGrid metrics={sectionMetrics} columns={3} />
    </div>
  );

  if (section.expandable) {
    return (
      <Accordion
        type="single"
        collapsible
        defaultValue={section.defaultOpen === false ? undefined : section.id}
        className={cn(className)}
        data-slot="result-section"
      >
        <AccordionItem value={section.id}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            {section.description ? (
              <p className="text-muted-foreground mb-3 text-sm">
                {section.description}
              </p>
            ) : null}
            {body}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <section
      data-slot="result-section"
      className={cn("space-y-3", className)}
      aria-labelledby={`${section.id}-title`}
    >
      <h3
        id={`${section.id}-title`}
        className="text-sm font-semibold tracking-tight"
      >
        {section.title}
      </h3>
      {body}
    </section>
  );
}
