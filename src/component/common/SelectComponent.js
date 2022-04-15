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

export default SelectComponent;
