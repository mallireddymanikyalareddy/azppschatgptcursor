"use client";

import { ProtectedRoute } from "@/features/auth/guards/route-guards";
import { RbacProvider } from "@/features/rbac";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminFooter } from "@/features/admin/components/admin-footer";
import { AdminHeader } from "@/features/admin/components/admin-header";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";

type AdminShellProps = {
  children: React.ReactNode;
};

/**
 * Enterprise admin application chrome:
 * sticky header, collapsible sidebar / mobile drawer, scrollable content, footer.
 */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <ProtectedRoute>
      <RbacProvider>
        <SidebarProvider defaultOpen>
          <a
            href="#admin-main"
            className="bg-primary text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:ring-2"
          >
            Skip to content
          </a>
          <AdminSidebar />
          <SidebarInset className="flex min-h-svh flex-col">
            <AdminHeader />
            <main
              id="admin-main"
              tabIndex={-1}
              className="bg-background flex-1 overflow-y-auto outline-none"
            >
              <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
                {children}
              </div>
            </main>
            <AdminFooter />
          </SidebarInset>
        </SidebarProvider>
      </RbacProvider>
    </ProtectedRoute>
  );
}
