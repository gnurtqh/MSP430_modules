import { DMACTL0_ADDRESS, LIST_CHANNEL } from "../constant/dma.const";
import { TIMERA_PORTPIN, TIMERB_PORTPIN } from "../constant/port.const";
import {
  LIST_TIMERA_BLOCK,
  LIST_TIMERB_BLOCK,
  TACTL_ADDRESS,
  TBCTL_ADDRESS,
} from "../constant/timer.const";
import DMA from "./dma/DMA";
import styles from "./Main.module.css";
import Memory from "./memory/Memory";
import PinWithDevice from "./port/PinWithDevice";
import Timer from "./timer/Timer";

export default function Main({ memory, state, onStateChange }) {
  return (
    <div className={styles.main}>
      <div className={styles.board}>
        <div className={styles.column}>
          <DMA ctlAddress={DMACTL0_ADDRESS} listChannel={LIST_CHANNEL} />
          <Memory memory={memory} />
        </div>

        <div className={styles.column}>
          <div className={styles.timerwithport}>
            <Timer
              type="A"
              ctlAddress={TACTL_ADDRESS}
              listCCBlock={LIST_TIMERA_BLOCK}
            />
            <div className={styles.port}>
              {TIMERA_PORTPIN.map((item, index) => (
                <PinWithDevice key={index} pin={item} index={index} type="A" />
              ))}
            </div>
          </div>

          <div className={styles.timerwithport}>
            <Timer
              type="B"
              ctlAddress={TBCTL_ADDRESS}
              listCCBlock={LIST_TIMERB_BLOCK}
            />
            <div className={styles.port}>
              {TIMERB_PORTPIN.map((item, index) => (
                <PinWithDevice key={index} pin={item} index={index} type="B" />
              ))}
            </div>
          </div>
        </div>
        <button className={styles.startbtn} onClick={onStateChange}>
          {!state ? "Start" : "Stop"}
        </button>
      </div>
    </div>
  );
}
