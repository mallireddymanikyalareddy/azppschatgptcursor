import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ADMIN_PAGE_DEFINITIONS } from "@/features/admin/constants/navigation";
import { Construction } from "lucide-react";

type AdminPlaceholderPageProps = {
  href: string;
  /** Optional override when definition lookup is not used. */
  title?: string;
  description?: string;
  eyebrow?: string;
};

export function AdminPlaceholderPage({
  href,
  title,
  description,
  eyebrow,
}: AdminPlaceholderPageProps) {
  const definition = ADMIN_PAGE_DEFINITIONS.find((page) => page.href === href);

  const resolvedTitle = title ?? definition?.title ?? "Module";
  const resolvedDescription =
    description ??
    definition?.description ??
    "This module is a placeholder for future enterprise features.";
  const resolvedEyebrow = eyebrow ?? definition?.eyebrow ?? "Admin";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={resolvedEyebrow}
        title={resolvedTitle}
        description={resolvedDescription}
      />
      <EmptyState
        icon={Construction}
        title={`${resolvedTitle} coming soon`}
        description="This route is reserved in the admin shell. Business logic, calculators, and AI are intentionally not implemented yet."
      />
    </div>
  );
}
