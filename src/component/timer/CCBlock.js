import { Popover } from "@varld/popover";
import PropTypes from "prop-types";
import { useMemory } from "../../context/memory.context";
import ccblock from "../../function/ccblock.func";
import InputNumber from "../common/InputNumber";
import SelectComponent from "../common/SelectComponent";
import styles from "./CCBlock.module.css";
import { blockOption } from "../../constant/ccblock.const";
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
                value={ccblock.ccrValue(memory, block.blockRegAddress)}
                onChange={(value) =>
                  setMemory(
                    ccblock.setCcrValue(memory, block.blockRegAddress, value)
                  )
                }
              />
              <SelectComponent
                label="Block mode"
                value={ccblock.mode(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    ccblock.setMode(memory, block.blockCtlAddress, value)
                  )
                }
                options={blockOption.mode}
              />
              <SelectComponent
                label="Interrupt"
                value={ccblock.interruptEnabled(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    ccblock.setInterruptEnabled(
                      memory,
                      block.blockCtlAddress,
                      value
                    )
                  )
                }
                options={blockOption.interruptEnabled}
              />
              {ccblock.mode(memory, block.blockCtlAddress) === 0 && (
                <SelectComponent
                  label="OUT bit"
                  value={ccblock.outBit(memory, block.blockCtlAddress)}
                  onChange={(value) =>
                    setMemory(
                      ccblock.setOutBit(memory, block.blockCtlAddress, value)
                    )
                  }
                  options={blockOption.outBit}
                />
              )}
            </div>
            {ccblock.mode(memory, block.blockCtlAddress) === 1 ? (
              <SelectComponent
                label="Capture mode"
                value={ccblock.captureMode(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    ccblock.setCaptureMode(memory, block.blockCtlAddress, value)
                  )
                }
                options={blockOption.captureMode}
              />
            ) : (
              <SelectComponent
                label="Output mode"
                value={ccblock.outMode(memory, block.blockCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    ccblock.setOutMode(memory, block.blockCtlAddress, value)
                  )
                }
                options={blockOption.outMode}
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
