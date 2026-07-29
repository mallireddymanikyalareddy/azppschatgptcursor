import { homepageRepository } from "@/features/homepage/repositories/homepage-repository";
import type {
  HomepageCalculatorCard,
  HomepageCategory,
  HomepagePayload,
} from "@/features/homepage/types";

export class HomepageService {
  getHomepage(): HomepagePayload {
    return homepageRepository.getHomepage();
  }
}

export class CategoryService {
  list(): HomepageCategory[] {
    return homepageRepository.listCategories();
  }

  getBySlug(slug: string): HomepageCategory | null {
    return this.list().find((item) => item.slug === slug) ?? null;
  }
}

export class CalculatorDiscoveryService {
  featured(): HomepageCalculatorCard[] {
    return homepageRepository.getHomepage().featuredCalculators;
  }

  trending(): HomepageCalculatorCard[] {
    return homepageRepository.getHomepage().trendingCalculators;
  }

  recentlyAdded(): HomepageCalculatorCard[] {
    return homepageRepository.getHomepage().recentlyAdded;
  }

  mostUsed(): HomepageCalculatorCard[] {
    return homepageRepository.getHomepage().mostUsedCalculators;
  }

  editorsPicks(): HomepageCalculatorCard[] {
    return homepageRepository.getHomepage().editorsPicks;
  }

  search(query: string): HomepageCalculatorCard[] {
    return homepageRepository.searchCalculators(query);
  }
}

export class ContentService {
  articles() {
    return homepageRepository.getHomepage().articles;
  }

  testimonials() {
    return homepageRepository.getHomepage().testimonials;
  }

  collections() {
    return homepageRepository.getHomepage().collections;
  }
}

export class AdvertisementService {
  homepageSlot() {
    return homepageRepository.getHomepage().ad;
  }
}

export const homepageService = new HomepageService();
export const categoryService = new CategoryService();
export const calculatorDiscoveryService = new CalculatorDiscoveryService();
export const contentService = new ContentService();
export const advertisementService = new AdvertisementService();
