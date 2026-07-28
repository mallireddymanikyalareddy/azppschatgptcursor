# AZPPS Design System

Enterprise design foundation for the AI-Powered Calculator Platform.

## Goals

- Single source of truth for visual language
- Type-safe token access in TypeScript
- CSS variables for runtime theming (light / dark / system)
- Accessible, responsive, reusable UI primitives
- Compatible with existing Sprint 1 architecture and shadcn/ui
- Premium enterprise SaaS identity (Stripe / Linear / Vercel inspired)

## Folder Structure

```
src/
├── design-system/
│   └── tokens/               # TypeScript token maps
├── styles/
│   ├── tokens/primitives.css # Scales (space, type, radius, shadow, motion)
│   ├── themes/               # Light + dark semantic colors
│   ├── base.css              # Element defaults + reduced motion
│   ├── utilities.css         # Shared utilities (container, brand-wash)
│   └── index.css
├── components/
│   ├── ui/                   # Primitives + hardened patterns
│   ├── layout/               # Navbar, Footer, ThemeToggle, MainLayout
│   └── common/               # PageHeader, status pages
└── app/(main)/design-system/ # Living catalog
```

## Naming Conventions

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Tokens: CSS `--token-name`, TS `tokenName` maps
- Prefer semantic names (`primary`, `muted-foreground`) over raw hues
- Aliases allowed for product language (`Modal` → `Dialog`, `Radio` → `RadioGroup`)

## Token Categories

| Category    | Examples                                                                                |
| ----------- | --------------------------------------------------------------------------------------- |
| Colors      | primary, secondary, accent, success, warning, error, info, neutral, surface, brand-wash |
| Typography  | display → code (fluid display/h1)                                                       |
| Spacing     | xs → 4xl                                                                                |
| Radius      | sm → full                                                                               |
| Shadows     | xs → xl                                                                                 |
| Motion      | fast/normal/slow + easing curves                                                        |
| Z-index     | dropdown → tooltip                                                                      |
| Breakpoints | mobile → largeDesktop                                                                   |
| Icons       | Lucide sizes xs → xl                                                                    |

## Theme Architecture

1. `next-themes` toggles `.dark` on `<html>` (`storageKey="azpps-theme"`).
2. Persistence uses localStorage via next-themes.
3. `suppressHydrationWarning` + mounted-safe theme toggle prevent flicker.
4. Semantic CSS variables swap in `styles/themes/light.css` and `dark.css`.
5. Tailwind v4 `@theme inline` maps CSS vars to utility classes.
6. Subtle `--brand-wash` gradient supports page headers only.

## Component Architecture

### Primitives

Button, Input, Select, Checkbox, Dialog, Sheet, Tabs, Table, Sidebar, etc.

### Hardened patterns

- `DataTable` — sorting, column visibility, pagination, loading, empty
- `SearchBox` — icon, clear, loading, Ctrl/⌘K hint
- `PresetEmptyState` — no-data / calculators / search / categories / activity
- `Alert` — success, error, warning, info, announcement
- `toast` helpers — success, error, warning, loading, promise
- `ChartPlaceholder` / `ChartGrid` — line, area, bar, pie, donut
- Loaders — Spinner, Progress, PageLoader, CardLoader, TableLoader

## Using Tokens

```ts
import { designTokens, iconSizeClasses } from "@/design-system";
import { toast } from "@/components/ui/toast";
```

Prefer semantic Tailwind classes (`bg-primary`, `text-muted-foreground`, `shadow-md`).

## Living Catalog

Visit `/design-system` for interactive examples.

## Sprint 2.2 Recommendations

1. React Hook Form + Zod field wrappers
2. Advanced DataTable (selection, filters, sticky headers)
3. Command palette (cmdk) wiring Ctrl/⌘K to a real palette
4. Chart library integration (Recharts/Visx) behind ChartPlaceholder API
5. Storybook / Chromatic visual regression
6. Token linting via Style Dictionary
