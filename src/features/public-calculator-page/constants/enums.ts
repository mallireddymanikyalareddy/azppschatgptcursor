/**
 * Public Calculator Page — catalogs and placement ids.
 */

export const AdPlacement = {
  TopBanner: "top_banner",
  InContent: "in_content",
  Sidebar: "sidebar",
  BetweenSections: "between_sections",
  FooterBanner: "footer_banner",
  StickyMobile: "sticky_mobile",
} as const;

export type AdPlacement = (typeof AdPlacement)[keyof typeof AdPlacement];

export const ContentBlockType = {
  Paragraph: "paragraph",
  Heading: "heading",
  Image: "image",
  List: "list",
  Callout: "callout",
  Quote: "quote",
  InternalLink: "internal_link",
} as const;

export type ContentBlockType =
  (typeof ContentBlockType)[keyof typeof ContentBlockType];

export const InterpretationBand = {
  Low: "low",
  Normal: "normal",
  High: "high",
  Excellent: "excellent",
  Poor: "poor",
} as const;

export type InterpretationBand =
  (typeof InterpretationBand)[keyof typeof InterpretationBand];

export const FeedbackSentiment = {
  Like: "like",
  Dislike: "dislike",
} as const;

export type FeedbackSentiment =
  (typeof FeedbackSentiment)[keyof typeof FeedbackSentiment];

export const PUBLIC_CALCULATOR_BASE_PATH = "/calculators" as const;
