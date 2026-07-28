"use client";

import { Plus, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CanAccess } from "@/features/rbac";

export function AdminQuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden h-9 gap-1.5 md:inline-flex"
          aria-label="Quick actions"
        >
          <Zap className="size-3.5" aria-hidden />
          Quick actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <CanAccess permission="calculator.create">
          <DropdownMenuItem disabled>
            <Plus className="size-4" aria-hidden />
            New calculator
          </DropdownMenuItem>
        </CanAccess>
        <CanAccess permission="content.manage">
          <DropdownMenuItem disabled>
            <Plus className="size-4" aria-hidden />
            New article
          </DropdownMenuItem>
        </CanAccess>
        <CanAccess permission="ai.generate">
          <DropdownMenuItem disabled>
            <Plus className="size-4" aria-hidden />
            Start AI job
          </DropdownMenuItem>
        </CanAccess>
        <DropdownMenuItem disabled>Invite user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
