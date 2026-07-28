"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function VerifyEmailPanel() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { verifyEmail } = useAuth();
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >(token ? "loading" : "idle");
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!token) return;

    let cancelled = false;

    (async () => {
      const result = await verifyEmail({ token });
      if (cancelled) return;
      if (!result.ok) {
        setStatus("error");
        setMessage(result.error?.message ?? "Verification failed.");
        return;
      }
      setStatus("success");
      setMessage("Your email has been verified. You can sign in.");
    })();

    return () => {
      cancelled = true;
    };
  }, [token, verifyEmail]);

  if (!token) {
    return (
      <div className="space-y-4">
        <Alert variant="warning">
          <AlertTitle>Verification link required</AlertTitle>
          <AlertDescription>
            Open the link from your email to verify your account.
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link href={AUTH_ROUTES.login}>Back to sign in</Link>
        </Button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-3 py-8" role="status">
        <Spinner size="lg" label="Verifying email" />
        <p className="text-muted-foreground text-sm">Verifying your email…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Alert variant={status === "success" ? "success" : "error"}>
        <AlertTitle>
          {status === "success" ? "Email verified" : "Verification failed"}
        </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button asChild className="w-full">
        <Link href={AUTH_ROUTES.login}>Continue to sign in</Link>
      </Button>
    </div>
  );
}
