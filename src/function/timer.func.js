import {
  getBit,
  get16bitRegister,
  getWord,
  set16bitRegister,
  setWord,
} from "./memory.func";

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
