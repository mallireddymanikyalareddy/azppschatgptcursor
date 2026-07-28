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
    loading: () => <Skeleton className="h-8 w-8 sm:w-52" />,
  },
);

const AdminNotifications = dynamic(
  () =>
    import("@/features/admin/components/admin-notifications").then(
      (mod) => mod.AdminNotifications,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="size-8 rounded-md" />,
  },
);

export function AdminHeader() {
  return (
    <header className="bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-20 border-b backdrop-blur-xl">
      <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
        <SidebarTrigger className="size-8" />
        <Separator
          orientation="vertical"
          className="mx-1 hidden h-5 sm:block"
        />
        <div className="hidden min-w-0 flex-1 md:block">
          <AdminBreadcrumbs />
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <AdminGlobalSearch />
          <AdminQuickActions />
          <ThemeToggle />
          <AdminNotifications />
          <AdminUserMenu />
        </div>
      </div>
      <div className="border-border/60 border-t px-3 py-2 md:hidden">
        <AdminBreadcrumbs />
      </div>
    </header>
  );
}
