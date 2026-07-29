import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  PublicCalculatorJsonLd,
  PublicCalculatorPage,
  calculatorPageService,
} from "@/features/public-calculator-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return calculatorPageService.getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = calculatorPageService.getBySlug(slug);
  if (!bundle) {
    return { title: "Calculator not found" };
  }
  return calculatorPageService.seo.getMetadata(bundle.page);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const bundle = calculatorPageService.getBySlug(slug);
  if (!bundle) notFound();

  return (
    <>
      <PublicCalculatorJsonLd page={bundle.page} />
      <PublicCalculatorPage slug={slug} />
    </>
  );
}
