import { useEffect, useState } from "react";
import Main from "./component/Main";
import { DMACTL0_ADDRESS, LIST_CHANNEL } from "./constant/dma.constant";
import initialMemory from "./constant/memory.constant";
import { LIST_TIMERA_BLOCK, TACTL_ADDRESS } from "./constant/timer.constant";
import { MemoryContext } from "./context/memory";
import {
  ccrValue,
  interruptEnabled,
  mode,
  outBit,
  outMode,
  setInterruptFlag,
  setPeriod,
  setRatio,
} from "./function/ccblock";
import {
  desAddress,
  desByte,
  desInc,
  setDmaen,
  size,
  srcAddress,
  srcByte,
  srcInc,
  transferMode,
  trigger,
} from "./function/dma";
import { getByte, getWord, setByte, setWord } from "./function/memory";
import { clockSource, counterMode, divider } from "./function/timer";
export default function App() {
  const [memory, setMemory] = useState(initialMemory);
  const [isRunning, setRunning] = useState(false);

  const handleStateChange = () => {
    setRunning(!isRunning);
  };

  useEffect(() => {
    let runningIntervalID = 0;
    if (isRunning) {
      runningIntervalID = setInterval(() => {
        updateTimer(setMemory, TACTL_ADDRESS, LIST_TIMERA_BLOCK);
      }, 100);
    } else {
      clearInterval(runningIntervalID);
    }
    return () => {
      clearInterval(runningIntervalID);
    };
  }, [isRunning]);

  return (
    <MemoryContext.Provider value={{ memory, setMemory }}>
      <Main
        memory={memory}
        state={isRunning}
        onStateChange={handleStateChange}
      />
    </MemoryContext.Provider>
  );
}
const updateTimer = (setMemory, ctlAddress, listCCBlock) => {
  setMemory((memory) => {
    console.time("timer");
    const newMemory = setCurrentTimer(memory, ctlAddress, listCCBlock);
    console.timeEnd("timer");
    return newMemory;
  });
};

