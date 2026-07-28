import type {
  Category,
  CategoryListFilter,
  DomainResult,
  EntityId,
  PageRequest,
  PageResult,
} from "@/features/calculators/types";

/**
 * Application service contract for Category taxonomy use-cases.
 */
export interface CategoryService {
  getById(id: EntityId): Promise<DomainResult<Category>>;
  getBySlug(slug: string): Promise<DomainResult<Category>>;
  list(
    filter?: CategoryListFilter,
    page?: PageRequest,
  ): Promise<DomainResult<PageResult<Category>>>;
  getTree(rootId?: EntityId): Promise<DomainResult<Category[]>>;
  getBreadcrumb(categoryId: EntityId): Promise<DomainResult<Category[]>>;
}
