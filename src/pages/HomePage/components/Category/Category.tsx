import type { RecipeCategory } from "@/interfaces";
import { RECIPE_CATEGORIES } from "@/interfaces";
import type { Dispatch, SetStateAction } from "react";
import styles from "./Category.module.scss";

function Category({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: RecipeCategory | "all";
  setSelectedCategory: Dispatch<SetStateAction<RecipeCategory | "all">>;
}) {
  return (
    <div className="mb-30">
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value as RecipeCategory | "all")
        }
        className={`${styles.selectCategory} p-10`}
      >
        <option value="all">Toutes les catégorie</option>
        {RECIPE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Category;
