import { DMACTL0_ADDRESS, LIST_CHANNEL } from "../constant/dma.constant";
import { TIMERA_PORTPIN, TIMERB_PORTPIN } from "../constant/port.constant";
import {
  LIST_TIMERA_BLOCK,
  LIST_TIMERB_BLOCK,
  TACTL_ADDRESS,
  TBCTL_ADDRESS,
} from "../constant/timer.constant";
import DMA from "./dma/DMA";
import styles from "./Main.module.css";
import Memory from "./memory/Memory";
import PinWithDevice from "./port/PinWithDevice";
import Timer from "./timer/Timer";

export default function Main({ memory, isRunning, onStateChange }) {
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
                <PinWithDevice key={index} pin={item} />
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
                <PinWithDevice key={index} pin={item} />
              ))}
            </div>
          </div>
        </div>
        <button className={styles.startbtn} onClick={onStateChange}>
          {!isRunning ? "Start" : "Stop"}
        </button>
      </div>
    </div>
  );
}
