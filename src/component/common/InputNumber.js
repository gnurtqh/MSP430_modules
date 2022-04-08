import styles from "./InputNumber.module.css";
import PropTypes from "prop-types";

function InputNumber({ label, value, onChange }) {
  return (
    <div className={styles.inputnumber}>
      <div className={styles.label}>{label}</div>
      <input
        placeholder="😀 decimal number"
        className={styles.input}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={(event) => event.target.select()}
      />
    </div>
  );
}
InputNumber.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default InputNumber;
