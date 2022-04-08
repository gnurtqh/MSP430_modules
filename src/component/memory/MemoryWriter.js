import { Popover } from "@varld/popover";
import { MdEdit } from "react-icons/md";
import styles from "./Writer.module.css";
import PropTypes from "prop-types";
import InputNumber from "../common/InputNumber";
import { useState } from "react";
import SelectComponent from "../common/SelectComponent";
import { useMemory } from "../../context/memory";
import { setByte, setWord } from "../../function/memory";

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
                  address: ~~value > 10000 ? 10000 : ~~value,
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
MemoryWriter.propTypes = {};
export default MemoryWriter;
