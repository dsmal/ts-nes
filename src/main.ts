import './styles.scss';
import Bus from './bus/Bus';
import { disassemble } from './cpu/Disassembler';
import Flags from './cpu/Flags';
import { hex } from './utils';

const SPEED = 80;

let intervalHandler: number;
const getElement = (id: string): HTMLElement => {
  return <HTMLElement>document.querySelector(`#${id}`);
};

const bus = new Bus();
let disassembly: string[] = [];
const dom = {
  disasm: getElement('disasm'),
  c: getElement('flag-c'),
  z: getElement('flag-z'),
  i: getElement('flag-i'),
  d: getElement('flag-d'),
  b: getElement('flag-b'),
  u: getElement('flag-u'),
  v: getElement('flag-v'),
  n: getElement('flag-n'),
  pc: getElement('reg-pc'),
  stack: getElement('stack'),
  acc: getElement('reg-acc'),
  x: getElement('reg-x'),
  y: getElement('reg-y'),
  memory: getElement('memory'),
};

const loadTestProgram = () => {
  // tslint:disable-next-line
  const a = [0xA2, 0x0A, 0x8E, 0x00, 0x00, 0xA2, 0x03, 0x8E, 0x01, 0x00, 0xAC, 0x00, 0x00, 0xA9, 0x00, 0x18, 0x6D, 0x01, 0x00, 0x88, 0xD0, 0xFA, 0x8D, 0x02, 0x00, 0xEA, 0x4C, 0x19, 0x80];
  for (let i = 0; i < a.length; i += 1) {
    bus.ram[0x8000 + i] = a[i];
  }
  bus.ram[0xFFFC] = 0x00;
  bus.ram[0xFFFD] = 0x80;
  disassembly = disassemble(bus.cpu, 0x0000, bus.ram.length);
};

const displayProgram = () => {
  const delta = 8;
  const origin = disassembly[bus.cpu.pc];
  const before: string[] = [];
  let i = 0;
  let pc = bus.cpu.pc - 1;
  dom.disasm.innerHTML = '';
  while (i <= delta) {
    const line = disassembly[pc];
    if (line || pc < 0) {
      i += 1;
      before.push(line || '*');
    }
    pc -= 1;
  }
  before.reverse().map(b => dom.disasm.insertAdjacentHTML('beforeend', `<div>${b}</div>`));
  dom.disasm.insertAdjacentHTML('beforeend', `<div class='active'>${origin}</div>`);
  const after: string[] = [];
  i = 0;
  pc = bus.cpu.pc + 1;
  while (i <= delta && pc < bus.ram.length) {
    const line = disassembly[pc];
    if (line || pc >= bus.ram.length) {
      i += 1;
      after.push(line || '*');
    }
    pc += 1;
  }
  after.map(b => dom.disasm.insertAdjacentHTML('beforeend', `<div>${b}</div>`));
};

const displayFlags = () => {
  const a = 'active';
  dom.c.className = bus.cpu.getFlag(Flags.CarryBit) ? a : '';
  dom.z.className = bus.cpu.getFlag(Flags.Zero) ? a : '';
  dom.i.className = bus.cpu.getFlag(Flags.InterruptsDisable) ? a : '';
  dom.d.className = bus.cpu.getFlag(Flags.DecimalMode) ? a : '';
  dom.b.className = bus.cpu.getFlag(Flags.Break) ? a : '';
  dom.u.className = bus.cpu.getFlag(Flags.Unused) ? a : '';
  dom.v.className = bus.cpu.getFlag(Flags.Overflow) ? a : '';
  dom.n.className = bus.cpu.getFlag(Flags.Negative) ? a : '';
};

const displayRegs = () => {
  dom.pc.innerHTML = hex(bus.cpu.pc);
  dom.stack.innerHTML = hex(bus.cpu.stackPointer, 4);
  dom.acc.innerHTML = `${hex(bus.cpu.acc)} | ${bus.cpu.acc}`;
  dom.x.innerHTML = `${hex(bus.cpu.x)} | ${bus.cpu.x}`;
  dom.y.innerHTML = `${hex(bus.cpu.y)} | ${bus.cpu.y}`;
};

const displayMemoryPage = (start: number) => {
  const lineLength = 0x10;
  dom.memory.innerHTML = '';
  let html = '';
  for (let offset = start; offset - start <= 0xFF; offset += 1) {
    const value = hex(bus.ram[offset], 2, '');
    if (offset % lineLength === 0) {
      html += `</div><div>${hex(offset, 4)}: ${value}`;
    } else {
      html += ` ${value}`;
    }
  }
  dom.memory.innerHTML = html;
};

const render = () => {
  displayProgram();
  displayFlags();
  displayRegs();
  displayMemoryPage(0x00);
};

const clock = () => {
  do { bus.cpu.clock(); } while (!bus.cpu.ready);
  render();
};

const toggle = () => {
  if (!intervalHandler) {
    intervalHandler = setInterval(() => {
      bus.clock();
      bus.cpu.ready && render();
    }, SPEED);
  } else {
    clearInterval(intervalHandler);
    intervalHandler = 0;
  }
};

document.body.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 's': clock(); break;
    case 'r': bus.cpu.reset(); clock(); break;
    case ' ': toggle(); break;
  }
});

loadTestProgram();
bus.reset();
clock();
