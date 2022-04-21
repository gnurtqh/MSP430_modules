import { Popover } from "@varld/popover";
import { IoSettingsOutline } from "react-icons/io5";
import InputNumber from "../common/InputNumber";
import SelectComponent from "../common/SelectComponent";
import styles from "./ConfigMemory.module.css";

function ConfigMemory({ start, onStartChange, numberType, onTypeChange }) {
  return (
    <Popover
      popover={() => {
        return (
          <div className={styles.configpanel}>
            <InputNumber
              label="Display memory from"
              value={start}
              onChange={(value) =>
                onStartChange(~~value > 65521 ? 65521 : ~~value)
              }
            />
            <SelectComponent
              label="Numeral system"
              value={numberType}
              onChange={onTypeChange}
              options={[
                { value: 0, label: "Binary" },
                { value: 1, label: "Decimal" }
              ]}
            />
          </div>
        );
      }}
    >
      <button className={styles.configbtn}>
        <IoSettingsOutline size={16} />
      </button>
    </Popover>
  );
}

export default ConfigMemory;
