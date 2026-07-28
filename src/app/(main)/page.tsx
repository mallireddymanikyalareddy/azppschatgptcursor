import Link from "next/link";
import { Calculator } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="container py-10 md:py-16">
      <PageHeader
        eyebrow={siteConfig.name}
        title="AI-Powered Calculator Platform"
        description={siteConfig.description}
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/design-system">View Design System</Link>
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
          </>
        }
      />

      <div className="border-border bg-card mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl border p-8 text-center shadow-sm">
        <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-2xl">
          <Calculator className="size-7" aria-hidden="true" />
        </div>
        <p className="text-muted-foreground text-sm">
          Foundation and design system are production-hardened. Calculator
          business features will be built on this architecture next.
        </p>
      </div>
    </section>
  );
}
