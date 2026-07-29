"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { toTemplateCard } from "@/features/calculator-templates/lib/template-card";

export type TemplateCardProps = {
  template: CalculatorTemplate;
  onOpen: (template: CalculatorTemplate) => void;
  onPreview: (template: CalculatorTemplate) => void;
  onEdit: (template: CalculatorTemplate) => void;
};

export function TemplateCard({
  template,
  onOpen,
  onPreview,
  onEdit,
}: TemplateCardProps) {
  const card = toTemplateCard(template);

  return (
    <Card className="gap-3 py-4">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="capitalize">
            {card.templateType}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {card.difficulty}
          </Badge>
          {card.seoReady ? <Badge variant="outline">SEO ready</Badge> : null}
          {card.contentReady ? (
            <Badge variant="outline">Content ready</Badge>
          ) : null}
        </div>
        <CardTitle className="text-base leading-snug">{card.name}</CardTitle>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {card.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <dl className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">Category</dt>
            <dd>{card.category}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Version</dt>
            <dd className="font-mono">{card.version}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Inputs</dt>
            <dd className="tabular-nums">{card.inputCount}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Formulas</dt>
            <dd className="tabular-nums">{card.formulaCount}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Charts</dt>
            <dd>{card.chartsIncluded ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Build time</dt>
            <dd className="tabular-nums">~{card.estimatedBuildMinutes}m</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Usage</dt>
            <dd className="tabular-nums">
              {card.usageCount.toLocaleString("en-IN")}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="capitalize">{card.status}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => onOpen(template)}
          >
            Details
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onPreview(template)}
          >
            Preview
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onEdit(template)}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
