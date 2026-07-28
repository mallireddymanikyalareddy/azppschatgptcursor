import type { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";

type ToastMessage = string | ReactNode;

export const toast = {
  success: (message: ToastMessage, description?: string) =>
    sonnerToast.success(message, { description }),
  error: (message: ToastMessage, description?: string) =>
    sonnerToast.error(message, { description }),
  warning: (message: ToastMessage, description?: string) =>
    sonnerToast.warning(message, { description }),
  info: (message: ToastMessage, description?: string) =>
    sonnerToast.info(message, { description }),
  loading: (message: ToastMessage, description?: string) =>
    sonnerToast.loading(message, { description }),
  message: (message: ToastMessage, description?: string) =>
    sonnerToast.message(message, { description }),
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
  ) => sonnerToast.promise(promise, messages),
  dismiss: sonnerToast.dismiss,
};

export { Toaster } from "@/components/ui/sonner";
