"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import { TemplateVersionManager } from "@/features/calculator-templates/services/template-version-manager";
import { templateService } from "@/features/calculator-templates/services";

const versionManager = new TemplateVersionManager(templateService);

export type TemplateVersionPanelProps = {
  template: CalculatorTemplate;
  onChanged: (template: CalculatorTemplate) => void;
};

export function TemplateVersionPanel({
  template,
  onChanged,
}: TemplateVersionPanelProps) {
  const versions = versionManager.list(template);
  const [nextVersion, setNextVersion] = React.useState(() => {
    const [major, minor, patch] = template.metadata.version
      .split(".")
      .map((part) => Number(part) || 0);
    return `${major}.${minor}.${(patch ?? 0) + 1}`;
  });
  const [compareA, setCompareA] = React.useState(
    versions[0]?.version ?? template.metadata.version,
  );
  const [compareB, setCompareB] = React.useState(
    versions[1]?.version ?? template.metadata.version,
  );
  const [compareNote, setCompareNote] = React.useState<string | null>(null);

  return (
    <section className="space-y-3 rounded-md border p-3">
      <h3 className="text-sm font-medium">Version manager</h3>
      <ul className="space-y-1 text-sm">
        {versions.map((version) => (
          <li
            key={`${version.version}-${version.createdAt}`}
            className="flex items-center justify-between gap-2"
          >
            <span>
              <span className="font-mono">{version.version}</span>{" "}
              <span className="text-muted-foreground capitalize">
                · {version.status}
              </span>
            </span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={async () => {
                const rolled = await versionManager.rollback(
                  template.metadata.id,
                  version.version,
                );
                if (rolled) onChanged(rolled);
              }}
            >
              Rollback
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-end gap-2">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs" htmlFor="next-ver">
            Clone version
          </label>
          <Input
            id="next-ver"
            value={nextVersion}
            onChange={(event) => setNextVersion(event.target.value)}
            className="h-8 w-28 font-mono text-xs"
          />
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={async () => {
            const cloned = await versionManager.clone(
              template.metadata.id,
              nextVersion,
            );
            if (cloned) onChanged(cloned);
          }}
        >
          Clone version
        </Button>
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <Input
          value={compareA}
          onChange={(event) => setCompareA(event.target.value)}
          className="h-8 w-24 font-mono text-xs"
          aria-label="Compare version A"
        />
        <span className="text-muted-foreground text-xs">vs</span>
        <Input
          value={compareB}
          onChange={(event) => setCompareB(event.target.value)}
          className="h-8 w-24 font-mono text-xs"
          aria-label="Compare version B"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            const result = versionManager.compare(template, compareA, compareB);
            setCompareNote(result.notes);
          }}
        >
          Compare
        </Button>
      </div>
      {compareNote ? (
        <p className="text-muted-foreground text-xs">{compareNote}</p>
      ) : null}
    </section>
  );
}
