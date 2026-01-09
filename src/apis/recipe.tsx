import { RecipeI } from "../interfaces";
const RECIPE_API = "https://restapi.fr/api/recipesViktor";

export async function getRecipes(
  queryParam: URLSearchParams
): Promise<RecipeI[]> {
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function getRecipe(_id: string): Promise<RecipeI> {
  const response = await fetch(`${RECIPE_API}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error fetch one recipe");
  }
}

export async function updateRecipe(
  updatedRecipe: Partial<RecipeI>
): Promise<RecipeI> {
  const { _id, ...restRecipe } = updatedRecipe;
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update recipe");
  }
}

export async function deleteRecipe(_id: string): Promise<string> {
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
  return _id;
}

export async function createRecipe(
  newRecipe: Partial<RecipeI>
): Promise<RecipeI> {
  const response = await fetch(RECIPE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create recipe");
  }
}
