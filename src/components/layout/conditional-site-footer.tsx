"use client";

import { usePathname } from "next/navigation";

import { Footer, type FooterProps } from "@/components/layout/footer";

/**
 * Hides the slim site footer on `/` where HomepageFooter already provides a full footer.
 */
export function ConditionalSiteFooter(props: FooterProps) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer {...props} />;
}
