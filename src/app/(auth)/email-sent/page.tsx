import type { Metadata } from "next";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/features/auth/components/auth-layout";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";

export const metadata: Metadata = {
  title: "Email sent",
  description: "Check your inbox for the next step.",
};

type EmailSentPageProps = {
  searchParams: Promise<{ type?: string; email?: string }>;
};

export default async function EmailSentPage({
  searchParams,
}: EmailSentPageProps) {
  const params = await searchParams;
  const isReset = params.type === "reset";
  const email = params.email;

  return (
    <AuthLayout
      title="Check your email"
      description={
        isReset
          ? "We sent a password reset link if an account exists."
          : "We sent a verification link to confirm your email."
      }
    >
      <div className="space-y-4">
        <Alert variant="info">
          <AlertTitle>Email sent</AlertTitle>
          <AlertDescription>
            {email
              ? `Instructions were sent to ${email}.`
              : "Instructions were sent to your inbox."}{" "}
            The link expires for security.
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link href={AUTH_ROUTES.login}>Back to sign in</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
