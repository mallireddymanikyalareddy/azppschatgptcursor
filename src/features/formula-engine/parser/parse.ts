import {
  FormulaErrorCode,
  TokenType,
} from "@/features/formula-engine/constants/enums";
import { tokenize } from "@/features/formula-engine/tokenizer/tokenize";
import type {
  AstNode,
  FormulaIssue,
  ParseResult,
  Token,
} from "@/features/formula-engine/types";

/**
 * Recursive-descent parser → AST.
 * Never evaluates; never uses eval/Function.
 */
class Parser {
  private readonly tokens: Token[];
  private pos = 0;
  private readonly errors: FormulaIssue[] = [];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): ParseResult {
    if (this.tokens.length === 1 && this.tokens[0]?.type === TokenType.Eof) {
      return {
        success: false,
        errors: [
          {
            code: FormulaErrorCode.EmptyExpression,
            message: "Expression is empty",
          },
        ],
        tokens: this.tokens,
      };
    }

    const ast = this.parseExpression();
    if (this.peek().type !== TokenType.Eof) {
      this.errors.push({
        code: FormulaErrorCode.InvalidSyntax,
        message: `Unexpected token '${this.peek().value}' at position ${this.peek().index}`,
        index: this.peek().index,
      });
    }

    if (this.errors.length > 0 || !ast) {
      return {
        success: false,
        errors:
          this.errors.length > 0
            ? this.errors
            : [
                {
                  code: FormulaErrorCode.InvalidFormula,
                  message: "Unable to parse expression",
                },
              ],
        tokens: this.tokens,
      };
    }

    return { success: true, ast, tokens: this.tokens };
  }

  private peek(): Token {
    return this.tokens[this.pos] ?? this.tokens[this.tokens.length - 1]!;
  }

  private consume(): Token {
    const token = this.peek();
    this.pos += 1;
    return token;
  }

  private match(type: TokenType, value?: string): boolean {
    const token = this.peek();
    if (token.type !== type) return false;
    if (value !== undefined && token.value !== value) return false;
    this.consume();
    return true;
  }

  private parseExpression(): AstNode | null {
    let left = this.parseTerm();
    if (!left) return null;

    while (
      this.peek().type === TokenType.Operator &&
      (this.peek().value === "+" || this.peek().value === "-")
    ) {
      const op = this.consume().value as "+" | "-";
      const right = this.parseTerm();
      if (!right) {
        this.errors.push({
          code: FormulaErrorCode.InvalidSyntax,
          message: `Expected expression after '${op}'`,
          index: this.peek().index,
        });
        return null;
      }
      left = { kind: "binary", operator: op, left, right };
    }
    return left;
  }

  private parseTerm(): AstNode | null {
    let left = this.parsePower();
    if (!left) return null;

    while (
      this.peek().type === TokenType.Operator &&
      (this.peek().value === "*" ||
        this.peek().value === "/" ||
        this.peek().value === "%")
    ) {
      const op = this.consume().value as "*" | "/" | "%";
      const right = this.parsePower();
      if (!right) {
        this.errors.push({
          code: FormulaErrorCode.InvalidSyntax,
          message: `Expected expression after '${op}'`,
          index: this.peek().index,
        });
        return null;
      }
      left = { kind: "binary", operator: op, left, right };
    }
    return left;
  }

  /** Right-associative exponentiation. */
  private parsePower(): AstNode | null {
    const left = this.parseUnary();
    if (!left) return null;

    if (this.peek().type === TokenType.Operator && this.peek().value === "^") {
      this.consume();
      const right = this.parsePower();
      if (!right) {
        this.errors.push({
          code: FormulaErrorCode.InvalidSyntax,
          message: "Expected expression after '^'",
          index: this.peek().index,
        });
        return null;
      }
      return { kind: "binary", operator: "^", left, right };
    }
    return left;
  }

  private parseUnary(): AstNode | null {
    if (
      this.peek().type === TokenType.Operator &&
      (this.peek().value === "+" || this.peek().value === "-")
    ) {
      const op = this.consume().value as "+" | "-";
      const argument = this.parseUnary();
      if (!argument) {
        this.errors.push({
          code: FormulaErrorCode.InvalidSyntax,
          message: `Expected expression after unary '${op}'`,
          index: this.peek().index,
        });
        return null;
      }
      return { kind: "unary", operator: op, argument };
    }
    return this.parsePrimary();
  }

  private parsePrimary(): AstNode | null {
    const token = this.peek();

    if (token.type === TokenType.Number) {
      this.consume();
      const value = Number(token.value);
      if (!Number.isFinite(value)) {
        this.errors.push({
          code: FormulaErrorCode.InvalidSyntax,
          message: `Invalid number '${token.value}'`,
          index: token.index,
        });
        return null;
      }
      return { kind: "number", value };
    }

    if (token.type === TokenType.Identifier) {
      this.consume();
      if (this.match(TokenType.LParen)) {
        const args: AstNode[] = [];
        if (!this.match(TokenType.RParen)) {
          do {
            const arg = this.parseExpression();
            if (!arg) return null;
            args.push(arg);
          } while (this.match(TokenType.Comma));
          if (!this.match(TokenType.RParen)) {
            this.errors.push({
              code: FormulaErrorCode.InvalidSyntax,
              message: "Expected closing parenthesis for function call",
              index: this.peek().index,
            });
            return null;
          }
        }
        return { kind: "call", name: token.value, args };
      }
      return { kind: "variable", name: token.value };
    }

    if (this.match(TokenType.LParen)) {
      const expr = this.parseExpression();
      if (!expr) return null;
      if (!this.match(TokenType.RParen)) {
        this.errors.push({
          code: FormulaErrorCode.InvalidSyntax,
          message: "Expected closing parenthesis",
          index: this.peek().index,
        });
        return null;
      }
      return expr;
    }

    this.errors.push({
      code: FormulaErrorCode.InvalidSyntax,
      message: `Unexpected token '${token.value || "EOF"}'`,
      index: token.index,
    });
    return null;
  }
}

export function parseExpression(source: string): ParseResult {
  const trimmed = source.trim();
  if (!trimmed) {
    return {
      success: false,
      errors: [
        {
          code: FormulaErrorCode.EmptyExpression,
          message: "Expression is empty",
        },
      ],
      tokens: [],
    };
  }

  const { tokens, errors } = tokenize(trimmed);
  if (errors.length > 0) {
    return { success: false, errors, tokens };
  }

  return new Parser(tokens).parse();
}
