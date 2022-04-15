import { useState } from "react";
import { getElementMemory, getSliceMemory } from "../../function/memory.func";
import ConfigMemory from "./ConfigMemory";
import styles from "./Memory.module.css";
import MemoryWriter from "./MemoryWriter";

function Memory({ memory }) {
  const [start, setStart] = useState(0);
  const [numberType, setNumberType] = useState(0);
  const data = getSliceMemory(memory, start, 15);
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
            <span>{numberType ? item : getElementMemory(item)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Memory;
