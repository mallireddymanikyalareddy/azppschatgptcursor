import { FormLayout } from "@/features/form-engine/constants/enums";
import { cn } from "@/lib/utils/index";

export function layoutGridClass(layout: FormLayout | undefined): string {
  switch (layout) {
    case FormLayout.TwoColumn:
      return "grid grid-cols-1 gap-4 md:grid-cols-2";
    case FormLayout.ThreeColumn:
      return "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3";
    case FormLayout.SingleColumn:
    default:
      return "grid grid-cols-1 gap-4";
  }
}

export function fieldColSpanClass(colSpan: 1 | 2 | 3 | undefined): string {
  switch (colSpan) {
    case 2:
      return "md:col-span-2";
    case 3:
      return "md:col-span-2 lg:col-span-3";
    default:
      return "";
  }
}

export function mergeFieldClassName(
  colSpan: 1 | 2 | 3 | undefined,
  className?: string,
): string {
  return cn(fieldColSpanClass(colSpan), className);
}
