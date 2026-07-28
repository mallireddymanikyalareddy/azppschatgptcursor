import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { GuestRoute } from "@/features/auth/guards/route-guards";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Request a password reset link.",
};

export default function ForgotPasswordPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Forgot password"
        description="Enter your email and we’ll send a secure reset link."
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </GuestRoute>
  );
}
