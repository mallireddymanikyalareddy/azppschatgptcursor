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
    <div className={cn("border-border/70 mb-8 border-b pb-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-caption text-muted-foreground font-medium tracking-wide uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
            {title}
          </h1>
          {description ? (
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-[0.9375rem]">
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
