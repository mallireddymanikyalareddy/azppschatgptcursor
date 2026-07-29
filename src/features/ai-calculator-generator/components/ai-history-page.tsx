"use client";

import { PageHeader } from "@/components/common/page-header";
import { HistoryPanel } from "@/features/ai-calculator-generator/components/history-panel";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTES } from "@/features/admin/constants/routes";

/**
 * Dedicated AI History page — opens generator with selected generation via query.
 */
export function AIHistoryPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI Factory"
        title="AI Generation History"
        description="Mock history of AI calculator generations. Open an item to continue review in the Generator."
      />
      <HistoryPanel
        onOpen={(id) => {
          router.push(`${ADMIN_ROUTES.aiFactory}?generation=${id}`);
        }}
      />
    </div>
  );
}
