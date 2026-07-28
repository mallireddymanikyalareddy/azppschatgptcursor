"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ANIMATION } from "@/constants";

export function PageLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION.duration.normal }}
      className="container flex min-h-[50vh] flex-col items-center justify-center gap-6 py-16"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="flex w-full max-w-md flex-col gap-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-32 w-full" />
      </div>
      <span className="sr-only">Loading…</span>
    </motion.div>
  );
}

type ErrorDisplayProps = {
  title?: string;
  message?: string;
  reset?: () => void;
};

export function ErrorDisplay({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  reset,
}: ErrorDisplayProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.duration.normal }}
      className="container flex min-h-[50vh] flex-col items-center justify-center gap-4 py-16 text-center"
      role="alert"
      aria-live="assertive"
    >
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground max-w-md">{message}</p>
      {reset ? (
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
      ) : null}
    </motion.section>
  );
}
