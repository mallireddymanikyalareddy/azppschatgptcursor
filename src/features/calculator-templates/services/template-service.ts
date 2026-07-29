import type { CalculatorBuilderDefinition } from "@/features/calculator-builder/types";
import {
  TemplateLifecycleStatus,
  type TemplateType,
} from "@/features/calculator-templates/constants/enums";
import type {
  CalculatorTemplate,
  TemplateExportPackage,
  TemplateLibraryFilters,
  TemplateLibraryPageResult,
  TemplateValidationReport,
} from "@/features/calculator-templates/types";
import { createDefaultTemplateFilters } from "@/features/calculator-templates/types";
import type { TemplateRepository } from "@/features/calculator-templates/repositories/mock-repository";
import { templateExporter } from "@/features/calculator-templates/services/template-exporter";
import { templateGenerator } from "@/features/calculator-templates/services/template-generator";
import { templateValidator } from "@/features/calculator-templates/services/template-validator";
import { FieldType } from "@/features/form-engine/constants/enums";
import { OutputFormat } from "@/features/calculation-engine/constants/enums";
import {
  ChartKind,
  RecommendationTone,
  ResultValueType,
} from "@/features/results-engine/constants/enums";
import { ValidationRuleType } from "@/features/form-engine/constants/enums";

function compareString(a: string, b: string, dir: "asc" | "desc"): number {
  const result = a.localeCompare(b);
  return dir === "asc" ? result : -result;
}

function compareNumber(a: number, b: number, dir: "asc" | "desc"): number {
  return dir === "asc" ? a - b : b - a;
}

/**
 * Application service for Template Library, Builder, Preview, Versioning.
 * Persistence is mock-only via TemplateRepository.
 */
export class TemplateService {
  constructor(private readonly repository: TemplateRepository) {}

  async query(
    filters: TemplateLibraryFilters = createDefaultTemplateFilters(),
    page = 1,
    pageSize = 12,
  ): Promise<TemplateLibraryPageResult> {
    const all = await this.repository.listAll();
    const searched = this.search(all, filters.search);
    const filtered = this.filter(searched, filters);
    const sorted = this.sort(filtered, filters);

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);

    const categoryMap = new Map<string, number>();
    const typeMap = new Map<TemplateType, number>();
    for (const item of all) {
      categoryMap.set(
        item.metadata.category,
        (categoryMap.get(item.metadata.category) ?? 0) + 1,
      );
      typeMap.set(
        item.metadata.templateType,
        (typeMap.get(item.metadata.templateType) ?? 0) + 1,
      );
    }

    const byUpdated = [...all].sort((a, b) =>
      b.metadata.updatedAt.localeCompare(a.metadata.updatedAt),
    );
    const byCreated = [...all].sort((a, b) =>
      b.metadata.createdAt.localeCompare(a.metadata.createdAt),
    );
    const byUsage = [...all].sort(
      (a, b) => b.metadata.usageCount - a.metadata.usageCount,
    );

