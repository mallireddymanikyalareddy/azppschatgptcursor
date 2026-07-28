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
    <footer
      className={cn("border-border/40 bg-background border-t", className)}
    >
      <div className="text-muted-foreground container flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs">{siteConfig.description}</p>
        </div>

        {links.length > 0 ? (
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
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
