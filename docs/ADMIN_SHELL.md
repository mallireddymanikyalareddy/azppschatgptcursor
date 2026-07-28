# Admin Shell & Role Management Foundation

Enterprise application chrome for AZPPS. Mock RBAC only — no database, APIs, calculator engine, or AI.

## Folder structure

```
src/features/rbac/
├── components/          # CanAccess gate
├── constants/           # Role + permission catalogs
├── context/             # RbacProvider / hooks
├── data/                # Mock role→permission matrix
├── lib/                 # Permission engine + auth role mapping
├── types/
└── index.ts

src/features/admin/
├── components/          # Shell, sidebar, header, search, …
├── constants/           # Routes + navigation config
├── data/                # Dashboard / notifications / search mocks
├── lib/                 # Nav active state + breadcrumbs
└── index.ts

src/app/(admin)/
├── layout.tsx           # Wraps AdminShell
└── admin/               # Dashboard + module placeholders
```

## Navigation structure

Grouped sidebar (permission-filtered):

1. **Overview** — Dashboard
2. **Calculator Management** — Calculators, Categories, Formula Library
3. **AI Factory** — Generator, Queue, History (placeholders)
4. **Content** — Articles, FAQs, Images
5. **SEO** — Metadata, Schema, Sitemap
6. **Marketing** — Campaigns, Social Posts
7. **Analytics** — Dashboard, Reports
8. **Administration** — Users, Roles, Permissions, Audit Logs
9. **System** — Settings, Integrations, Profile

Header: global search (⌘K), quick actions, theme toggle, notifications, user menu, breadcrumbs.

## Role architecture

Platform roles (extensible via `PLATFORM_ROLES`):

| Role        | Level | Intent                   |
| ----------- | ----- | ------------------------ |
| Super Admin | 100   | Full control             |
| Admin       | 80    | Ops + users              |
| Editor      | 60    | Publish & manage content |
| Author      | 40    | Draft & edit             |
| Viewer      | 20    | Read-only                |

Auth provider roles map through `mapAuthRolesToPlatform()` — future roles add mapping rules without rewriting consumers.

## Permission architecture

Canonical IDs such as `calculator.create`, `users.manage`, `roles.manage`.

Supports:

- Role-based grants (`ROLE_PERMISSIONS` matrix)
- Feature / page / navigation / action checks via `can()` / `CanAccess`
- Navigation filtering by permission
- Button/action gating with `<CanAccess permission="…">`

Mock only — swap the matrix or provider adapter later.

## Demo access

1. Sign in: `demo@azpps.com` / `Password1!`
2. Open `/admin` (also linked from marketing nav)
3. Demo user maps to platform **Admin** (+ editor/viewer via auth roles)

## Extension points

- Add a role → `constants/roles.ts` + grants in `data/role-permissions.ts`
- Add a permission → `constants/permissions.ts` + grants
- Add a nav item → `constants/navigation.ts` + thin `app/(admin)/admin/.../page.tsx`
- Replace mocks with services under `src/services/` without changing shell UI
- Bind real IdP roles by extending `mapAuthRolesToPlatform`
