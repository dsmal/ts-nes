import Cpu from './Cpu';
import { opCodes, AddressingMode, OperationType } from './Instructions';
import { hex } from '../utils';

export const disassemble = (cpu: Cpu, startAddress: number, endAddress: number): string[] => {
  let lineAddress = 0;
  let address = startAddress;
  const result = [];
  while (lineAddress < endAddress) {
    lineAddress = address;
    const operation = opCodes[cpu.read(address)];
    address += 1;
    const opType = operation ? operation[0] : OperationType.BRK;
    const addressing = operation ? operation[1] : AddressingMode.IMPLIED;
    let args;
    switch (addressing) {
      case AddressingMode.IMPLIED:
        args = '';
        break;
      case AddressingMode.IMMEDIATE: {
        const value = cpu.read(address);
        address += 1;
        args = `#${hex(value)} {IMM}`;
        break;
      }
      case AddressingMode.ZEROPAGE: {
        const lo = cpu.read(address);
        address += 1;
        args = `${hex(lo)} {ZP0}`;
        break;
      }
      case AddressingMode.ZEROPAGE_X: {
        const lo = cpu.read(address);
        address += 1;
        args = `${hex(lo)}, X {ZPX}`;
        break;
      }
      case AddressingMode.ZEROPAGE_Y: {
        const lo = cpu.read(address);
        address += 1;
        args = `${hex(lo)}, Y {ZPY}`;
        break;
      }
      case AddressingMode.INDIRECT_X: {
        const lo = cpu.read(address);
        address += 1;
        args = `(${hex(lo)}, X) {IZX}`;
        break;
      }
      case AddressingMode.INDIRECT_Y: {
        const lo = cpu.read(address);
        address += 1;
        args = `(${hex(lo)}, Y) {IZY}`;
        break;
      }
      case AddressingMode.ABSOLUTE: {
        const lo = cpu.read(address);
        address += 1;
        const hi = cpu.read(address);
        address += 1;
        args = `${hex((hi << 8) | lo, 4)} {ABS}`;
        break;
      }
      case AddressingMode.ABSOLUTE_X: {
        const lo = cpu.read(address);
        address += 1;
        const hi = cpu.read(address);
        address += 1;
        args = `${hex((hi << 8) | lo, 4)},X {ABX}`;
        break;
      }
      case AddressingMode.ABSOLUTE_Y: {
        const lo = cpu.read(address);
        address += 1;
        const hi = cpu.read(address);
        address += 1;
        args = `${hex((hi << 8) | lo, 4)},Y {ABY}`;
        break;
      }
      case AddressingMode.INDIRECT: {
        const lo = cpu.read(address);
        address += 1;
        const hi = cpu.read(address);
        address += 1;
        args = `(${hex((hi << 8) | lo, 4)}) {IND}`;
        break;
      }
      case AddressingMode.RELATIVE: {
        const value = cpu.read(address);
        address += 1;
        const rel = value < 0x80 ? value : value - 0x0100;
        args = `${hex(value)} [${hex(address + rel, 4)}] {REL}`;
        break;
      }
    }
    result[lineAddress] = `${hex(lineAddress, 4)}: ${OperationType[opType]} ${args}`;
  }
  return result;
};

export default Disassemble;
