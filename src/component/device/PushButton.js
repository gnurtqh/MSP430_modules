import { useState } from "react";
import styles from "./PushButton.module.css";

function PushButton({ onMouseUp, onMouseDown }) {
  const [on, setOn] = useState(false);
  const handleMouseUp = () => {
    onMouseUp();
    setOn(false);
  };

  const handleMouseDown = () => {
    onMouseDown();
    setOn(true);
  };
  return (
    <button
      className={styles.base}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div className={on ? styles.pushbuttonon : styles.pushbutton} />
    </button>
  );
}

export default PushButton;
