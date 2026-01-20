import { CloseOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import type { RecipeI } from "interfaces";
import type { MouseEvent } from "react";
import { useState } from "react";
import styles from "./Recipe.module.scss";
import RecipeDescription from "./RecipeDescription";

function Recipe({
  recipe,
  updateRecipe,
  deleteRecipe,
}: {
  recipe: RecipeI;
  updateRecipe: (recipe: RecipeI) => void;
  deleteRecipe: (id: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  function handleClickUpdate(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    updateRecipe({ ...recipe, liked: !recipe.liked });
  }

  function handleClick() {
    setShowModal(true);
  }

  function handleClickDelete(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    if (recipe._id) {
      deleteRecipe(recipe._id);
    }
  }

  return (
    <>
      <div onClick={handleClick} className={styles.recipe}>
        {recipe.liked ? (
          <HeartFilled
            onClick={handleClickUpdate}
            className={`${styles.likeIcon} ${styles.liked}`}
          />
        ) : (
          <HeartOutlined
            onClick={handleClickUpdate}
            className={styles.likeIcon}
          />
        )}
        <CloseOutlined
          onClick={handleClickDelete}
          className={styles.deleteIcon}
        />
        <div className={styles.imageContainer}>
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <div
          className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
        >
          <h3 className="mb-10">{recipe.title}</h3>
        </div>
      </div>
      <RecipeDescription
        recipe={recipe}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default Recipe;
