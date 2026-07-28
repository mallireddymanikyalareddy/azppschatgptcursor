import { describe, expect, it } from "vitest";

import { tokenize } from "@/features/formula-engine/tokenizer/tokenize";
import { parseExpression } from "@/features/formula-engine/parser/parse";
import { TokenType } from "@/features/formula-engine/constants/enums";

describe("tokenize", () => {
  it("tokenizes numbers, identifiers, and operators", () => {
    const { tokens, errors } = tokenize("P * R + (1 + R)^N");
    expect(errors).toHaveLength(0);
    expect(tokens.map((t) => t.type)).toContain(TokenType.Identifier);
    expect(tokens.map((t) => t.value)).toContain("^");
  });

  it("rejects unexpected characters", () => {
    const { errors } = tokenize("P $ R");
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe("parser", () => {
  it("parses EMI-like expression", () => {
    const result = parseExpression("P * r * (1 + r)^n / ((1 + r)^n - 1)");
    expect(result.success).toBe(true);
  });

  it("parses function calls", () => {
    const result = parseExpression("round(sqrt(abs(-4)))");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.ast.kind).toBe("call");
    }
  });

  it("fails on empty expression", () => {
    const result = parseExpression("   ");
    expect(result.success).toBe(false);
  });

  it("fails on mismatched parentheses", () => {
    const result = parseExpression("(1 + 2");
    expect(result.success).toBe(false);
  });
});
