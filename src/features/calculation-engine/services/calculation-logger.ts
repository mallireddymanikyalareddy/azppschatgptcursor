import type {
  CalculationIssue,
  CalculationRequest,
  CalculationResponse,
} from "@/features/calculation-engine/types";

export type LogLevel = "debug" | "info" | "warn" | "error";

export type CalculationLogEntry = {
  level: LogLevel;
  message: string;
  requestId?: string;
  calculatorId?: string;
  errors?: CalculationIssue[];
  durationMs?: number;
  timestamp: number;
};

/**
 * Structured logger for calculation workflows.
 * Swap sink later (console → telemetry).
 */
export class CalculationLogger {
  constructor(
    private readonly sink: (entry: CalculationLogEntry) => void = defaultSink,
  ) {}

  info(message: string, extra?: Partial<CalculationLogEntry>): void {
    this.write("info", message, extra);
  }

  warn(message: string, extra?: Partial<CalculationLogEntry>): void {
    this.write("warn", message, extra);
  }

  error(message: string, extra?: Partial<CalculationLogEntry>): void {
    this.write("error", message, extra);
  }

  debug(message: string, extra?: Partial<CalculationLogEntry>): void {
    this.write("debug", message, extra);
  }

  logRequest(request: CalculationRequest): void {
    this.info("calculation_started", {
      requestId: request.context?.requestId,
      calculatorId: request.calculator.id,
    });
  }

  logResponse(response: CalculationResponse): void {
    // Domain failures (validation / formula) are warnings — console.error
    // surfaces as Next.js "Console Error" overlays with opaque `{}` payloads.
    const level = response.success ? "info" : "warn";
    this.write(
      level,
      response.success ? "calculation_complete" : "calculation_failed",
      {
        requestId: response.metadata.requestId,
        calculatorId: response.metadata.calculatorId,
        durationMs: response.durationMs,
        errors: response.errors,
      },
    );
  }

  private write(
    level: LogLevel,
    message: string,
    extra?: Partial<CalculationLogEntry>,
  ): void {
    this.sink({
      level,
      message,
      timestamp: Date.now(),
      ...extra,
    });
  }
}

function defaultSink(entry: CalculationLogEntry): void {
  if (process.env.NODE_ENV === "test") return;
  // Flatten to a string so Next.js / Turbopack overlays show real detail
  // instead of `[calculation-engine] {}`.
  const detail = [
    entry.message,
    entry.calculatorId ? `calculator=${entry.calculatorId}` : null,
    entry.requestId ? `request=${entry.requestId}` : null,
    entry.durationMs != null ? `durationMs=${entry.durationMs}` : null,
    entry.errors?.length
      ? `errors=${entry.errors.map((e) => e.message).join("; ")}`
      : null,
  ]
    .filter(Boolean)
    .join(" | ");

  if (entry.level === "error") {
    console.error(`[calculation-engine] ${detail}`);
  } else if (entry.level === "warn") {
    console.warn(`[calculation-engine] ${detail}`);
  } else if (entry.level === "debug") {
    console.debug(`[calculation-engine] ${detail}`);
  } else {
    console.info(`[calculation-engine] ${detail}`);
  }
}

export const calculationLogger = new CalculationLogger();
