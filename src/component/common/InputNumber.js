import styles from "./InputNumber.module.css";

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

export default InputNumber;
