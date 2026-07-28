import Link from "next/link";
import { Calculator, ShieldCheck, Sparkles } from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/config/site";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function AuthLayout({
  children,
  title,
  description,
  className,
}: AuthLayoutProps) {
  return (
    <div className="bg-background grid min-h-screen lg:grid-cols-2">
      <aside className="brand-wash relative hidden flex-col justify-between overflow-hidden border-r p-10 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />

        <Link
          href="/"
          className="text-foreground relative z-10 inline-flex items-center gap-2.5 text-base font-semibold tracking-tight"
        >
          <span className="bg-foreground text-background flex size-8 items-center justify-center rounded-md">
            <Calculator className="size-4" aria-hidden="true" />
          </span>
          {siteConfig.name}
        </Link>

        <div className="relative z-10 max-w-md space-y-5">
          <p className="text-caption text-muted-foreground font-medium tracking-wide uppercase">
            Secure access
          </p>
          <h1 className="text-display">Build with confidence.</h1>
          <p className="text-muted-foreground text-[0.975rem] leading-relaxed">
            Enterprise authentication for Calculator Platform, AI Factory,
            Content, SEO, Analytics, and Administration.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              {
                icon: ShieldCheck,
                label: "Session-ready security foundation",
              },
              {
                icon: Sparkles,
                label: "Role and permission aware shell",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="border-border/70 bg-background/40 flex items-center gap-3 rounded-lg border px-3.5 py-3 backdrop-blur-sm"
              >
                <item.icon
                  className="text-primary size-4 shrink-0"
                  aria-hidden
                />
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-muted-foreground relative z-10 text-xs">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </aside>

      <div className="relative flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <Link
            href="/"
            className="text-foreground inline-flex items-center gap-2 text-sm font-semibold tracking-tight lg:invisible"
          >
            <span className="bg-foreground text-background flex size-7 items-center justify-center rounded-md">
              <Calculator className="size-3.5" aria-hidden="true" />
            </span>
            {siteConfig.name}
          </Link>
          <ThemeToggle />
        </div>

        <main
          id="main-content"
          tabIndex={-1}
          className={cn(
            "mx-auto flex w-full max-w-[22.5rem] flex-1 flex-col justify-center px-4 py-8 sm:max-w-md sm:px-8",
            className,
          )}
        >
          <div className="mb-7 space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>
          {children}
        </main>

        <footer className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-6 text-xs">
          <Link
            href={AUTH_ROUTES.login}
            className="hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href={AUTH_ROUTES.register}
            className="hover:text-foreground transition-colors"
          >
            Create account
          </Link>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/design-system"
            className="hover:text-foreground transition-colors"
          >
            Design system
          </Link>
        </footer>
      </div>
    </div>
  );
}
