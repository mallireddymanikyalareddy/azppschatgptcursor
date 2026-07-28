import { describe, expect, it } from "vitest";

import { CalculationErrorCode } from "@/features/calculation-engine/constants/enums";
import {
  bmiCalculator,
  compoundInterestCalculator,
  homeLoanEmiCalculator,
  simpleInterestCalculator,
} from "@/features/calculation-engine/data";
import { CalculationEngine } from "@/features/calculation-engine/services/calculation-engine";
import { CalculationLogger } from "@/features/calculation-engine/services/calculation-logger";
import { formatOutputValue } from "@/features/calculation-engine/formatting/result-formatter";
import { OutputFormat } from "@/features/calculation-engine/constants/enums";

const silentLogger = new CalculationLogger(() => undefined);

describe("CalculationEngine", () => {
  const engine = new CalculationEngine({ logger: silentLogger });

  it("calculates simple interest successfully", async () => {
    const result = await engine.calculate({
      calculator: simpleInterestCalculator,
      inputs: { P: 10000, R: 10, T: 2 },
      context: { locale: "en-IN", currency: "INR" },
    });

    expect(result.success).toBe(true);
    expect(result.calculatedValues.si).toBe(2000);
    expect(result.calculatedValues.amount).toBe(12000);
    expect(result.formattedValues.length).toBeGreaterThan(0);
    expect(result.metadata.calculatorSlug).toBe("simple-interest");
  });

  it("calculates compound interest", async () => {
    const result = await engine.calculate({
      calculator: compoundInterestCalculator,
      inputs: { P: 10000, R: 10, T: 2 },
    });
    expect(result.success).toBe(true);
    expect(result.calculatedValues.amount).toBe(12100);
    expect(result.calculatedValues.ci).toBe(2100);
  });

  it("calculates BMI", async () => {
    const result = await engine.calculate({
      calculator: bmiCalculator,
      inputs: { weightKg: 70, heightM: 1.75 },
    });
    expect(result.success).toBe(true);
    expect(result.calculatedValues.bmi).toBeCloseTo(22.86, 2);
  });

  it("runs EMI with derived interest percentage", async () => {
    const result = await engine.calculate({
      calculator: homeLoanEmiCalculator,
      inputs: { P: 5000000, annualRate: 8.5, n: 240 },
      context: { locale: "en-IN", currency: "INR", requestId: "req_1" },
    });

    expect(result.success).toBe(true);
    expect(result.calculatedValues.emi).toBeGreaterThan(40000);
    expect(result.calculatedValues.totalInterest).toBeGreaterThan(0);
    expect(result.calculatedValues.interestPercentage).toBeGreaterThan(0);
    expect(
      result.formattedValues.some((v) => v.key === "interestPercentage"),
    ).toBe(true);
    expect(result.metadata.requestId).toBe("req_1");
  });

  it("fails validation for missing required input", async () => {
    const result = await engine.calculate({
      calculator: simpleInterestCalculator,
      inputs: { P: 10000, R: 10 },
    });
    expect(result.success).toBe(false);
    expect(
      result.errors.some((e) => e.code === CalculationErrorCode.MissingInput),
    ).toBe(true);
  });

  it("fails validation for out-of-range input", async () => {
    const result = await engine.calculate({
      calculator: homeLoanEmiCalculator,
      inputs: { P: 100, annualRate: 8.5, n: 240 },
    });
    expect(result.success).toBe(false);
    expect(
      result.errors.some((e) => e.code === CalculationErrorCode.InvalidInput),
    ).toBe(true);
  });

  it("coerces string inputs", async () => {
    const result = await engine.calculate({
      calculator: simpleInterestCalculator,
      inputs: { P: "10000", R: "10", T: "2" },
    });
    expect(result.success).toBe(true);
    expect(result.inputs.P).toBe(10000);
  });

  it("applies default values when provided", async () => {
    const calculator = {
      ...bmiCalculator,
      inputs: [
        { name: "weightKg", label: "Weight", required: true, min: 1 },
        {
          name: "heightM",
          label: "Height",
          required: false,
          defaultValue: 1.75,
          min: 0.5,
        },
      ],
    };

    const result = await engine.calculate({
      calculator,
      inputs: { weightKg: 70 },
    });
    expect(result.success).toBe(true);
    expect(result.inputs.heightM).toBe(1.75);
    expect(result.warnings.some((w) => w.code === "DEFAULT_APPLIED")).toBe(
      true,
    );
  });
});

describe("ResultFormatter", () => {
  it("formats currency and percentage", () => {
    const currency = formatOutputValue(
      {
        key: "emi",
        label: "EMI",
        format: OutputFormat.Currency,
        currency: "INR",
        precision: 2,
      },
      43391.12,
      { locale: "en-IN", currency: "INR" },
    );
    expect(currency.formatted).toContain("43");

    const pct = formatOutputValue(
      {
        key: "rate",
        label: "Rate",
        format: OutputFormat.Percentage,
        precision: 2,
      },
      12.5,
      { locale: "en-IN", currency: "INR" },
    );
    expect(pct.formatted).toMatch(/12/);
  });

  it("formats integer and scientific", () => {
    const integer = formatOutputValue(
      { key: "n", label: "N", format: OutputFormat.Integer },
      12.7,
      { locale: "en-US", currency: "USD" },
    );
    expect(integer.formatted).toBe("13");

    const scientific = formatOutputValue(
      {
        key: "x",
        label: "X",
        format: OutputFormat.Scientific,
        precision: 2,
      },
      1234,
      { locale: "en-US", currency: "USD" },
    );
    expect(scientific.formatted.toLowerCase()).toContain("e");
  });
});
