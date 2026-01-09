import { NavLink } from "react-router-dom";
import styles from "./AdminRecipesNav.module.scss";

function AdminRecipesNav() {
  return (
    <ul className={`${styles.list} d-flex list-unstyled mb-0`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="list"
      >
        Liste des recettes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="new"
      >
        Ajouter une recette
      </NavLink>
    </ul>
  );
}

export default AdminRecipesNav;
