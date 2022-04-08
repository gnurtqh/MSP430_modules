import { getBit, getRegister, getWord, setRegister, setWord } from "./memory";

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
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let tactlRegister = getRegister(memory, tactlAddress);
  tactlRegister[8] = firstBit;
  tactlRegister[9] = secondBit;
  return setRegister(memory, tactlAddress, tactlRegister);
}

export function divider(memory, tactlAddress) {
  const firstBit = getBit(memory, tactlAddress, 6);
  const secondBit = getBit(memory, tactlAddress, 7);
  return 2 * secondBit + firstBit;
}
export function setDivider(memory, tactlAddress, value) {
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let tactlRegister = getRegister(memory, tactlAddress);
  tactlRegister[6] = firstBit;
  tactlRegister[7] = secondBit;
  return setRegister(memory, tactlAddress, tactlRegister);
}
export function counterMode(memory, tactlAddress) {
  const firstBit = getBit(memory, tactlAddress, 4);
  const secondBit = getBit(memory, tactlAddress, 5);
  return 2 * secondBit + firstBit;
}

export function setCounterMode(memory, tactlAddress, value) {
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let tactlRegister = getRegister(memory, tactlAddress);
  tactlRegister[4] = firstBit;
  tactlRegister[5] = secondBit;
  return setRegister(memory, tactlAddress, tactlRegister);
}
