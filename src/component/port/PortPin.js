import { Popover } from "@varld/popover";
import PropTypes from "prop-types";
import { useMemory } from "../../context/memory.context";
import { dir, sel, setDir, setSel } from "../../function/portpin.func";
import SelectComponent from "../common/SelectComponent";
import styles from "./PortPin.module.css";
function PortPin({ port, pinNumber }) {
  const { memory, setMemory } = useMemory();
  return (
    <Popover
      popover={() => {
        return (
          <div className="popover">
            <div className={styles.label}>
              P{port.portNumber}.{pinNumber}
            </div>
            <SelectComponent
              label="Pin function"
              value={sel(memory, port.selAddress, pinNumber)}
              onChange={(value) =>
                setMemory(setSel(memory, port.selAddress, pinNumber, value))
              }
              options={[
                { value: 0, label: "I/O" },
                { value: 1, label: "Peripheral module" },
              ]}
            />
            <SelectComponent
              label="Direction of I/O pin"
              value={dir(memory, port.dirAddress, pinNumber)}
              onChange={(value) =>
                setMemory(setDir(memory, port.dirAddress, pinNumber, value))
              }
              options={[
                { value: 0, label: "Input" },
                { value: 1, label: "Output" },
              ]}
            />
          </div>
        );
      }}
    >
      <button className={styles.portpin}>
        <div className={styles.border}>
          <div className={styles.hexagon} />
        </div>
      </button>
    </Popover>
  );
}
PortPin.propTypes = {
  port: PropTypes.shape({
    portNumber: PropTypes.number.isRequired,
    selAddress: PropTypes.number.isRequired,
    dirAddress: PropTypes.number.isRequired,
  }),
  pinNumber: PropTypes.number.isRequired,
};
export default PortPin;
