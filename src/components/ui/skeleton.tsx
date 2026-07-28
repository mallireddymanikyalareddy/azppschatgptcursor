import { cn } from "@/lib/utils/index";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-muted/70 relative overflow-hidden rounded-md",
        "before:via-foreground/8 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
