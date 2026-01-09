import { NavLink } from "react-router-dom";
import styles from "./HeaderMenu.module.scss";

function HeaderMenu({
  showWishlist,
  hideMenu,
  isInAdmin,
}: {
  showWishlist: () => void;
  hideMenu: () => void;
  isInAdmin: boolean;
}) {
  return (
    <ul onClick={hideMenu} className={`${styles.MenuContainer} card p-20`}>
      <li>
        <NavLink to="/admin">Ajouter une recette</NavLink>
      </li>
      {!isInAdmin && <li onClick={showWishlist}>Whislist</li>}
    </ul>
  );
}

export default HeaderMenu;
