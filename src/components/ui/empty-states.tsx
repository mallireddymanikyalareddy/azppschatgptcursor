import type { LucideIcon } from "lucide-react";
import { Activity, Calculator, FolderOpen, Inbox, SearchX } from "lucide-react";

import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state";

const presets = {
  "no-data": {
    title: "No data",
    description: "There is nothing to show here yet.",
    icon: Inbox,
  },
  "no-calculators": {
    title: "No calculators",
    description: "Create your first calculator to get started.",
    icon: Calculator,
  },
  "no-search-results": {
    title: "No search results",
    description: "Try a different keyword or clear your filters.",
    icon: SearchX,
  },
  "no-categories": {
    title: "No categories",
    description: "Organize items by creating a category.",
    icon: FolderOpen,
  },
  "no-activity": {
    title: "No activity",
    description: "Recent activity will appear here once available.",
    icon: Activity,
  },
} as const;

export type EmptyStatePreset = keyof typeof presets;

export type PresetEmptyStateProps = Omit<
  EmptyStateProps,
  "title" | "description" | "icon"
> & {
  preset: EmptyStatePreset;
  title?: string;
  description?: string;
  icon?: LucideIcon;
};

export function PresetEmptyState({
  preset,
  title,
  description,
  icon,
  ...props
}: PresetEmptyStateProps) {
  const config = presets[preset];

  return (
    <EmptyState
      title={title ?? config.title}
      description={description ?? config.description}
      icon={icon ?? config.icon}
      {...props}
    />
  );
}

export { EmptyState };
export type { EmptyStateProps };
