import { Popover } from "@varld/popover";
import { useState } from "react";
import { SiSpeedtest } from "react-icons/si";
import styles from "./Setting.module.css";

function Setting({ scale, onScaleChange }) {
  const [value, setValue] = useState(scale);
  const scaleValue = 2 ** scale < 1 ? "1/" + 1 / 2 ** scale : 2 ** scale + "x";
  return (
    <div className={styles.scale}>
      <Popover
        popover={() => {
          return (
            <div className={styles.scaler}>
              <div className={styles.label}>
                <span>Time Scaling</span>
                <span>
                  {2 ** value < 1 ? "1/" + 1 / 2 ** value : 2 ** value + "x"}
                </span>
              </div>
              <input
                className={styles.slider}
                id="typeinp"
                type="range"
                min="-10"
                max="10"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                onMouseUp={(event) => {
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
export default Setting;
