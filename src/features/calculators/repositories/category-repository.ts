import type {
  Category,
  CategoryListFilter,
  DomainResult,
  EntityId,
  PageRequest,
  PageResult,
} from "@/features/calculators/types";

/**
 * Persistence contract for Category taxonomy nodes.
 */
export interface CategoryRepository {
  findById(id: EntityId): Promise<DomainResult<Category | null>>;
  findBySlug(slug: string): Promise<DomainResult<Category | null>>;
  list(
    filter?: CategoryListFilter,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<Category>>>;
  /** Returns a hydrated subtree rooted at `rootId` (or all roots when omitted). */
  getTree(rootId?: EntityId): Promise<DomainResult<Category[]>>;
  listChildren(parentId: EntityId | null): Promise<DomainResult<Category[]>>;
}
