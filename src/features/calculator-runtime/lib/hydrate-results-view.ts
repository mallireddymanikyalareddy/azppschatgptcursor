import { ResultValueType } from "@/features/results-engine/constants/enums";
import type {
  ResultsViewDefinition,
  TableDefinition,
} from "@/features/results-engine/types";
import type { ProductionCalculatorDefinition } from "@/features/calculator-runtime/types";
import {
  buildAnnualPrincipalInterestSeries,
  buildOutstandingBalanceSeries,
  generateAmortisationSchedule,
  type LoanSummary,
} from "@/features/calculator-runtime/lib/amortisation";

/**
 * Clones the presentation schema and injects live schedule / chart series.
 */
export function hydrateResultsView(
  definition: ProductionCalculatorDefinition,
  summary: LoanSummary,
): ResultsViewDefinition {
  const base = structuredClone(definition.resultsView);
  if (!definition.amortisation?.enabled) {
    return base;
  }

  const schedule = generateAmortisationSchedule(
    summary.principal,
    summary.annualRate,
    summary.tenureMonths,
    summary.emi,
  );

  const tableId = definition.amortisation.tableId;
  const table: TableDefinition = {
    id: tableId,
    title: "Amortisation schedule",
    description:
      "Month-wise principal, interest, EMI, and outstanding balance.",
    pageSize: definition.amortisation.pageSize ?? 12,
    stickyHeader: true,
    columns: [
      {
        id: "month",
        header: "Month",
        accessorKey: "month",
        sortable: true,
        align: "right",
      },
      {
        id: "openingBalance",
        header: "Opening balance",
        accessorKey: "openingBalance",
        sortable: true,
        align: "right",
        formatType: ResultValueType.Currency,
        format: { currency: definition.currency, locale: definition.locale },
      },
      {
        id: "principalComponent",
        header: "Principal",
        accessorKey: "principalComponent",
        sortable: true,
        align: "right",
        formatType: ResultValueType.Currency,
        format: { currency: definition.currency, locale: definition.locale },
      },
      {
        id: "interestComponent",
        header: "Interest",
        accessorKey: "interestComponent",
        sortable: true,
        align: "right",
        formatType: ResultValueType.Currency,
        format: { currency: definition.currency, locale: definition.locale },
      },
      {
        id: "emi",
        header: "EMI",
        accessorKey: "emi",
        sortable: true,
        align: "right",
        formatType: ResultValueType.Currency,
        format: { currency: definition.currency, locale: definition.locale },
      },
      {
        id: "closingBalance",
        header: "Closing balance",
        accessorKey: "closingBalance",
        sortable: true,
        align: "right",
        formatType: ResultValueType.Currency,
        format: { currency: definition.currency, locale: definition.locale },
      },
    ],
    rows: schedule.map((row) => ({
      id: row.id,
      month: row.month,
      openingBalance: row.openingBalance,
      principalComponent: row.principalComponent,
      interestComponent: row.interestComponent,
      emi: row.emi,
      closingBalance: row.closingBalance,
    })),
  };

  base.tables = [
    table,
    ...(base.tables ?? []).filter((item) => item.id !== tableId),
  ];

  const balancePoints = buildOutstandingBalanceSeries(schedule);
  const annual = buildAnnualPrincipalInterestSeries(schedule);

  base.charts = (base.charts ?? []).map((chart) => {
    if (chart.id === definition.amortisation?.balanceChartId) {
      return {
        ...chart,
        series: [
          {
            id: "balance",
            name: "Outstanding balance",
            data: balancePoints,
          },
        ],
      };
    }
    if (chart.id === definition.amortisation?.annualChartId) {
      return {
        ...chart,
        series: [
          {
            id: "annual_principal",
            name: "Principal",
            data: annual.principal,
          },
          {
            id: "annual_interest",
            name: "Interest",
            data: annual.interest,
          },
        ],
      };
    }
    if (chart.id === "chart_principal_interest") {
      return {
        ...chart,
        series: [
          {
            id: "split",
            name: "Split",
            data: [
              { label: "Principal", value: summary.principal },
              { label: "Interest", value: summary.totalInterest },
            ],
          },
        ],
      };
    }
    return chart;
  });

  if (base.breakdowns) {
    base.breakdowns = base.breakdowns.map((bd) => {
      if (bd.id !== "bd_payment") return bd;
      return {
        ...bd,
        items: [
          {
            id: "principal",
            label: "Principal",
            value: summary.principal,
            type: ResultValueType.Currency,
            format: {
              currency: definition.currency,
              locale: definition.locale,
            },
          },
          {
            id: "interest",
            label: "Interest",
            value: summary.totalInterest,
            type: ResultValueType.Currency,
            format: {
              currency: definition.currency,
              locale: definition.locale,
            },
          },
          {
            id: "fee",
            label: "Processing fee",
            value: summary.processingFee,
            type: ResultValueType.Currency,
            format: {
              currency: definition.currency,
              locale: definition.locale,
            },
          },
        ],
      };
    });
  }

  return base;
}
