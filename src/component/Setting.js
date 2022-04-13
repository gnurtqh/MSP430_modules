import { Popover } from "@varld/popover";
import { SiSpeedtest } from "react-icons/si";
import styles from "./Setting.module.css";

export default function Setting({ scale, onScaleChange }) {
  const scaleValue = 2 ** scale < 1 ? "1/" + 1 / 2 ** scale : 2 ** scale + "x";
  return (
    <div className={styles.scale}>
      <Popover
        popover={() => {
          return (
            <div className={styles.scaler}>
              <div className={styles.label}>Time Scaling</div>
              <input
                className={styles.slider}
                id="typeinp"
                type="range"
                min="-10"
                max="10"
                value={scale}
                onChange={(event) => {
                  onScaleChange(event.target.value);
                }}
                step="1"
              />
            </div>
          );
        }}
      >
        <button className={styles.configbtn}>
          {scaleValue === "1x" ? <SiSpeedtest size={16} /> : scaleValue}
        </button>
      </Popover>
    </div>
  );
}
