# AZPPS Design System

Enterprise design foundation for the AI-Powered Calculator Platform.

## Goals

- Single source of truth for visual language
- Type-safe token access in TypeScript
- CSS variables for runtime theming (light / dark / system)
- Accessible, responsive, reusable UI primitives
- Compatible with existing Sprint 1 architecture and shadcn/ui

## Folder Structure

```
src/
├── design-system/
│   └── tokens/          # TypeScript token maps + docs
├── styles/
│   ├── tokens/          # Primitive CSS scales
│   ├── themes/          # Light + dark semantic themes
│   ├── base.css         # Global element defaults + a11y
│   ├── utilities.css    # Shared utilities
│   └── index.css
├── components/
│   ├── ui/              # Primitives (Button, Input, Dialog, …)
│   ├── layout/          # Navbar, Footer, MainLayout
│   └── common/          # Shared status patterns
└── app/(main)/design-system/  # Living examples catalog
```

## Token Categories

| Category    | Examples                                                                    |
| ----------- | --------------------------------------------------------------------------- |
| Colors      | primary, secondary, accent, success, warning, error, info, neutral, surface |
| Typography  | display → code roles                                                        |
| Spacing     | xs → 4xl                                                                    |
| Radius      | sm → full                                                                   |
| Shadows     | xs → xl (soft)                                                              |
| Motion      | fast / normal / slow + easing curves                                        |
| Z-index     | dropdown → tooltip                                                          |
| Breakpoints | mobile → largeDesktop                                                       |
| Icons       | Lucide size scale xs → xl                                                   |

## Theme Architecture

1. `next-themes` toggles `.dark` on `<html>` (`attribute="class"`).
2. Persistence uses `storageKey="azpps-theme"`.
3. `suppressHydrationWarning` + mounted-safe theme toggle prevent flicker/mismatch.
4. Semantic CSS variables swap in `styles/themes/light.css` and `dark.css`.
5. Tailwind v4 `@theme inline` maps CSS vars to utility classes.

## Using Tokens

```ts
import { designTokens, iconSizeClasses } from "@/design-system";
```

Prefer semantic Tailwind classes (`bg-primary`, `text-muted-foreground`, `shadow-md`) over hard-coded values.

## Living Catalog

Visit `/design-system` for interactive examples of every component.

## Sprint 2.2 Recommendations

1. Add Form + Field wrappers with React Hook Form + Zod.
2. Add DataTable with sorting/filtering built on Table.
3. Add Command palette (cmdk) for calculator search.
4. Add Chart library integration replacing ChartPlaceholder.
5. Add Storybook or Chromatic for visual regression.
6. Formalize token linting (Style Dictionary or custom ESLint rules).
