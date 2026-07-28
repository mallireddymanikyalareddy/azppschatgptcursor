"use client";

/**
 * Modal is a semantic alias of Dialog for enterprise naming consistency.
 * Prefer Modal in product code; Dialog remains available for shadcn compatibility.
 */
export {
  Dialog as Modal,
  DialogClose as ModalClose,
  DialogContent as ModalContent,
  DialogDescription as ModalDescription,
  DialogFooter as ModalFooter,
  DialogHeader as ModalHeader,
  DialogOverlay as ModalOverlay,
  DialogPortal as ModalPortal,
  DialogTitle as ModalTitle,
  DialogTrigger as ModalTrigger,
} from "@/components/ui/dialog";
