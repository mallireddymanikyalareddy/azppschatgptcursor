# Authentication Foundation

Enterprise authentication layer for AZPPS. Mock-backed only — no real identity provider or database.

## Folder structure

```
src/features/auth/
├── components/     # Layout + forms
├── constants/      # Routes, errors, security policy
├── context/        # AuthProvider / session state
├── guards/         # ProtectedRoute / GuestRoute
├── hooks/          # useAuth / useAuthGuard
├── lib/            # Route access helpers
├── services/       # AuthService interface + mock
├── types/          # Domain types
└── validation/     # Zod schemas

src/app/(auth)/     # Auth pages (login, register, …)
src/middleware.ts   # Route guard foundation
```

## Architecture

1. **UI** uses existing design-system primitives (Button, Input, Alert, Spinner).
2. **Forms** use React Hook Form + Zod with real-time validation.
3. **AuthProvider** owns session state and persists a mock session cookie/localStorage signal.
4. **authService** interface isolates provider details; `mockAuthService` is the current adapter.
5. **Middleware** redirects guest/protected routes using the mock session cookie.
6. **Guards** provide client-side route protection for interactive flows.

## Security considerations (prepared)

- CSRF cookie bootstrap in middleware
- Rate-limit config + mock attempt buckets
- Secure cookie policy placeholders (`httpOnly`, `secure`, `sameSite`)
- Access/refresh token TTL + idle/absolute timeout config
- Password complexity policy
- Remember-me TTL config
- Token refresh skew config

## Future integration points

Replace `authService` export in `services/index.ts` with adapters for:

- Custom backend JWT/session API
- Clerk / Auth0 / Cognito (when approved)
- Organization/role claims for Calculator, AI Factory, Content, SEO, Analytics, Admin

## Demo credentials (mock)

- `demo@azpps.com` / `Password1!` — success
- `unverified@azpps.com` / `Password1!` — email not verified
- `network@error.com` — network error
- `server@error.com` — server error
