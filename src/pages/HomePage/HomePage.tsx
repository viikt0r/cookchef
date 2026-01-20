import type { RecipeCategory } from "@/interfaces";
import { useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import Loading from "../../components/Loading/Loading";
import { useRecipesStore } from "../../store";
import styles from "./HomePage.module.scss";
import Category from "./components/Category/Category";
import Recipe from "./components/Recipe/Recipe";
import Search from "./components/Search/Search";
import Wishlist from "./components/Wishlist/Wishlist";

export default function HomePage() {
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    RecipeCategory | "all"
  >("all");

  const { loading, recipes, incPage, updateR, deleteR, showWishlist } =
    useRecipesStore(
      useShallow(
        ({ loading, recipes, incPage, updateR, deleteR, showWishlist }) => ({
          loading,
          recipes,
          incPage,
          updateR,
          deleteR,
          showWishlist,
        })
      )
    );

  function updateRecipe(updatedRecipe: RecipeI): void {
    updateR(updatedRecipe);
  }

  function deleteRecipe(_id: string): void {
    deleteR(_id);
  }

  const filteredRecipes = useMemo(
    () =>
      recipes
        .filter((r) => r.title.toLowerCase().startsWith(filter))
        .filter((r) =>
          selectedCategory === "all" ? true : r.category === selectedCategory
        )
        .map((r) => (
          <Recipe
            key={r._id}
            recipe={r}
            updateRecipe={updateRecipe}
            deleteRecipe={deleteRecipe}
          />
        )),
    [filter, selectedCategory, recipes]
  );

  const wishedRecipes = useMemo(
    () => recipes.filter(({ liked }) => liked),
    [recipes]
  );

  return (
    <>
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className="my-30">
          Découvrez nos nouvelles recettes{" "}
          <small className={styles.small}> ({recipes.length})</small>
        </h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <div className={styles.filterContainer}>
            <div className="flex-fill mr-15">
              <Search setFilter={setFilter} />
            </div>
            <Category
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          {loading && !recipes.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>{filteredRecipes}</div>
          )}
          {recipes.length > 0 && recipes.length % 9 === 0 && (
            <div className="d-flex flex-row justify-content-center align-items-center p-20">
              <button onClick={() => incPage()} className="btn btn-primary">
                Charger plus de recettes
              </button>
            </div>
          )}
        </div>
      </div>
      {showWishlist && <Wishlist recipes={wishedRecipes} />}
    </>
  );
}
