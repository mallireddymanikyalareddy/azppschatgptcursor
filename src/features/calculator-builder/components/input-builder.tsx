"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FieldType,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";
import { createBuilderId } from "@/features/calculator-builder/lib/create-empty-definition";
import type {
  BuilderInput,
  CalculatorBuilderDefinition,
} from "@/features/calculator-builder/types";

export type InputBuilderProps = {
  definition: CalculatorBuilderDefinition;
  onChange: (inputs: BuilderInput[]) => void;
};

function createEmptyInput(order: number): BuilderInput {
  return {
    id: createBuilderId("input"),
    label: "",
    name: "",
    type: FieldType.Number,
    required: true,
    validation: [
      { type: ValidationRuleType.Required, message: "This field is required." },
    ],
    order,
  };
}

export function InputBuilder({ definition, onChange }: InputBuilderProps) {
  const inputs = [...definition.inputs].sort((a, b) => a.order - b.order);

  const updateAt = (id: string, patch: Partial<BuilderInput>) => {
    onChange(
      definition.inputs.map((input) =>
        input.id === id ? { ...input, ...patch } : input,
      ),
    );
  };

  const addInput = () => {
    onChange([
      ...definition.inputs,
      createEmptyInput(definition.inputs.length + 1),
    ]);
  };

  const removeInput = (id: string) => {
    onChange(
      definition.inputs
        .filter((input) => input.id !== id)
        .map((input, index) => ({ ...input, order: index + 1 })),
    );
  };

  const move = (id: string, direction: -1 | 1) => {
    const sorted = [...inputs];
    const index = sorted.findIndex((input) => input.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= sorted.length) return;
    const swap = sorted[index]!;
    sorted[index] = sorted[target]!;
    sorted[target] = swap;
    onChange(sorted.map((input, i) => ({ ...input, order: i + 1 })));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Input builder</h2>
          <p className="text-muted-foreground text-sm">
            Add, edit, delete, and reorder calculator inputs.
          </p>
        </div>
        <Button type="button" onClick={addInput}>
          Add input
        </Button>
      </div>

      {inputs.length === 0 ? (
        <p className="text-muted-foreground text-sm">No inputs yet.</p>
      ) : null}

      <div className="space-y-4">
        {inputs.map((input, index) => (
          <div
            key={input.id}
            className="border-border space-y-3 rounded-lg border p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium">
                Input {index + 1}
                {input.label ? ` — ${input.label}` : ""}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => move(input.id, -1)}
                  disabled={index === 0}
                >
                  Up
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => move(input.id, 1)}
                  disabled={index === inputs.length - 1}
                >
                  Down
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeInput(input.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={input.label}
                  onChange={(e) =>
                    updateAt(input.id, { label: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Variable name</Label>
                <Input
                  value={input.name}
                  onChange={(e) => updateAt(input.id, { name: e.target.value })}
                  placeholder="loanAmount"
                />
              </div>
              <div className="space-y-2">
                <Label>Input type</Label>
                <Select
                  value={input.type}
                  onValueChange={(value) =>
                    updateAt(input.id, { type: value as BuilderInput["type"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(FieldType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Placeholder</Label>
                <Input
                  value={input.placeholder ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, {
                      placeholder: e.target.value || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Default value</Label>
                <Input
                  value={
                    input.defaultValue === null ||
                    input.defaultValue === undefined
                      ? ""
                      : String(input.defaultValue)
                  }
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") {
                      updateAt(input.id, { defaultValue: null });
                      return;
                    }
                    const asNumber = Number(raw);
                    updateAt(input.id, {
                      defaultValue: Number.isFinite(asNumber) ? asNumber : raw,
                    });
                  }}
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch
                  checked={input.required}
                  onCheckedChange={(checked) =>
                    updateAt(input.id, { required: checked })
                  }
                />
                <Label>Required</Label>
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input
                  value={input.unit ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, { unit: e.target.value || undefined })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Prefix</Label>
                <Input
                  value={input.prefix ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, { prefix: e.target.value || undefined })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Suffix</Label>
                <Input
                  value={input.suffix ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, { suffix: e.target.value || undefined })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Min</Label>
                <Input
                  type="number"
                  value={input.min ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, {
                      min:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Max</Label>
                <Input
                  type="number"
                  value={input.max ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, {
                      max:
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Help text</Label>
                <Input
                  value={input.helpText ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, {
                      helpText: e.target.value || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Tooltip</Label>
                <Input
                  value={input.tooltip ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, {
                      tooltip: e.target.value || undefined,
                    })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Conditional rules (placeholder)</Label>
                <Textarea
                  value={input.conditionalRulesPlaceholder ?? ""}
                  onChange={(e) =>
                    updateAt(input.id, {
                      conditionalRulesPlaceholder: e.target.value || undefined,
                    })
                  }
                  placeholder="Future: showWhen / hideWhen JSON"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
