# CookChef - Copilot Instructions

## Project Overview

CookChef is a React + Vite recipe discovery and management application. It uses a REST API (`restapi.fr`) as a backend and implements a two-page SPA with recipe browsing (HomePage) and admin recipe creation (Admin).

## Architecture

### Data Flow & State Management

- **API Context** (`src/context/ApiContext.jsx`): Provides base API URL as React context value, consumed via `useContext(ApiContext)` throughout the app
- **Custom Hook** (`src/hooks/useFetchRecipes.jsx`): Handles paginated data fetching with pagination params (limit: 9, skip-based). Returns `[[recipes, setRecipes], isLoading, error]` tuple. Supports infinite scroll patterns with page increments
- **Local State**: Pages manage UI state (filter, page number) with `useState`. No Redux or global state management

### Page Architecture

- **HomePage**: Displays paginated recipe grid with client-side filter by title prefix. Implements optimistic recipe updates via `updateRecipe()` and deletions
- **Admin**: Recipe creation form using react-hook-form with Yup validation. Submits to API at `{BASE_URL_API}/recipes` POST endpoint
- **Page Routing**: Simple imperative routing via `setPage()` state in App.jsx (no React Router)

### Component Structure

- **Presentational Components**: `Recipe`, `Search`, `Loading`, `Footer` — receive data as props, emit callbacks
- **Container Components**: `HomePage`, `Admin` — manage state and data fetching
- **Reusable UI**: `Header` with `HeaderMenu` nested component for navigation

## Key Patterns & Conventions

### Styling

- **SCSS Modules**: Each component has a `.module.scss` file (e.g., `HomePage.module.scss`) imported as `styles` object
- **Global Classes**: Utility-first CSS classes in `src/assets/styles/`:
  - Flexbox: `.d-flex`, `.flex-row`, `.flex-column`, `.flex-fill`, `.align-items-center`, `.justify-content-center`
  - Spacing: `.p-20`, `.mb-20`, `.mr-15`, `.my-30` (padding/margin + value in pixels)
  - Layout: `.container` (max-width: 1200px auto margins)
  - Buttons: `.btn`, `.btn-primary`, `.btn-reverse-primary`
- Apply global classes directly to JSX elements; reserve module styles for component-specific layout/theming

### Form Handling (RecipeForm Pattern)

- Use `react-hook-form` with `yupResolver` for validation
- Define Yup schema inline in component with `.required()`, `.min()`, `.max()`, `.url()` rules
- Register inputs with `{...register("fieldName")}`
- Display errors via `errors.fieldName?.message` checks
- Use `handleSubmit()` wrapper for form submission with try-catch for API calls
- Call `reset(defaultValues)` on success, `setError("generic", {...})` on failure

### Data Fetching

- Use `useFetchRecipes(page)` hook for all API calls requiring pagination
- Hook internally manages loading state and accumulates data (spreads new data into state)
- Always check `isLoading && !recipes.length` before rendering grid (avoid flashing empty state during pagination)

### API Integration

- Base URL stored in ApiContext: `https://restapi.fr/api/recipesViktor`
- POST to `/recipes` endpoint for creating recipes (JSON body)
- Query params for pagination: `?limit=9&skip=${(page-1)*9}&sort=createdAt:-1`

## Developer Workflows

### Build & Run

- **Dev**: `npm run dev` (Vite dev server with HMR)
- **Build**: `npm run build` (production bundle)
- **Lint**: `npm run lint` (ESLint, no auto-fix configured)
- **Preview**: `npm run preview` (local prod preview)

### Adding Features

1. **New Page**: Create folder in `src/pages/{PageName}/` with main component and `.module.scss`, add route logic to App.jsx
2. **New Component**: Create folder in `src/components/{ComponentName}/` with JSX and module SCSS
3. **API Calls**: Use `useFetchRecipes()` for paginated queries; use direct `fetch()` in forms/submissions
4. **Styling**: Use global utility classes first; add module styles only for unique component styling

## Critical Files & References

- `src/App.jsx` — Page routing entry point
- `src/context/ApiContext.jsx` — API base URL provider
- `src/hooks/useFetchRecipes.jsx` — Pagination/data-fetching pattern
- `src/pages/Admin/components/RecipeForm/RecipeForm.jsx` — Form + validation pattern exemplar
- `src/assets/styles/_utils.scss`, `_flex.scss` — Spacing/layout class definitions
- `package.json` — Dependencies (React 19, react-hook-form, Yup, Sass, Vite)

## Dependencies & External Services

- **REST API Backend**: `restapi.fr` (recipes CRUD at `/api/recipesVik`)
- **Form Validation**: `react-hook-form` + `@hookform/resolvers` + `yup`
- **Build Tool**: Vite 7.1 with SWC for React Fast Refresh (faster than Babel)
- **Styling**: SASS (no CSS-in-JS; all styling in `.module.scss` or global stylesheet)
