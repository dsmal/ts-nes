import Bus from '../bus/Bus';
import Flags from './Flags';
import { address, operate, opCodes, AddressingMode } from './Instructions';

export default class Cpu {
  bus: Bus;
  flags: Flags = 0x00;
  acc = 0x00;
  x = 0x00;
  y = 0x00;
  stackPointer = 0x00;
  pc = 0x00;
  status = 0x00;

  fetched = 0x00;
  absoluteAddress = 0x0000;
  relativeAddress = 0x0000;
  opcode = 0x00;
  cycles = 0x00;

  constructor(bus: Bus) {
    this.bus = bus;
  }

  read(address: number) {
    return this.bus.read(address);
  }

  readPc(): number {
    const result = this.read(this.pc);
    this.pc += 1;
    return result;
  }

  write(address: number, data: number) {
    this.bus.write(address, data);
  }

  clock() {
    if (this.cycles === 0) {
      this.opcode = this.read(this.pc);
      const [operation, addressing, cycles] = opCodes[this.opcode];
      this.pc += 1;
      this.cycles += cycles + (address(addressing, this) & operate(operation, this));
    }
    this.cycles -= 1;
  }

  reset() {
    this.acc = 0;
    this.x = 0;
    this.y = 0;
    this.stackPointer = 0;
    this.status = 0x00 & Flags.Unused;

    this.absoluteAddress = 0xFFCC;
    const lo = this.read(this.absoluteAddress);
    const hi = this.read(this.absoluteAddress + 1);
    this.pc = (hi << 8) | lo;

    this.relativeAddress = 0x0000;
    this.absoluteAddress = 0x0000;
    this.fetched = 0x00;

    this.cycles = 8;
  }

  irq() {}
  nmi() {}

  setFlag(flag: Flags, value: number | boolean) {
    if (value) {
      this.flags |= flag;
    } else {
      this.flags &= ~flag;
    }
  }

  getFlag(flag: Flags): number {
    return (this.flags & flag) > 0 ? 1 : 0;
  }

  fetch(): number {
    if (opCodes[this.opcode][1] === AddressingMode.IMPLIED) {
      this.fetched = this.read(this.absoluteAddress);
    }
    return this.fetched;
  }
}
