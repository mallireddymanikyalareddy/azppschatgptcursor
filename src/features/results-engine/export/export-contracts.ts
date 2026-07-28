import type { ExportFormat } from "@/features/results-engine/constants/enums";
import type {
  ResultDataBag,
  ResultsViewDefinition,
} from "@/features/results-engine/types";

/**
 * Export contracts only — no PDF/Excel/CSV implementation.
 */
export type ExportPayload = {
  format: ExportFormat;
  view: ResultsViewDefinition;
  data: ResultDataBag;
  fileName?: string;
};

export interface ResultsExportService {
  prepare(payload: ExportPayload): Promise<{
    format: ExportFormat;
    ready: boolean;
    /** Opaque prepared document reference for a future exporter. */
    documentId?: string;
  }>;
  supports(format: ExportFormat): boolean;
}
