import { Popover } from "@varld/popover";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import Diode from "../device/Diode";
import PushButton from "../device/PushButton";
import styles from "./PinWithDevice.module.css";
import PortPin from "./PortPin";
import DiodeImg from "../../img/diode.svg";
import PushButtonImg from "../../img/pushbutton.svg";
export default function PinWithDevice({ pin }) {
  const [device, setDevice] = useState(null);
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
        {device === 0 && <Diode ratio={0.2} period={2000} />}
        {device === 1 && (
          <PushButton onMouseDown={() => {}} onMouseUp={() => {}} />
        )}
        {device !== null && (
          <button
            onClick={() => {
              setDevice(null);
            }}
            className={styles.deletebtn}
          >
            <MdClear size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
