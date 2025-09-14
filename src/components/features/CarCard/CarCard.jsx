import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../redux/slices/favoritesSlice";
import { Link } from "react-router-dom";
import css from "./CarCard.module.css";
import formatMileage from "../../../utils/formatMileage";

function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((favorite) => favorite.id === car.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const parts = car.address.split(",").map((part) => part.trim());
  const city = parts[parts.length - 2] || "";
  const country = parts[parts.length - 1] || "";

  return (
    <div className={css.card}>
      <div className={css.imageContainer}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={css.image}
        />
        <button
          onClick={toggleFavorite}
          className={`${css.favoriteButton} ${
            isFavorite ? css.favorited : ""
          }`}>
          {isFavorite ? "❤️" : "♡"}
        </button>
      </div>

      <div className={css.info}>
        <div className={css.titleContainer}>
          <h3 className={css.title}>
            {car.brand} <span className={css.spanHighlight}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <p className={css.location}>
          {city} | {country} | {car.rentalCompany}
        </p>
        <p className={css.details}>
          {car.type} | {formatMileage(car.mileage)} km
        </p>
        <Link to={`/catalog/${car.id}`} className={css.readMoreButton}>
          Read more
        </Link>
      </div>
    </div>
  );
}

export default CarCard;
