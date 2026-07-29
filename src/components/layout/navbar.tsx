import Link from "next/link";

import { MobileNav } from "@/components/layout/mobile-nav";
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
        "border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-[var(--z-sticky)] w-full border-b backdrop-blur-xl",
        className,
      )}
    >
      <div className="container flex h-14 items-center gap-4">
        <MobileNav items={items} />
        <Link
          href="/"
          className="text-foreground shrink-0 text-[0.95rem] font-semibold tracking-tight transition-opacity hover:opacity-80"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>

        {items.length > 0 ? (
          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 md:flex"
          >
            {items.map((item) =>
              item.disabled ? (
                <span
                  key={item.href}
                  className="text-muted-foreground cursor-not-allowed px-3 py-1.5 text-sm"
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent/70 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
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

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {showSearch ? (
            <SearchBox
              containerClassName="hidden w-52 lg:block"
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
