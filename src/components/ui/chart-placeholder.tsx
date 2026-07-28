import { BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";

export type ChartPlaceholderProps = {
  title?: string;
  description?: string;
  height?: number | string;
  className?: string;
};

export function ChartPlaceholder({
  title = "Chart",
  description = "Chart visualization will render here.",
  height = 240,
  className,
}: ChartPlaceholderProps) {
  return (
    <div
      className={cn(
        "border-border bg-card text-card-foreground flex flex-col overflow-hidden rounded-xl border shadow-xs",
        className,
      )}
      role="img"
      aria-label={`${title}: ${description}`}
    >
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <BarChart3
          className="text-muted-foreground size-4"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>
      <div
        className="bg-muted/40 relative flex items-end justify-around gap-2 px-6 py-8"
        style={{ height }}
      >
        {[40, 65, 45, 80, 55, 70, 50].map((value, index) => (
          <div
            key={index}
            className="bg-primary/30 w-full max-w-8 rounded-t-md"
            style={{ height: `${value}%` }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
