"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuilderStep } from "@/features/calculator-builder/constants/enums";
import { useCalculatorBuilder } from "@/features/calculator-builder/hooks/use-calculator-builder";
import { MetadataBuilder } from "@/features/calculator-builder/components/metadata-builder";
import { InputBuilder } from "@/features/calculator-builder/components/input-builder";
import { FormulaBuilder } from "@/features/calculator-builder/components/formula-builder";
import { ResultBuilder } from "@/features/calculator-builder/components/result-builder";
import { ChartBuilder } from "@/features/calculator-builder/components/chart-builder";
import { SEOBuilder } from "@/features/calculator-builder/components/seo-builder";
import { ContentBuilder } from "@/features/calculator-builder/components/content-builder";
import { PreviewPanel } from "@/features/calculator-builder/components/preview-panel";
import { ValidationPanel } from "@/features/calculator-builder/components/validation-panel";
import { JSONViewer } from "@/features/calculator-builder/components/json-viewer";
import {
  bmiBuilderDefinition,
  homeLoanEmiBuilderDefinition,
  simpleInterestBuilderDefinition,
} from "@/features/calculator-builder/data";
import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import { cn } from "@/lib/utils/index";

const STEPS: { id: BuilderStep; label: string }[] = [
  { id: BuilderStep.Metadata, label: "Metadata" },
  { id: BuilderStep.Inputs, label: "Inputs" },
  { id: BuilderStep.Formulas, label: "Formulas" },
  { id: BuilderStep.Results, label: "Results" },
  { id: BuilderStep.Charts, label: "Charts" },
  { id: BuilderStep.Seo, label: "SEO" },
  { id: BuilderStep.Content, label: "Content" },
  { id: BuilderStep.Preview, label: "Preview" },
  { id: BuilderStep.Json, label: "JSON" },
];

const EXAMPLES: {
  id: string;
  label: string;
  definition: CalculatorBuilderDefinition;
}[] = [
  {
    id: "emi",
    label: "Home Loan EMI",
    definition: homeLoanEmiBuilderDefinition,
  },
  {
    id: "si",
    label: "Simple Interest",
    definition: simpleInterestBuilderDefinition,
  },
  { id: "bmi", label: "BMI", definition: bmiBuilderDefinition },
];

export type CalculatorBuilderProps = {
  initial?: CalculatorBuilderDefinition;
  className?: string;
};

/**
 * Production Calculator Builder shell — configuration workflow only.
 * Does not modify auth, admin chrome, or engine packages.
 */
export function CalculatorBuilder({
  initial,
  className,
}: CalculatorBuilderProps) {
  const builder = useCalculatorBuilder({
    initial,
    enableAutosave: true,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Calculator Builder
          </h1>
          <p className="text-muted-foreground text-sm">
            Create calculator definitions without code. Schema{" "}
            {builder.definition.schemaVersion} · Definition{" "}
            {builder.definition.definitionVersion}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            onValueChange={(value) => {
              const example = EXAMPLES.find((item) => item.id === value);
              if (example) builder.reset(structuredClone(example.definition));
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Load example" />
            </SelectTrigger>
            <SelectContent>
              {EXAMPLES.map((example) => (
                <SelectItem key={example.id} value={example.id}>
                  {example.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            onClick={builder.undo}
            disabled={!builder.canUndo}
          >
            Undo
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={builder.redo}
            disabled={!builder.canRedo}
          >
            Redo
          </Button>
        </div>
      </div>

      <ValidationPanel validation={builder.validation} />

      <Tabs
        value={builder.step}
        onValueChange={(value) => builder.setStep(value as BuilderStep)}
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          {STEPS.map((step) => (
            <TabsTrigger key={step.id} value={step.id}>
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={BuilderStep.Metadata} className="mt-4">
          <MetadataBuilder
            definition={builder.definition}
            onChange={(metadata) =>
              builder.patchDefinition({ metadata }, "metadata")
            }
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Inputs} className="mt-4">
          <InputBuilder
            definition={builder.definition}
            onChange={(inputs) => builder.patchDefinition({ inputs }, "inputs")}
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Formulas} className="mt-4">
          <FormulaBuilder
            definition={builder.definition}
            onChange={(formulas) =>
              builder.patchDefinition({ formulas }, "formulas")
            }
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Results} className="mt-4">
          <ResultBuilder
            definition={builder.definition}
            onChange={(results) =>
              builder.patchDefinition({ results }, "results")
            }
            onBreakdownsChange={(breakdowns) =>
              builder.patchDefinition({ breakdowns }, "breakdowns")
            }
            onRecommendationsChange={(recommendations) =>
              builder.patchDefinition({ recommendations }, "recommendations")
            }
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Charts} className="mt-4">
          <ChartBuilder
            definition={builder.definition}
            onChange={(charts) => builder.patchDefinition({ charts }, "charts")}
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Seo} className="mt-4">
          <SEOBuilder
            definition={builder.definition}
            onChange={(seo) => builder.patchDefinition({ seo }, "seo")}
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Content} className="mt-4">
          <ContentBuilder
            definition={builder.definition}
            onChange={(content) =>
              builder.patchDefinition({ content }, "content")
            }
          />
        </TabsContent>

        <TabsContent value={BuilderStep.Preview} className="mt-4">
          <PreviewPanel preview={builder.preview} />
        </TabsContent>

        <TabsContent value={BuilderStep.Json} className="mt-4">
          <JSONViewer json={builder.json} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
