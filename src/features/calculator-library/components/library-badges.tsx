import { Badge } from "@/components/ui/badge";
import {
  LibraryBadgeKind,
  type LibraryBadgeKind as BadgeKind,
  type LibraryCalculator,
} from "@/features/calculator-library/types";

const LABEL: Record<BadgeKind, string> = {
  [LibraryBadgeKind.New]: "New",
  [LibraryBadgeKind.Popular]: "Popular",
  [LibraryBadgeKind.AiGenerated]: "AI Generated",
  [LibraryBadgeKind.Template]: "Template",
  [LibraryBadgeKind.Published]: "Published",
  [LibraryBadgeKind.Draft]: "Draft",
  [LibraryBadgeKind.Archived]: "Archived",
  [LibraryBadgeKind.Experimental]: "Experimental",
};

const VARIANT: Record<
  BadgeKind,
  "default" | "secondary" | "destructive" | "outline" | "ghost"
> = {
  [LibraryBadgeKind.New]: "default",
  [LibraryBadgeKind.Popular]: "secondary",
  [LibraryBadgeKind.AiGenerated]: "outline",
  [LibraryBadgeKind.Template]: "outline",
  [LibraryBadgeKind.Published]: "secondary",
  [LibraryBadgeKind.Draft]: "ghost",
  [LibraryBadgeKind.Archived]: "destructive",
  [LibraryBadgeKind.Experimental]: "outline",
};

export function LibraryBadges({
  calculator,
  limit = 4,
}: {
  calculator: LibraryCalculator;
  limit?: number;
}) {
  const badges = calculator.badges.slice(0, limit);
  if (badges.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((badge) => (
        <Badge key={badge} variant={VARIANT[badge]}>
          {LABEL[badge]}
        </Badge>
      ))}
    </div>
  );
}
