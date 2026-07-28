"use client";

import * as React from "react";

import { ResultAlert } from "@/features/results-engine/components/result-alert";
import type { InfoCardDefinition } from "@/features/results-engine/types";

export type InfoCardProps = {
  info: InfoCardDefinition;
  className?: string;
};

export function InfoCard({ info, className }: InfoCardProps) {
  return (
    <ResultAlert
      title={info.title}
      description={info.body}
      tone={info.tone ?? "info"}
      className={className}
    />
  );
}
