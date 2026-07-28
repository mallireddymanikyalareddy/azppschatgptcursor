"use client";

import * as React from "react";

import {
  generateCalculatorDefinitionBundle,
  stringifyDefinitionBundle,
} from "@/features/calculator-builder/lib/generate-json";
import { downloadService } from "@/features/calculator-builder/services/download-service";
import type {
  CalculatorBuilderDefinition,
  CalculatorDefinitionBundle,
} from "@/features/calculator-builder/types";
import type { DownloadRequest } from "@/features/calculator-builder/services/download-service";

export type UseJSONGeneratorResult = {
  bundle: CalculatorDefinitionBundle;
  json: string;
  pretty: boolean;
  setPretty: (pretty: boolean) => void;
  copy: () => Promise<boolean>;
  /** Prepares a download request — does not trigger a browser download. */
  prepareDownload: () => DownloadRequest;
};

/**
 * Generates pretty/minified JSON and copy / download-prepare helpers.
 */
export function useJSONGenerator(
  definition: CalculatorBuilderDefinition,
): UseJSONGeneratorResult {
  const [pretty, setPretty] = React.useState(true);

  const bundle = React.useMemo(
    () => generateCalculatorDefinitionBundle(definition),
    [definition],
  );

  const json = React.useMemo(
    () => stringifyDefinitionBundle(bundle, pretty),
    [bundle, pretty],
  );

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(json);
      return true;
    } catch {
      return false;
    }
  }, [json]);

  const prepareDownload = React.useCallback(() => {
    const slug = definition.metadata.slug || definition.metadata.id;
    return downloadService.prepare({
      filename: `${slug}-definition.json`,
      mimeType: "application/json",
      content: json,
    });
  }, [definition.metadata.id, definition.metadata.slug, json]);

  return { bundle, json, pretty, setPretty, copy, prepareDownload };
}
