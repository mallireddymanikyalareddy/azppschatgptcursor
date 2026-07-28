import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="brand-wash pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
      />
      <div className="relative container py-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <p className="text-caption text-muted-foreground font-medium tracking-wide uppercase">
            {siteConfig.name}
          </p>
          <h1 className="text-display text-balance">
            AI-Powered Calculator Platform
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <Button asChild size="lg">
              <Link href="/admin">
                Open Admin
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/design-system">Design System</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="border-border/80 bg-card/60 mx-auto mt-14 flex w-full max-w-xl flex-col items-center gap-3 rounded-xl border px-6 py-8 text-center backdrop-blur-sm">
          <div className="bg-muted text-foreground/80 flex size-11 items-center justify-center rounded-lg">
            <Calculator className="size-5" aria-hidden="true" />
          </div>
          <p className="text-muted-foreground w-full text-sm leading-relaxed">
            Foundation, auth, and admin shell are ready. Calculator business
            features will land on this architecture next.
          </p>
        </div>
      </div>
    </section>
  );
}
