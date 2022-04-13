import {
  getBit,
  getByte,
  get16bitRegister,
  getWord,
  setBit,
  setByte,
  set16bitRegister,
  setWord,
} from "./memory.func";

const dma = {
  desAddress,
  desByte,
  desInc,
  dmaen,
  setDesAddress,
  setDesByte,
  setDesInc,
  setDmaen,
  setSize,
  setSrcAddress,
  setSrcByte,
  setSrcInc,
  setTransferMode,
  setTrigger,
  size,
  srcAddress,
  srcByte,
  srcInc,
  transferMode,
  trigger,
};

export default dma;
export function trigger(memory, dmactl0Address, channelIndex) {
  const registerValue = getWord(memory, dmactl0Address);
  const registerHexValue = (registerValue + 65536).toString(16);
  return parseInt(registerHexValue[4 - channelIndex], 16);
}

export function setTrigger(memory, dmactl0Address, channelIndex, value) {
  const registerValue = getWord(memory, dmactl0Address);
  let registerHexValue = (registerValue + 65536)
    .toString(16)
    .split("")
    .reverse()
    .slice(0, -1);
  const valueHex = value.toString(16);
  registerHexValue[channelIndex] = valueHex;
  const newRegisterValue = parseInt(registerHexValue.reverse().join(""), 16);
  return setWord(memory, dmactl0Address, newRegisterValue);
}

export function transferMode(memory, dmaxctlAddress) {
  const firstBit = getBit(memory, dmaxctlAddress, 12);
  const secondBit = getBit(memory, dmaxctlAddress, 13);
  const thirdBit = getBit(memory, dmaxctlAddress, 14);
  return 4 * thirdBit + 2 * secondBit + firstBit;
}

export function setTransferMode(memory, dmaxctlAddress, value) {
  const firstBit = value & 1;
  const secondBit = (value >> 1) & 1;
  const thirdBit = (value >> 2) & 1;
  let dmaxctlRegister = get16bitRegister(memory, dmaxctlAddress);
  dmaxctlRegister[12] = firstBit;
  dmaxctlRegister[13] = secondBit;
  dmaxctlRegister[14] = thirdBit;
  return set16bitRegister(memory, dmaxctlAddress, dmaxctlRegister);
}

export function desInc(memory, dmaxctlAddress) {
  const firstBit = getBit(memory, dmaxctlAddress, 10);
  const secondBit = getBit(memory, dmaxctlAddress, 11);
  return 2 * secondBit + firstBit;
}
export function setDesInc(memory, dmaxctlAddress, value) {
  const firstBit = value & 1;
  const secondBit = (value >> 1) & 1;
  let dmaxctlRegister = get16bitRegister(memory, dmaxctlAddress);
  dmaxctlRegister[10] = firstBit;
  dmaxctlRegister[11] = secondBit;
  return set16bitRegister(memory, dmaxctlAddress, dmaxctlRegister);
}

export function srcInc(memory, dmaxctlAddress) {
  const firstBit = getBit(memory, dmaxctlAddress, 8);
  const secondBit = getBit(memory, dmaxctlAddress, 9);
  return 2 * secondBit + firstBit;
}
export function setSrcInc(memory, dmaxctlAddress, value) {
  const firstBit = value % 2;
  const secondBit = ~~(value / 2);
  let dmaxctlRegister = get16bitRegister(memory, dmaxctlAddress);
  dmaxctlRegister[8] = firstBit;
  dmaxctlRegister[9] = secondBit;
  return set16bitRegister(memory, dmaxctlAddress, dmaxctlRegister);
}

export function desByte(memory, dmaxctlAddress) {
  return getBit(memory, dmaxctlAddress, 7);
}
export function setDesByte(memory, dmaxctlAddress, value) {
  return setBit(memory, dmaxctlAddress, 7, value);
}

export function srcByte(memory, dmaxctlAddress) {
  return getBit(memory, dmaxctlAddress, 6);
}
export function setSrcByte(memory, dmaxctlAddress, value) {
  return setBit(memory, dmaxctlAddress, 6, value);
}

export function dmaen(memory, dmaxctlAddress) {
  return getBit(memory, dmaxctlAddress, 4);
}
export function setDmaen(memory, dmaxctlAddress, value) {
  return setBit(memory, dmaxctlAddress, 4, value);
}

export function desAddress(memory, daAddress) {
  const firstWord = getWord(memory, daAddress);
  const secondWord = getWord(memory, daAddress + 2);
  return firstWord + secondWord * 65536;
}

export function setDesAddress(memory, daAddress, value) {
  return setWord(memory, daAddress, value);
}
export function srcAddress(memory, saAddress) {
  const firstWord = getWord(memory, saAddress);
  const secondWord = getWord(memory, saAddress + 2);
  return firstWord + secondWord * 65536;
}

export function setSrcAddress(memory, saAddress, value) {
  return setWord(memory, saAddress, value);
}
export function size(memory, szAddress) {
  return getWord(memory, szAddress);
}

export function setSize(memory, szAddress, value) {
  return setWord(memory, szAddress, value);
}

export function newAddress(increment, format, address) {
  if (increment === 2) return address - (2 - format);
  if (increment === 3) return address + (2 - format);
  else return address;
}

export function copyData(memory, srcByte, desByte, srcAddress, desAddress) {
  const src =
    srcByte === 1 ? getByte(memory, srcAddress) : getWord(memory, srcAddress);
  if (desByte === 1) memory = setByte(memory, desAddress, src);
  else setWord(memory, desAddress, src);
}
