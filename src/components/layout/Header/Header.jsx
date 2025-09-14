import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          <span className={css.logoText}>Rental</span>
          <span className={css.logoHighlight}>Car</span>
        </NavLink>

        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ""}`
            }>
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ""}`
            }>
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
