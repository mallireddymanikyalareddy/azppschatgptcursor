import Link from "next/link";

import { ADMIN_ROUTES } from "@/features/admin/constants/routes";

export function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-muted-foreground border-t px-4 py-3 text-xs sm:px-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} AZPPS Admin. Enterprise shell foundation.</p>
        <nav aria-label="Admin footer" className="flex gap-3">
          <Link
            href={ADMIN_ROUTES.settings}
            className="hover:text-foreground transition-colors"
          >
            Settings
          </Link>
          <Link
            href={ADMIN_ROUTES.profile}
            className="hover:text-foreground transition-colors"
          >
            Profile
          </Link>
        </nav>
      </div>
    </footer>
  );
}
