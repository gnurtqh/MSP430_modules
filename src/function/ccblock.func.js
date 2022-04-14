import {
  getBit,
  get16bitRegister,
  getWord,
  setBit,
  set16bitRegister,
  setWord,
} from "./memory.func";
const block = {
  ccrValue,
  setCcrValue,
  captureMode,
  setCaptureMode,
  mode,
  setMode,
  outMode,
  setOutMode,
  outBit,
  setOutBit,
  interruptEnabled,
  setInterruptEnabled,
  interruptFlag,
  setInterruptFlag,
  getPeriod,
  setPeriod,
  getRatio,
  setRatio,
  getPeriodInterrupt,
  setPeriodInterrupt,
  resetBlock,
};

export default block;

export function ccrValue(memory, taccrAddress) {
  return getWord(memory, taccrAddress);
}

export function setCcrValue(memory, taccrAddress, value) {
  return setWord(memory, taccrAddress, value);
}

export function captureMode(memory, tacctlAddress) {
  const firstBit = getBit(memory, tacctlAddress, 14);
  const secondBit = getBit(memory, tacctlAddress, 15);
  return 2 * secondBit + firstBit;
}

export function setCaptureMode(memory, tacctlAddress, value) {
  const firstBit = value & 1;
  const secondBit = (value >> 1) & 1;
  let tacctlRegister = get16bitRegister(memory, tacctlAddress);
  tacctlRegister[14] = firstBit;
  tacctlRegister[15] = secondBit;
  return set16bitRegister(memory, tacctlAddress, tacctlRegister);
}

export function mode(memory, tacctlAddress) {
  return getBit(memory, tacctlAddress, 8);
}

export function setMode(memory, tacctlAddress, value) {
  return setBit(memory, tacctlAddress, 8, value);
}

export function outMode(memory, tacctlAddress) {
  const firstBit = getBit(memory, tacctlAddress, 5);
  const secondBit = getBit(memory, tacctlAddress, 6);
  const thirdBit = getBit(memory, tacctlAddress, 7);
  return 4 * thirdBit + 2 * secondBit + firstBit;
}

export function setOutMode(memory, tacctlAddress, value) {
  const firstBit = value & 1;
  const secondBit = (value >> 1) & 1;
  const thirdBit = (value >> 2) & 1;
  let tacctlRegister = get16bitRegister(memory, tacctlAddress);
  tacctlRegister[5] = firstBit;
  tacctlRegister[6] = secondBit;
  tacctlRegister[7] = thirdBit;
  return set16bitRegister(memory, tacctlAddress, tacctlRegister);
}

export function interruptEnabled(memory, tacctlAddress) {
  return getBit(memory, tacctlAddress, 4);
}

export function setInterruptEnabled(memory, tacctlAddress, value) {
  return setBit(memory, tacctlAddress, 4, value);
}

export function outBit(memory, tacctlAddress) {
  return getBit(memory, tacctlAddress, 2);
}

export function setOutBit(memory, tacctlAddress, value) {
  return setBit(memory, tacctlAddress, 2, value);
}

export function interruptFlag(memory, tacctlAddress) {
  return getBit(memory, tacctlAddress, 0);
}

export function setInterruptFlag(memory, tacctlAddress, value) {
  return setBit(memory, tacctlAddress, 0, value);
}

// temp value

export function getRatio(memory, ratioAddress) {
  return getWord(memory, ratioAddress) / 1000;
}

export function setRatio(memory, ratioAddress, value) {
  return setWord(memory, ratioAddress, ~~(1000 * value));
}

export function getPeriod(memory, periodAddress) {
  const firstWord = getWord(memory, periodAddress);
  const secondWord = getWord(memory, periodAddress + 2);
  return (secondWord << 16) + firstWord;
}

export function setPeriod(memory, periodAddress, value) {
  const newMemory = setWord(memory, periodAddress, value & 0xffff);
  return setWord(newMemory, periodAddress + 2, (value >> 16) & 0xffff);
}

export function getPeriodInterrupt(memory, periodIntrAddress) {
  const firstWord = getWord(memory, periodIntrAddress);
  const secondWord = getWord(memory, periodIntrAddress + 2);
  return (secondWord << 16) + firstWord;
}

export function setPeriodInterrupt(memory, periodIntrAddress, value) {
  const newMemory = setWord(memory, periodIntrAddress, value & 0xffff);
  return setWord(newMemory, periodIntrAddress + 2, (value >> 16) & 0xffff);
}

export function resetBlock(memory, block) {
  let newMemory = setRatio(memory, block.ratioAddress, 0);
  newMemory = setPeriod(newMemory, block.periodAddress, 0);
  newMemory = setPeriodInterrupt(newMemory, block.periodIntrAddress, 0);
  return newMemory;
}
