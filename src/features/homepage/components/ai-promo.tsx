import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { HomepageAiPromo } from "@/features/homepage/types";

export function AiPromoSection({ promo }: { promo: HomepageAiPromo }) {
  return (
    <section
      id="ai-generator"
      className="scroll-mt-24 py-12 md:py-16"
      aria-labelledby="ai-generator-heading"
    >
      <div className="container">
        <div className="border-border/80 relative overflow-hidden rounded-2xl border px-6 py-10 md:px-10 md:py-12">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_45%)]"
            aria-hidden
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <div className="bg-muted inline-flex size-11 items-center justify-center rounded-lg">
                <Sparkles className="size-5" aria-hidden />
              </div>
              <h2
                id="ai-generator-heading"
                className="text-2xl font-semibold tracking-tight md:text-3xl"
              >
                {promo.title}
              </h2>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed md:text-base">
                {promo.description}
              </p>
              <ul className="text-muted-foreground grid gap-2 text-sm sm:grid-cols-3">
                {promo.benefits.map((item) => (
                  <li
                    key={item}
                    className="border-border/70 rounded-lg border px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link href={promo.cta.href}>{promo.cta.label}</Link>
              </Button>
            </div>

            <figure className="border-border/70 bg-background/60 rounded-xl border p-5">
              <figcaption className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Example prompt
              </figcaption>
              <blockquote className="mt-3 text-sm leading-relaxed md:text-base">
                “{promo.examplePrompt}”
              </blockquote>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
