"use client";

import { ErrorDisplay } from "@/components/common/status-pages";

type MainErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MainError({ error, reset }: MainErrorProps) {
  return (
    <ErrorDisplay
      title="Unable to load page"
      message={error.message || "An error occurred while rendering this page."}
      reset={reset}
    />
  );
}
