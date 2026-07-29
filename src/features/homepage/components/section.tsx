import { cn } from "@/lib/utils";

export function HomepageSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-12 md:py-16", className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="container">
        <div className="mb-8 max-w-2xl space-y-2">
          {eyebrow ? (
            <p className="text-caption text-muted-foreground font-medium tracking-wide uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-2xl font-semibold tracking-tight md:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
