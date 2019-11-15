import Bus from '../bus/Bus';
import CpuFlags from './CpuFlags';
import { AddressingMode, OperationType, address, opCodes, operate } from './Instructions';

export default class Cpu {
  bus: Bus;
  flags: CpuFlags = 0x00;
  acc = 0x00;
  x = 0x00;
  y = 0x00;
  stackPointer = 0x00;
  programCounter = 0x00;
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

  write(address: number, data: number) {
    this.bus.write(address, data);
  }

  clock() {
    if (this.cycles === 0) {
      this.opcode = this.read(this.programCounter);
      const [operation, addressing, cycles] = opCodes[this.opcode];
      this.programCounter += 1;
      this.cycles += (address(addressing, this) & operate(operation, this));
    }
    this.cycles -= 1;
  }

  reset() {}
  irq() {}
  nmi() {}
  fetch(): number {
    return 0x00;
  }
}
