import { cn } from "@/lib/utils";

export type ProgressProps = {
  value?: number;
  indeterminate?: boolean;
  className?: string;
  label?: string;
};

export function Progress({
  value = 0,
  indeterminate = false,
  className,
  label = "Progress",
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuetext={indeterminate ? "Loading" : `${clamped}%`}
      className={cn(
        "bg-secondary relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
    >
      <div
        className={cn(
          "bg-primary absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ease-[var(--ease-standard)]",
          indeterminate && "w-1/3 animate-pulse",
        )}
        style={indeterminate ? undefined : { width: `${clamped}%` }}
      />
    </div>
  );
}
