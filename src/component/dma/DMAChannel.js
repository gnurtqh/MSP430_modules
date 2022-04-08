import { Popover } from "@varld/popover";
import {
  desAddress,
  desByte,
  desInc,
  dmaen,
  setDesAddress,
  setDesByte,
  setDesInc,
  setDmaen,
  setSize,
  setSrcAddress,
  setSrcByte,
  setSrcInc,
  setTransferMode,
  setTrigger,
  size,
  srcAddress,
  srcByte,
  srcInc,
  transferMode,
  trigger,
} from "../../function/dma";
import styles from "./DMAChannel.module.css";
import { useMemory } from "../../context/memory";
import SelectComponent from "../common/SelectComponent";
import PropTypes from "prop-types";
import InputNumber from "../common/InputNumber";

function DMAChannel({ channel, ctlAddress, index }) {
  const { memory, setMemory } = useMemory();

  return (
    <Popover
      popover={() => {
        return (
          <div className={styles.popover}>
            <div>
              <SelectComponent
                label="DMA enable"
                value={dmaen(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(setDmaen(memory, channel.channelCtlAddress, value))
                }
                options={[
                  { value: 0, label: "Disable" },
                  { value: 1, label: "Enable" },
                ]}
              />
              <SelectComponent
                label="Trigger"
                value={trigger(memory, ctlAddress, index)}
                onChange={(value) => {
                  setMemory(setTrigger(memory, ctlAddress, index, value));
                }}
                options={[
                  { value: 7, label: "TACCR0 CCIFG bit" },
                  { value: 1, label: "TACCR2 CCIFG bit" },
                  { value: 8, label: "TBCCR0 CCIFG bit" },
                  { value: 2, label: "TBCCR2 CCIFG bit" },
                ]}
              />
              <SelectComponent
                label="Transfer mode"
                value={transferMode(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    setTransferMode(memory, channel.channelCtlAddress, value)
                  )
                }
                options={[
                  { value: 0, label: "Single transfer" },
                  { value: 4, label: "Repeated single transfer" },
                  { value: 1, label: "Block transfer" },
                  { value: 5, label: "Repeated block transfer" },
                ]}
              />
            </div>
            <div>
              <SelectComponent
                label="Source address"
                value={srcInc(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(setSrcInc(memory, channel.channelCtlAddress, value))
                }
                options={[
                  { value: 0, label: "is unchanged" },
                  { value: 2, label: "is decremented" },
                  { value: 3, label: "is incremented" },
                ]}
              />
              <SelectComponent
                label="Source format"
                value={srcByte(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    setSrcByte(memory, channel.channelCtlAddress, value)
                  )
                }
                options={[
                  { value: 0, label: "Word" },
                  { value: 1, label: "Byte" },
                ]}
              />
              <InputNumber
                label="Source address"
                value={srcAddress(memory, channel.daAddress)}
                onChange={(value) =>
                  setMemory(setSrcAddress(memory, channel.daAddress, value))
                }
              />
              <InputNumber
                label="Size"
                value={size(memory, channel.szAddress)}
                onChange={(value) =>
                  setMemory(setSize(memory, channel.szAddress, value))
                }
              />
            </div>
            <div>
              <SelectComponent
                label="Destination address"
                value={desInc(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(setDesInc(memory, channel.channelCtlAddress, value))
                }
                options={[
                  { value: 0, label: "is unchanged" },
                  { value: 2, label: "is decremented" },
                  { value: 3, label: "is incremented" },
                ]}
              />
              <SelectComponent
                label="Destination format"
                value={desByte(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    setDesByte(memory, channel.channelCtlAddress, value)
                  )
                }
                options={[
                  { value: 0, label: "Word" },
                  { value: 1, label: "Byte" },
                ]}
              />
              <InputNumber
                label="Destination address"
                value={desAddress(memory, channel.daAddress)}
                onChange={(value) =>
                  setMemory(setDesAddress(memory, channel.daAddress, value))
                }
              />
            </div>
          </div>
        );
      }}
    >
      <button className={styles.channel}>Channel DMA{index}</button>
    </Popover>
  );
}
DMAChannel.propTypes = {
  channel: PropTypes.shape({
    channelCtlAddress: PropTypes.number.isRequired,
    saAddress: PropTypes.number.isRequired,
    daAddress: PropTypes.number.isRequired,
    szAddress: PropTypes.number.isRequired,
  }),
  ctlAddress: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default DMAChannel;
