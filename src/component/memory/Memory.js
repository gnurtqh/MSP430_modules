import { useState } from "react";
import ConfigMemory from "./ConfigMemory";
import styles from "./Memory.module.css";
import PropTypes from "prop-types";
import { getSlice } from "../../function/memory";
import MemoryWriter from "./MemoryWriter";

function Memory({ memory }) {
  const [start, setStart] = useState(0);
  const [numberType, setNumberType] = useState(0);
  const data = getSlice(memory, start, 15);
  return (
    <div className={styles.memory}>
      <div className={styles.top}>
        <div className={styles.label}>Memory</div>
        <div className={styles.btns}>
          <MemoryWriter />
          <ConfigMemory
            start={start}
            onStartChange={setStart}
            numberType={numberType}
            onTypeChange={setNumberType}
          />
        </div>
      </div>
      <div className={styles.data}>
        {data.map((item, index) => (
          <div key={index} className={styles.element}>
            <span>{start + index}:</span>
            <span>
              {numberType
                ? item
                : (item + 256).toString(2).split("").splice(1, 8).join("")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
Memory.propTypes = {
  memory: PropTypes.array,
};
export default Memory;
