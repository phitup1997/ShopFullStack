# GitHub Copilot Instructions for Client App (`ShopFullStack/client`)

## 1. Quick Commands & Scripts

- **Dev**: `npm run dev`
- **Build**: `npm run build` (`tsc -b && vite build`)
- **Lint & Format**: `npm run lint` / `npm run format`
- **Type Check**: `npm run type-check` (`tsc -b --noEmit`)
- **Test**: `npm run test` (Vitest)

## 2. Tech Stack Core

- **Framework**: React 18+ / 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **State Management**: Zustand v5
- **Data Fetching / HTTP**: Axios
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons & Notifications**: `react-icons`, `react-toastify`
- **Testing**: Vitest + React Testing Library

## 3. Architecture & Directory Guidelines (`client/src`)

### Feature-Based Modules (`src/features/`)

`src/features/` is dedicated to self-contained, domain-specific modules (e.g., `features/sidebar`, `features/auth`). Each feature folder encapsulates everything it needs:

- **UI Components & Layout**: Presentational and interactive elements (e.g., `LoginForm.tsx`, `Sidebar.tsx`).
- **Feature Logic**: Form validation, custom hooks, helper logic.
- **Feature Store**: Local Zustand state dedicated strictly to this feature MUST reside inside `src/features/{feature_name}/` (e.g., `features/sidebar/sidebarStore.ts`).

### Global Stores (`src/stores/`)

- `src/stores/` is RESERVED ONLY for truly global, app-wide state shared across multiple unrelated features (e.g., global user session, theme, application settings).

### Other Core Directories

- `src/apis/`: Axios instances and raw API request definitions (e.g., `api-client.ts`, `product.ts`).
- `src/app/`: App-level routing and context providers (`routes/`, `provider.tsx`, `router.tsx`).
- `src/components/`: Purely presentational, reusable UI primitives without domain logic (e.g., generic `Button`, `Input`, `Modal`).
- `src/config/`: App configurations and route path constants (`paths.ts`).
- `src/types/`: Centralized TypeScript interfaces and types.
- `src/utils/`: Generic helper functions, global constants, and icon mappings.

## 4. Coding Standards & Rules

### TypeScript

- Strict mode enabled. NEVER use `any`. Explicitly type all props, handlers, and stores.
- Prefer `interface` for component props/data models; `type` for union types.

### State Management (Zustand v5)

- Store logic specific to a single feature MUST live inside `src/features/{feature_name}/`.
- Do NOT place feature-specific stores inside `src/stores/`.

### React & Components

- Use Functional Components exclusively.
- Keep TSX clean by placing business/form logic inside custom hooks or the feature's Zustand store.
- Use `react-toastify` for user feedback and `react-error-boundary` for error handling.

### Styling (Tailwind CSS v4)

- Utility-first classes. Avoid inline styles unless strictly necessary for dynamic values.
