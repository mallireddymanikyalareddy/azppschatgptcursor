/**
 * Results & Visualisation Engine — configuration-driven presentation.
 * Does not modify form / formula / calculation engines.
 */

export * from "@/features/results-engine/constants";
export type * from "@/features/results-engine/types";
export * from "@/features/results-engine/lib";
export * from "@/features/results-engine/components";
export * from "@/features/results-engine/hooks";
export * from "@/features/results-engine/data";
export type {
  ExportPayload,
  ResultsExportService,
} from "@/features/results-engine/export/export-contracts";
export type { ExportFormat } from "@/features/results-engine/constants/enums";
