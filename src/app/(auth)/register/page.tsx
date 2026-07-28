import type { Metadata } from "next";

import { AuthLayout } from "@/features/auth/components/auth-layout";
import { RegisterForm } from "@/features/auth/components/register-form";
import { GuestRoute } from "@/features/auth/guards/route-guards";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your AZPPS account.",
};

export default function RegisterPage() {
  return (
    <GuestRoute>
      <AuthLayout
        title="Create your account"
        description="Set up secure access for AZPPS modules."
      >
        <RegisterForm />
      </AuthLayout>
    </GuestRoute>
  );
}
