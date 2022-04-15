import {
  ccrValue,
  getPeriodInterrupt,
  interruptEnabled,
  interruptFlag,
  mode,
  outBit,
  outMode,
  resetBlock,
  setInterruptFlag,
  setPeriod,
  setPeriodInterrupt,
  setRatio,
} from "./ccblock.func";
import {
  get16bitRegister,
  getBit,
  getWord,
  set16bitRegister,
  setWord,
} from "./memory.func";

const timer = {
  counterValue,
  setCounterValue,
  clockSource,
  setClockSource,
  divider,
  setDivider,
  counterMode,
  setCounterMode,
};
export default timer;
export function counterValue(memory, tarAddress) {
  return getWord(memory, tarAddress);
}

export function setCounterValue(memory, tarAddress, value) {
  return setWord(memory, tarAddress, value);
}

export function clockSource(memory, tactlAddress) {
  const firstBit = getBit(memory, tactlAddress, 8);
  const secondBit = getBit(memory, tactlAddress, 9);
  return 2 * secondBit + firstBit;
}

export function setClockSource(memory, tactlAddress, value) {
  const firstBit = value & 1;
  const secondBit = (value >> 1) & 1;
  let ctlRegister = get16bitRegister(memory, tactlAddress);
  ctlRegister[8] = firstBit;
  ctlRegister[9] = secondBit;
  return set16bitRegister(memory, tactlAddress, ctlRegister);
}

export function divider(memory, tactlAddress) {
  const firstBit = getBit(memory, tactlAddress, 6);
  const secondBit = getBit(memory, tactlAddress, 7);
  return 2 * secondBit + firstBit;
}
export function setDivider(memory, tactlAddress, value) {
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let ctlRegister = get16bitRegister(memory, tactlAddress);
  ctlRegister[6] = firstBit;
  ctlRegister[7] = secondBit;
  return set16bitRegister(memory, tactlAddress, ctlRegister);
}
export function counterMode(memory, tactlAddress) {
  const firstBit = getBit(memory, tactlAddress, 4);
  const secondBit = getBit(memory, tactlAddress, 5);
  return 2 * secondBit + firstBit;
}

export function setCounterMode(memory, tactlAddress, value) {
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let ctlRegister = get16bitRegister(memory, tactlAddress);
  ctlRegister[4] = firstBit;
  ctlRegister[5] = secondBit;
  return set16bitRegister(memory, tactlAddress, ctlRegister);
}

export function updateTimer(listCCBlock, ctlAddress, setMemory, scale) {
  setMemory((memory) => {
    let currentMemory = [...memory];
    const currentClockSource =
      clockSource(currentMemory, ctlAddress) === 1 ? 32000 : 1000000;
    const currentDivider = 2 ** divider(currentMemory, ctlAddress);
    const frequency = ~~((currentClockSource * 2 ** scale) / currentDivider);
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
          currentMemory = setPeriodInterrupt(
            currentMemory,
            block.periodIntrAddress,
            interruptEnabled(currentMemory, block.blockCtlAddress)
              ? ~~((1000 * ccr0Value) / frequency)
              : 0
          );
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
              // eslint-disable-next-line
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

                currentMemory = setRatio(
                  currentMemory,
                  block.ratioAddress,
                  0.5
                );

                break;
              case 5:
                /* Reset */
                currentMemory = setPeriod(
                  currentMemory,
                  block.periodAddress,
                  0
                );
                currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
                break;
              case 6:
              /* Toggle/set */
              // eslint-disable-next-line
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
          // if (interruptEnabled(currentMemory, block.blockCtlAddress))
          //   currentMemory = setInterruptFlag(
          //     currentMemory,
          //     block.blockCtlAddress,
          //     0
          //   );
        }
      }
    } else if (currentCounterMode === 2) {
      // continuous mode
      for (const block of listCCBlock) {
        const currentMode = mode(currentMemory, block.blockCtlAddress);
        const ccrBlockValue = ccrValue(currentMemory, block.blockRegAddress);
        if (currentMode === 0) {
          /* compare mode */
          currentMemory = setPeriodInterrupt(
            currentMemory,
            block.periodIntrAddress,
            interruptEnabled(currentMemory, block.blockCtlAddress)
              ? ~~((1000 * 2 ** 16) / frequency)
              : 0
          );
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
              // eslint-disable-next-line
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
                currentMemory = setRatio(
                  currentMemory,
                  block.ratioAddress,
                  0.5
                );
                break;
              case 5:
                /* Reset */
                currentMemory = setPeriod(
                  currentMemory,
                  block.periodAddress,
                  0
                );
                currentMemory = setRatio(currentMemory, block.ratioAddress, 0);
                break;
              case 6:
              /* Toggle/set */
              // eslint-disable-next-line
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
                  1 - Math.abs((ccr0Value - ccrBlockValue) / 2 ** 16)
                );
                break;

              default:
                break;
            }
          }
        } else {
          /* capture mode */
          // if (interruptEnabled(currentMemory, block.blockCtlAddress))
          //   currentMemory = setInterruptFlag(
          //     currentMemory,
          //     block.blockCtlAddress,
          //     0
          //   );
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
                currentMemory = setPeriod(
                  currentMemory,
                  block.periodAddress,
                  0
                );
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
          // if (interruptEnabled(currentMemory, block.blockCtlAddress))
          //   currentMemory = setInterruptFlag(
          //     currentMemory,
          //     block.blockCtlAddress,
          //     0
          //   );
        }
      }
    }

    return currentMemory;
  });
}
export function resetTimerBlock(memory, listCCBlock) {
  let newMemory = [...memory];
  for (const block of listCCBlock) {
    newMemory = resetBlock(newMemory, block);
  }
  return newMemory;
}
