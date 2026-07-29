"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { toTemplateCard } from "@/features/calculator-templates/lib/template-card";

export type TemplateTableProps = {
  items: CalculatorTemplate[];
  onOpen: (template: CalculatorTemplate) => void;
  onPreview: (template: CalculatorTemplate) => void;
  onEdit: (template: CalculatorTemplate) => void;
};

export function TemplateTable({
  items,
  onOpen,
  onPreview,
  onEdit,
}: TemplateTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground py-10 text-center text-sm">
        No templates match the current filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Inputs</TableHead>
            <TableHead>Formulas</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Version</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((template) => {
            const card = toTemplateCard(template);
            return (
              <TableRow key={card.id}>
                <TableCell>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-muted-foreground line-clamp-1 text-xs">
                    {card.description}
                  </div>
                </TableCell>
                <TableCell>{card.category}</TableCell>
                <TableCell className="capitalize">
                  {card.templateType}
                </TableCell>
                <TableCell className="capitalize">{card.difficulty}</TableCell>
                <TableCell className="tabular-nums">
                  {card.inputCount}
                </TableCell>
                <TableCell className="tabular-nums">
                  {card.formulaCount}
                </TableCell>
                <TableCell className="tabular-nums">
                  {card.usageCount.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {card.version}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => onOpen(template)}
                    >
                      Details
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
