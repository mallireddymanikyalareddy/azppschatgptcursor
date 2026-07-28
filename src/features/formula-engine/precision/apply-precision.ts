import {
  RoundingMode,
  type RoundingMode as RoundingModeValue,
} from "@/features/formula-engine/constants/enums";

/**
 * Applies decimal precision with a selectable rounding mode.
 * Pure numeric — no locale formatting.
 */
export function applyPrecision(
  value: number,
  precision: number,
  mode: RoundingModeValue = RoundingMode.HalfUp,
): number {
  if (!Number.isFinite(value)) return value;
  const digits = Math.max(0, Math.floor(precision));
  const factor = 10 ** digits;

  switch (mode) {
    case RoundingMode.Floor:
      return Math.floor(value * factor) / factor;
    case RoundingMode.Ceil:
      return Math.ceil(value * factor) / factor;
    case RoundingMode.Trunc:
      return Math.trunc(value * factor) / factor;
    case RoundingMode.HalfEven: {
      const scaled = value * factor;
      const floor = Math.floor(scaled);
      const diff = scaled - floor;
      if (diff > 0.5) return (floor + 1) / factor;
      if (diff < 0.5) return floor / factor;
      return (floor % 2 === 0 ? floor : floor + 1) / factor;
    }
    case RoundingMode.HalfUp:
    default:
      return Math.round(value * factor + Number.EPSILON) / factor;
  }
}

export function resolvePrecision(options: {
  precision?: number;
  currency?: boolean;
  percentage?: boolean;
  defaultPrecision?: number;
}): number {
  if (typeof options.precision === "number") return options.precision;
  if (options.currency) return 2;
  if (options.percentage) return 2;
  return options.defaultPrecision ?? 6;
}
