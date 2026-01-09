import { createRecipe, deleteRecipe, getRecipes, updateRecipe } from "@/apis";
import type { RecipeI } from "@/interfaces";
import { create } from "zustand";

type RecipesData = {
  recipes: RecipeI[];
  page: number;
  loading: boolean;
  showWishlist: boolean;
};

type RecipesActions = {
  fetchRecipes: () => Promise<void>;
  incPage: () => void;
  updateR: (updatedRecipe: Partial<RecipeI>) => Promise<void>;
  deleteR: (recipeId: string) => Promise<void>;
  createR: (newRecipe: Partial<RecipeI>) => Promise<void>;
  setShowWishlist: (show: boolean) => void;
};

type RecipesStates = RecipesData & RecipesActions;

export const useRecipesStore = create<RecipesStates>()((set, get) => ({
  recipes: [],
  page: 1,
  loading: false,
  showWishlist: false,

  fetchRecipes: async () => {
    const page = get().page;
    const queryParam = new URLSearchParams();
    queryParam.append("limit", "9");
    queryParam.append("skip", `${(page - 1) * 9}`);
    queryParam.append("sort", "createdAt:-1");
    set({ loading: true });
    const fetchedRecipes = await getRecipes(queryParam);
    set(({ recipes }) => ({
      recipes: [...recipes, ...fetchedRecipes],
      loading: false,
    }));
  },

  incPage: () => {
    set(({ page }) => ({ page: page + 1 }));
    get().fetchRecipes();
  },

  updateR: async (recipe) => {
    const updatedRecipe = await updateRecipe(recipe);
    set(({ recipes }) => ({
      recipes: recipes.map((r) => (r._id === recipe._id ? updatedRecipe : r)),
    }));
  },

  deleteR: async (recipeId: string) => {
    await deleteRecipe(recipeId);
    set(({ recipes }) => ({
      recipes: recipes.filter(({ _id }) => _id !== recipeId),
    }));
  },

  createR: async (recipe) => {
    const newRecipe = await createRecipe(recipe);
    set(({ recipes }) => ({
      recipes: [...recipes, newRecipe],
    }));
  },

  setShowWishlist: (showWishlist) => {
    set({ showWishlist });
  },
}));
