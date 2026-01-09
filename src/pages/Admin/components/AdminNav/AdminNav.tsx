import { NavLink } from "react-router-dom";
import styles from "./AdminNav.module.scss";
function AdminNav() {
  return (
    <ul className={`${styles.list} d-flex flex-column p-20`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="recipes"
      >
        Recette
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to="users"
      >
        Utilisateur
      </NavLink>
    </ul>
  );
}

export default AdminNav;
