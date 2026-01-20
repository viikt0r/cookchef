export type RecipeCategory =
  | "Apéro"
  | "Entrées"
  | "Plats"
  | "Desserts"
  | "Boissons"
  | "Brunch & Petit Déj";

export const RECIPE_CATEGORIES: RecipeCategory[] = [
  "Apéro",
  "Entrées",
  "Plats",
  "Desserts",
  "Boissons",
  "Brunch & Petit Déj",
];

export interface RecipeI {
  _id?: string;
  title: string;
  image: string;
  liked: boolean;
  description: string | null;
  category: RecipeCategory;
}
