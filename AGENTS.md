# Repository Guidelines

## Project Structure & Module Organization
- `src/`: App source (React + TypeScript).
  - `components/common/`: shared UI (e.g., `Header.tsx`, `Footer.tsx`).
  - `components/sections/`: page sections (Hero, Services, etc.).
  - `pages/`: route-level components (e.g., `HomePage.tsx`).
  - `hooks/`: reusable hooks (e.g., `useScrollAnimation.ts`).
  - `utils/`: helpers and constants.
  - `styles/`: global styles (`globals.css`).
- `public/`: static assets served as-is.
- `dist/`: production build output (do not edit).
- Config: `tsconfig.json`, `tailwind.config.js`, `.eslintrc.cjs`, `vite.config.ts`.

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server with HMR.
- `npm run build`: Type-check (`tsc`) and build to `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint (TypeScript rules enforced).
- `npm run lint:fix`: Auto-fix lint issues where possible.

## Coding Style & Naming Conventions
- TypeScript: strict mode enabled; prefer explicit types for exports.
- Components: PascalCase files (`AboutPage.tsx`, `Hero.tsx`).
- Hooks: camelCase prefixed with `use` (e.g., `useForm.ts`).
- Utilities: camelCase (`helpers.ts`), constants in `constants.ts`.
- Imports: use path aliases (e.g., `@/components/common/Header`).
- Linting: ESLint with `@typescript-eslint`; no `var`, prefer `const`, no unused vars (prefix `_` to ignore).
- Styles: Tailwind CSS utility-first; extend theme in `tailwind.config.js`.

## Testing Guidelines
- Currently no test runner configured. If adding tests, prefer Vitest + React Testing Library.
- Suggested layout: `src/__tests__/**/*.test.tsx` and colocated tests near components.
- Quality gates (until tests exist): PRs must pass `npm run lint` and build.

## Commit & Pull Request Guidelines
- Commits: Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- PRs: small, focused; include a clear description, linked issue, and UI screenshots/GIFs for visual changes.
- Before opening PR: run `npm run lint` and `npm run build`; update docs if behavior or APIs change.

## Security & Configuration
- Environment: copy `.env.example` to `.env.local`; only variables prefixed with `VITE_` are exposed to the client.
- Secrets: never commit real keys; keep API keys out of the repo.
- Assets: place app assets in `src/assets/` or `public/`; never edit `dist/` by hand.

