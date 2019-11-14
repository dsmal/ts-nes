import Bus from '../bus/Bus';
import CpuFlags from './CpuFlags';

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

  clock() {}
  reset() {}
  irq() {}
  nmi() {}
  fetch(): number {
    return 0x00;
  }
}
