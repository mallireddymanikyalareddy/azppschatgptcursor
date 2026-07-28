import {
  AreaChart,
  BarChart3,
  CircleDot,
  LineChart,
  PieChart,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type ChartType = "line" | "area" | "bar" | "pie" | "donut";

export type ChartPlaceholderProps = {
  type?: ChartType;
  title?: string;
  description?: string;
  height?: number | string;
  className?: string;
};

const chartMeta: Record<
  ChartType,
  { title: string; description: string; icon: typeof LineChart }
> = {
  line: {
    title: "Line chart",
    description: "Trend visualization placeholder.",
    icon: LineChart,
  },
  area: {
    title: "Area chart",
    description: "Cumulative trend placeholder.",
    icon: AreaChart,
  },
  bar: {
    title: "Bar chart",
    description: "Comparison visualization placeholder.",
    icon: BarChart3,
  },
  pie: {
    title: "Pie chart",
    description: "Composition visualization placeholder.",
    icon: PieChart,
  },
  donut: {
    title: "Donut chart",
    description: "Composition with center metric placeholder.",
    icon: CircleDot,
  },
};

const barHeights = [36, 58, 44, 72, 50, 66, 42];

function ChartVisual({ type }: { type: ChartType }) {
  if (type === "pie" || type === "donut") {
    return (
      <div className="flex h-full items-center justify-center">
        <div
          className={cn(
            "border-border relative size-36 rounded-full border-[16px]",
            "border-t-primary/70 border-r-primary/40 border-b-muted border-l-accent",
            type === "donut" && "border-[18px]",
          )}
          aria-hidden="true"
        >
          {type === "donut" ? (
            <div className="bg-card absolute inset-4 rounded-full" />
          ) : null}
        </div>
      </div>
    );
  }

  if (type === "line" || type === "area") {
    return (
      <svg
        viewBox="0 0 320 140"
        className="text-primary h-full w-full"
        aria-hidden="true"
      >
        {type === "area" ? (
          <path
            d="M0 120 L40 90 L80 100 L120 60 L160 75 L200 40 L240 55 L280 30 L320 45 L320 140 L0 140 Z"
            className="fill-primary/15"
          />
        ) : null}
        <path
          d="M0 120 L40 90 L80 100 L120 60 L160 75 L200 40 L240 55 L280 30 L320 45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className="flex h-full items-end justify-around gap-2 px-2">
      {barHeights.map((value, index) => (
        <div
          key={index}
          className="bg-primary/35 w-full max-w-8 rounded-t-md"
          style={{ height: `${value}%` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ChartPlaceholder({
  type = "bar",
  title,
  description,
  height = 240,
  className,
}: ChartPlaceholderProps) {
  const meta = chartMeta[type];
  const Icon = meta.icon;
  const resolvedTitle = title ?? meta.title;
  const resolvedDescription = description ?? meta.description;

  return (
    <div
      className={cn(
        "border-border bg-card text-card-foreground flex flex-col overflow-hidden rounded-xl border shadow-xs",
        className,
      )}
      role="img"
      aria-label={`${resolvedTitle}: ${resolvedDescription}`}
    >
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <Icon className="text-muted-foreground size-4" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium">{resolvedTitle}</p>
          <p className="text-muted-foreground text-xs">{resolvedDescription}</p>
        </div>
      </div>
      <div className="bg-muted/30 relative px-4 py-5" style={{ height }}>
        <ChartVisual type={type} />
      </div>
    </div>
  );
}

export function ChartGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {(["line", "area", "bar", "pie", "donut"] as const).map((type) => (
        <ChartPlaceholder key={type} type={type} height={180} />
      ))}
    </div>
  );
}
