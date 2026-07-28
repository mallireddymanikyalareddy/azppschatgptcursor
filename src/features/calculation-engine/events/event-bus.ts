import type {
  CalculationEvent,
  CalculationEventListener,
} from "@/features/calculation-engine/types";
import type { CalculationEventType } from "@/features/calculation-engine/constants/enums";

/**
 * Lightweight in-process event bus for calculation lifecycle hooks.
 * Async listeners are awaited in registration order.
 */
export class CalculationEventBus {
  private readonly listeners = new Map<
    CalculationEventType,
    Set<CalculationEventListener>
  >();

  on(
    type: CalculationEventType,
    listener: CalculationEventListener,
  ): () => void {
    const set = this.listeners.get(type) ?? new Set();
    set.add(listener);
    this.listeners.set(type, set);
    return () => set.delete(listener);
  }

  async emit(event: CalculationEvent): Promise<void> {
    const set = this.listeners.get(event.type);
    if (!set) return;
    for (const listener of set) {
      await listener(event);
    }
  }
}

export const calculationEventBus = new CalculationEventBus();
