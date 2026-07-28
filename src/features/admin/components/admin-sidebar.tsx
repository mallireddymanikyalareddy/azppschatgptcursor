"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <SidebarHeader className="border-sidebar-border h-14 justify-center border-b">
        <div className="flex items-center gap-2.5 px-2">
          <Link
            href={ADMIN_ROUTES.dashboard}
            className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            onClick={() => {
              if (isMobile) setOpenMobile(false);
            }}
          >
            <span className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold tracking-tight">
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
            <SidebarGroup key={group.id} className="py-2">
              <SidebarGroupLabel className="text-muted-foreground/80 text-[11px] font-medium tracking-wide uppercase">
                {group.label}
              </SidebarGroupLabel>
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
                          className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
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
        <p className="text-muted-foreground/80 px-2 py-1.5 text-[10px] tracking-wide uppercase group-data-[collapsible=icon]:hidden">
          Admin shell
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
