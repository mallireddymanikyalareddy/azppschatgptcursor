/**
 * Shared primitive aliases used across calculator domain aggregates.
 * Keep IDs opaque strings so storage can swap UUID / ULID / cuid later.
 */

export type EntityId = string;

export type IsoDateTime = string;

export type LocaleCode = string;

/** Select / multi-select option for input variables. */
export type VariableOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

/** Unit metadata attached to variables, formulas, and results. */
export type UnitDefinition = {
  /** Canonical unit code, e.g. "INR", "%", "months". */
  code: string;
  label: string;
  symbol?: string;
};

/**
 * Discriminated service/repository result — mirrors auth feature style.
 */
export type DomainErrorCode =
  | "NOT_FOUND"
  | "CONFLICT"
  | "VALIDATION_FAILED"
  | "INVALID_STATE"
  | "UNSUPPORTED"
  | "UNKNOWN";

export type DomainError = {
  code: DomainErrorCode;
  message: string;
  details?: Record<string, unknown>;
};

export type DomainResult<T> =
  { success: true; data: T } | { success: false; error: DomainError };

/** Cursor / offset pagination envelope for large calculator catalogs. */
export type PageRequest = {
  page?: number;
  pageSize?: number;
  cursor?: string;
};

export type PageResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  nextCursor?: string;
  hasMore: boolean;
};
