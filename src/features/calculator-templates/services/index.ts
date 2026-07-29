import { MOCK_CALCULATOR_TEMPLATES } from "@/features/calculator-templates/data/mock-templates";
import { MockTemplateRepository } from "@/features/calculator-templates/repositories/mock-repository";
import { TemplateService } from "@/features/calculator-templates/services/template-service";
import { templateExporter } from "@/features/calculator-templates/services/template-exporter";
import { templateGenerator } from "@/features/calculator-templates/services/template-generator";
import { templateValidator } from "@/features/calculator-templates/services/template-validator";

export { TemplateService } from "@/features/calculator-templates/services/template-service";
export {
  TemplateGenerator,
  templateGenerator,
} from "@/features/calculator-templates/services/template-generator";
export {
  TemplateValidator,
  templateValidator,
} from "@/features/calculator-templates/services/template-validator";
export {
  TemplateExporter,
  templateExporter,
} from "@/features/calculator-templates/services/template-exporter";
export { TemplateVersionManager } from "@/features/calculator-templates/services/template-version-manager";

export const mockTemplateRepository = new MockTemplateRepository(
  MOCK_CALCULATOR_TEMPLATES,
);

/** Default template service wired to the in-memory mock repository. */
export const templateService = new TemplateService(mockTemplateRepository);

export const templateServices = {
  service: templateService,
  repository: mockTemplateRepository,
  generator: templateGenerator,
  validator: templateValidator,
  exporter: templateExporter,
};
