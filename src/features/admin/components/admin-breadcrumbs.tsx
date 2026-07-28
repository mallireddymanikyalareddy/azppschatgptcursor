"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buildBreadcrumbs } from "@/features/admin/lib/nav-utils";

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildBreadcrumbs(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.href}>
            {index > 0 ? (
              <BreadcrumbSeparator>
                <ChevronRight className="size-3.5" aria-hidden />
              </BreadcrumbSeparator>
            ) : null}
            {crumb.current ? (
              <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.title}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
