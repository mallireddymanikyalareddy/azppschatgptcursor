import type { Metadata } from "next";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/features/auth/components/auth-layout";

export const metadata: Metadata = {
  title: "Access denied",
  description: "You do not have permission to view this resource.",
};

export default function AccessDeniedPage() {
  return (
    <AuthLayout
      title="Access denied"
      description="You don’t have permission to open this area."
    >
      <div className="space-y-4">
        <Alert variant="error">
          <AlertTitle>403 — Forbidden</AlertTitle>
          <AlertDescription>
            This module requires elevated permissions. Contact an administrator
            if you believe this is a mistake.
          </AlertDescription>
        </Alert>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Switch account</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
