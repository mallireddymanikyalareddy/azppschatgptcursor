"use client";

import * as React from "react";

import { calculatorPageService } from "@/features/public-calculator-page/services";

/**
 * Tracks mock recently-viewed state without blocking SSR of page content.
 */
export function PublicPageViewTracker({ slug }: { slug: string }) {
  React.useEffect(() => {
    calculatorPageService.related.trackView(slug);
  }, [slug]);

  return null;
}
