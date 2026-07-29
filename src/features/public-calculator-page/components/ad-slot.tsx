import { AdPlacement } from "@/features/public-calculator-page/constants/enums";
import type { AdSlotConfig } from "@/features/public-calculator-page/types";
import { cn } from "@/lib/utils/index";

export type AdSlotProps = {
  slot: AdSlotConfig;
  className?: string;
};

/**
 * Mock advertisement placeholder — never loads a real ad network.
 * Placed away from primary calculator controls.
 */
export function AdSlot({ slot, className }: AdSlotProps) {
  if (!slot.enabled) return null;

  const sticky =
    slot.placement === AdPlacement.StickyMobile
      ? "lg:hidden sticky bottom-0 z-20"
      : undefined;

  return (
    <aside
      className={cn(
        "border-border/70 bg-muted/40 text-muted-foreground flex items-center justify-center rounded-md border border-dashed px-4 py-6 text-center text-xs",
        sticky,
        className,
      )}
      aria-label={`Advertisement placeholder: ${slot.label}`}
      data-ad-placement={slot.placement}
      role="complementary"
    >
      <div>
        <p className="font-medium tracking-wide uppercase">Ad placeholder</p>
        <p>
          {slot.label} · {slot.sizeHint}
        </p>
        <p className="mt-1">Mock only — AdSense not connected</p>
      </div>
    </aside>
  );
}

export function AdSlotsByPlacement(props: {
  slots: AdSlotConfig[];
  placement: AdPlacement;
  className?: string;
}) {
  return (
    <>
      {props.slots
        .filter((slot) => slot.enabled && slot.placement === props.placement)
        .map((slot) => (
          <AdSlot key={slot.id} slot={slot} className={props.className} />
        ))}
    </>
  );
}
