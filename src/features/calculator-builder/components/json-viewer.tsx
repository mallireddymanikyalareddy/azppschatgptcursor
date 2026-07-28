"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { UseJSONGeneratorResult } from "@/features/calculator-builder/hooks/use-json-generator";

export type JSONViewerProps = {
  json: UseJSONGeneratorResult;
};

export function JSONViewer({ json }: JSONViewerProps) {
  const [copied, setCopied] = React.useState(false);
  const [prepared, setPrepared] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">JSON output</h2>
          <p className="text-muted-foreground text-sm">
            Complete calculator definition bundle for existing engines.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={json.pretty} onCheckedChange={json.setPretty} />
            <Label>Pretty JSON</Label>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              const ok = await json.copy();
              setCopied(ok);
              window.setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Copied" : "Copy JSON"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const request = json.prepareDownload();
              setPrepared(
                `Prepared: ${request.filename} (${request.content.length} chars)`,
              );
            }}
          >
            Download JSON (prepare)
          </Button>
        </div>
      </div>

      {prepared ? (
        <p className="text-muted-foreground text-xs">{prepared}</p>
      ) : null}

      <pre className="border-border bg-muted/30 max-h-[32rem] overflow-auto rounded-lg border p-4 font-mono text-xs leading-relaxed">
        {json.json}
      </pre>
    </div>
  );
}
