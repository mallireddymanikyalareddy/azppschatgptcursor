import type { HomepageAdSlot } from "@/features/homepage/types";

export function AdvertisementSection({ ad }: { ad: HomepageAdSlot }) {
  if (!ad.enabled) return null;

  return (
    <section className="py-8" aria-label="Advertisement placeholder">
      <div className="container">
        <div className="border-border/70 bg-muted/30 flex min-h-20 flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Ad placeholder
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {ad.label} · {ad.size}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Mock only — AdSense not connected
          </p>
        </div>
      </div>
    </section>
  );
}
