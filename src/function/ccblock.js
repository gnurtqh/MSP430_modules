import {
  getBit,
  getRegister,
  getWord,
  setBit,
  setRegister,
  setWord,
} from "./memory";

export function taccrValue(memory, taccrAddress) {
  return getWord(memory, taccrAddress);
}

export function setTaccrValue(memory, taccrAddress, value) {
  return setWord(memory, taccrAddress, value);
}

export function captureMode(memory, tacctlAddress) {
  const firstBit = getBit(memory, tacctlAddress, 14);
  const secondBit = getBit(memory, tacctlAddress, 15);
  return 2 * secondBit + firstBit;
}

export function setCaptureMode(memory, tacctlAddress, value) {
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let tacctlRegister = getRegister(memory, tacctlAddress);
  tacctlRegister[14] = firstBit;
  tacctlRegister[15] = secondBit;
  return setRegister(memory, tacctlAddress, tacctlRegister);
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
  const firstBit = value % 2;
  const thirdBit = ~~(value / 4);
  const secondBit = (value - firstBit - 4 * thirdBit) / 2;
  let tacctlRegister = getRegister(memory, tacctlAddress);
  tacctlRegister[5] = firstBit;
  tacctlRegister[6] = secondBit;
  tacctlRegister[7] = thirdBit;
  return setRegister(memory, tacctlAddress, tacctlRegister);
}

export function interruptEnabled(memory, tacctlAddress) {
  return getBit(memory, tacctlAddress, 4);
}

export function setInterruptEnabled(memory, tacctlAddress, value) {
  return setBit(memory, tacctlAddress, 4, value);
}

export function interruptFlag(memory, tacctlAddress) {
  return getBit(memory, tacctlAddress, 0);
}

export function setInterruptFlag(memory, tacctlAddress, value) {
  return setBit(memory, tacctlAddress, 0, value);
}
