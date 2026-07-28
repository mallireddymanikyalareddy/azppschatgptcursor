import Link from "next/link";
import { Calculator } from "lucide-react";

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
      <aside className="brand-wash relative hidden flex-col justify-between border-r p-10 lg:flex">
        <Link
          href="/"
          className="text-foreground inline-flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
            <Calculator className="size-5" aria-hidden="true" />
          </span>
          {siteConfig.name}
        </Link>

        <div className="max-w-md space-y-4">
          <p className="text-caption text-primary font-medium tracking-wide uppercase">
            Secure access
          </p>
          <h1 className="text-display">Build with confidence.</h1>
          <p className="text-body-lg text-muted-foreground">
            Enterprise authentication foundation for Calculator Platform, AI
            Factory, Content, SEO, Analytics, and Administration.
          </p>
          <div
            className="border-border bg-card/70 mt-8 flex h-48 items-center justify-center rounded-2xl border border-dashed shadow-xs"
            role="img"
            aria-label="Authentication illustration placeholder"
          >
            <p className="text-muted-foreground text-sm">
              Illustration placeholder
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </aside>

      <div className="relative flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <Link
            href="/"
            className="text-foreground inline-flex items-center gap-2 text-base font-semibold lg:invisible"
          >
            <Calculator className="size-5" aria-hidden="true" />
            {siteConfig.name}
          </Link>
          <ThemeToggle />
        </div>

        <main
          id="main-content"
          tabIndex={-1}
          className={cn(
            "mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-8 sm:px-8",
            className,
          )}
        >
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          {children}
        </main>

        <footer className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 px-4 py-6 text-xs">
          <Link href={AUTH_ROUTES.login} className="hover:text-foreground">
            Sign in
          </Link>
          <Link href={AUTH_ROUTES.register} className="hover:text-foreground">
            Create account
          </Link>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/design-system" className="hover:text-foreground">
            Design system
          </Link>
        </footer>
      </div>
    </div>
  );
}
