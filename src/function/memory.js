export function getRegister(memory, address) {
  const registerValue = getWord(memory, address);
  return (registerValue + 65536).toString(2).split("").reverse().slice(0, -1);
}

export function getWord(memory, address) {
  if (address % 2 !== 0) return undefined;
  else {
    const firstByte = memory[address] || 0;
    const secondByte = memory[address + 1] || 0;
    return firstByte + 256 * secondByte;
  }
}

export function getByte(memory, address) {
  return memory[address] || 0;
}

export function getBit(memory, address, index) {
  if (address % 2 === 1) return ~~getRegister(memory, address - 1)[index + 8];
  else return ~~getRegister(memory, address)[index];
}

export function getSlice(memory, start, length) {
  const tmp = [];
  for (let i = 0; i < length; i++) {
    tmp.push(getByte(memory, start + i));
  }
  return tmp;
}

export function setWord(memory, address, value) {
  const tempMemory = [...memory];
  if (value > 65535 || address % 2 !== 0) return tempMemory;
  else {
    tempMemory[address] = value % 256;
    tempMemory[address + 1] = ~~((value % 65536) / 256);
  }
  return tempMemory;
}

export function setByte(memory, address, value) {
  const tempMemory = [...memory];
  tempMemory[address] = value % 256;
  return tempMemory;
}

export function setRegister(memory, address, register) {
  const newRegisterValue = parseInt(register.reverse().join(""), 2);
  return setWord(memory, address, newRegisterValue);
}

export function setBit(memory, address, index, value) {
  const tmpAddress = address % 2 === 1 ? address - 1 : address;
  const tmpIndex = address % 2 === 1 ? index + 8 : index;
  const register = getRegister(memory, tmpAddress);
  register[tmpIndex] = value;
  return setRegister(memory, tmpAddress, register);
}