    return {
      items,
      total,
      page: safePage,
      pageSize,
      totalPages,
      featured: all.filter((t) => t.metadata.featured).slice(0, 6),
      popular: byUsage.filter((t) => t.metadata.popular).slice(0, 6),
      newest: byCreated.slice(0, 6),
      recentlyUpdated: byUpdated.slice(0, 6),
      categories: [...categoryMap.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      types: [...typeMap.entries()]
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => a.type.localeCompare(b.type)),
    };
  }

  async getById(id: string): Promise<CalculatorTemplate | null> {
    return this.repository.getById(id);
  }

  validate(template: CalculatorTemplate): TemplateValidationReport {
    return templateValidator.validate(template);
  }

  generateBuilderDefinition(
    template: CalculatorTemplate,
  ): CalculatorBuilderDefinition {
    return templateGenerator.generate(template);
  }

  exportJson(template: CalculatorTemplate): TemplateExportPackage {
    return templateExporter.exportJson(template);
  }

  exportZip(template: CalculatorTemplate): TemplateExportPackage {
    return templateExporter.exportZipPackage(template);
  }

  importJson(raw: string): CalculatorTemplate {
    return templateExporter.parseImport(raw);
  }

  async create(template: CalculatorTemplate): Promise<CalculatorTemplate> {
    const now = new Date().toISOString();
    const next: CalculatorTemplate = {
      ...structuredClone(template),
      metadata: {
        ...template.metadata,
        id: template.metadata.id || `tpl_${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        status: TemplateLifecycleStatus.Draft,
      },
      versions: [
        {
          version: template.metadata.version || "0.1.0",
          status: TemplateLifecycleStatus.Draft,
          createdAt: now,
          notes: "Initial draft",
        },
      ],
    };
    return this.repository.save(next);
  }

  async update(template: CalculatorTemplate): Promise<CalculatorTemplate> {
    const next = structuredClone(template);
    next.metadata.updatedAt = new Date().toISOString();
    return this.repository.save(next);
  }

  async duplicate(id: string): Promise<CalculatorTemplate | null> {
    const source = await this.repository.getById(id);
    if (!source) return null;
    const now = new Date().toISOString();
    const copy: CalculatorTemplate = {
      ...structuredClone(source),
      metadata: {
        ...source.metadata,
        id: `${source.metadata.id}_copy_${Date.now()}`,
        name: `${source.metadata.name} (Copy)`,
        slug: `${source.metadata.slug}-copy`,
        status: TemplateLifecycleStatus.Draft,
        usageCount: 0,
        featured: false,
        popular: false,
        createdAt: now,
        updatedAt: now,
        version: "0.1.0",
      },
      versions: [
        {
          version: "0.1.0",
          status: TemplateLifecycleStatus.Draft,
          createdAt: now,
          notes: `Cloned from ${source.metadata.version}`,
        },
      ],
    };
    return this.repository.save(copy);
  }

  async archive(id: string): Promise<CalculatorTemplate | null> {
    const source = await this.repository.getById(id);
    if (!source) return null;
    source.metadata.status = TemplateLifecycleStatus.Archived;
    source.metadata.updatedAt = new Date().toISOString();
    source.versions.push({
      version: source.metadata.version,
      status: TemplateLifecycleStatus.Archived,
      createdAt: source.metadata.updatedAt,
      notes: "Archived",
    });
    return this.repository.save(source);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async publish(id: string): Promise<CalculatorTemplate | null> {
    const source = await this.repository.getById(id);
    if (!source) return null;
    source.metadata.status = TemplateLifecycleStatus.Published;
    source.metadata.updatedAt = new Date().toISOString();
    source.versions.push({
      version: source.metadata.version,
      status: TemplateLifecycleStatus.Published,
      createdAt: source.metadata.updatedAt,
      notes: "Published",
    });
    return this.repository.save(source);
  }

  async cloneVersion(
    id: string,
    nextVersion: string,
  ): Promise<CalculatorTemplate | null> {
    const source = await this.repository.getById(id);
    if (!source) return null;
    const now = new Date().toISOString();
    source.metadata.version = nextVersion;
    source.metadata.status = TemplateLifecycleStatus.Draft;
    source.metadata.updatedAt = now;
    source.versions.push({
      version: nextVersion,
      status: TemplateLifecycleStatus.Draft,
      createdAt: now,
      notes: "Cloned version",
    });
    return this.repository.save(source);
  }

  async rollback(
    id: string,
    version: string,
  ): Promise<CalculatorTemplate | null> {
    const source = await this.repository.getById(id);
    if (!source) return null;
    const snap = source.versions.find((v) => v.version === version);
    if (!snap) return null;
    const now = new Date().toISOString();
    source.metadata.version = snap.version;
    source.metadata.status = snap.status;
    source.metadata.updatedAt = now;
    source.versions.push({
      version: snap.version,
      status: snap.status,
      createdAt: now,
      notes: `Rolled back to ${version}`,
    });
    return this.repository.save(source);
  }

  compareVersions(
    template: CalculatorTemplate,
    versionA: string,
    versionB: string,
  ): {
    versionA: string;
    versionB: string;
    sameStatus: boolean;
    notes: string;
  } {
    const a = template.versions.find((v) => v.version === versionA);
    const b = template.versions.find((v) => v.version === versionB);
    return {
      versionA,
      versionB,
      sameStatus: a?.status === b?.status,
      notes: `Compared ${versionA} (${a?.status ?? "missing"}) vs ${versionB} (${b?.status ?? "missing"}). Full structural diff reserved for marketplace sprint.`,
    };
  }

  createBlankTemplate(): CalculatorTemplate {
    const now = new Date().toISOString();
    return {
      metadata: {
        id: `tpl_${Date.now()}`,
        name: "Untitled template",
        slug: "untitled-template",
        description: "",
        templateType: "custom",
        category: "Custom",
        difficulty: "beginner",
        version: "0.1.0",
        status: TemplateLifecycleStatus.Draft,
        tags: ["custom"],
        estimatedBuildMinutes: 15,
        usageCount: 0,
        createdBy: "Admin",
        createdAt: now,
        updatedAt: now,
        seoReady: false,
        contentReady: false,
      },
      inputs: {
        groups: [{ id: "grp_primary", title: "Primary inputs", order: 1 }],
        inputs: [
          {
            id: "in_value",
            label: "Value",
            name: "value",
            type: FieldType.Number,
            required: true,
            validation: [
              {
                type: ValidationRuleType.Required,
                message: "Value is required.",
              },
            ],
            defaultValue: 0,
            order: 1,
            groupId: "grp_primary",
          },
        ],
      },
      formulas: {
        groups: [{ id: "grp_core", title: "Core formulas", order: 1 }],
        formulas: [
          {
            id: "f_result",
            name: "Result",
            key: "result",
            expression: "value",
            variables: ["value"],
            dependencies: [],
            precision: 2,
            order: 1,
            groupId: "grp_core",
          },
        ],
      },
      results: {
        metrics: [
          {
            id: "m_result",
            key: "result",
            label: "Result",
            type: ResultValueType.Number,
            format: OutputFormat.Decimal,
            emphasize: true,
            order: 1,
          },
        ],
        breakdowns: [],
        recommendations: [
          {
            id: "rec_blank",
            title: "Customize this template",
            body: "Replace inputs, formulas, and content before publishing.",
            tone: RecommendationTone.Tip,
          },
        ],
      },
      charts: {
        charts: [
          {
            id: "chart_blank",
            title: "Result",
            kind: ChartKind.ProgressRing,
            seriesMappings: [{ id: "s1", name: "Result", dataKey: "result" }],
            order: 1,
          },
        ],
      },
      seo: {
        titleTemplate: "Untitled Calculator | {{brand}}",
        descriptionTemplate: "Describe this calculator for search engines.",
        keywordTemplate: ["calculator"],
        slugPattern: "untitled-template",
      },
      content: {
        introduction: "",
        howItWorks: "",
        formulaExplanation: "",
        benefits: [],
        tips: [],
        examples: [],
        faqs: [],
        relatedCalculators: [],
        relatedArticles: [],
        references: [],
        aiPromptPlaceholders: [],
      },
      validation: { rules: [] },
      versions: [
        {
          version: "0.1.0",
          status: TemplateLifecycleStatus.Draft,
          createdAt: now,
          notes: "Blank draft",
        },
      ],
    };
  }

  private search(
    items: CalculatorTemplate[],
    query: string,
  ): CalculatorTemplate[] {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const haystack = [
        item.metadata.name,
        item.metadata.slug,
        item.metadata.description,
        item.metadata.category,
        item.metadata.templateType,
        ...item.metadata.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  private filter(
    items: CalculatorTemplate[],
    filters: TemplateLibraryFilters,
  ): CalculatorTemplate[] {
    return items.filter((item) => {
      if (
        filters.templateType !== "all" &&
        item.metadata.templateType !== filters.templateType
      ) {
        return false;
      }
      if (
        filters.category !== "all" &&
        item.metadata.category !== filters.category
      ) {
        return false;
      }
      if (filters.status !== "all" && item.metadata.status !== filters.status) {
        return false;
      }
      if (
        filters.difficulty !== "all" &&
        item.metadata.difficulty !== filters.difficulty
      ) {
        return false;
      }
      if (filters.featuredOnly && !item.metadata.featured) return false;
      return true;
    });
  }

  private sort(
    items: CalculatorTemplate[],
    filters: TemplateLibraryFilters,
  ): CalculatorTemplate[] {
    const dir = filters.sortDirection;
    return [...items].sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return compareString(a.metadata.name, b.metadata.name, dir);
        case "usageCount":
          return compareNumber(
            a.metadata.usageCount,
            b.metadata.usageCount,
            dir,
          );
        case "createdAt":
          return compareString(a.metadata.createdAt, b.metadata.createdAt, dir);
        case "updatedAt":
        default:
          return compareString(a.metadata.updatedAt, b.metadata.updatedAt, dir);
      }
    });
  }
}
