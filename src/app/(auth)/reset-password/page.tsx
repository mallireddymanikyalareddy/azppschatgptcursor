import type { Metadata } from "next";
import { Suspense } from "react";

import { PageLoader } from "@/components/ui/loaders";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { GuestRoute } from "@/features/auth/guards/route-guards";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your AZPPS account.",
};

export default function ResetPasswordPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Reset password"
        description="Choose a strong password to secure your account."
      >
        <Suspense
          fallback={
            <PageLoader className="min-h-[240px]" label="Loading form" />
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </AuthLayout>
    </GuestRoute>
  );
}
