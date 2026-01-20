# CookChef - Copilot Instructions

## Project Overview

CookChef is a modern React 19 + TypeScript + Vite recipe discovery and management application. It uses a REST API (`restapi.fr`) as a backend with Zustand for state management and React Router v7 for navigation. The app includes recipe browsing (HomePage), wishlist management, and a full admin interface for recipe CRUD operations.

## Architecture

### Data Flow & State Management

- **Zustand Store** (`src/store/index.tsx`): Global state management with:
  - `recipes`: Array of all fetched recipes
  - `page`: Current pagination page
  - `loading`: Loading state
  - `showWishlist`: Toggle for wishlist display
  - Actions: `fetchRecipes()`, `incPage()`, `updateR()`, `deleteR()`, `createR()`, `setShowWishlist()`
- **Store Consumption**: Use `useRecipesStore(useShallow(...))` to select only needed state slices and prevent unnecessary re-renders
- **Local State**: Components use `useState` for UI-specific state (filter, form inputs)

### Page Architecture & Routing

- **React Router v7** (`src/router.tsx`): Declarative routing with nested routes
  - `/` → HomePage (displays recipe grid with search and wishlist)
  - `/admin` → Admin layout with nested routes:
    - `/admin/recipes/list` → Recipe list management
    - `/admin/recipes/new` → Create new recipe
    - `/admin/recipes/:recipeId` → Edit existing recipe
    - `/admin/users` → User management page
- **Lazy Loading**: All routes use `lazy()` imports for code-splitting
- **Data Loading**: Root loader (`loader: async () => useRecipesStore.getState().fetchRecipes()`) prefetches recipes on app mount
- **Navigation**: Use `useNavigate()` hook for programmatic navigation

### Component Structure

- **Presentational Components**: `Recipe`, `Search`, `Loading`, `Footer`, `Wishlist` — receive data as props, emit callbacks
- **Container Components**: `HomePage`, `Admin`, `AdminRecipesList`, `AdminRecipesForm` — consume Zustand store and manage local state
- **Layout Components**: `App.tsx` (root layout with Header/Footer), `Admin` (admin layout with AdminNav)
- **Reusable UI**: `Header` with `HeaderMenu` nested component for navigation

## Key Patterns & Conventions

### TypeScript Usage

- **File Extensions**: All source files use `.tsx` (components) or `.ts` (utilities)
- **Interfaces**: Define in `src/interfaces/` directory (e.g., `RecipeI` for recipes)
- **Type Safety**: Use TypeScript strict types for props, state, and API responses
- **Import Aliases**: Use `@/` alias for absolute imports from `src/` directory (e.g., `import { useRecipesStore } from "@/store"`)
- **Type Definitions**: Explicitly type function parameters and return values

### Styling

- **SCSS Modules**: Each component has a `.module.scss` file (e.g., `HomePage.module.scss`) imported as `styles` object
- **Global Classes**: Utility-first CSS classes in `src/assets/styles/`:
  - Flexbox: `.d-flex`, `.flex-row`, `.flex-column`, `.flex-fill`, `.align-items-center`, `.justify-content-center`
  - Spacing: `.p-20`, `.mb-20`, `.mr-15`, `.my-30` (padding/margin + value in pixels)
  - Layout: `.container` (max-width: 1200px auto margins)
  - Buttons: `.btn`, `.btn-primary`, `.btn-reverse-primary`
  - Cards: `.card` (box with shadow and padding)
- Apply global classes directly to JSX elements; reserve module styles for component-specific layout/theming

### Form Handling

- Use `react-hook-form` with `yupResolver` for validation
- Define Yup schema inline in component with `.required()`, `.min()`, `.max()`, `.url()` rules
- Register inputs with `{...register("fieldName")}`
- Display errors via `errors.fieldName?.message` checks
- Use `handleSubmit()` wrapper for form submission with async error handling
- Call `reset(defaultValues)` on success, `setError("generic", {...})` on API failure
- Use `clearErrors()` before submission to reset error state
- Support both create and edit modes in same form (check for existing recipe via `useParams()`)

### State Management with Zustand

- **Store Definition**: Define store with `create<StateType>()((set, get) => ({...}))`
- **State Updates**: Use `set()` function with updater callbacks for derived state
- **Actions**: Define async actions that call APIs and update state
- **Consumption**: Use `useShallow()` selector to prevent unnecessary re-renders
- **Pattern**: Extract only needed state/actions: `useRecipesStore(useShallow(({ recipes, updateR }) => ({ recipes, updateR })))`

### Data Fetching & API Integration

- **Centralized API Functions** (`src/apis/recipe.tsx`): Export dedicated functions for each endpoint
  - `getRecipes(queryParam)`: Fetch paginated recipes (returns `RecipeI[]`)
  - `getRecipe(_id)`: Fetch single recipe by ID
  - `updateRecipe(updatedRecipe)`: PATCH update (destructure `_id` from payload)
  - `deleteRecipe(_id)`: DELETE recipe
  - `createRecipe(newRecipe)`: POST new recipe
