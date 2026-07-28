import { cn } from "@/lib/utils";

export type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
};

const sizeClasses = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-8 border-[3px]",
} as const;

export function Spinner({
  size = "md",
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "border-muted border-t-primary inline-block animate-spin rounded-full",
        sizeClasses[size],
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
