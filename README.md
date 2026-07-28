# AZPPS — AI-Powered Calculator Platform

Production-ready foundation for the AZPPS platform, built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Framer Motion, Lucide React
- **Validation:** Zod
- **Theming:** next-themes (light / dark / system)
- **Design System:** Tokens + shadcn/ui primitives (`/design-system`)
- **Quality:** ESLint, Prettier, TypeScript (strict)

## Prerequisites

- Node.js 20+
- npm 10+

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values. All public variables are validated at startup via Zod in `src/config/env.ts`.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Available Scripts

| Script              | Description                     |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start dev server with Turbopack |
| `npm run build`     | Create production build         |
| `npm start`         | Serve production build          |
| `npm run lint`      | Run ESLint                      |
| `npm run lint:fix`  | Fix ESLint issues               |
| `npm run format`    | Format code with Prettier       |
| `npm run typecheck` | Run TypeScript type checking    |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/             # Main route group + /design-system catalog
│   ├── layout.tsx          # Root layout, fonts, providers, metadata
│   ├── loading.tsx         # Root loading UI
│   ├── error.tsx           # Root error boundary
│   ├── global-error.tsx    # Global error fallback
│   ├── not-found.tsx       # 404 page
│   └── globals.css         # Tailwind v4 entry + token bridge
├── styles/                 # Design tokens, themes, base, utilities
├── design-system/          # Type-safe token maps
├── components/
│   ├── common/             # Shared UI (loading, error displays)
│   ├── layout/             # Navbar, footer, theme toggle, main layout
│   └── ui/                 # Design system primitives
├── config/                 # App configuration (env, metadata, fonts, site)
├── constants/              # App-wide constants
├── hooks/                  # Custom React hooks
├── lib/
│   ├── utils/              # Utility functions (cn, format, etc.)
│   └── validations/        # Shared Zod schemas
├── providers/              # React context providers
└── types/                  # Shared TypeScript types
```

## Architecture Notes

- **Clean separation:** Configuration, UI, utilities, and providers are isolated for scalability.
- **Absolute imports:** Use `@/` prefix (configured in `tsconfig.json`).
- **Environment safety:** Public env vars are validated with Zod before use.
- **Accessibility:** Skip link, semantic landmarks, ARIA labels, and focus management.
- **Performance:** Server Components by default; client components only where needed.

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Configuration lives in `components.json`.

## License

Private — All rights reserved.