- **API URL**: Hardcoded as `https://restapi.fr/api/recipesViktor` in `src/apis/recipe.tsx`
- **Pagination**: Use URLSearchParams with `limit=9`, `skip=${(page-1)*9}`, `sort=createdAt:-1`
- **Error Handling**: All API functions throw errors on failed responses (wrap calls in try-catch)
- **Response Normalization**: Always return arrays (handle both array and single object responses)

### Routing Patterns

- **Route Definitions**: Define all routes in `src/router.tsx` with `createBrowserRouter()`
- **Nested Routes**: Use `children` array for nested route hierarchies
- **Lazy Loading**: Import pages with `lazy()` for code-splitting
- **Navigation**: Use `useNavigate()` hook for programmatic routing (e.g., after form submission)
- **Params**: Access route params with `useParams()` hook (e.g., `recipeId` in edit form)
- **Loaders**: Use route loaders for data prefetching (attached to root route)
- **Suspense**: Wrap `<Outlet />` in `<Suspense>` for lazy-loaded route handling

## Developer Workflows

### Build & Run

- **Dev**: `npm run dev` (Vite dev server with HMR on port 5173)
- **Build**: `npm run build` (TypeScript compilation + Vite production bundle)
- **Lint**: `npm run lint` (ESLint with TypeScript rules, no auto-fix)
- **Preview**: `npm run preview` (local production preview)

### Adding Features

1. **New Page**:
   - Create folder in `src/pages/{PageName}/` with component and `.module.scss`
   - Add route to `src/router.tsx` with lazy import
   - Use nested routes for sub-pages (follow Admin pattern)
2. **New Component**:
   - Create folder in `src/components/{ComponentName}/` with `.tsx` and `.module.scss`
   - Export component and import where needed
3. **API Calls**:
   - Add API function to `src/apis/recipe.tsx`
   - Call from Zustand store actions for global state updates
   - Call directly from components for one-off operations
4. **Styling**:
   - Use global utility classes first
   - Add module styles only for component-specific styling
   - Follow naming convention: `{ComponentName}.module.scss`
5. **State Management**:
   - Add state/actions to Zustand store for global data
   - Use local `useState` for UI-only state
   - Use `useShallow()` when consuming store to optimize re-renders

### TypeScript Configuration

- **Path Aliases**: `@/` maps to `src/` directory (configured in `tsconfig.json` and `vite.config.ts`)
- **Strict Mode**: Enabled for type safety
- **Module Resolution**: Bundler mode for Vite compatibility
- **Type Checking**: Use `.tsx` for JSX components, `.ts` for utilities

## Critical Files & References

- `src/router.tsx` — Route definitions with React Router v7
- `src/store/index.tsx` — Zustand store for global state management
- `src/apis/recipe.tsx` — Centralized API functions for recipes
- `src/interfaces/recipe.tsx` — TypeScript interface for Recipe type
- `src/pages/HomePage/HomePage.tsx` — Main page with recipe grid and wishlist
- `src/pages/Admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm.tsx` — Form validation pattern
- `src/App.tsx` — Root layout with Header/Footer and Outlet
- `src/assets/styles/_utils.scss`, `_flex.scss` — Global utility classes
- `package.json` — Dependencies (React 19, TypeScript, Zustand, React Router v7, Vite)
- `vite.config.ts` — Vite configuration with path aliases and SWC plugin

## Project Structure Patterns

### Nested Page Architecture

Admin pages follow a nested structure for organization:

```
pages/Admin/
  Admin.tsx              # Admin layout with navigation
  Admin.module.scss
  components/
    AdminNav/            # Admin navigation component
  pages/
    AdminRecipes/        # Recipes section
      AdminRecipes.tsx   # Recipes layout with nested routes
      components/
        AdminRecipesNav/ # Sub-navigation for recipes
      pages/
        AdminRecipesList/    # List view
        AdminRecipesForm/    # Create/Edit form
    AdminUsers/          # Users section
      AdminUsers.tsx
```

### Component Organization

- **Pages**: Top-level routes with own folder, SCSS module, and optional components/pages subfolders
- **Components**: Reusable UI elements in `src/components/` (Header, Footer, Loading)
- **Page Components**: Page-specific components in `{Page}/components/` folder
- **Nested Pages**: Sub-routes in `{Page}/pages/` folder

## Dependencies & External Services

- **REST API Backend**: `restapi.fr` (recipes CRUD at `/api/recipesViktor`)
- **State Management**: `zustand` 5.0 with `zustand/shallow` for optimized selectors
- **Routing**: `react-router-dom` 7.10 (includes React Router v7)
- **Form Validation**: `react-hook-form` 7.67 + `@hookform/resolvers` + `yup` 1.7
- **Build Tool**: Vite 7.1 with `@vitejs/plugin-react-swc` for fast compilation
- **Styling**: SASS/SCSS 1.93 with CSS modules
- **TypeScript**: 5.9 with strict mode enabled
- **React**: 19.1 (latest stable version with new features)
