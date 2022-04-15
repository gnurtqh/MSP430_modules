import { Popover } from "@varld/popover";
import { useEffect, useRef } from "react";
import { channelOption } from "../../constant/dmachannel.const";
import { useMemory } from "../../context/memory.context";
import {
  getPeriodInterrupt,
  interruptFlag,
  mode,
} from "../../function/ccblock.func";
import dmachannel, {
  desAddress,
  resetTemp,
  size,
  srcAddress,
  transfer,
  trigger,
} from "../../function/dma.func";
import InputNumber from "../common/InputNumber";
import SelectComponent from "../common/SelectComponent";
import styles from "./DMAChannel.module.css";

function DMAChannel({ channel, ctlAddress, index, state }) {
  const { memory, setMemory } = useMemory();

  const triggerBlock = channelOption.trigger.find(
    (item) => item.value === trigger(memory, ctlAddress, index)
  ).block;

  let tempSA = useRef(srcAddress(memory, channel.saAddress));
  let tempDA = useRef(desAddress(memory, channel.daAddress));
  let tempSZ = useRef(size(memory, channel.szAddress));
  let intervalTransferId = useRef(null);
  let intervalTriggerId = useRef(null);

  useEffect(() => {
    if (state) {
      if (mode(memory, triggerBlock.blockCtlAddress)) {
        /* Capture mode */
        if (interruptFlag(memory, triggerBlock.blockCtlAddress)) {
          console.log("Interrupt");
          setMemory((mem) =>
            transfer(mem, channel, tempSA, tempDA, tempSZ, intervalTransferId)
          );
        }
      } else {
        /* Compare mode*/
        if (getPeriodInterrupt(memory, triggerBlock.periodIntrAddress)) {
          intervalTriggerId.current = setInterval(() => {
            console.log(tempDA.current, tempSZ.current, tempSA.current);
            setMemory((mem) =>
              transfer(mem, channel, tempSA, tempDA, tempSZ, intervalTransferId)
            );
          }, getPeriodInterrupt(memory, triggerBlock.periodIntrAddress));
        }
      }
    } else {
      clearInterval(intervalTransferId.current);
      clearInterval(intervalTriggerId.current);
      resetTemp(tempSA, tempDA, tempSZ, memory, channel);
    }

    return () => clearInterval(intervalTriggerId.current);
  }, [
    state,
    getPeriodInterrupt(memory, triggerBlock.periodIntrAddress),
    interruptFlag(memory, triggerBlock.blockCtlAddress),
  ]);
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
                onChange={(value) => {
                  const valueNum = ~~value;
                  if (valueNum < 2 ** 16) tempSA.current = valueNum;
                  setMemory(
                    dmachannel.setSrcAddress(
                      memory,
                      channel.saAddress,
                      valueNum
                    )
                  );
                }}
              />
              <InputNumber
                label="Size"
                value={dmachannel.size(memory, channel.szAddress)}
                onChange={(value) => {
                  const valueNum = ~~value;
                  if (valueNum < 2 ** 16) tempSZ.current = valueNum;
                  setMemory(
                    dmachannel.setSize(memory, channel.szAddress, valueNum)
                  );
                }}
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
                onChange={(value) => {
                  const valueNum = ~~value;
                  if (valueNum < 2 ** 16) tempDA.current = valueNum;
                  setMemory(
                    dmachannel.setDesAddress(
                      memory,
                      channel.daAddress,
                      valueNum
                    )
                  );
                }}
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

export default DMAChannel;
