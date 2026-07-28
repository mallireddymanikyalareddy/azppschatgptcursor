"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { formulaEngine } from "@/features/formula-engine";
import { createBuilderId } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  BuilderFormula,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type FormulaBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (formulas: BuilderFormula[]) => void;
};

function createEmptyFormula(order: number): BuilderFormula {
  return {
    id: createBuilderId("formula"),
    name: "",
    key: "",
    expression: "",
    variables: [],
    dependencies: [],
    precision: 2,
    order,
  };
}

export function FormulaBuilder({ definition, onChange }: FormulaBuilderProps) {
  const formulas = [...definition.formulas].sort((a, b) => a.order - b.order);
  const [testValues, setTestValues] = React.useState<Record<string, string>>(
    {},
  );
  const [testOutput, setTestOutput] = React.useState<string>("");

  const knownNames = React.useMemo(() => {
    const names = new Set(definition.inputs.map((i) => i.name).filter(Boolean));
    for (const formula of formulas) {
      if (formula.key) names.add(formula.key);
    }
    return [...names];
  }, [definition.inputs, formulas]);

  const updateAt = (id: string, patch: Partial<BuilderFormula>) => {
    onChange(
      definition.formulas.map((formula) =>
        formula.id === id ? { ...formula, ...patch } : formula,
      ),
    );
  };

  const addFormula = () => {
    onChange([
      ...definition.formulas,
      createEmptyFormula(definition.formulas.length + 1),
    ]);
  };

  const removeFormula = (id: string) => {
    onChange(
      definition.formulas
        .filter((formula) => formula.id !== id)
        .map((formula, index) => ({ ...formula, order: index + 1 })),
    );
  };

  const move = (id: string, direction: -1 | 1) => {
    const sorted = [...formulas];
    const index = sorted.findIndex((f) => f.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= sorted.length) return;
    const swap = sorted[index]!;
    sorted[index] = sorted[target]!;
    sorted[target] = swap;
    onChange(sorted.map((formula, i) => ({ ...formula, order: i + 1 })));
  };

  const validateFormula = (formula: BuilderFormula) => {
    const others = knownNames.filter((n) => n !== formula.key);
    return formulaEngine.validate(formula.expression, others);
  };

  const testFormula = (formula: BuilderFormula) => {
    const values: Record<string, number> = {};
    for (const [key, raw] of Object.entries(testValues)) {
      const num = Number(raw);
      if (Number.isFinite(num)) values[key] = num;
    }
    const result = formulaEngine.evaluateExpression(formula.expression, {
      values,
      id: formula.id,
      key: formula.key || "result",
      precision: formula.precision,
    });
    if (result.success) {
      setTestOutput(`${formula.key || "result"} = ${result.value}`);
    } else {
      setTestOutput(
        result.errors.map((e) => e.message).join("; ") || "Test failed",
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Formula builder</h2>
          <p className="text-muted-foreground text-sm">
            Multiple formulas with dependencies, order, validation, and testing.
          </p>
        </div>
        <Button type="button" onClick={addFormula}>
          Add formula
        </Button>
      </div>

      {formulas.length === 0 ? (
        <p className="text-muted-foreground text-sm">No formulas yet.</p>
      ) : null}

      <div className="space-y-4">
        {formulas.map((formula, index) => {
          const validation = formula.expression
            ? validateFormula(formula)
            : null;
          return (
            <div
              key={formula.id}
              className="border-border space-y-3 rounded-lg border p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">
                  Formula {index + 1}
                  {formula.name ? ` — ${formula.name}` : ""}
                  <span className="text-muted-foreground ml-2">
                    order {formula.order}
                  </span>
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => move(formula.id, -1)}
                    disabled={index === 0}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => move(formula.id, 1)}
                    disabled={index === formulas.length - 1}
                  >
                    Down
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFormula(formula.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={formula.name}
                    onChange={(e) =>
                      updateAt(formula.id, { name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Output variable</Label>
                  <Input
                    value={formula.key}
                    onChange={(e) =>
                      updateAt(formula.id, { key: e.target.value })
                    }
                    placeholder="emi"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Expression</Label>
                  <Textarea
                    value={formula.expression}
                    onChange={(e) =>
                      updateAt(formula.id, { expression: e.target.value })
                    }
                    placeholder="P * r * (1 + r)^n / ((1 + r)^n - 1)"
                    rows={2}
                    className="font-mono text-sm"
                  />
                  {validation ? (
                    <p
                      className={
                        validation.valid
                          ? "text-xs text-emerald-700"
                          : "text-destructive text-xs"
                      }
                    >
                      {validation.valid
                        ? "Expression is valid."
                        : validation.errors.map((e) => e.message).join("; ")}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label>Variables (comma-separated)</Label>
                  <Input
                    value={formula.variables.join(", ")}
                    onChange={(e) =>
                      updateAt(formula.id, {
                        variables: e.target.value
                          .split(",")
                          .map((v) => v.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="P, n"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dependencies (formula ids)</Label>
                  <Input
                    value={formula.dependencies.join(", ")}
                    onChange={(e) =>
                      updateAt(formula.id, {
                        dependencies: e.target.value
                          .split(",")
                          .map((v) => v.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="f_monthly_rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Precision</Label>
                  <Input
                    type="number"
                    value={formula.precision}
                    onChange={(e) =>
                      updateAt(formula.id, {
                        precision: Number(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={Boolean(formula.currency)}
                      onCheckedChange={(checked) =>
                        updateAt(formula.id, { currency: checked })
                      }
                    />
                    <Label>Currency</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={Boolean(formula.percentage)}
                      onCheckedChange={(checked) =>
                        updateAt(formula.id, { percentage: checked })
                      }
                    />
                    <Label>Percentage</Label>
                  </div>
                </div>
              </div>

              <div className="bg-muted/40 space-y-2 rounded-md p-3">
                <Label>Formula testing</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {definition.inputs.map((input) => (
                    <Input
                      key={input.id}
                      placeholder={input.name || input.label}
                      value={testValues[input.name] ?? ""}
                      onChange={(e) =>
                        setTestValues((prev) => ({
                          ...prev,
                          [input.name]: e.target.value,
                        }))
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => testFormula(formula)}
                  >
                    Test formula
                  </Button>
                  {testOutput ? (
                    <p className="font-mono text-xs">{testOutput}</p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
