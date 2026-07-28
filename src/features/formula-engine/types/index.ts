import type {
  FormulaErrorCode,
  OperatorSymbol,
  RoundingMode,
  TokenType,
} from "@/features/formula-engine/constants/enums";

export type Token = {
  type: TokenType;
  value: string;
  index: number;
};

export type AstNode =
  | { kind: "number"; value: number }
  | { kind: "variable"; name: string }
  | { kind: "unary"; operator: "+" | "-"; argument: AstNode }
  | {
      kind: "binary";
      operator: OperatorSymbol;
      left: AstNode;
      right: AstNode;
    }
  | { kind: "call"; name: string; args: AstNode[] };

export type FormulaIssue = {
  code: FormulaErrorCode;
  message: string;
  path?: string;
  index?: number;
};

export type FormulaWarning = {
  code: string;
  message: string;
};

/** Single formula definition for the engine (expression-centric). */
export type FormulaDefinition = {
  id: string;
  /** Result key written into the values bag after execution. */
  key: string;
  name: string;
  expression: string;
  /** Declared input variable names (optional — inferred from AST if omitted). */
  variables?: string[];
  /** Other formula ids this formula depends on. */
  dependencies?: string[];
  precision?: number;
  roundingMode?: RoundingMode;
  /** When true, treat result as currency (default precision 2). */
  currency?: boolean;
  /** When true, treat result as percentage display precision. */
  percentage?: boolean;
  description?: string;
};

/** Constant values available to all formulas in a program. */
export type FormulaConstants = Record<string, number>;

export type FormulaProgram = {
  id: string;
  name: string;
  formulas: FormulaDefinition[];
  constants?: FormulaConstants;
  description?: string;
};

export type VariableValues = Record<string, number | null | undefined>;

export type EvaluateOptions = {
  values: VariableValues;
  constants?: FormulaConstants;
  /** Default decimal places when formula omits precision. */
  defaultPrecision?: number;
  defaultRoundingMode?: RoundingMode;
};

export type FormulaExecutionResult = {
  formulaId: string;
  key: string;
  value: number | null;
  success: boolean;
  errors: FormulaIssue[];
  warnings: FormulaWarning[];
  durationMs: number;
};

export type ProgramExecutionResult = {
  success: boolean;
  results: Record<string, number>;
  executions: FormulaExecutionResult[];
  errors: FormulaIssue[];
  warnings: FormulaWarning[];
  durationMs: number;
  /** Final merged bag: inputs + constants + computed keys. */
  values: Record<string, number>;
};

export type ParseResult =
  | { success: true; ast: AstNode; tokens: Token[] }
  | { success: false; errors: FormulaIssue[]; tokens: Token[] };

export type ValidationResult = {
  valid: boolean;
  errors: FormulaIssue[];
  warnings: FormulaWarning[];
  referencedVariables: string[];
  referencedFunctions: string[];
};

export type DependencyGraph = {
  order: string[];
  edges: Record<string, string[]>;
};
