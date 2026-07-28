import type {
  AuthResult,
  AuthSession,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/features/auth/types";

export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthResult<AuthSession>>;
  logout(): Promise<AuthResult<null>>;
  register(payload: RegisterPayload): Promise<AuthResult<{ email: string }>>;
  refreshSession(refreshToken: string): Promise<AuthResult<AuthSession>>;
  forgotPassword(
    payload: ForgotPasswordPayload,
  ): Promise<AuthResult<{ email: string }>>;
  resetPassword(payload: ResetPasswordPayload): Promise<AuthResult<null>>;
  verifyEmail(payload: VerifyEmailPayload): Promise<AuthResult<null>>;
  getSession(): Promise<AuthResult<AuthSession | null>>;
}
