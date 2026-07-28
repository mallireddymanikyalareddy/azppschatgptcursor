import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn("border-border/40 bg-background border-t", className)}
    >
      <div className="text-muted-foreground container flex flex-col gap-2 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-xs">{siteConfig.description}</p>
      </div>
    </footer>
  );
}
