import { cn } from "@/lib/utils";

export type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "brand-wash border-border/60 -mx-4 mb-8 border-b px-4 py-8 sm:-mx-0 sm:rounded-2xl sm:border sm:px-8",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-caption text-primary font-medium tracking-wide uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-display text-foreground">{title}</h1>
          {description ? (
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
