"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AIPreviewPanel } from "@/features/ai-calculator-generator/components/ai-preview-panel";
import { BuilderReviewPanel } from "@/features/ai-calculator-generator/components/builder-review-panel";
import { ConfidencePanel } from "@/features/ai-calculator-generator/components/confidence-panel";
import { GenerationProgress } from "@/features/ai-calculator-generator/components/generation-progress";
import { HistoryPanel } from "@/features/ai-calculator-generator/components/history-panel";
import { PromptLibraryPanel } from "@/features/ai-calculator-generator/components/prompt-library-panel";
import { PromptWorkspace } from "@/features/ai-calculator-generator/components/prompt-workspace";
import { SuggestionPanel } from "@/features/ai-calculator-generator/components/suggestion-panel";
import { ValidationPanel } from "@/features/ai-calculator-generator/components/validation-panel";
import { useAIGenerator } from "@/features/ai-calculator-generator/hooks/use-ai-generator";
import type { PromptIndustry } from "@/features/ai-calculator-generator/constants/enums";

/**
 * AI Calculator Generator dashboard — mock pipeline to Builder-compatible drafts.
 */
export function AIGeneratorDashboard() {
  return (
    <React.Suspense
      fallback={
        <p className="text-muted-foreground text-sm">Loading generator…</p>
      }
    >
      <AIGeneratorDashboardInner />
    </React.Suspense>
  );
}

function AIGeneratorDashboardInner() {
  const generator = useAIGenerator();
  const params = useSearchParams();
  const [historyToken, setHistoryToken] = React.useState(0);

  React.useEffect(() => {
    const id = params.get("generation");
    if (id) void generator.loadResult(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  React.useEffect(() => {
    if (generator.result) setHistoryToken((value) => value + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only bump when generation id changes
  }, [generator.result?.id]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Factory"
        title="AI Calculator Generator"
        description="Turn a natural-language prompt into a Builder-compatible calculator draft. Mock AI only — never auto-publishes."
        actions={
          <Badge variant="secondary">
            {generator.stats.totalGenerations} generations
          </Badge>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total"
          value={String(generator.stats.totalGenerations)}
        />
        <StatCard
          label="Needs review"
          value={String(generator.stats.needsReview)}
        />
        <StatCard
          label="Avg confidence"
          value={`${(generator.stats.avgConfidence * 100).toFixed(0)}%`}
        />
        <StatCard
          label="Avg duration"
          value={`${(generator.stats.avgDurationMs / 1000).toFixed(1)}s`}
        />
      </div>

      {generator.notice ? (
        <Alert variant="info">
          <AlertTitle>Generator notice</AlertTitle>
          <AlertDescription>{generator.notice}</AlertDescription>
        </Alert>
      ) : null}

      {generator.error ? (
        <Alert variant="error">
          <AlertTitle>Generation error</AlertTitle>
          <AlertDescription>{generator.error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <PromptWorkspace
            prompt={generator.prompt}
            onChange={generator.patchPrompt}
            onGenerate={() => void generator.generate()}
            generating={generator.generating}
          />

          <GenerationProgress
            stages={generator.stages}
            currentStage={generator.currentStage}
            generating={generator.generating}
          />

          {generator.result ? (
            <>
              <div className="grid gap-4 lg:grid-cols-2">
                <ConfidencePanel confidence={generator.result.confidence} />
                <ValidationPanel report={generator.result.validation} />
              </div>
              <SuggestionPanel items={generator.result.related} />
              <AIPreviewPanel definition={generator.result.definition} />
              <BuilderReviewPanel
                result={generator.result}
                onSave={(definition) =>
                  void generator.updateDefinition(definition)
                }
                onApprove={() => void generator.approveDraft()}
                onReject={() => void generator.rejectDraft()}
              />
            </>
          ) : null}
        </div>

        <div className="space-y-6">
          <PromptLibraryPanel
            onSelect={(promptText, industry) => {
              generator.patchPrompt({
                prompt: promptText,
                ...(industry
                  ? { industry: industry as PromptIndustry | "auto" }
                  : {}),
              });
            }}
          />
          <HistoryPanel
            refreshToken={historyToken}
            onOpen={(id) => void generator.loadResult(id)}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-lg font-semibold tabular-nums">{value}</p>
    </div>
  );
}
