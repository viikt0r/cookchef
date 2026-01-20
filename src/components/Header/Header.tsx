import { useRecipesStore } from "@/store";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cookchef from "../../assets/images/cookchef.png";
import HeaderMenu from "./components/HeaderMenu";
import styles from "./Header.module.scss";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const setShowWishlist = useRecipesStore(
    ({ setShowWishlist }) => setShowWishlist
  );
  const { pathname: location } = useLocation();
  const isInAdmin = location.startsWith("/admin");

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <NavLink to="/">
          <img src={cookchef} alt="logo cookchef" />
        </NavLink>
      </div>
      <ul className={styles.headerList}>
        <NavLink to="/admin">
          <button className="mr-15 btn btn-primary">Admin</button>
        </NavLink>
        {!isInAdmin && (
          <button
            onClick={() => setShowWishlist(true)}
            className="mr-15 btn btn-reverse-primary"
          >
            <HeartFilled className="mr-5" />
            <span>Wishlist</span>
          </button>
        )}
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`fa-solid fa-bars ${styles.headerXs}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu
            showWishlist={() => setShowWishlist(true)}
            hideMenu={() => setShowMenu(false)}
            isInAdmin={isInAdmin}
          />
        </>
      )}
    </header>
  );
}

export default Header;
