"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/features/auth/components/password-input";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { loginSchema, type LoginFormValues } from "@/features/auth/validation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const next = searchParams.get("next") || "/";
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    setSuccess(null);
    const result = await login(values);
    if (!result.ok) {
      setFormError(result.error?.message ?? "Unable to sign in.");
      return;
    }
    setSuccess("Signed in successfully. Redirecting…");
    router.replace(next);
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      {formError ? (
        <Alert variant="error">
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="email-error" className="text-destructive text-sm" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="password">Password</Label>
          <Link
            href={AUTH_ROUTES.forgotPassword}
            className="text-primary text-xs font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
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

      <div className="flex items-center gap-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) =>
            setValue("rememberMe", checked === true, { shouldValidate: true })
          }
        />
        <Label htmlFor="rememberMe" className="font-normal">
          Remember me
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" label="Signing in" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={AUTH_ROUTES.register}
          className="text-primary font-medium hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
