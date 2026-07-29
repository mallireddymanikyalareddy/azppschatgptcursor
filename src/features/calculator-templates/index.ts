/**
 * Calculator Template System — reusable blueprints for rapid calculator creation.
 *
 * Architecture:
 * Template → Metadata → Input / Formula / Result / Chart / SEO / Content /
 * Validation blueprints → Generated Calculator (CalculatorBuilderDefinition)
 *
 * Mock repository today. Marketplace / DB can implement TemplateRepository.
 */

export type * from "@/features/calculator-templates/types";
export * from "@/features/calculator-templates/constants";
export { MOCK_CALCULATOR_TEMPLATES } from "@/features/calculator-templates/data/mock-templates";
export { MockTemplateRepository } from "@/features/calculator-templates/repositories/mock-repository";
export {
  templateService,
  mockTemplateRepository,
  templateServices,
  TemplateService,
  TemplateGenerator,
  TemplateValidator,
  TemplateExporter,
  templateGenerator,
  templateValidator,
  templateExporter,
} from "@/features/calculator-templates/services";
export { TemplateVersionManager } from "@/features/calculator-templates/services/template-version-manager";
export * from "@/features/calculator-templates/hooks";
export { TemplateLibraryPage } from "@/features/calculator-templates/components/template-library-page";
export {
  toTemplateCard,
  reorderWithOrder,
} from "@/features/calculator-templates/lib/template-card";
