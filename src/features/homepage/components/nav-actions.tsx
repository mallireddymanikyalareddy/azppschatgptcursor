"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { HOMEPAGE_ROUTES } from "@/features/homepage/constants/routes";

/**
 * Homepage-only nav actions. Consumes auth context without modifying Auth feature internals.
 */
export function HomepageNavActions() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        …
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button asChild size="sm">
        <Link href={HOMEPAGE_ROUTES.dashboard}>Dashboard</Link>
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="sm">
      <Link href={HOMEPAGE_ROUTES.signIn}>Sign in</Link>
    </Button>
  );
}
