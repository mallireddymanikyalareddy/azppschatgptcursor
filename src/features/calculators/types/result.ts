import type {
  OutputType,
  Visibility,
} from "@/features/calculators/constants/enums";
import type {
  EntityId,
  UnitDefinition,
} from "@/features/calculators/types/common";

/**
 * Declared output / result slot produced by one or more formulas.
 */
export type ResultDefinition = {
  id: EntityId;
  /** Machine key, unique within a calculator. */
  key: string;
  label: string;
  /**
   * Placeholder / example value for schema validation & previews.
   * Live computed values are out of scope for the domain foundation.
   */
  value?: number | string | boolean | null;
  outputType: OutputType;
  format?: string;
  /** ISO 4217 when outputType is currency. */
  currency?: string;
  /** When true, treat numeric output as a percentage. */
  percentage?: boolean;
  precision?: number;
  unit?: UnitDefinition;
  visibility: Visibility;
  /** Formula that primarily produces this result. */
  formulaId?: EntityId;
  order: number;
};
