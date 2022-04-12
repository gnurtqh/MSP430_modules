import { Popover } from "@varld/popover";
import PropTypes from "prop-types";
import { useMemory } from "../../context/memory";
import {
  captureMode,
  interruptEnabled,
  mode,
  outMode,
  setCaptureMode,
  setInterruptEnabled,
  setMode,
  setOutMode,
  setCcrValue,
  ccrValue,
  outBit,
  setOutBit,
} from "../../function/ccblock";
import InputNumber from "../common/InputNumber";
import SelectComponent from "../common/SelectComponent";
import styles from "./CCBlock.module.css";

function CCBlock({ index, block, type }) {
  const { memory, setMemory } = useMemory();
  return (
    <Popover
      popover={() => {
        return (
          <div className={styles.popover}>
            <div>
              <InputNumber
                label={`T${type}CCR${index} value`}
                value={ccrValue(memory, block.blockRegAddress)}
                onChange={(value) =>
                  setMemory(setCcrValue(memory, block.blockRegAddress, value))
                }
              />
              <SelectComponent
                label="Block mode"
                value={mode(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(setMode(memory, block.blockCtlAddress, value))
                }
                options={[
                  { value: 0, label: "Compare mode" },
                  { value: 1, label: "Capture mode" },
                ]}
              />
              <SelectComponent
                label="Interrupt"
                value={interruptEnabled(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    setInterruptEnabled(memory, block.blockCtlAddress, value)
                  )
                }
                options={[
                  { value: 0, label: "Disable" },
                  { value: 1, label: "Enable" },
                ]}
              />
              {mode(memory, block.blockCtlAddress) === 0 && (
                <SelectComponent
                  label="OUT bit"
                  value={outBit(memory, block.blockCtlAddress)}
                  onChange={(value) =>
                    setMemory(setOutBit(memory, block.blockCtlAddress, value))
                  }
                  options={[
                    { value: 0, label: "0" },
                    { value: 1, label: "1" },
                  ]}
                />
              )}
            </div>
            {mode(memory, block.blockCtlAddress) === 1 ? (
              <SelectComponent
                label="Capture mode"
                value={captureMode(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    setCaptureMode(memory, block.blockCtlAddress, value)
                  )
                }
                options={[
                  { value: 0, label: "No capture" },
                  { value: 1, label: "Capture on rising edge" },
                  { value: 2, label: "Capture on falling edge" },
                  { value: 3, label: "Capture on rising edge" },
                ]}
              />
            ) : (
              <SelectComponent
                label="Output mode"
                value={outMode(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(setOutMode(memory, block.blockCtlAddress, value))
                }
                options={[
                  { value: 0, label: "OUT bit value" },
                  { value: 1, label: "Set" },
                  { value: 2, label: "Toggle/reset" },
                  { value: 3, label: "Set/reset" },
                  { value: 4, label: "Toggle" },
                  { value: 5, label: "Reset" },
                  { value: 6, label: "Toggle/set" },
                  { value: 7, label: " Reset/set" },
                ]}
              />
            )}
          </div>
        );
      }}
    >
      <button className={styles.block}>{`Block T${type}${index}`}</button>
    </Popover>
  );
}

CCBlock.propTypes = {
  index: PropTypes.number.isRequired,
  block: PropTypes.shape({
    blockCtlAddress: PropTypes.number.isRequired,
    blockRegAddress: PropTypes.number.isRequired,
  }),
  type: PropTypes.string.isRequired,
};
export default CCBlock;
