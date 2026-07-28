import type { Metadata } from "next";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";

export const metadata: Metadata = {
  title: "Session expired",
  description: "Your session has expired. Sign in again to continue.",
};

export default function SessionExpiredPage() {
  return (
    <AuthLayout
      title="Session expired"
      description="For your security, you were signed out after inactivity."
    >
      <div className="space-y-4">
        <Alert variant="warning">
          <AlertTitle>Session timed out</AlertTitle>
          <AlertDescription>
            Sign in again to continue where you left off. Your work is protected
            by secure session policies.
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link href={AUTH_ROUTES.login}>Sign in again</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
