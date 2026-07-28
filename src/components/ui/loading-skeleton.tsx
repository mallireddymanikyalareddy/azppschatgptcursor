import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type LoadingSkeletonProps = {
  variant?: "page" | "card" | "list" | "form";
  className?: string;
};

export function LoadingSkeleton({
  variant = "page",
  className,
}: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div
        className={cn("space-y-3 rounded-xl border p-4", className)}
        role="status"
        aria-label="Loading"
      >
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        className={cn("space-y-3", className)}
        role="status"
        aria-label="Loading"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div
        className={cn("space-y-4", className)}
        role="status"
        aria-label="Loading"
      >
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-32" />
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return (
    <div
      className={cn("container space-y-4 py-10", className)}
      role="status"
      aria-label="Loading"
    >
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-40 w-full" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
