"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import type { HomepageStatistic } from "@/features/homepage/types";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function AnimatedValue({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = React.useState(reduced ? value : 0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function StatisticsSection({
  statistics,
}: {
  statistics: HomepageStatistic[];
}) {
  return (
    <section
      id="statistics"
      className="scroll-mt-24 py-12 md:py-16"
      aria-labelledby="statistics-heading"
    >
      <div className="container">
        <h2 id="statistics-heading" className="sr-only">
          Platform statistics
        </h2>
        <dl className="border-border/80 grid gap-6 rounded-xl border px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat) => (
            <div key={stat.id} className="text-center sm:text-left">
              <dt className="text-muted-foreground text-sm">{stat.label}</dt>
              <dd
                className={cn(
                  "mt-1 text-3xl font-semibold tracking-tight tabular-nums",
                )}
              >
                <AnimatedValue
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
