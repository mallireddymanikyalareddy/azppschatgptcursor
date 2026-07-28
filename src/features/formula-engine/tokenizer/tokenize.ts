import {
  FormulaErrorCode,
  TokenType,
} from "@/features/formula-engine/constants/enums";
import type { FormulaIssue, Token } from "@/features/formula-engine/types";

const OPERATORS = new Set(["+", "-", "*", "/", "%", "^"]);

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function isIdentStart(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_";
}

function isIdentPart(ch: string): boolean {
  return isIdentStart(ch) || isDigit(ch);
}

/**
 * Lexical analysis only — no evaluation.
 * Rejects unexpected characters as structured errors.
 */
export function tokenize(source: string): {
  tokens: Token[];
  errors: FormulaIssue[];
} {
  const tokens: Token[] = [];
  const errors: FormulaIssue[] = [];
  let i = 0;

  while (i < source.length) {
    const ch = source[i]!;

    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i += 1;
      continue;
    }

    if (
      isDigit(ch) ||
      (ch === "." && i + 1 < source.length && isDigit(source[i + 1]!))
    ) {
      const start = i;
      let sawDot = ch === ".";
      i += 1;
      while (i < source.length) {
        const c = source[i]!;
        if (isDigit(c)) {
          i += 1;
          continue;
        }
        if (c === "." && !sawDot) {
          sawDot = true;
          i += 1;
          continue;
        }
        break;
      }
      tokens.push({
        type: TokenType.Number,
        value: source.slice(start, i),
        index: start,
      });
      continue;
    }

    if (isIdentStart(ch)) {
      const start = i;
      i += 1;
      while (i < source.length && isIdentPart(source[i]!)) i += 1;
      tokens.push({
        type: TokenType.Identifier,
        value: source.slice(start, i),
        index: start,
      });
      continue;
    }

    if (OPERATORS.has(ch)) {
      tokens.push({ type: TokenType.Operator, value: ch, index: i });
      i += 1;
      continue;
    }

    if (ch === "(") {
      tokens.push({ type: TokenType.LParen, value: ch, index: i });
      i += 1;
      continue;
    }

    if (ch === ")") {
      tokens.push({ type: TokenType.RParen, value: ch, index: i });
      i += 1;
      continue;
    }

    if (ch === ",") {
      tokens.push({ type: TokenType.Comma, value: ch, index: i });
      i += 1;
      continue;
    }

    errors.push({
      code: FormulaErrorCode.InvalidSyntax,
      message: `Unexpected character '${ch}' at position ${i}`,
      index: i,
    });
    i += 1;
  }

  tokens.push({ type: TokenType.Eof, value: "", index: source.length });
  return { tokens, errors };
}
