import { Popover } from "@varld/popover";
import dmachannel from "../../function/dma.func";
import styles from "./DMAChannel.module.css";
import { useMemory } from "../../context/memory.context";
import SelectComponent from "../common/SelectComponent";
import PropTypes from "prop-types";
import InputNumber from "../common/InputNumber";
import { channelOption } from "../../constant/dmachannel.const";
import { useEffect } from "react";

function DMAChannel({ channel, ctlAddress, index }) {
  const { memory, setMemory } = useMemory();
  useEffect(() => {}, []);
  return (
    <Popover
      popover={() => {
        return (
          <div className={styles.popover}>
            <div>
              <SelectComponent
                label="DMA enable"
                value={dmachannel.dmaen(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setDmaen(
                      memory,
                      channel.channelCtlAddress,
                      value
                    )
                  )
                }
                options={channelOption.dmaen}
              />
              <SelectComponent
                label="Trigger"
                value={dmachannel.trigger(memory, ctlAddress, index)}
                onChange={(value) => {
                  setMemory(
                    dmachannel.setTrigger(memory, ctlAddress, index, value)
                  );
                }}
                options={channelOption.trigger}
              />
              <SelectComponent
                label="Transfer mode"
                value={dmachannel.transferMode(
                  memory,
                  channel.channelCtlAddress
                )}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setTransferMode(
                      memory,
                      channel.channelCtlAddress,
                      value
                    )
                  )
                }
                options={channelOption.transferMode}
              />
            </div>
            <div>
              <SelectComponent
                label="Source address"
                value={dmachannel.srcInc(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setSrcInc(
                      memory,
                      channel.channelCtlAddress,
                      value
                    )
                  )
                }
                options={channelOption.increment}
              />
              <SelectComponent
                label="Source format"
                value={dmachannel.srcByte(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setSrcByte(
                      memory,
                      channel.channelCtlAddress,
                      value
                    )
                  )
                }
                options={channelOption.format}
              />
              <InputNumber
                label="Source address"
                value={dmachannel.srcAddress(memory, channel.saAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setSrcAddress(memory, channel.saAddress, value)
                  )
                }
              />
              <InputNumber
                label="Size"
                value={dmachannel.size(memory, channel.szAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setSize(memory, channel.szAddress, value)
                  )
                }
              />
            </div>
            <div>
              <SelectComponent
                label="Destination address"
                value={dmachannel.desInc(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setDesInc(
                      memory,
                      channel.channelCtlAddress,
                      value
                    )
                  )
                }
                options={channelOption.increment}
              />
              <SelectComponent
                label="Destination format"
                value={dmachannel.desByte(memory, channel.channelCtlAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setDesByte(
                      memory,
                      channel.channelCtlAddress,
                      value
                    )
                  )
                }
                options={channelOption.format}
              />
              <InputNumber
                label="Destination address"
                value={dmachannel.desAddress(memory, channel.daAddress)}
                onChange={(value) =>
                  setMemory(
                    dmachannel.setDesAddress(memory, channel.daAddress, value)
                  )
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
