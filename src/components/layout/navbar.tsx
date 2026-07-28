import Link from "next/link";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SearchBox } from "@/components/ui/search-box";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export type NavbarProps = {
  items?: NavItem[];
  showSearch?: boolean;
  className?: string;
  actions?: React.ReactNode;
};

export function Navbar({
  items = [],
  showSearch = false,
  className,
  actions,
}: NavbarProps) {
  return (
    <header
      className={cn(
        "border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-[var(--z-sticky)] w-full border-b backdrop-blur",
        className,
      )}
    >
      <div className="container flex h-16 items-center gap-4">
        <Link
          href="/"
          className="text-foreground shrink-0 text-lg font-semibold tracking-tight transition-opacity hover:opacity-80"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>

        {items.length > 0 ? (
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {items.map((item) =>
              item.disabled ? (
                <span
                  key={item.href}
                  className="text-muted-foreground cursor-not-allowed px-3 py-2 text-sm"
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.title}
                </Link>
              ),
            )}
          </nav>
        ) : null}

        <div className="ml-auto flex items-center gap-2">
          {showSearch ? (
            <SearchBox
              containerClassName="hidden w-56 lg:block"
              placeholder="Search…"
              showShortcut
            />
          ) : null}
          {actions}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
