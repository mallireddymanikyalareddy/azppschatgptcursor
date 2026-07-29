import Link from "next/link";

import { siteConfig } from "@/config/site";
import { HOMEPAGE_ROUTES } from "@/features/homepage/constants/routes";
import type {
  HomepageCategory,
  HomepagePayload,
} from "@/features/homepage/types";

const LEGAL = [
  { title: "Privacy", href: "/#newsletter" },
  { title: "Terms", href: "/#newsletter" },
  { title: "Cookies", href: "/#newsletter" },
];

const COMPANY = [
  { title: "About", href: HOMEPAGE_ROUTES.about },
  { title: "Contact", href: HOMEPAGE_ROUTES.contact },
  { title: "AI Generator", href: HOMEPAGE_ROUTES.aiGenerator },
  { title: "Sign in", href: HOMEPAGE_ROUTES.signIn },
];

const RESOURCES = [
  { title: "Articles", href: HOMEPAGE_ROUTES.articles },
  { title: "Collections", href: "/#collections" },
  { title: "Design System", href: "/design-system" },
  { title: "GitHub", href: siteConfig.links.github, external: true },
];

export function HomepageFooter({
  categories,
  popularCalculators,
}: {
  categories: HomepageCategory[];
  popularCalculators: HomepagePayload["mostUsedCalculators"];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 bg-card/20 border-t">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </p>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
            AI-powered calculators with transparent formulas and educational
            depth.
          </p>
          <p className="text-muted-foreground mt-4 text-xs">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <FooterColumn title="Categories">
          {categories.slice(0, 8).map((item) => (
            <FooterLink key={item.id} href={item.href} title={item.name} />
          ))}
        </FooterColumn>

        <FooterColumn title="Popular calculators">
          {popularCalculators.slice(0, 6).map((item) => (
            <FooterLink key={item.id} href={item.href} title={item.name} />
          ))}
        </FooterColumn>

        <FooterColumn title="Resources">
          {RESOURCES.map((item) => (
            <FooterLink key={item.title} {...item} />
          ))}
        </FooterColumn>

        <FooterColumn title="Company & legal">
          {[...COMPANY, ...LEGAL].map((item) => (
            <FooterLink key={item.title} {...item} />
          ))}
        </FooterColumn>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-tight">{title}</p>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  title,
  href,
  external,
}: {
  title: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {title}
      </Link>
    </li>
  );
}
