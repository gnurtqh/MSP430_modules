import { Popover } from "@varld/popover";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useMemory } from "../../context/memory";
import { setByte, setWord } from "../../function/memory";
import InputNumber from "../common/InputNumber";
import SelectComponent from "../common/SelectComponent";
import styles from "./Writer.module.css";

function MemoryWriter() {
  const { memory, setMemory } = useMemory();
  const [element, setElement] = useState({ address: 0, value: 0, byte: 0 });
  return (
    <Popover
      popover={({ close }) => {
        return (
          <div className="popover">
            <InputNumber
              label="Address"
              value={element.address}
              onChange={(value) =>
                setElement({
                  ...element,
                  address: ~~value > 65535 ? 65535 : ~~value,
                })
              }
            />
            <InputNumber
              label="Value"
              value={element.value}
              onChange={(value) => {
                const max = element.byte === 1 ? 255 : 65535;
                setElement({
                  ...element,
                  value: ~~value > max ? max : ~~value,
                });
              }}
            />
            <SelectComponent
              label="Format"
              value={element.byte}
              onChange={(value) => {
                const max = value === 1 ? 255 : 65535;
                setElement({
                  ...element,
                  byte: value,
                  value: element.value > max ? max : element.value,
                });
              }}
              options={[
                { value: 0, label: "Word" },
                { value: 1, label: "Byte" },
              ]}
            />
            <button
              className={styles.savebtn}
              onClick={() => {
                setMemory(
                  element.byte
                    ? setByte(memory, element.address, element.value)
                    : setWord(memory, element.address, element.value)
                );
                close();
              }}
            >
              Save
            </button>
          </div>
        );
      }}
    >
      <button className={styles.writebtn}>
        <MdEdit size={16} />
      </button>
    </Popover>
  );
}
export default MemoryWriter;
