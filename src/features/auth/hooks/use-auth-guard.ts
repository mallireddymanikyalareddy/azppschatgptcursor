"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { useAuth } from "@/features/auth/hooks/use-auth";

type UseAuthGuardOptions = {
  mode: "protected" | "guest";
  redirectTo?: string;
};

export function useAuthGuard({ mode, redirectTo }: UseAuthGuardOptions) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (mode === "protected" && !isAuthenticated) {
      const target = redirectTo ?? AUTH_ROUTES.login;
      router.replace(`${target}?next=${encodeURIComponent(pathname)}`);
    }

    if (mode === "guest" && isAuthenticated) {
      router.replace(redirectTo ?? "/");
    }
  }, [isAuthenticated, isLoading, mode, pathname, redirectTo, router]);

  return { isLoading, isAuthenticated };
}
