import type { CategoryType } from "@/features/calculators/constants/enums";
import type {
  EntityId,
  IsoDateTime,
} from "@/features/calculators/types/common";
import type { SeoMetadata } from "@/features/calculators/types/seo";

/**
 * Hierarchical category node.
 * Tree shape supports deep taxonomies for 10k+ calculators.
 * `children` is optional hydrated data — persistence typically stores parentId only.
 */
export type Category = {
  id: EntityId;
  slug: string;
  name: string;
  description?: string;
  type: CategoryType;
  parentId: EntityId | null;
  /** Hydrated children when loading a tree; omit on flat records. */
  children?: Category[];
  seo: SeoMetadata;
  /** Display order among siblings. */
  order: number;
  /** Optional icon key from the design-system icon catalog. */
  icon?: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
};

/** Lightweight category reference embedded on Calculator. */
export type CategoryRef = {
  id: EntityId;
  slug: string;
  name: string;
};
