import { Link } from "react-router-dom";
import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <section className={css.hero}>
      <div className={css.heroContent}>
        <h1 className={css.title}>Find your perfect rental car</h1>

        <p className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link to="/catalog" className={css.ctaButton}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
