import type { RecipeCategory } from "@/interfaces";
import { RECIPE_CATEGORIES } from "@/interfaces";
import { useRecipesStore } from "@/store";
import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { useShallow } from "zustand/shallow";
import styles from "./AdminRecipesList.module.scss";

function AdminRecipesList() {
  const [selectedCategory, setSelectedCategory] = useState<
    RecipeCategory | "all"
  >("all");
  const { recipes, deleteR } = useRecipesStore(
    useShallow(({ recipes, deleteR }) => ({ recipes, deleteR }))
  );

  const filteredRecipes = useMemo(
    () =>
      selectedCategory === "all"
        ? recipes
        : recipes.filter((r) => r.category === selectedCategory),
    [recipes, selectedCategory]
  );

  async function deleteRecipe(_id: string) {
    await deleteR(_id);
  }

  return (
    <div>
      <div className="mb-20">
        <label htmlFor="category-filter" className="mr-15">
          Filtrer par catégorie :
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as RecipeCategory | "all")
          }
          className="p-10"
        >
          <option value="all">Toutes les catégories</option>
          {RECIPE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ul className={styles.list}>
        {filteredRecipes.length ? (
          filteredRecipes.map((r) => (
            <li
              key={r._id}
              className="d-flex align-items-center justify-content-between"
            >
              <span className="flex-fill">
                {r.title}
                {r.category && (
                  <span className={styles.category}>({r.category})</span>
                )}
              </span>
              <NavLink to={`../edit/${r._id}`}>
                <button className="btn btn-primary mr-15">Editer</button>
              </NavLink>
              <button
                onClick={() => deleteRecipe(r._id)}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </li>
          ))
        ) : (
          <li>Aucune recette trouvée</li>
        )}
      </ul>
    </div>
  );
}
export default AdminRecipesList;
