import Link from "next/link";

import type { RichContentBlock } from "@/features/public-calculator-page/types";
import { ContentBlockType } from "@/features/public-calculator-page/constants/enums";

export function AboutSection({ blocks }: { blocks: RichContentBlock[] }) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 space-y-4"
    >
      <h2 id="about-heading" className="sr-only">
        About this calculator
      </h2>
      <article className="prose-neutral dark:prose-invert max-w-none space-y-4">
        {blocks.map((block) => (
          <ContentBlock key={block.id} block={block} />
        ))}
      </article>
    </section>
  );
}

function ContentBlock({ block }: { block: RichContentBlock }) {
  switch (block.type) {
    case ContentBlockType.Heading: {
      const Tag = `h${block.level ?? 2}` as "h2" | "h3" | "h4";
      return (
        <Tag className="text-xl font-semibold tracking-tight">{block.text}</Tag>
      );
    }
    case ContentBlockType.Paragraph:
      return (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {block.text}
        </p>
      );
    case ContentBlockType.List:
      return (
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          {(block.items ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case ContentBlockType.Callout:
      return (
        <aside
          className="bg-muted/50 rounded-md border px-4 py-3 text-sm"
          role="note"
        >
          {block.text}
        </aside>
      );
    case ContentBlockType.Quote:
      return (
        <blockquote className="border-l-2 pl-4 text-sm italic">
          {block.text}
        </blockquote>
      );
    case ContentBlockType.InternalLink:
      return block.href ? (
        <p className="text-sm">
          <Link href={block.href} className="underline underline-offset-4">
            {block.text}
          </Link>
        </p>
      ) : null;
    case ContentBlockType.Image:
      return (
        <div
          className="bg-muted flex aspect-video items-center justify-center rounded-md border"
          role="img"
          aria-label={block.alt ?? "Article image"}
        >
          <span className="text-muted-foreground text-xs">
            {block.alt ?? "Image placeholder"}
          </span>
        </div>
      );
    default:
      return null;
  }
}
