import type { EntityId } from "@/features/calculators/types/common";

/** FAQ entry associated with a calculator or category. */
export type FaqItem = {
  id: EntityId;
  question: string;
  answer: string;
  order: number;
};
