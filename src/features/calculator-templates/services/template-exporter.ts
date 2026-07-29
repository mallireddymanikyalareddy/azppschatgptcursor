import type {
  CalculatorTemplate,
  TemplateExportPackage,
} from "@/features/calculator-templates/types";

/**
 * Export templates as JSON (and ZIP architecture stub for marketplace).
 */
export class TemplateExporter {
  exportJson(template: CalculatorTemplate): TemplateExportPackage {
    const filename = `${template.metadata.slug}-template-v${template.metadata.version}.json`;
    return {
      format: "json",
      filename,
      mimeType: "application/json",
      content: JSON.stringify(
        {
          schema: "azpps.template.v1",
          marketplaceCompatible: true,
          exportedAt: new Date().toISOString(),
          template,
        },
        null,
        2,
      ),
      zipPrepared: false,
    };
  }

  /**
   * Architecture-only ZIP package — payload remains JSON until a ZIP lib is wired.
   * Marketplace can later wrap this content in a .zip with assets/manifest.
   */
  exportZipPackage(template: CalculatorTemplate): TemplateExportPackage {
    const json = this.exportJson(template);
    return {
      format: "zip",
      filename: `${template.metadata.slug}-template-v${template.metadata.version}.zip`,
      mimeType: "application/zip",
      content: json.content,
      zipPrepared: true,
    };
  }

  parseImport(raw: string): CalculatorTemplate {
    const parsed = JSON.parse(raw) as
      CalculatorTemplate | { template: CalculatorTemplate };
    if ("template" in parsed && parsed.template?.metadata) {
      return parsed.template;
    }
    if ("metadata" in parsed && parsed.metadata) {
      return parsed as CalculatorTemplate;
    }
    throw new Error("Invalid template import payload.");
  }
}

export const templateExporter = new TemplateExporter();
