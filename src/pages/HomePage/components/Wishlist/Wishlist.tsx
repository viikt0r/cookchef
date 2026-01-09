import type { RecipeI } from "@/interfaces";
import { useRecipesStore } from "@/store";
import { useShallow } from "zustand/shallow";
import styles from "./Wishlist.module.scss";

function Wishlist({ recipes }: { recipes: RecipeI[] }) {
  const { setShowWishlist, updateR } = useRecipesStore(
    useShallow(({ setShowWishlist, updateR }) => ({ setShowWishlist, updateR }))
  );

  return (
    <div onClick={() => setShowWishlist(false)} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.wishlist}>
        <h4 className="mb-20">Wishlist</h4>
        <ul>
          {recipes.length > 0 &&
            recipes.map((r) => (
              <li key={r._id} className="d-flex align-items-center mb-10">
                <span className="flex-fill mr-15">{r.title}</span>
                <button
                  onClick={() => updateR({ ...r, liked: false })}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
