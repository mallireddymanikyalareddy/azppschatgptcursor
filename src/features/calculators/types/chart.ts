import type {
  ChartAxisType,
  ChartType,
} from "@/features/calculators/constants/enums";
import type { EntityId } from "@/features/calculators/types/common";

export type ChartSeries = {
  id: EntityId;
  name: string;
  /** Result key or data path feeding this series. */
  dataKey: string;
  color?: string;
  type?: ChartType;
};

export type ChartAxis = {
  id: EntityId;
  type: ChartAxisType;
  label?: string;
  dataKey?: string;
  min?: number;
  max?: number;
  /** Tick format hint, e.g. "currency", "percent". */
  format?: string;
};

export type ChartLegend = {
  show: boolean;
  position?: "top" | "bottom" | "left" | "right";
};

/**
 * Optional visualisation config for a calculator.
 * Rendering libraries plug in later; this is schema only.
 */
export type ChartConfiguration = {
  id: EntityId;
  title?: string;
  type: ChartType;
  series: ChartSeries[];
  xAxis?: ChartAxis;
  yAxis?: ChartAxis;
  colours?: string[];
  legend?: ChartLegend;
  /** Extra library-specific options (opaque). */
  options?: Record<string, unknown>;
};
