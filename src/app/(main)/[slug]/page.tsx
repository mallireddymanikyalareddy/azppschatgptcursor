import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CalculatorWorkspace } from "@/features/calculator-runtime";
import {
  getCalculatorDefinition,
  getCalculatorSlugs,
} from "@/features/calculator-runtime";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCalculatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const definition = getCalculatorDefinition(slug);
  if (!definition) {
    return { title: "Calculator not found" };
  }
  return {
    title: definition.seo.title,
    description: definition.seo.description,
    keywords: definition.seo.keywords,
  };
}

/**
 * Root slug calculator route — e.g. /home-loan-emi.
 * Only registered calculator slugs resolve; everything else 404s.
 */
export default async function CalculatorSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const definition = getCalculatorDefinition(slug);
  if (!definition) notFound();

  return (
    <div className="container py-8 md:py-10">
      <CalculatorWorkspace definition={definition} />
    </div>
  );
}
