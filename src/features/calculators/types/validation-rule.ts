import type { ValidationType } from "@/features/calculators/constants/enums";
import type { EntityId } from "@/features/calculators/types/common";

/**
 * Declarative validation rule bound to a variable (or custom path).
 * Evaluation is intentionally out of scope for this foundation layer.
 */
export type ValidationRule = {
  id: EntityId;
  type: ValidationType;
  /** Human-readable failure message. */
  message: string;
  /** Lower / upper bounds for min/max / length rules. */
  value?: number | string | boolean | readonly string[];
  /** Regex source for ValidationType.Regex. */
  pattern?: string;
  /** Flags for regex, e.g. "i". */
  flags?: string;
  /**
   * Stable key for a custom validator registered at runtime.
   * No implementation in the domain foundation.
   */
  customValidatorKey?: string;
  /** Soft vs hard — soft rules may warn without blocking. */
  severity?: "error" | "warning";
};
