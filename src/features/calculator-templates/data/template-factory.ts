import {
  FieldType,
  ValidationRuleType,
} from "@/features/form-engine/constants/enums";
import { OutputFormat } from "@/features/calculation-engine/constants/enums";
import {
  ChartKind,
  RecommendationTone,
  ResultValueType,
} from "@/features/results-engine/constants/enums";
import type {
  CalculatorTemplate,
  InputBlueprintItem,
  FormulaBlueprintItem,
  ResultBlueprintItem,
  ChartBlueprintItem,
  TemplateMetadata,
} from "@/features/calculator-templates/types";
import {
  TemplateLifecycleStatus,
  type TemplateDifficulty,
  type TemplateLifecycleStatus as LifecycleStatus,
  type TemplateType,
} from "@/features/calculator-templates/constants/enums";

export function daysAgo(days: number): string {
  const date = new Date("2026-07-28T12:00:00.000Z");
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

export function requiredRule(message: string) {
  return { type: ValidationRuleType.Required, message };
}

export function numberInput(
  partial: Omit<InputBlueprintItem, "type" | "validation" | "required"> & {
    required?: boolean;
    validation?: InputBlueprintItem["validation"];
    type?: FieldType;
  },
): InputBlueprintItem {
  return {
    type: partial.type ?? FieldType.Number,
    required: partial.required ?? true,
    validation: partial.validation ?? [
      requiredRule(`${partial.label} is required.`),
    ],
    ...partial,
  };
}

export function formula(partial: FormulaBlueprintItem): FormulaBlueprintItem {
  return partial;
}

export function metric(partial: ResultBlueprintItem): ResultBlueprintItem {
  return partial;
}

export function chart(partial: ChartBlueprintItem): ChartBlueprintItem {
  return partial;
}

type SeedMeta = Omit<TemplateMetadata, "seoReady" | "contentReady" | "tags"> & {
  tags?: string[];
  seoReady?: boolean;
  contentReady?: boolean;
};

export function buildTemplate(args: {
  meta: SeedMeta;
  inputs: InputBlueprintItem[];
  formulas: FormulaBlueprintItem[];
  metrics: ResultBlueprintItem[];
  charts?: ChartBlueprintItem[];
  titleToken: string;
  intro: string;
  formulaText: string;
}): CalculatorTemplate {
  const meta = args.meta;
  return {
    metadata: {
      ...meta,
      tags: meta.tags ?? [meta.templateType, meta.category.toLowerCase()],
      seoReady: meta.seoReady ?? true,
      contentReady: meta.contentReady ?? true,
    },
    inputs: {
      groups: [{ id: "grp_primary", title: "Primary inputs", order: 1 }],
      inputs: args.inputs.map((input, index) => ({
        ...input,
        groupId: input.groupId ?? "grp_primary",
        order: input.order || index + 1,
      })),
    },
    formulas: {
      groups: [{ id: "grp_core", title: "Core formulas", order: 1 }],
      formulas: args.formulas.map((item, index) => ({
        ...item,
        groupId: item.groupId ?? "grp_core",
        order: item.order || index + 1,
      })),
    },
    results: {
      metrics: args.metrics,
      breakdowns: [],
      recommendations: [
        {
          id: `rec_${meta.id}`,
          title: "Review assumptions",
          body: "Validate rates and tenure against your product terms.",
          tone: RecommendationTone.Tip,
        },
      ],
    },
    charts: {
      charts: args.charts ?? [
        chart({
          id: `chart_${meta.slug}`,
          title: "Result composition",
          kind: ChartKind.Donut,
          seriesMappings: [
            {
              id: "s1",
              name: "Primary",
              dataKey: args.metrics[0]?.key ?? "result",
            },
          ],
          order: 1,
        }),
      ],
    },
    seo: {
      titleTemplate: `${args.titleToken} Calculator | {{brand}}`,
      descriptionTemplate: `Free ${args.titleToken.toLowerCase()} calculator with instant results.`,
      keywordTemplate: [meta.slug, meta.category.toLowerCase(), "calculator"],
      slugPattern: meta.slug,
      canonicalPattern: `https://azpps.example/{{slug}}`,
      ogTitleTemplate: `${args.titleToken} Calculator`,
      schemaPlaceholder: {
        "@type": "WebApplication",
        name: `${args.titleToken} Calculator`,
      },
    },
    content: {
      introduction: args.intro,
      howItWorks:
        "Enter the required inputs and run the calculator to generate results.",
      formulaExplanation: args.formulaText,
      benefits: [
        "Fast configuration from a proven blueprint",
        "Consistent SEO and content scaffolding",
      ],
      tips: ["Double-check units before publishing."],
      examples: [
        {
          title: "Sample scenario",
          description: `Typical ${args.titleToken.toLowerCase()} inputs for a first draft.`,
        },
      ],
      faqs: [
        {
          id: `faq_${meta.id}`,
          question: `What is the ${args.titleToken} template for?`,
          answer: args.intro,
          order: 1,
        },
      ],
      relatedCalculators: [],
      relatedArticles: [],
      references: [],
      aiPromptPlaceholders: [
        `Generate FAQs for a ${args.titleToken.toLowerCase()} calculator`,
      ],
    },
    validation: {
      rules: args.inputs
        .filter((input) => input.required)
        .map((input) => ({
          id: `val_${input.id}`,
          name: `${input.label} required`,
          fieldName: input.name,
          rule: requiredRule(`${input.label} is required.`),
        })),
    },
    versions: [
      {
        version: meta.version,
        status: meta.status,
        createdAt: meta.updatedAt,
        notes: "Current published blueprint",
      },
    ],
  };
}

export function meta(args: {
  id: string;
  name: string;
  slug: string;
  description: string;
  templateType: TemplateType;
  category: string;
  subcategory?: string;
  difficulty: TemplateDifficulty;
  version?: string;
  status?: LifecycleStatus;
  estimatedBuildMinutes: number;
  usageCount: number;
  featured?: boolean;
  popular?: boolean;
  createdBy?: string;
  createdDaysAgo: number;
  updatedDaysAgo: number;
}): SeedMeta {
  return {
    id: args.id,
    name: args.name,
    slug: args.slug,
    description: args.description,
    templateType: args.templateType,
    category: args.category,
    subcategory: args.subcategory,
    difficulty: args.difficulty,
    version: args.version ?? "1.0.0",
    status: args.status ?? TemplateLifecycleStatus.Published,
    estimatedBuildMinutes: args.estimatedBuildMinutes,
    usageCount: args.usageCount,
    featured: args.featured,
    popular: args.popular,
    createdBy: args.createdBy ?? "Template Studio",
    createdAt: daysAgo(args.createdDaysAgo),
    updatedAt: daysAgo(args.updatedDaysAgo),
  };
}

export { FieldType, OutputFormat, ResultValueType, ChartKind };
