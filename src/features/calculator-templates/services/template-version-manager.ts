/**
 * Template Version Manager — draft / publish / archive / clone / compare / rollback.
 * Orchestrates version snapshots on CalculatorTemplate.versions.
 */
import type { CalculatorTemplate } from "@/features/calculator-templates/types";
import type { TemplateService } from "@/features/calculator-templates/services/template-service";

export class TemplateVersionManager {
  constructor(private readonly service: TemplateService) {}

  list(template: CalculatorTemplate) {
    return [...template.versions].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  async clone(id: string, nextVersion: string) {
    return this.service.cloneVersion(id, nextVersion);
  }

  async rollback(id: string, version: string) {
    return this.service.rollback(id, version);
  }

  compare(template: CalculatorTemplate, versionA: string, versionB: string) {
    return this.service.compareVersions(template, versionA, versionB);
  }
}
