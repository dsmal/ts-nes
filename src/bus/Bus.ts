import Cpu from '../cpu/Cpu';

export default class Bus {
  cpu: Cpu = new Cpu(this);
  ram: Uint8Array = new Uint8Array(64 * 1024);
  clockConter = 0;

  read(address: number, readonly = false): number {
    if (address >= 0x000 && address <= 0xFFFF) {
      return this.ram[address];
    }
    return 0x00;
  }

  write(address: number, data: number) {
    if (address >= 0x0000 && address <= 0xFFFF) {
      this.ram[address] = data;
    }
  }

  reset() {
    this.cpu.reset();
    this.clockConter = 0;
  }

  clock() {
    this.cpu.clock();
    this.clockConter += 1;
  }
}
