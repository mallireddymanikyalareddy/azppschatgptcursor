import type { AuthService } from "@/features/auth/services/auth-service";
import { mockAuthService } from "@/features/auth/services/mock-auth-service";

/**
 * Swap this export when integrating a real provider (Clerk, Auth0, custom API).
 */
export const authService: AuthService = mockAuthService;

export type { AuthService } from "@/features/auth/services/auth-service";
export { mockAuthService } from "@/features/auth/services/mock-auth-service";
