"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ADMIN_NAV_GROUPS } from "@/features/admin/constants/navigation";
import { ADMIN_ROUTES } from "@/features/admin/constants/routes";
import {
  filterNavGroupsByPermission,
  isNavItemActive,
} from "@/features/admin/lib/nav-utils";
import { useRbac } from "@/features/rbac";
import { siteConfig } from "@/config/site";

export function AdminSidebar() {
  const pathname = usePathname();
  const { permissions } = useRbac();
  const { isMobile, setOpenMobile } = useSidebar();

  const groups = filterNavGroupsByPermission(ADMIN_NAV_GROUPS, permissions);

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-sidebar-border border-b">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Link
            href={ADMIN_ROUTES.dashboard}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            onClick={() => {
              if (isMobile) setOpenMobile(false);
            }}
          >
            <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold">
              AZ
            </span>
            <span className="truncate text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
              {siteConfig.name}
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full">
          {groups.map((group) => (
            <SidebarGroup key={group.id}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = isNavItemActive(pathname, item.href);
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          tooltip={item.title}
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={() => {
                              if (isMobile) setOpenMobile(false);
                            }}
                          >
                            {Icon ? <Icon aria-hidden /> : null}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t">
        <p className="text-muted-foreground px-2 py-1 text-[11px] group-data-[collapsible=icon]:hidden">
          Admin shell · mock RBAC
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function AdminSidebarCollapseControl() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <PanelLeft className="size-4" aria-hidden />
    </Button>
  );
}
