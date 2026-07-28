"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/features/auth/components/password-input";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { passwordPolicyDescription } from "@/features/auth/constants/security";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/validation";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const { resetPassword } = useAuth();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    setSuccess(null);
    const result = await resetPassword(values);
    if (!result.ok) {
      setFormError(result.error?.message ?? "Unable to reset password.");
      return;
    }
    setSuccess("Password updated. You can sign in now.");
    setTimeout(() => router.push(AUTH_ROUTES.login), 1200);
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <input type="hidden" {...register("token")} />

      {formError ? (
        <Alert variant="error">
          <AlertTitle>Reset failed</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      ) : null}

      {!token ? (
        <Alert variant="warning">
          <AlertTitle>Missing token</AlertTitle>
          <AlertDescription>
            Open the reset link from your email, or request a new one.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "password-error password-hint" : "password-hint"
          }
          {...register("password")}
        />
        <p id="password-hint" className="text-muted-foreground text-xs">
          {passwordPolicyDescription}
        </p>
        {errors.password ? (
          <p
            id="password-error"
            className="text-destructive text-sm"
            role="alert"
          >
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={
            errors.confirmPassword ? "confirm-password-error" : undefined
          }
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p
            id="confirm-password-error"
            className="text-destructive text-sm"
            role="alert"
          >
            {errors.confirmPassword.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid || !token}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" label="Updating password" />
            Updating…
          </>
        ) : (
          "Update password"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        <Link
          href={AUTH_ROUTES.forgotPassword}
          className="text-primary font-medium hover:underline"
        >
          Request a new reset link
        </Link>
      </p>
    </form>
  );
}
