"use client";

import * as React from "react";

import { ResultAlert } from "@/features/results-engine/components/result-alert";
import { ResultCard } from "@/features/results-engine/components/result-card";
import {
  RecommendationTone,
  StatusTone,
} from "@/features/results-engine/constants/enums";
import type { RecommendationDefinition } from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type RecommendationCardProps = {
  recommendations: RecommendationDefinition;
  className?: string;
};

function toneToStatus(
  tone: (typeof RecommendationTone)[keyof typeof RecommendationTone],
): (typeof StatusTone)[keyof typeof StatusTone] {
  switch (tone) {
    case RecommendationTone.Warning:
      return StatusTone.Warning;
    case RecommendationTone.Insight:
      return StatusTone.Info;
    case RecommendationTone.Suggestion:
      return StatusTone.Success;
    case RecommendationTone.Tip:
    default:
      return StatusTone.Neutral;
  }
}

export function RecommendationCard({
  recommendations,
  className,
}: RecommendationCardProps) {
  return (
    <ResultCard
      title={recommendations.title ?? "Recommendations"}
      className={cn(className)}
      printSafe
    >
      <div data-slot="recommendation-card" className="space-y-3">
        {recommendations.items.map((item) => (
          <ResultAlert
            key={item.id}
            title={item.title}
            description={
              item.aiGenerated ? `${item.body} (AI-ready)` : item.body
            }
            tone={toneToStatus(item.tone)}
          />
        ))}
      </div>
    </ResultCard>
  );
}
