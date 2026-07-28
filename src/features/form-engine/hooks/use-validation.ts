"use client";

import * as React from "react";

import { buildZodSchema } from "@/features/form-engine/lib/build-zod-schema";
import type {
  FormDefinition,
  FormValues,
  ResolvedFieldState,
} from "@/features/form-engine/types";

export type ValidationIssue = {
  path: string;
  message: string;
};

export type UseValidationResult = {
  validate: (
    values: FormValues,
    resolved?: Record<string, ResolvedFieldState>,
  ) => Promise<
    | { success: true; data: FormValues }
    | { success: false; issues: ValidationIssue[] }
  >;
  schema: ReturnType<typeof buildZodSchema>;
};

/**
 * Standalone validation helper for FormDefinitions (outside RHF).
 */
export function useValidation(definition: FormDefinition): UseValidationResult {
  const schema = React.useMemo(() => buildZodSchema(definition), [definition]);

  const validate = React.useCallback(
    async (
      values: FormValues,
      resolved?: Record<string, ResolvedFieldState>,
    ) => {
      const activeSchema = resolved
        ? buildZodSchema(definition, resolved)
        : schema;
      const result = await activeSchema.safeParseAsync(values);

      if (result.success) {
        return { success: true as const, data: result.data as FormValues };
      }

      const issues: ValidationIssue[] = result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "form",
        message: issue.message,
      }));

      return { success: false as const, issues };
    },
    [definition, schema],
  );

  return { validate, schema };
}
