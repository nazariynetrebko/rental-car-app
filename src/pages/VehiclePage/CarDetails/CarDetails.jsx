import css from "./CarDetails.module.css";
import formatMileage from "../../../utils/formatMileage";

function CarDetails({ car }) {
  const parts = car.address.split(",").map((part) => part.trim());
  const city = parts[parts.length - 2] || "";
  const country = parts[parts.length - 1] || "";

  return (
    <div className={css.details}>
      <h1 className={css.title}>
        {car.brand} {car.model} {car.year}{" "}
        <span className={css.id}>ID: {car.id}</span>
      </h1>
      <div className={css.subTitle}>
        <p className={css.location}>
          <svg className={css.icon}>
            <use href="/src/assets/sprite.svg#icon-location" />
          </svg>
          {city}, {country}
        </p>
        <p className={css.mileage}>Mileage: {formatMileage(car.mileage)} km</p>
      </div>
      <p className={css.price}>${car.rentalPrice}</p>
      <p className={css.description}>{car.description}</p>

      <div className={css.conditions}>
        <h3>Rental Conditions:</h3>
        <ul>
          {car.rentalConditions.map((cond, index) => (
            <li key={index}>
              <svg className={css.icon}>
                <use href="/src/assets/sprite.svg#icon-check" />
              </svg>
              {cond}
            </li>
          ))}
        </ul>
      </div>

      <div className={css.specifications}>
        <h3>Car Specifications:</h3>
        <ul>
          <li>
            <svg className={css.icon}>
              <use href="/src/assets/sprite.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>
          <li>
            <svg className={css.icon}>
              <use href="/src/assets/sprite.svg#icon-auto" />
            </svg>
            Type: {car.type}
          </li>
          <li>
            <svg className={css.icon}>
              <use href="/src/assets/sprite.svg#icon-fuel" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li>
            <svg className={css.icon}>
              <use href="/src/assets/sprite.svg#icon-engine" />
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>
      </div>

      <div className={css.accessories}>
        <h3>Accessories and functionalities:</h3>
        <ul>
          {[...car.accessories, ...car.functionalities].map((item, index) => (
            <li key={index}>
              <svg className={css.icon}>
                <use href="/src/assets/sprite.svg#icon-check" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CarDetails;
