"use client";

import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";
import { PageLoader } from "@/components/ui/loaders";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGuard({ mode: "protected" });

  if (isLoading || !isAuthenticated) {
    return <PageLoader label="Checking session" />;
  }

  return <>{children}</>;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuthGuard({ mode: "guest" });

  if (isLoading || isAuthenticated) {
    return <PageLoader label="Redirecting" />;
  }

  return <>{children}</>;
}
