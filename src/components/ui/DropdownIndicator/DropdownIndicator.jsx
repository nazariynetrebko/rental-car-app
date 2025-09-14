import { components } from "react-select";
import css from "./DropdownIndicator.module.css";
const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="20"
        height="20"
        style={{
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
        }}
        className={css.icon}>
        <use href="/src/assets/sprite.svg#icon-arrow" />
      </svg>
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
