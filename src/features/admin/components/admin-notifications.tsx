"use client";

import * as React from "react";
import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MOCK_NOTIFICATIONS } from "@/features/admin/data/notifications-mock";
import { cn } from "@/lib/utils";

export function AdminNotifications() {
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-8"
          aria-label={
            unread > 0 ? `Notifications, ${unread} unread` : "Notifications"
          }
        >
          <Bell className="size-4" aria-hidden />
          {unread > 0 ? (
            <span
              className="bg-primary absolute top-1.5 right-1.5 size-1.5 rounded-full"
              aria-hidden
            />
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0"
        role="dialog"
        aria-label="Notifications"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm font-medium">Notifications</p>
          <Badge variant="secondary">{unread} new</Badge>
        </div>
        <Separator />
        <ScrollArea className="h-72">
          <ul className="flex flex-col p-1">
            {MOCK_NOTIFICATIONS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    "hover:bg-muted/60 flex w-full flex-col gap-1 rounded-md px-3 py-2.5 text-left transition-colors",
                    !item.read && "bg-muted/30",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {item.time}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs leading-relaxed">
                    {item.body}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm" disabled>
            View all (coming soon)
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
