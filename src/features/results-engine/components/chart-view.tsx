"use client";

import * as React from "react";

import { ResultCard } from "@/features/results-engine/components/result-card";
import { ChartKind } from "@/features/results-engine/constants/enums";
import type {
  ChartDefinition,
  ChartSeriesPoint,
} from "@/features/results-engine/types";
import { cn } from "@/lib/utils/index";

export type ChartViewProps = {
  chart: ChartDefinition;
  className?: string;
};

/**
 * Configuration-driven chart wrappers with accessible SVG placeholders.
 * Mock/visual only — no business calculations.
 */
export function ChartView({ chart, className }: ChartViewProps) {
  const height = chart.height ?? 200;
  const descriptionId = `${chart.id}-desc`;

  return (
    <ResultCard
      title={chart.title}
      description={chart.description}
      className={className}
      printSafe
    >
      <div
        role="img"
        aria-describedby={descriptionId}
        style={{ height }}
        className="w-full"
        data-slot="chart-view"
        data-chart-kind={chart.kind}
      >
        <span id={descriptionId} className="sr-only">
          {chart.description ??
            `${chart.kind.replaceAll("_", " ")} chart for ${chart.title}`}
        </span>
        <ChartVisual chart={chart} />
      </div>
    </ResultCard>
  );
}

function ChartVisual({ chart }: { chart: ChartDefinition }) {
  const primary = chart.series[0];
  const points = primary?.data ?? [];

  switch (chart.kind) {
    case ChartKind.Pie:
    case ChartKind.Donut:
      return (
        <PieVisual points={points} donut={chart.kind === ChartKind.Donut} />
      );
    case ChartKind.ProgressRing:
    case ChartKind.Gauge:
      return (
        <RingVisual
          progress={chart.progress ?? averageShare(points)}
          label={chart.unit ?? "%"}
          gauge={chart.kind === ChartKind.Gauge}
        />
      );
    case ChartKind.Sparkline:
      return <SparklineVisual points={points} />;
    case ChartKind.HorizontalBar:
      return <HorizontalBarVisual points={points} />;
    case ChartKind.StackedBar:
      return <StackedBarVisual series={chart.series} />;
    case ChartKind.Area:
      return <LineVisual points={points} filled />;
    case ChartKind.Line:
      return <LineVisual points={points} />;
    case ChartKind.Bar:
    default:
      return <BarVisual points={points} />;
  }
}

function averageShare(points: ChartSeriesPoint[]): number {
  if (points.length === 0) return 0;
  const total = points.reduce((sum, p) => sum + p.value, 0);
  return total === 0 ? 0 : Math.min(100, (points[0]!.value / total) * 100);
}

function BarVisual({ points }: { points: ChartSeriesPoint[] }) {
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <div className="flex h-full items-end gap-2 px-1" aria-hidden="true">
      {points.map((point) => (
        <div
          key={point.label}
          className="flex flex-1 flex-col items-center gap-1"
        >
          <div
            className="bg-primary/70 w-full rounded-t-sm"
            style={{ height: `${(point.value / max) * 85}%` }}
          />
          <span className="text-muted-foreground truncate text-[10px]">
            {point.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HorizontalBarVisual({ points }: { points: ChartSeriesPoint[] }) {
  const max = Math.max(...points.map((p) => p.value), 1);
  return (
    <div
      className="flex h-full flex-col justify-center gap-2"
      aria-hidden="true"
    >
      {points.map((point) => (
        <div
          key={point.label}
          className="grid grid-cols-[4.5rem_1fr] items-center gap-2"
        >
          <span className="text-muted-foreground truncate text-xs">
            {point.label}
          </span>
          <div className="bg-muted h-2.5 rounded-full">
            <div
              className="bg-primary/70 h-2.5 rounded-full"
              style={{ width: `${(point.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function StackedBarVisual({ series }: { series: ChartDefinition["series"] }) {
  const labels = series[0]?.data.map((d) => d.label) ?? [];
  return (
    <div className="flex h-full items-end gap-2" aria-hidden="true">
      {labels.map((label, index) => {
        const stack = series.map((s) => s.data[index]?.value ?? 0);
        const total = stack.reduce((a, b) => a + b, 0) || 1;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-[85%] w-full flex-col-reverse overflow-hidden rounded-t-sm">
              {stack.map((value, i) => (
                <div
                  key={`${label}-${series[i]?.id ?? i}`}
                  className={cn(
                    "w-full",
                    i % 2 === 0 ? "bg-primary/70" : "bg-primary/35",
                  )}
                  style={{ height: `${(value / total) * 100}%` }}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-[10px]">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineVisual({
  points,
  filled,
}: {
  points: ChartSeriesPoint[];
  filled?: boolean;
}) {
  const max = Math.max(...points.map((p) => p.value), 1);
  const coords = points
    .map((p, i) => {
      const x = points.length === 1 ? 0 : (i / (points.length - 1)) * 100;
      const y = 100 - (p.value / max) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      className="text-primary h-full w-full"
      aria-hidden="true"
    >
      {filled ? (
        <polygon
          points={`0,100 ${coords} 100,100`}
          className="fill-primary/20"
        />
      ) : null}
      <polyline
        points={coords}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function SparklineVisual({ points }: { points: ChartSeriesPoint[] }) {
  return (
    <div className="flex h-full items-center">
      <div className="h-16 w-full">
        <LineVisual points={points} />
      </div>
    </div>
  );
}

function PieVisual({
  points,
  donut,
}: {
  points: ChartSeriesPoint[];
  donut?: boolean;
}) {
  return (
    <div
      className="flex h-full items-center justify-center gap-4"
      aria-hidden="true"
    >
      <div
        className={cn(
          "border-border relative size-36 rounded-full border-[16px]",
          "border-t-primary/70 border-r-primary/40 border-b-muted border-l-accent",
          donut && "border-[18px]",
        )}
      >
        {donut ? (
          <div className="bg-card absolute inset-4 rounded-full" />
        ) : null}
      </div>
      <ul className="text-muted-foreground space-y-1 text-xs">
        {points.slice(0, 4).map((p) => (
          <li key={p.label}>
            {p.label}: {p.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RingVisual({
  progress,
  label,
  gauge,
}: {
  progress: number;
  label: string;
  gauge?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, progress));
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-2"
      aria-hidden="true"
    >
      <div
        className={cn(
          "relative size-32 rounded-full",
          gauge && "rounded-t-full rounded-b-none",
        )}
        style={{
          background: `conic-gradient(var(--primary) ${clamped}%, var(--muted) 0)`,
        }}
      >
        <div className="bg-card absolute inset-4 flex items-center justify-center rounded-full text-sm font-semibold">
          {clamped.toFixed(0)}
          {label}
        </div>
      </div>
    </div>
  );
}
