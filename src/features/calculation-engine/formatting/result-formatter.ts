import type { OutputFormat } from "@/features/calculation-engine/constants/enums";
import type {
  CalculationOutputSpec,
  FormattedValue,
} from "@/features/calculation-engine/types";
import { applyPrecision } from "@/features/formula-engine";

export type FormatOptions = {
  locale: string;
  currency: string;
};

/**
 * Locale-ready result formatter.
 * Extensible via registerCustomFormatter later.
 */
export class ResultFormatter {
  private readonly custom = new Map<
    string,
    (
      value: number,
      options: FormatOptions,
      spec: CalculationOutputSpec,
    ) => string
  >();

  registerCustomFormatter(
    name: string,
    fn: (
      value: number,
      options: FormatOptions,
      spec: CalculationOutputSpec,
    ) => string,
  ): void {
    this.custom.set(name, fn);
  }

  format(
    spec: CalculationOutputSpec,
    value: number,
    options: FormatOptions,
  ): FormattedValue {
    const custom = this.custom.get(spec.format);
    const formatted = custom
      ? custom(value, options, spec)
      : formatByType(spec, value, options);

    return {
      key: spec.key,
      label: spec.label,
      raw: value,
      formatted,
      format: spec.format,
    };
  }
}

export const resultFormatter = new ResultFormatter();

export function formatOutputValue(
  spec: CalculationOutputSpec,
  value: number,
  options: FormatOptions,
): FormattedValue {
  return resultFormatter.format(spec, value, options);
}

function formatByType(
  spec: CalculationOutputSpec,
  value: number,
  options: FormatOptions,
): string {
  const precision = spec.precision ?? defaultPrecision(spec.format);
  const rounded = applyPrecision(value, precision, spec.roundingMode);

  switch (spec.format as OutputFormat) {
    case "currency":
      return new Intl.NumberFormat(options.locale, {
        style: "currency",
        currency: spec.currency ?? options.currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(rounded);
    case "percentage":
      return new Intl.NumberFormat(options.locale, {
        style: "percent",
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(rounded / 100);
    case "integer":
      return new Intl.NumberFormat(options.locale, {
        maximumFractionDigits: 0,
      }).format(Math.round(rounded));
    case "scientific":
      return rounded.toExponential(precision);
    case "duration": {
      const totalSeconds = Math.max(0, Math.round(rounded));
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return [hours, minutes, seconds]
        .map((part) => String(part).padStart(2, "0"))
        .join(":");
    }
    case "date": {
      const date = new Date(rounded);
      return new Intl.DateTimeFormat(options.locale, {
        dateStyle: "medium",
      }).format(date);
    }
    case "raw":
      return String(value);
    case "decimal":
    default:
      return new Intl.NumberFormat(options.locale, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(rounded);
  }
}

function defaultPrecision(format: OutputFormat): number {
  switch (format) {
    case "currency":
    case "percentage":
    case "decimal":
      return 2;
    case "integer":
      return 0;
    case "scientific":
      return 4;
    default:
      return 2;
  }
}
