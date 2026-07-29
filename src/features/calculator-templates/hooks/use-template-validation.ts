"use client";

import * as React from "react";

import type {
  CalculatorTemplate,
  TemplateValidationReport,
} from "@/features/calculator-templates/types";
import { templateService } from "@/features/calculator-templates/services";

export type UseTemplateValidationResult = {
  report: TemplateValidationReport;
  revalidate: () => TemplateValidationReport;
};

export function useTemplateValidation(
  template: CalculatorTemplate,
): UseTemplateValidationResult {
  const [report, setReport] = React.useState(() =>
    templateService.validate(template),
  );

  React.useEffect(() => {
    setReport(templateService.validate(template));
  }, [template]);

  const revalidate = React.useCallback(() => {
    const next = templateService.validate(template);
    setReport(next);
    return next;
  }, [template]);

  return { report, revalidate };
}
