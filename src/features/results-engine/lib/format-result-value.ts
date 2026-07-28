import {
  ResultValueType,
  type ResultValueType as ResultValueTypeValue,
} from "@/features/results-engine/constants/enums";
import type {
  ResultFormatOptions,
  ResultPrimitive,
} from "@/features/results-engine/types";

function toNumber(value: ResultPrimitive): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function abbreviateNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Presentation formatter — independent of calculation-engine formatter.
 */
export function formatResultValue(
  value: ResultPrimitive,
  type: ResultValueTypeValue,
  options: ResultFormatOptions = {},
): string {
  if (value === null || value === undefined) return "—";

  const locale = options.locale ?? "en-IN";
  const precision = options.precision ?? 2;
  const numeric = toNumber(value);

  switch (type) {
    case ResultValueType.Currency: {
      if (numeric === null) return String(value);
      if (options.abbreviate) {
        return `${abbreviateNumber(numeric, locale)} ${options.currency ?? "INR"}`;
      }
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: options.currency ?? "INR",
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(numeric);
    }
    case ResultValueType.Percentage: {
      if (numeric === null) return String(value);
      return new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(numeric / 100);
    }
    case ResultValueType.Decimal:
    case ResultValueType.Number:
    case ResultValueType.Score: {
      if (numeric === null) return String(value);
      const formatted = options.abbreviate
        ? abbreviateNumber(numeric, locale)
        : new Intl.NumberFormat(locale, {
            minimumFractionDigits:
              type === ResultValueType.Number && precision === 0
                ? 0
                : precision,
            maximumFractionDigits: precision,
          }).format(numeric);
      return options.unit ? `${formatted} ${options.unit}` : formatted;
    }
    case ResultValueType.Boolean:
      return value === true || value === "true" || value === 1 ? "Yes" : "No";
    case ResultValueType.Duration: {
      if (numeric === null) return String(value);
      const total = Math.max(0, Math.round(numeric));
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      return [h, m, s].map((p) => String(p).padStart(2, "0")).join(":");
    }
    case ResultValueType.Date: {
      if (numeric === null && typeof value !== "string") return String(value);
      const date =
        typeof value === "string" ? new Date(value) : new Date(numeric ?? 0);
      if (Number.isNaN(date.getTime())) return String(value);
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
        date,
      );
    }
    case ResultValueType.Time: {
      if (numeric === null && typeof value !== "string") return String(value);
      const date =
        typeof value === "string" ? new Date(value) : new Date(numeric ?? 0);
      if (Number.isNaN(date.getTime())) return String(value);
      return new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(
        date,
      );
    }
    case ResultValueType.Rating: {
      if (numeric === null) return String(value);
      const stars = Math.max(0, Math.min(5, Math.round(numeric)));
      return `${"★".repeat(stars)}${"☆".repeat(5 - stars)} (${numeric.toFixed(1)})`;
    }
    case ResultValueType.Status:
      return String(value);
    case ResultValueType.Text:
    default:
      return String(value);
  }
}
