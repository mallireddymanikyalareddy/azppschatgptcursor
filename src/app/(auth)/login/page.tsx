import type { Metadata } from "next";
import { Suspense } from "react";

import { PageLoader } from "@/components/ui/loaders";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { LoginForm } from "@/features/auth/components/login-form";
import { GuestRoute } from "@/features/auth/guards/route-guards";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your AZPPS account.",
};

export default function LoginPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Welcome back"
        description="Sign in to continue to your AZPPS workspace."
      >
        <Suspense
          fallback={
            <PageLoader className="min-h-[240px]" label="Loading form" />
          }
        >
          <LoginForm />
        </Suspense>
      </AuthLayout>
    </GuestRoute>
  );
}
