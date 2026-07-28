import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export type FooterProps = {
  links?: NavItem[];
  className?: string;
};

export function Footer({ links = [], className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-border/60 border-t", className)}>
      <div className="text-muted-foreground container flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs">
          © {year} {siteConfig.name}
        </p>

        {links.length > 0 ? (
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-4 gap-y-2 text-xs"
          >
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.title}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </footer>
  );
}
