export function getWord(memory, address) {
  if (address % 2 || address < 256) return null;
  else {
    const firstByte = memory[address] || 0;
    const secondByte = memory[address + 1] || 0;
    return firstByte + 256 * secondByte;
  }
}

export function getByte(memory, address) {
  if ((address >= 256 && address <= 511) || address < 0) return null;
  else return memory[address] || 0;
}

export function getBit(memory, address, index) {
  if (index < 0 || index > 15 || address < 0) return null;
  else if (index >= 8 && index <= 15) {
    if (address < 256 || address % 2) return null;
    else {
      const word = getWord(memory, address);
      return (word >> index) & 1;
    }
  } else {
    if (address >= 256 && address <= 511) {
      const word = getWord(memory, address);
      return (word >> index) & 1;
    } else {
      const byte = getByte(memory, address);
      return (byte >> index) & 1;
    }
  }
}

export function getSliceMemory(memory, address, length) {
  const slice = [];
  for (let i = 0; i < length; i++) {
    slice.push(memory[address + i] || 0);
  }
  return slice;
}

export function getElementMemory(number) {
  const number8bit = number & 0xff;
  return (number8bit + 256).toString(2).split("").splice(1, 8).join("");
}

export function setWord(memory, address, value) {
  const tempMemory = [...memory];
  if (
    value >= 0 &&
    value <= 65535 &&
    address % 2 === 0 &&
    address >= 256 &&
    value !== null
  ) {
    tempMemory[address] = value & 0xff;
    tempMemory[address + 1] = (value & 0xffff) >> 8;
    console.log(value);
  }
  return tempMemory;
}

export function setByte(memory, address, value) {
  const tempMemory = [...memory];
  if (
    (address >= 256 && address <= 511) ||
    address < 0 ||
    value < 0 ||
    value === null ||
    value > 255
  )
    return tempMemory;
  else tempMemory[address] = value;
  return tempMemory;
}

export function get16bitRegister(memory, address) {
  const registerValue = getWord(memory, address);
  if (registerValue === null) return null;
  else
    return (registerValue + 65536).toString(2).split("").reverse().slice(0, -1);
}

export function set16bitRegister(memory, address, register) {
  const newRegisterValue = parseInt(register.reverse().join(""), 2);
  return setWord(memory, address, newRegisterValue);
}

export function get8bitRegister(memory, address) {
  const registerValue = getByte(memory, address);
  if (registerValue === null) return null;
  else
    return (registerValue + 256).toString(2).split("").reverse().slice(0, -1);
}

export function set8bitRegister(memory, address, register) {
  const newRegisterValue = ~~(register.reverse().join(""), 2);
  return setByte(memory, address, newRegisterValue);
}

export function setBit(memory, address, index, value) {
  const tempMemory = [...memory];
  if (index < 0 || index > 15 || address < 0) return tempMemory;
  else if (index >= 8 && index <= 15) {
    if (address < 256 || address % 2) return tempMemory;
    else {
      const word = getWord(memory, address);
      const newWord = value ? word | (1 << index) : word & ~(1 << index);
      return setWord(memory, address, newWord);
    }
  } else {
    if (address >= 256 && address <= 511) {
      const word = getWord(memory, address);
      const newWord = value ? word | (1 << index) : word & ~(1 << index);
      return setWord(memory, address, newWord);
    } else {
      const byte = getByte(memory, address);
      const newByte = value ? byte | (1 << index) : byte & ~(1 << index);
      return setByte(memory, address, newByte);
    }
  }
}
