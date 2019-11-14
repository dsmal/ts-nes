import Bus from './Bus';

export default class Cpu {
  constructor(bus: Bus) {
    this.bus = bus;
  }

  bus: Bus;

  read(address: number) {
    return this.bus.read(address);
  }

  write(address: number, data: number) {
    this.bus.write(address, data);
  }
}
