"use client";

import { ErrorDisplay } from "@/components/common/status-pages";

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <ErrorDisplay
      title="Application error"
      message={error.message || "Something went wrong while loading this page."}
      reset={reset}
    />
  );
}
