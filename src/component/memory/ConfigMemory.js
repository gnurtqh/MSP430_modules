import { Popover } from "@varld/popover";
import { IoSettingsOutline } from "react-icons/io5";
import styles from "./ConfigMemory.module.css";
import PropTypes from "prop-types";
import InputNumber from "../common/InputNumber";
import SelectComponent from "../common/SelectComponent";

function ConfigMemory({ start, onStartChange, numberType, onTypeChange }) {
  return (
    <Popover
      popover={({ close }) => {
        return (
          <div className="popover">
            <InputNumber
              label="Display memory from"
              value={start}
              onChange={(value) =>
                onStartChange(~~value > 10000 ? 10000 : ~~value)
              }
            />
            <SelectComponent
              label="Number format"
              value={numberType}
              onChange={onTypeChange}
              options={[
                { value: 0, label: "Binary" },
                { value: 1, label: "Decimal" },
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
ConfigMemory.propTypes = {};
export default ConfigMemory;
