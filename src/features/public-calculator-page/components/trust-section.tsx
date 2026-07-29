import type { TrustSectionContent } from "@/features/public-calculator-page/types";

export function TrustSection({ trust }: { trust: TrustSectionContent }) {
  const rows = [
    ["Reviewed by", trust.reviewedBy],
    ["Verified", trust.verified ? "Yes" : "No"],
    ["Version", trust.version],
    ["Calculation accuracy", trust.calculationAccuracy],
    ["Content quality", trust.contentQuality],
  ] as const;

  return (
    <section aria-labelledby="trust-heading" className="space-y-3">
      <h2 id="trust-heading" className="text-lg font-semibold">
        Trust & quality
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-md border p-3">
            <dt className="text-muted-foreground text-xs">{label}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
