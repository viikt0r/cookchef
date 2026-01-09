import { useRecipesStore } from "@/store";
import { NavLink } from "react-router";
import { useShallow } from "zustand/shallow";
import styles from "./AdminRecipesList.module.scss";

function AdminRecipesList() {
  const { recipes, deleteR } = useRecipesStore(
    useShallow(({ recipes, deleteR }) => ({ recipes, deleteR }))
  );

  async function deleteRecipe(_id: string) {
    await deleteR(_id);
  }

  return (
    <ul className={styles.list}>
      {recipes.length ? (
        recipes.map((r) => (
          <li
            key={r._id}
            className="d-flex align-items-center justify-content-between"
          >
            <span className="flex-fill">{r.title}</span>
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
  );
}
export default AdminRecipesList;
