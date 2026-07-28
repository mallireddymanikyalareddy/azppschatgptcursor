import { describe, expect, it } from "vitest";

import {
  calculateMonthlyEmi,
  formatCurrencyInr,
  formatPercent,
  generateAmortisationSchedule,
  summariseLoan,
} from "@/features/calculator-runtime/lib/amortisation";
import { resolveCalculatorInputs } from "@/features/calculator-runtime/lib/resolve-inputs";
import { validateCalculatorBusinessRules } from "@/features/calculator-runtime/lib/validate-business-rules";
import { homeLoanEmiProductionDefinition } from "@/features/calculators/definitions/home-loan-emi";
import { calculationEngine } from "@/features/calculation-engine";
import { homeLoanEmiProductionWorkflow } from "@/features/calculators/definitions/home-loan-emi/workflow";

describe("Home Loan EMI formula", () => {
  it("calculates monthly EMI for a standard reducing-balance loan", () => {
    const emi = calculateMonthlyEmi(5_000_000, 8.5, 240);
    expect(emi).toBeGreaterThan(40_000);
    expect(emi).toBeLessThan(50_000);
    expect(emi).toBeCloseTo(43_391.12, 0);
  });

  it("uses principal / n when interest rate is zero", () => {
    const emi = calculateMonthlyEmi(1_200_000, 0, 120);
    expect(emi).toBe(10_000);
  });
});

describe("Interest and total payment", () => {
  it("computes interest paid and total payment from the schedule", () => {
    const summary = summariseLoan({
      principal: 5_000_000,
      annualRatePercent: 8.5,
      tenureMonths: 240,
      processingFee: 10_000,
    });

    expect(summary.emi).toBeGreaterThan(40_000);
    expect(summary.totalPayment).toBeCloseTo(
      summary.principal + summary.totalInterest,
      1,
    );
    expect(summary.totalInterest).toBeGreaterThan(0);
    expect(summary.effectiveLoanCost).toBeCloseTo(
      summary.totalPayment + 10_000,
      1,
    );
    expect(summary.interestPercentage).toBeGreaterThan(0);
    expect(summary.principalPercentage).toBeGreaterThan(0);
    expect(
      summary.interestPercentage + summary.principalPercentage,
    ).toBeGreaterThan(99);
  });
});

describe("Amortisation generation", () => {
  it("generates month rows that pay down to zero", () => {
    const schedule = generateAmortisationSchedule(500_000, 10, 12);
    expect(schedule).toHaveLength(12);
    expect(schedule[0]?.month).toBe(1);
    expect(schedule[0]?.openingBalance).toBe(500_000);
    expect(schedule[schedule.length - 1]?.closingBalance).toBe(0);

    for (const row of schedule) {
      expect(row.emi).toBeGreaterThan(0);
      expect(row.principalComponent + row.interestComponent).toBeCloseTo(
        row.emi,
        1,
      );
    }
  });

  it("includes required schedule columns", () => {
    const row = generateAmortisationSchedule(100_000, 8, 6)[0];
    expect(row).toMatchObject({
      month: 1,
      openingBalance: expect.any(Number),
      principalComponent: expect.any(Number),
      interestComponent: expect.any(Number),
      emi: expect.any(Number),
      closingBalance: expect.any(Number),
    });
  });
});

describe("Validation", () => {
  const mapping = homeLoanEmiProductionDefinition.inputMapping;

  it("rejects non-positive loan amount", () => {
    const result = validateCalculatorBusinessRules(
      {
        loanAmount: 0,
        interestRate: 8,
        loanTenure: 20,
        tenureType: "years",
      },
      mapping,
    );
    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "LOAN_AMOUNT_POSITIVE")).toBe(
      true,
    );
  });

  it("rejects tenure above maximum months", () => {
    const result = validateCalculatorBusinessRules(
      {
        loanAmount: 1_000_000,
        interestRate: 8,
        loanTenure: 50,
        tenureType: "years",
      },
      mapping,
    );
    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "TENURE_MAX")).toBe(true);
  });

  it("rejects prepayment >= loan amount", () => {
    const result = validateCalculatorBusinessRules(
      {
        loanAmount: 1_000_000,
        interestRate: 8,
        loanTenure: 10,
        tenureType: "years",
        prepayment: 1_000_000,
      },
      mapping,
    );
    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "PREPAYMENT_INVALID")).toBe(
      true,
    );
  });

  it("accepts a valid combination", () => {
    const result = validateCalculatorBusinessRules(
      {
        loanAmount: 2_000_000,
        interestRate: 0,
        loanTenure: 15,
        tenureType: "years",
        processingFee: 5000,
        prepayment: 100_000,
      },
      mapping,
    );
    expect(result.valid).toBe(true);
  });
});

describe("Input mapping", () => {
  it("converts years tenure to months and nets prepayment", () => {
    const resolved = resolveCalculatorInputs(
      {
        loanAmount: 1_000_000,
        interestRate: 9,
        loanTenure: 20,
        tenureType: "years",
        prepayment: 100_000,
        processingFee: 2500,
      },
      homeLoanEmiProductionDefinition.inputMapping,
    );

    expect(resolved.tenureMonths).toBe(240);
    expect(resolved.principal).toBe(900_000);
    expect(resolved.values.n).toBe(240);
    expect(resolved.values.P).toBe(900_000);
    expect(resolved.processingFee).toBe(2500);
  });
});

describe("Formatting", () => {
  it("formats INR currency and percentages for en-IN", () => {
    expect(formatCurrencyInr(43391.12)).toContain("43,391");
    expect(formatPercent(12.5)).toBe("12.50%");
  });
});

describe("Calculation engine production workflow", () => {
  it("executes the production EMI workflow formulas", async () => {
    const result = await calculationEngine.calculate({
      calculator: homeLoanEmiProductionWorkflow,
      inputs: {
        P: 5_000_000,
        annualRate: 8.5,
        n: 240,
        processingFeeInput: 10_000,
      },
      context: { locale: "en-IN", currency: "INR" },
    });

    expect(result.success).toBe(true);
    expect(result.calculatedValues.emi).toBeGreaterThan(40_000);
    expect(result.calculatedValues.processingFee).toBe(10_000);
    expect(result.calculatedValues.effectiveLoanCost).toBeGreaterThan(
      result.calculatedValues.totalPayment ?? 0,
    );
  });
});
