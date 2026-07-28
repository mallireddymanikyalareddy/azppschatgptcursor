"use client";

import { ErrorDisplay } from "@/components/common/status-pages";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorDisplay
          title="Critical error"
          message={
            error.message ||
            "A critical error occurred. Please refresh the page."
          }
          reset={reset}
        />
      </body>
    </html>
  );
}
