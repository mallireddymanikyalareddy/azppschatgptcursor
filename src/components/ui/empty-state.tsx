import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border/80 bg-card/40 flex flex-col items-center justify-center gap-4 rounded-lg border px-6 py-14 text-center",
        className,
      )}
      role="status"
    >
      <div className="bg-muted/80 text-muted-foreground flex size-11 items-center justify-center rounded-lg">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-foreground text-sm font-semibold tracking-tight">
          {title}
        </h3>
        {description ? (
          <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="mt-1">{action}</div> : null}
    </div>
  );
}