const setCurrentTimer = (memory, ctlAddress, listCCBlock) => {
  let currentMemory = [...memory];
  const currentClockSource =
    clockSource(currentMemory, ctlAddress) === 1 ? 32000 : 1000000;
  const currentDivider = 2 ** divider(currentMemory, ctlAddress);
  const frequency = ~~(currentClockSource / currentDivider);
  const currentCounterMode = counterMode(currentMemory, ctlAddress);
  const ccr0Value = ccrValue(currentMemory, listCCBlock[0].blockRegAddress);
  if (currentCounterMode === 0) {
    // stop mode
  } else if (currentCounterMode === 1) {
    // up mode
    for (const block of listCCBlock) {
      const currentMode = mode(currentMemory, block.blockCtlAddress);
      const ccrBlockValue = ccrValue(currentMemory, block.blockRegAddress);
      if (currentMode === 0) {
        /* compare mode */
        if (
          listCCBlock.indexOf(block) === 0 &&
          [2, 3, 6, 7].includes(outMode(currentMemory, block.blockCtlAddress))
        ) {
          currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
          currentMemory = setPeriod(currentMemory, block.periodAddress, 0);
        } else {
          switch (outMode(currentMemory, block.blockCtlAddress)) {
            case 0:
              /* OUT bit value */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                1000
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                outBit(currentMemory, block.blockCtlAddress)
              );
              break;
            case 1:
              /* Set */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                1000
              );
              currentMemory = setRatio(currentMemory, block.ratioAddress, 1);

              break;
            case 2:
            /* Toggle/Reset */

            case 3:
              /* Set/Reset */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((1000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                1 - ccrBlockValue / ccr0Value
              );
              break;
            case 4:
              /* Toggle */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(currentMemory, block.ratioAddress, 0.5);

              break;
            case 5:
              /* Reset */
              currentMemory = setPeriod(currentMemory, block.periodAddress, 0);
              currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
              break;
            case 6:
            /* Toggle/set */
            case 7:
              /* Reset/set */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((1000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                ccrBlockValue / ccr0Value
              );
              break;

            default:
              break;
          }
        }
      } else {
        /* capture mode */
        if (interruptEnabled(currentMemory, block.blockCtlAddress))
          currentMemory = setInterruptFlag(
            currentMemory,
            block.blockCtlAddress,
            0
          );
      }
    }
  } else if (currentCounterMode === 2) {
    // continuous mode
    for (const block of listCCBlock) {
      const currentMode = mode(currentMemory, block.blockCtlAddress);
      const ccrBlockValue = ccrValue(currentMemory, block.blockRegAddress);
      if (currentMode === 0) {
        /* compare mode */
        if (
          listCCBlock.indexOf(block) === 0 &&
          [2, 3, 6, 7].includes(outMode(currentMemory, block.blockCtlAddress))
        ) {
          currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
          currentMemory = setPeriod(currentMemory, block.periodAddress, 0);
        } else {
          switch (outMode(currentMemory, block.blockCtlAddress)) {
            case 0:
              /* OUT bit value */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                1000
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                outBit(currentMemory, block.blockCtlAddress)
              );
              break;
            case 1:
              /* Set */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                1000
              );
              currentMemory = setRatio(currentMemory, block.ratioAddress, 1);
              break;
            case 2:
            /* Toggle/Reset */

            case 3:
              /* Set/Reset */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((1000 * 2 ** 16) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                Math.abs((ccr0Value - ccrBlockValue) / 2 ** 16)
              );
              break;
            case 4:
              /* Toggle */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * 2 ** 16) / frequency)
              );
              currentMemory = setRatio(currentMemory, block.ratioAddress, 0.5);
              break;
            case 5:
              /* Reset */
              currentMemory = setPeriod(currentMemory, block.periodAddress, 0);
              currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
              break;
            case 6:
            /* Toggle/set */
            case 7:
              /* Reset/set */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((1000 * 2 ** 16) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                Math.abs(1 - (ccr0Value - ccrBlockValue) / 2 ** 16)
              );
              break;

            default:
              break;
          }
        }
      } else {
        /* capture mode */
        if (interruptEnabled(currentMemory, block.blockCtlAddress))
          currentMemory = setInterruptFlag(
            currentMemory,
            block.blockCtlAddress,
            0
          );
      }
    }
  } else if (currentCounterMode === 3) {
    // up/down mode
    for (const block of listCCBlock) {
      const currentMode = mode(currentMemory, block.blockCtlAddress);
      const ccrBlockValue = ccrValue(currentMemory, block.blockRegAddress);
      if (currentMode === 0) {
        /* compare mode */
        if (
          listCCBlock.indexOf(block) === 0 &&
          [2, 3, 6, 7].includes(outMode(currentMemory, block.blockCtlAddress))
        ) {
          currentMemory = setPeriod(currentMemory, block.periodAddress, 0);
          currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
        } else {
          switch (outMode(currentMemory, block.blockCtlAddress)) {
            case 0:
              /* OUT bit value */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                1000
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                outBit(currentMemory, block.blockCtlAddress)
              );
              break;
            case 1:
              /* Set */

              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                1000
              );
              currentMemory = setRatio(currentMemory, block.ratioAddress, 1);
              break;
            case 2:
              /* Toggle/Reset */

              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                ccrBlockValue / ccr0Value
              );
              break;

            case 3:
              /* Set/Reset */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                0.5 + ccrBlockValue / (2 * ccr0Value)
              );
              break;
            case 4:
              /* Toggle */

              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                1 - ccrBlockValue / ccr0Value
              );
              break;
            case 5:
              /* Reset */
              currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
              currentMemory = setPeriod(currentMemory, block.periodAddress, 0);
              break;
            case 6:
              /* Toggle/set */

              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                1 - ccrBlockValue / ccr0Value
              );
              break;

            case 7:
              /* Reset/set */
              currentMemory = setPeriod(
                currentMemory,
                block.periodAddress,
                ~~((2000 * ccr0Value) / frequency)
              );
              currentMemory = setRatio(
                currentMemory,
                block.ratioAddress,
                0.5 - ccrBlockValue / (2 * ccr0Value)
              );
              break;

            default:
              break;
          }
        }
      } else {
        /* capture mode */
        if (interruptEnabled(currentMemory, block.blockCtlAddress))
          currentMemory = setInterruptFlag(
            currentMemory,
            block.blockCtlAddress,
            0
          );
      }
    }
  }
  return currentMemory;
};
function newAddress(increment, format, address) {
  if (increment === 2) return address - (2 - format);
  else if (increment === 3) return address + (2 - format);
  else return address;
}

function copyData(memory, dmaxctlAddress, srcAddress, desAddress, temp) {
  const src = srcByte(memory, dmaxctlAddress)
    ? getByte(memory, srcAddress)
    : getWord(memory, srcAddress);
  if (desByte(memory, dmaxctlAddress)) setByte(memory, desAddress, src);
  else setWord(memory, desAddress, src);
  temp.sz--;
  temp.sa = newAddress(
    srcInc(memory, dmaxctlAddress),
    srcByte(memory, dmaxctlAddress),
    temp.sa
  );
  temp.da = newAddress(
    desInc(memory, dmaxctlAddress),
    desByte(memory, dmaxctlAddress),
    temp.da
  );
}

function resetTemp(memory, temp, channel) {
  temp.sa = srcAddress(memory, channel.saAddress);
  temp.da = desAddress(memory, channel.daAddress);
  temp.sz = size(memory, channel.szAddress);
}
