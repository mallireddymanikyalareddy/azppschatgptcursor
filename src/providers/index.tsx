"use client";

import dynamic from "next/dynamic";

import { ThemeProvider } from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/features/auth/context/auth-context";

const Toaster = dynamic(
  () => import("@/components/ui/toast").then((mod) => mod.Toaster),
  { ssr: false },
);

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider delayDuration={150}>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
