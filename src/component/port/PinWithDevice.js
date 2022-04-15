import { Popover } from "@varld/popover";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import {
  LIST_TIMERA_BLOCK,
  LIST_TIMERB_BLOCK,
} from "../../constant/timer.const";
import { useMemory } from "../../context/memory.context";
import block from "../../function/ccblock.func";
import { dir, sel } from "../../function/portpin.func";
import DiodeImg from "../../img/diode.svg";
import PushButtonImg from "../../img/pushbutton.svg";
import Diode from "../device/Diode";
import PushButton from "../device/PushButton";
import styles from "./PinWithDevice.module.css";
import PortPin from "./PortPin";

function PinWithDevice({ pin, index, type }) {
  const { memory, setMemory } = useMemory();
  const [device, setDevice] = useState(null);

  const timerBlock =
    type === "A" ? LIST_TIMERA_BLOCK[index] : LIST_TIMERB_BLOCK[index];
  const setFlag = () => {
    setMemory((mem) =>
      block.setInterruptFlag(mem, timerBlock.blockCtlAddress, 1)
    );
    setTimeout(() => {
      setMemory((mem) =>
        block.setInterruptFlag(mem, timerBlock.blockCtlAddress, 0)
      );
    }, 10);
  };

  const handleCapture = (cm) => {
    if (sel(memory, pin.port.selAddress)) {
      /* Peripheral Module Function */
      if (block.mode(memory, timerBlock.blockCtlAddress)) {
        /* Capture Mode */
        if (dir(memory, pin.port.dirAddress)) {
          /* Output */
        } else {
          /* Input */
          if (block.interruptEnabled(memory, timerBlock.blockCtlAddress)) {
            /* Interrupt Enabled */
            switch (block.captureMode(memory, timerBlock.blockCtlAddress)) {
              case 0:
                /* No Capture */
                break;
              case 1:
                /* Rising Edge */
                if (cm === 1) {
                  setFlag();
                }

                break;
              case 2:
                /* Falling Edge */
                if (cm === 2) {
                  setFlag();
                }

                break;
              case 3:
                /* Both Edge */
                setFlag();
                break;
              default:
                break;
            }
          } else {
            /* Interrupt Disabled */
          }
        }
      } else {
        /* Compare Mode */
      }
    } else {
      /* I/O Function */
    }
  };
  const handleMouseDown = () => {
    handleCapture(2);
  };
  const handleMouseUp = () => {
    handleCapture(1);
  };
  const currentMode =
    sel(memory, pin.port.selAddress, pin.pinNumber) &&
    !block.mode(memory, timerBlock.blockCtlAddress) &&
    dir(memory, pin.port.dirAddress, pin.pinNumber);
  const currentRatio = currentMode
    ? block.getRatio(memory, timerBlock.ratioAddress)
    : 0;
  const currentPeriod = currentMode
    ? block.getPeriod(memory, timerBlock.periodAddress)
    : 0;

  return (
    <div className={styles.pinwithdevice}>
      <PortPin port={pin.port} pinNumber={pin.pinNumber} />
      {device === null && (
        <Popover
          popover={() => {
            return (
              <div className={styles.listoption}>
                <div className={styles.option} onClick={() => setDevice(0)}>
                  <img width={128} src={DiodeImg} alt="diode" />
                  <div>Circuit with diode</div>
                </div>
                <div className={styles.option} onClick={() => setDevice(1)}>
                  <img width={128} src={PushButtonImg} alt="pushbutton" />
                  <div>Circuit with pushbutton</div>
                </div>
              </div>
            );
          }}
        >
          <button className={styles.selectbtn}>
            <BsPlus size={24} />
          </button>
        </Popover>
      )}
      <div className={styles.device}>
        {device === 0 && <Diode ratio={currentRatio} period={currentPeriod} />}
        {device === 1 && (
          <PushButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
        )}
        {device !== null && (
          <div
            onClick={() => {
              setDevice(null);
            }}
            className={styles.deletebtn}
          >
            <MdClear size={24} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PinWithDevice;
