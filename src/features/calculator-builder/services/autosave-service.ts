import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";

/**
 * Autosave service contract — prepare only, no persistence implementation.
 */
export type AutosavePayload = {
  definitionId: string;
  definition: CalculatorBuilderDefinition;
  savedAt: string;
};

export interface AutosaveService {
  /** Schedule an autosave of the current definition. */
  schedule(definition: CalculatorBuilderDefinition): void;
  /** Flush any pending autosave immediately. */
  flush(): Promise<AutosavePayload | null>;
  /** Cancel a pending autosave. */
  cancel(): void;
  /** Whether an autosave is currently pending. */
  isPending(): boolean;
}

/**
 * No-op autosave stub used until a real storage backend is wired.
 */
export class NoopAutosaveService implements AutosaveService {
  schedule(_definition: CalculatorBuilderDefinition): void {
    // Intentional no-op — persistence deferred.
  }

  async flush(): Promise<AutosavePayload | null> {
    return null;
  }

  cancel(): void {
    // Intentional no-op.
  }

  isPending(): boolean {
    return false;
  }
}

export const autosaveService: AutosaveService = new NoopAutosaveService();
