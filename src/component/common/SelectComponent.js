import PropTypes from "prop-types";
import styles from "./Select.module.css";
function SelectComponent({ value, label, onChange, options }) {
  const handleClick = (value) => {
    onChange(value);
  };
  return (
    <div className={styles.select}>
      <div className={styles.label}>{label}</div>
      <div className={styles.listoptions}>
        {options.map((option) => (
          <div
            className={value === option.value ? styles.selected : styles.option}
            key={option.value}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

SelectComponent.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ),
};

export default SelectComponent;
