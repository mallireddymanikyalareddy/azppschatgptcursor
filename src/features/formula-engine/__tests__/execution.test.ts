import { describe, expect, it } from "vitest";

import { FormulaErrorCode } from "@/features/formula-engine/constants/enums";
import { FormulaEngine } from "@/features/formula-engine/engine/formula-engine";
import {
  bmiProgram,
  compoundInterestProgram,
  homeLoanEmiProgram,
  simpleInterestProgram,
} from "@/features/formula-engine/data";

describe("execution", () => {
  const engine = new FormulaEngine();

  it("evaluates simple arithmetic", () => {
    const result = engine.evaluateExpression("2 + 3 * 4", {
      values: {},
      precision: 0,
    });
    expect(result.success).toBe(true);
    expect(result.value).toBe(14);
  });

  it("evaluates exponentiation right-associatively", () => {
    const result = engine.evaluateExpression("2^3^2", {
      values: {},
      precision: 0,
    });
    expect(result.success).toBe(true);
    // 2^(3^2) = 512
    expect(result.value).toBe(512);
  });

  it("supports built-in functions", () => {
    const result = engine.evaluateExpression("round(sqrt(abs(-16)))", {
      values: {},
      precision: 0,
    });
    expect(result.success).toBe(true);
    expect(result.value).toBe(4);
  });

  it("returns divide-by-zero error", () => {
    const result = engine.evaluateExpression("10 / x", {
      values: { x: 0 },
    });
    expect(result.success).toBe(false);
    expect(
      result.errors.some((e) => e.code === FormulaErrorCode.DivideByZero),
    ).toBe(true);
  });

  it("returns missing input error", () => {
    const result = engine.evaluateExpression("P * 2", {
      values: {},
      variables: ["P"],
    });
    expect(result.success).toBe(false);
    expect(
      result.errors.some(
        (e) =>
          e.code === FormulaErrorCode.MissingInput ||
          e.code === FormulaErrorCode.UnknownVariable,
      ),
    ).toBe(true);
  });

  it("never accepts arbitrary identifiers as code", () => {
    const result = engine.evaluateExpression("eval(1)", {
      values: {},
    });
    expect(result.success).toBe(false);
    expect(
      result.errors.some((e) => e.code === FormulaErrorCode.InvalidFunction),
    ).toBe(true);
  });
});

describe("mock programs", () => {
  const engine = new FormulaEngine();

  it("computes simple interest", () => {
    const result = engine.evaluateProgram(simpleInterestProgram, {
      values: { P: 10000, R: 10, T: 2 },
    });
    expect(result.success).toBe(true);
    expect(result.results.si).toBe(2000);
    expect(result.results.amount).toBe(12000);
  });

  it("computes compound interest", () => {
    const result = engine.evaluateProgram(compoundInterestProgram, {
      values: { P: 10000, R: 10, T: 2 },
    });
    expect(result.success).toBe(true);
    expect(result.results.amount).toBe(12100);
    expect(result.results.ci).toBe(2100);
  });

  it("computes BMI", () => {
    const result = engine.evaluateProgram(bmiProgram, {
      values: { weightKg: 70, heightM: 1.75 },
    });
    expect(result.success).toBe(true);
    expect(result.results.bmi).toBeCloseTo(22.86, 2);
  });

  it("computes home loan EMI program", () => {
    const result = engine.evaluateProgram(homeLoanEmiProgram, {
      values: { P: 5000000, annualRate: 8.5, n: 240 },
    });
    expect(result.success).toBe(true);
    expect(result.results.emi).toBeGreaterThan(40000);
    expect(result.results.emi).toBeLessThan(50000);
    expect(result.results.totalPayment).toBeGreaterThan(result.results.emi!);
    expect(result.results.totalInterest).toBeGreaterThan(0);
  });
});
