"use client";

import dynamic from "next/dynamic";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdminBreadcrumbs } from "@/features/admin/components/admin-breadcrumbs";
import { AdminQuickActions } from "@/features/admin/components/admin-quick-actions";
import { AdminUserMenu } from "@/features/admin/components/admin-user-menu";
import { Skeleton } from "@/components/ui/skeleton";

const AdminGlobalSearch = dynamic(
  () =>
    import("@/features/admin/components/admin-global-search").then(
      (mod) => mod.AdminGlobalSearch,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-9 sm:w-56" />,
  },
);

const AdminNotifications = dynamic(
  () =>
    import("@/features/admin/components/admin-notifications").then(
      (mod) => mod.AdminNotifications,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="size-9 rounded-md" />,
  },
);

export function AdminHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
      <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
        <SidebarTrigger className="size-9" />
        <Separator
          orientation="vertical"
          className="mx-1 hidden h-6 sm:block"
        />
        <div className="hidden min-w-0 flex-1 md:block">
          <AdminBreadcrumbs />
        </div>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <AdminGlobalSearch />
          <AdminQuickActions />
          <ThemeToggle />
          <AdminNotifications />
          <AdminUserMenu />
        </div>
      </div>
      <div className="border-t px-3 py-2 md:hidden">
        <AdminBreadcrumbs />
      </div>
    </header>
  );
}
