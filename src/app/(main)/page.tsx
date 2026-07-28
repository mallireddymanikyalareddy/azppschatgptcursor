import Link from "next/link";
import { Calculator } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="container flex flex-col items-center gap-8 py-24 text-center md:py-32">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Calculator className="size-8" aria-hidden="true" />
      </div>

      <div className="flex max-w-2xl flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          {siteConfig.description}
        </p>
        <p className="text-sm text-muted-foreground">
          Production foundation is ready. Business features will be built on
          this scalable architecture.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </Button>
      </div>
    </section>
  );
}
