import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export type PageLoaderProps = {
  label?: string;
  className?: string;
};

export function PageLoader({
  label = "Loading page",
  className,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "container flex min-h-[40vh] flex-col items-center justify-center gap-4 py-16",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <Spinner size="lg" label={label} />
      <p className="text-muted-foreground text-sm">{label}…</p>
    </div>
  );
}

export function CardLoader({ className }: { className?: string }) {
  return <LoadingSkeleton variant="card" className={className} />;
}

export function TableLoader({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full space-y-3", className)}
      role="status"
      aria-label="Loading table"
    >
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`h-${index}`}
            className="bg-muted h-4 animate-pulse rounded"
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={`r-${row}`}
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((_, col) => (
            <div
              key={`c-${row}-${col}`}
              className="bg-muted/70 h-8 animate-pulse rounded"
            />
          ))}
        </div>
      ))}
      <span className="sr-only">Loading table…</span>
    </div>
  );
}

export function InlineProgress({
  value,
  label,
  className,
}: {
  value?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <p className="text-muted-foreground text-caption">{label}</p>
      ) : null}
      <Progress value={value} label={label} />
    </div>
  );
}
