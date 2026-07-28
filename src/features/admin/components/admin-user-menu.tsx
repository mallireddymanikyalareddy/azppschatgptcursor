"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { ADMIN_USER_MENU } from "@/features/admin/constants/navigation";
import { useRbac } from "@/features/rbac";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AdminUserMenu() {
  const { user, logout } = useAuth();
  const { roleDetails } = useRbac();
  const pathname = usePathname();

  const displayName = user?.name ?? "User";
  const email = user?.email ?? "";
  const roleLabel = roleDetails.map((r) => r.name).join(", ") || "Viewer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 gap-2 px-2"
          aria-label="Open user menu"
        >
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">
              {initials(displayName)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[9rem] truncate text-left text-sm font-medium lg:inline">
            {displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{displayName}</span>
            <span className="text-muted-foreground truncate text-xs">
              {email}
            </span>
            <span className="text-muted-foreground text-xs">{roleLabel}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ADMIN_USER_MENU.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <DropdownMenuItem key={item.id} asChild>
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                <Icon className="size-4" aria-hidden />
                {item.title}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            void logout();
          }}
        >
          <LogOut className="size-4" aria-hidden />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
