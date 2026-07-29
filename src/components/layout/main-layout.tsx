import { ConditionalSiteFooter } from "@/components/layout/conditional-site-footer";
import { Navbar } from "@/components/layout/navbar";
import { HomepageNavActions } from "@/features/homepage";
import { HOMEPAGE_ROUTES } from "@/features/homepage/constants/routes";

type MainLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { title: "Categories", href: HOMEPAGE_ROUTES.categories },
  { title: "Calculators", href: HOMEPAGE_ROUTES.calculators },
  { title: "Articles", href: HOMEPAGE_ROUTES.articles },
  { title: "AI Generator", href: HOMEPAGE_ROUTES.aiGenerator },
  { title: "About", href: HOMEPAGE_ROUTES.about },
  { title: "Contact", href: HOMEPAGE_ROUTES.contact },
];

const footerLinks = [
  { title: "Categories", href: HOMEPAGE_ROUTES.categories },
  { title: "Articles", href: HOMEPAGE_ROUTES.articles },
  { title: "Design System", href: "/design-system" },
  {
    title: "GitHub",
    href: "https://github.com/mallireddymanikyalareddy/azppschatgptcursor",
    external: true,
  },
];

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar items={navItems} showSearch actions={<HomepageNavActions />} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <ConditionalSiteFooter links={footerLinks} />
    </div>
  );
}
