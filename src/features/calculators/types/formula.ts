import type { FormulaType } from "@/features/calculators/constants/enums";
import type {
  EntityId,
  UnitDefinition,
} from "@/features/calculators/types/common";

/**
 * Formula definition — expression + metadata.
 * Does not evaluate; engines plug in later via FormulaService.
 */
export type Formula = {
  id: EntityId;
  /** Display name, e.g. "EMI (reducing balance)". */
  name: string;
  /** Expression string in the chosen dialect. */
  expression: string;
  type: FormulaType;
  /** Variable `name` tokens referenced by this formula. */
  variables: string[];
  /** Decimal places preferred when evaluating. */
  precision: number;
  unit?: UnitDefinition;
  /**
   * Other formula IDs this formula depends on (composite / chained).
   * Enables DAG-style evaluation in a future engine.
   */
  dependencies: EntityId[];
  description?: string;
  /** Optional notes for authors / auditors. */
  notes?: string;
};
