import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { title: "Home", href: "/" },
  { title: "Design System", href: "/design-system" },
  { title: "Sign in", href: "/login" },
];

const footerLinks = [
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
      <Navbar items={navItems} showSearch />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}
