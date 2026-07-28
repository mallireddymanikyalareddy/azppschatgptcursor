import { describe, expect, it } from "vitest";

import { FormulaErrorCode } from "@/features/formula-engine/constants/enums";
import { FormulaEngine } from "@/features/formula-engine/engine/formula-engine";
import { parseExpression } from "@/features/formula-engine/parser/parse";
import { validateAst } from "@/features/formula-engine/validator/validate";
import { resolveDependencies } from "@/features/formula-engine/dependencies/resolve";
import type { FormulaProgram } from "@/features/formula-engine/types";

describe("validation", () => {
  it("flags unknown variables", () => {
    const parsed = parseExpression("P * X");
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    const result = validateAst(parsed.ast, {
      knownNames: new Set(["P"]),
    });
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.code === FormulaErrorCode.UnknownVariable),
    ).toBe(true);
  });

  it("flags unsupported functions", () => {
    const engine = new FormulaEngine();
    const result = engine.validate("hack(1)", ["a"]);
    expect(result.valid).toBe(false);
    expect(
      result.errors.some((e) => e.code === FormulaErrorCode.InvalidFunction),
    ).toBe(true);
  });

  it("detects circular dependencies", () => {
    const program: FormulaProgram = {
      id: "cycle",
      name: "cycle",
      formulas: [
        {
          id: "a",
          key: "a",
          name: "A",
          expression: "b + 1",
          dependencies: ["b"],
        },
        {
          id: "b",
          key: "b",
          name: "B",
          expression: "a + 1",
          dependencies: ["a"],
        },
      ],
    };
    const result = resolveDependencies(program);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.errors.some(
          (e) => e.code === FormulaErrorCode.CircularDependency,
        ),
      ).toBe(true);
    }
  });
});
