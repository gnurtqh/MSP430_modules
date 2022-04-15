import { useEffect } from "react";
import { useMemory } from "../../context/memory.context";
import { getWord } from "../../function/memory.func";
import { resetTimerBlock, updateTimer } from "../../function/timer.func";
import CCBlock from "./CCBlock";
import ConfigTimer from "./ConfigTimer";
import styles from "./Timer.module.css";

function Timer({ listCCBlock, ctlAddress, type, scale, state }) {
  const { memory, setMemory } = useMemory();

  const listReg = listCCBlock.map((block) =>
    getWord(memory, block.blockRegAddress)
  );

  const listCtl = listCCBlock.map((block) =>
    getWord(memory, block.blockCtlAddress)
  );
  const listdependencies = [
    state,
    scale,
    getWord(memory, ctlAddress),
    ...listReg,
    ...listCtl,
  ];

  useEffect(() => {
    if (state) updateTimer(listCCBlock, ctlAddress, setMemory, scale);
    else setMemory((mem) => resetTimerBlock(mem, listCCBlock));
  }, listdependencies);
  return (
    <div className={styles.timer}>
      <div className={styles.top}>
        <div className={styles.label}>Timer {type}</div>
        <ConfigTimer ctlAddress={ctlAddress} />
      </div>
      <div className={styles.listccblock}>
        {listCCBlock.map((item, index) => (
          <CCBlock key={index} type={type} block={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Timer;
