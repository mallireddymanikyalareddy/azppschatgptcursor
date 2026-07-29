import { HomepageSection } from "@/features/homepage/components/section";
import { resolveHomepageIcon } from "@/features/homepage/lib/icons";
import type {
  HomepageBenefit,
  HomepageTestimonial,
  HomepageWhyItem,
} from "@/features/homepage/types";

export function WhyAzppsSection({ items }: { items: HomepageWhyItem[] }) {
  return (
    <HomepageSection
      id="why-azpps"
      eyebrow="Why AZPPS"
      title="Built for accuracy, clarity, and scale"
      description="A premium calculator platform that pairs configuration-driven engines with educational content."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = resolveHomepageIcon(item.icon);
          return (
            <li
              key={item.id}
              className="border-border/80 rounded-xl border px-4 py-5"
            >
              <Icon className="text-foreground mb-3 size-5" aria-hidden />
              <h3 className="font-semibold tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
    </HomepageSection>
  );
}

export function BenefitsSection({ benefits }: { benefits: HomepageBenefit[] }) {
  return (
    <HomepageSection
      id="benefits"
      eyebrow="Benefits"
      title="Everything teams need to calculate with confidence"
      description="Reusable discovery patterns designed for search, learning, and return visits."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {benefits.map((item) => {
          const Icon = resolveHomepageIcon(item.icon);
          return (
            <li
              key={item.id}
              className="border-border/80 bg-card/30 flex gap-4 rounded-xl border p-5"
            >
              <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-5" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </HomepageSection>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: HomepageTestimonial[];
}) {
  return (
    <HomepageSection
      id="testimonials"
      eyebrow="Testimonials"
      title="Trusted by builders, analysts, and educators"
      description="Mock quotes for the foundation release — replace with CMS content later."
    >
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item) => (
          <li
            key={item.id}
            className="border-border/80 flex h-full flex-col rounded-xl border p-5"
          >
            <p className="text-sm leading-relaxed">“{item.quote}”</p>
            <div className="mt-auto pt-5">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-muted-foreground text-xs">
                {item.role}, {item.company}
              </p>
              <p className="sr-only">Rating {item.rating} out of 5</p>
              <p className="text-muted-foreground mt-1 text-xs" aria-hidden>
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </HomepageSection>
  );
}
