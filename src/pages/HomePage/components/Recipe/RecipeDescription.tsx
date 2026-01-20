import { useRecipesStore } from "@/store";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Modal, Rate } from "antd";
import type { RecipeI } from "interfaces";
import type { MouseEvent } from "react";
import { useShallow } from "zustand/shallow";
import styles from "./RecipeDescription.module.scss";

const RecipeDescription: React.FC<{
  recipe: RecipeI;
  isOpen: boolean;
  onClose: () => void;
}> = ({ recipe, isOpen, onClose }) => {
  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onClose();
  };

  const { updateR } = useRecipesStore(
    useShallow(({ updateR }) => ({ updateR }))
  );

  function handleClickUpdate(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    updateR({ ...recipe, liked: !recipe.liked });
  }

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={700}
    >
      <div className={styles.modal}>
        <div className={styles.imageContainer}>
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
          <img className={styles.image} src={recipe.image} alt={recipe.title} />
        </div>
        <div className={styles.content}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p>
            <strong>Catégorie :</strong> {recipe.category}
          </p>
          <Rate allowHalf defaultValue={2.5} />
        </div>
      </div>
    </Modal>
  );
};

export default RecipeDescription;
