/**
 * Pure amortisation / EMI math — reusable, engine-agnostic.
 * Used for schedules and zero-rate edge cases the formula DAG cannot express.
 */

export type AmortisationRow = {
  id: string;
  month: number;
  openingBalance: number;
  principalComponent: number;
  interestComponent: number;
  emi: number;
  closingBalance: number;
};

export type LoanSummary = {
  principal: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  processingFee: number;
  effectiveLoanCost: number;
  interestPercentage: number;
  principalPercentage: number;
  tenureMonths: number;
  annualRate: number;
};

export type EmiComputeInput = {
  principal: number;
  annualRatePercent: number;
  tenureMonths: number;
  processingFee?: number;
};

const EPSILON = 1e-10;

/**
 * Reducing-balance EMI.
 * When rate is 0: EMI = principal / n.
 */
export function calculateMonthlyEmi(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
): number {
  if (!(principal > 0) || !(tenureMonths > 0)) {
    return 0;
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  if (Math.abs(monthlyRate) < EPSILON) {
    return roundCurrency(principal / tenureMonths);
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return roundCurrency(emi);
}

export function generateAmortisationSchedule(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
  emi?: number,
): AmortisationRow[] {
  if (!(principal > 0) || !(tenureMonths > 0)) {
    return [];
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const payment =
    emi ?? calculateMonthlyEmi(principal, annualRatePercent, tenureMonths);

  const rows: AmortisationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month += 1) {
    const openingBalance = balance;
    const interestComponent = roundCurrency(openingBalance * monthlyRate);
    let principalComponent = roundCurrency(payment - interestComponent);
    let closingBalance = roundCurrency(openingBalance - principalComponent);
    let emiPaid = payment;

    // Final month adjustment for rounding drift.
    if (month === tenureMonths || closingBalance < 0) {
      principalComponent = roundCurrency(openingBalance);
      emiPaid = roundCurrency(principalComponent + interestComponent);
      closingBalance = 0;
    }

    rows.push({
      id: `m${month}`,
      month,
      openingBalance: roundCurrency(openingBalance),
      principalComponent,
      interestComponent,
      emi: emiPaid,
      closingBalance,
    });

    balance = closingBalance;
    if (balance <= 0) break;
  }

  return rows;
}

export function summariseLoan(input: EmiComputeInput): LoanSummary {
  const principal = input.principal;
  const tenureMonths = input.tenureMonths;
  const annualRate = input.annualRatePercent;
  const processingFee = Math.max(0, input.processingFee ?? 0);
  const emi = calculateMonthlyEmi(principal, annualRate, tenureMonths);
  const schedule = generateAmortisationSchedule(
    principal,
    annualRate,
    tenureMonths,
    emi,
  );
  const totalInterest = roundCurrency(
    schedule.reduce((sum, row) => sum + row.interestComponent, 0),
  );
  const totalPayment = roundCurrency(principal + totalInterest);
  const effectiveLoanCost = roundCurrency(totalPayment + processingFee);
  const interestPercentage =
    principal > 0 ? roundPercent((totalInterest / principal) * 100) : 0;
  const principalPercentage =
    totalPayment > 0 ? roundPercent((principal / totalPayment) * 100) : 0;

  return {
    principal: roundCurrency(principal),
    emi,
    totalInterest,
    totalPayment,
    processingFee: roundCurrency(processingFee),
    effectiveLoanCost,
    interestPercentage,
    principalPercentage,
    tenureMonths,
    annualRate,
  };
}

/** Yearly outstanding balance points for line charts (mock-friendly). */
export function buildOutstandingBalanceSeries(
  schedule: AmortisationRow[],
): { label: string; value: number }[] {
  if (schedule.length === 0) return [];
  const points: { label: string; value: number }[] = [
    { label: "Start", value: schedule[0]!.openingBalance },
  ];
  for (let i = 11; i < schedule.length; i += 12) {
    const year = Math.floor(i / 12) + 1;
    points.push({
      label: `Y${year}`,
      value: schedule[i]!.closingBalance,
    });
  }
  const last = schedule[schedule.length - 1]!;
  if (schedule.length % 12 !== 0) {
    points.push({
      label: `M${last.month}`,
      value: last.closingBalance,
    });
  }
  return points;
}

/** Annual principal vs interest aggregates for bar charts. */
export function buildAnnualPrincipalInterestSeries(
  schedule: AmortisationRow[],
): {
  principal: { label: string; value: number }[];
  interest: { label: string; value: number }[];
} {
  const principal: { label: string; value: number }[] = [];
  const interest: { label: string; value: number }[] = [];

  for (let start = 0; start < schedule.length; start += 12) {
    const chunk = schedule.slice(start, start + 12);
    const year = Math.floor(start / 12) + 1;
    principal.push({
      label: `Y${year}`,
      value: roundCurrency(
        chunk.reduce((sum, row) => sum + row.principalComponent, 0),
      ),
    });
    interest.push({
      label: `Y${year}`,
      value: roundCurrency(
        chunk.reduce((sum, row) => sum + row.interestComponent, 0),
      ),
    });
  }

  return { principal, interest };
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundPercent(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatCurrencyInr(value: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(
  value: number,
  locale = "en-IN",
  precision = 2,
): string {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(value)}%`;
}
