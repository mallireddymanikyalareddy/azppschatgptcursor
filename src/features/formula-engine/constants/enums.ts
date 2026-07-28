/**
 * Formula engine error codes — structured, never thrown as raw strings.
 */
export const FormulaErrorCode = {
  InvalidFormula: "INVALID_FORMULA",
  InvalidSyntax: "INVALID_SYNTAX",
  UnknownVariable: "UNKNOWN_VARIABLE",
  MissingInput: "MISSING_INPUT",
  InvalidFunction: "INVALID_FUNCTION",
  UnsupportedOperator: "UNSUPPORTED_OPERATOR",
  DivideByZero: "DIVIDE_BY_ZERO",
  Overflow: "OVERFLOW",
  CircularDependency: "CIRCULAR_DEPENDENCY",
  UnknownFormula: "UNKNOWN_FORMULA",
  ArgumentCount: "ARGUMENT_COUNT",
  EmptyExpression: "EMPTY_EXPRESSION",
} as const;

export type FormulaErrorCode =
  (typeof FormulaErrorCode)[keyof typeof FormulaErrorCode];

export const RoundingMode = {
  HalfUp: "half_up",
  HalfEven: "half_even",
  Floor: "floor",
  Ceil: "ceil",
  Trunc: "trunc",
} as const;

export type RoundingMode = (typeof RoundingMode)[keyof typeof RoundingMode];

export const TokenType = {
  Number: "number",
  Identifier: "identifier",
  Operator: "operator",
  LParen: "lparen",
  RParen: "rparen",
  Comma: "comma",
  Eof: "eof",
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];

/** Binary / unary operators supported by the dialect. */
export const OPERATORS = ["+", "-", "*", "/", "%", "^"] as const;
export type OperatorSymbol = (typeof OPERATORS)[number];
