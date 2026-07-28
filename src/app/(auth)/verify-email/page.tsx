import type { Metadata } from "next";
import { Suspense } from "react";

import { PageLoader } from "@/components/ui/loaders";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { VerifyEmailPanel } from "@/features/auth/components/verify-email-panel";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your AZPPS email address.",
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verify your email"
      description="Confirm your email address to activate your account."
    >
      <Suspense
        fallback={<PageLoader className="min-h-[240px]" label="Verifying" />}
      >
        <VerifyEmailPanel />
      </Suspense>
    </AuthLayout>
  );
}
