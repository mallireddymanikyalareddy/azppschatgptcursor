"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { PasswordInput } from "@/features/auth/components/password-input";
import { AUTH_ROUTES } from "@/features/auth/constants/routes";
import { passwordPolicyDescription } from "@/features/auth/constants/security";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/validation";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const acceptTerms = watch("acceptTerms");

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    const result = await registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
      acceptTerms: values.acceptTerms,
    });

    if (!result.ok) {
      setFormError(result.error?.message ?? "Unable to create account.");
      return;
    }

    router.push(
      `${AUTH_ROUTES.emailSent}?type=verify&email=${encodeURIComponent(result.email ?? values.email)}`,
    );
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      {formError ? (
        <Alert variant="error">
          <AlertTitle>Registration failed</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="name-error" className="text-destructive text-sm" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

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
        <Label htmlFor="password">Password</Label>
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

      <div className="flex items-start gap-2">
        <Checkbox
          id="acceptTerms"
          checked={acceptTerms}
          onCheckedChange={(checked) =>
            setValue("acceptTerms", checked === true, { shouldValidate: true })
          }
          aria-invalid={Boolean(errors.acceptTerms)}
        />
        <Label htmlFor="acceptTerms" className="leading-5 font-normal">
          I agree to the Terms of Service and Privacy Policy.
        </Label>
      </div>
      {errors.acceptTerms ? (
        <p className="text-destructive text-sm" role="alert">
          {errors.acceptTerms.message}
        </p>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" label="Creating account" />
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <Link
          href={AUTH_ROUTES.login}
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
