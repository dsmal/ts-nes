import Cpu from './Cpu';
import Flags from './Flags';

export const enum AddressingMode {
  IMPLIED,
  ACCUMULATOR,
  IMMEDIATE,
  ZEROPAGE,
  ZEROPAGE_X,
  ZEROPAGE_Y,
  ABSOLUTE,
  ABSOLUTE_X,
  ABSOLUTE_Y,
  INDIRECT,
  INDIRECT_X,
  INDIRECT_Y,
  RELATIVE,
}

export const enum OperationType {
  NOP, LDA, STA, LDX, STX, LDY, STY, TAX,
  TAY, TXA, TYA, TXS, TSX, ADC, SBC, INX,
  INY, INC, DEX, DEY, DEC, AND, ORA, EOR,
  ROL, ROR, ASL, LSR, BIT, CMP, CPX, CPY,
  JMP, JSR, RTS, RTI, BCC, BCS, BPL, BMI,
  BNE, BEQ, BVC, BVS, PHA, PHP, PLA, PLP,
  CLC, SEC, SEI, CLI, CLV, SED, CLD, BRK,
}

export const opCodes: { [key: number]: number[] }  = {
  0x00: [OperationType.BRK, AddressingMode.IMPLIED, 7],
  0x01: [OperationType.ORA, AddressingMode.INDIRECT, 6],
  0x05: [OperationType.ORA, AddressingMode.ZEROPAGE, 3],
  0x06: [OperationType.ASL, AddressingMode.ZEROPAGE, 5],
  0x08: [OperationType.PHP, AddressingMode.IMPLIED, 3],
  0x09: [OperationType.ORA, AddressingMode.IMMEDIATE, 2],
  0x0A: [OperationType.ASL, AddressingMode.ACCUMULATOR, 2],
  0x0D: [OperationType.ORA, AddressingMode.ABSOLUTE, 4],
  0x0E: [OperationType.ASL, AddressingMode.ABSOLUTE, 6],

  0x10: [OperationType.BPL, AddressingMode.RELATIVE, 2], // **
  0x11: [OperationType.ORA, AddressingMode.INDIRECT_Y, 5], // *
  0x15: [OperationType.ORA, AddressingMode.ZEROPAGE_X, 4],
  0x16: [OperationType.ASL, AddressingMode.ZEROPAGE_X, 6],
  0x18: [OperationType.CLC, AddressingMode.IMPLIED, 2],
  0x19: [OperationType.ORA, AddressingMode.ABSOLUTE_Y, 4], // *
  0x1D: [OperationType.ORA, AddressingMode.ABSOLUTE_X, 4], // *
  0x1E: [OperationType.ASL, AddressingMode.ABSOLUTE_X, 7],

  0x20: [OperationType.JSR, AddressingMode.ABSOLUTE, 6],
  0x21: [OperationType.AND, AddressingMode.INDIRECT_X, 6],
  0x24: [OperationType.BIT, AddressingMode.ZEROPAGE, 3],
  0x25: [OperationType.AND, AddressingMode.ZEROPAGE, 3],
  0x26: [OperationType.ROL, AddressingMode.ZEROPAGE, 5],
  0x28: [OperationType.PLP, AddressingMode.IMPLIED, 4],
  0x29: [OperationType.AND, AddressingMode.IMMEDIATE, 2],
  0x2A: [OperationType.ROL, AddressingMode.ACCUMULATOR, 2],
  0x2C: [OperationType.BIT, AddressingMode.ABSOLUTE, 4],
  0x2D: [OperationType.AND, AddressingMode.ABSOLUTE, 4],
  0x2E: [OperationType.ROL, AddressingMode.ABSOLUTE, 6],

  0x30: [OperationType.BMI, AddressingMode.RELATIVE, 2], // *
  0x31: [OperationType.AND, AddressingMode.INDIRECT_Y, 5], // *
  0x35: [OperationType.AND, AddressingMode.ZEROPAGE_X, 4],
  0x36: [OperationType.ROL, AddressingMode.ZEROPAGE_X, 6],
  0x38: [OperationType.SEC, AddressingMode.IMPLIED, 2],
  0x39: [OperationType.AND, AddressingMode.ABSOLUTE_Y, 4], // *
  0x3D: [OperationType.AND, AddressingMode.ABSOLUTE_X, 4], // *
  0x3E: [OperationType.ROL, AddressingMode.ABSOLUTE_X, 7],

  0x40: [OperationType.RTI, AddressingMode.IMPLIED, 6],
  0x41: [OperationType.EOR, AddressingMode.INDIRECT_X, 6],
  0x45: [OperationType.EOR, AddressingMode.ZEROPAGE, 3],
  0x46: [OperationType.LSR, AddressingMode.ZEROPAGE, 5],
  0x48: [OperationType.PHA, AddressingMode.IMPLIED, 3],
  0x49: [OperationType.EOR, AddressingMode.IMMEDIATE, 2],
  0x4A: [OperationType.LSR, AddressingMode.ACCUMULATOR, 2],
  0x4C: [OperationType.JMP, AddressingMode.ABSOLUTE, 3],
  0x4D: [OperationType.EOR, AddressingMode.ABSOLUTE, 4],
  0x4E: [OperationType.LSR, AddressingMode.ABSOLUTE, 6],

  0x50: [OperationType.BVC, AddressingMode.RELATIVE, 2], // **
  0x51: [OperationType.EOR, AddressingMode.INDIRECT_Y, 5], // *
  0x55: [OperationType.EOR, AddressingMode.ZEROPAGE_X, 4],
  0x56: [OperationType.LSR, AddressingMode.ZEROPAGE_X, 6],
  0x58: [OperationType.CLI, AddressingMode.IMPLIED, 2],
  0x59: [OperationType.EOR, AddressingMode.ABSOLUTE_Y, 4], // *
  0x5D: [OperationType.EOR, AddressingMode.ABSOLUTE_X, 4], // *
  0x5E: [OperationType.LSR, AddressingMode.ABSOLUTE_X, 7],

  0x60: [OperationType.RTS, AddressingMode.IMPLIED, 6],
  0x61: [OperationType.ADC, AddressingMode.INDIRECT_X, 6],
  0x65: [OperationType.ADC, AddressingMode.ZEROPAGE, 3],
  0x66: [OperationType.ROR, AddressingMode.ZEROPAGE, 5],
  0x68: [OperationType.PLA, AddressingMode.IMPLIED, 4],
  0x69: [OperationType.ADC, AddressingMode.IMMEDIATE, 2],
  0x6A: [OperationType.ROR, AddressingMode.ACCUMULATOR, 2],
  0x6C: [OperationType.JMP, AddressingMode.INDIRECT, 5],
  0x6D: [OperationType.ADC, AddressingMode.ABSOLUTE, 4],
  0x6E: [OperationType.ROR, AddressingMode.ABSOLUTE, 6],

  0x70: [OperationType.BVS, AddressingMode.RELATIVE, 2], // **
  0x71: [OperationType.ADC, AddressingMode.INDIRECT_Y, 5], // *
  0x75: [OperationType.ADC, AddressingMode.ZEROPAGE_X, 4],
  0x78: [OperationType.SEI, AddressingMode.IMPLIED, 2],
  0x79: [OperationType.ADC, AddressingMode.ABSOLUTE_Y, 4], // *
  0x7D: [OperationType.ADC, AddressingMode.ABSOLUTE_X, 4], // *
  0x7E: [OperationType.ROR, AddressingMode.ABSOLUTE_X, 7],

  0x81: [OperationType.STA, AddressingMode.INDIRECT_X, 6],
  0x84: [OperationType.STY, AddressingMode.ZEROPAGE, 3],
  0x85: [OperationType.STA, AddressingMode.ZEROPAGE, 3],
  0x86: [OperationType.STX, AddressingMode.ZEROPAGE, 3],
  0x88: [OperationType.DEY, AddressingMode.IMPLIED, 2],
  0x8A: [OperationType.TXA, AddressingMode.IMPLIED, 2],
  0x8C: [OperationType.STY, AddressingMode.ABSOLUTE, 4],
  0x8D: [OperationType.STA, AddressingMode.ABSOLUTE, 4],
  0x8E: [OperationType.STX, AddressingMode.ABSOLUTE, 4],

  0x90: [OperationType.BCC, AddressingMode.RELATIVE, 2], // **
  0x91: [OperationType.STA, AddressingMode.INDIRECT_Y, 6],
  0x94: [OperationType.STY, AddressingMode.ZEROPAGE_X, 4],
  0x95: [OperationType.STA, AddressingMode.ZEROPAGE_X, 4],
  0x96: [OperationType.STX, AddressingMode.ZEROPAGE_Y, 4],
  0x98: [OperationType.TYA, AddressingMode.IMPLIED, 2],
  0x99: [OperationType.STA, AddressingMode.ABSOLUTE_Y, 5],
  0x9A: [OperationType.TXS, AddressingMode.IMPLIED, 2],
  0x9D: [OperationType.STA, AddressingMode.ABSOLUTE_X, 5],

  0xA0: [OperationType.LDY, AddressingMode.IMMEDIATE, 2],
  0xA1: [OperationType.LDA, AddressingMode.INDIRECT_X, 6],
  0xA2: [OperationType.LDX, AddressingMode.IMMEDIATE, 2],
  0xA4: [OperationType.LDY, AddressingMode.ZEROPAGE, 3],
  0xA5: [OperationType.LDA, AddressingMode.ZEROPAGE, 3],
  0xA6: [OperationType.LDX, AddressingMode.ZEROPAGE, 3],
  0xA8: [OperationType.TAY, AddressingMode.IMPLIED, 2],
  0xA9: [OperationType.LDA, AddressingMode.IMMEDIATE, 2],
  0xAA: [OperationType.TAX, AddressingMode.IMPLIED, 2],
  0xAC: [OperationType.LDY, AddressingMode.ABSOLUTE, 4],
  0xAD: [OperationType.LDA, AddressingMode.ABSOLUTE, 4],
  0xAE: [OperationType.LDX, AddressingMode.ABSOLUTE, 4],

  0xB0: [OperationType.BCS, AddressingMode.RELATIVE, 2], // **
  0xB1: [OperationType.LDA, AddressingMode.INDIRECT_Y, 5], // *
  0xB4: [OperationType.LDY, AddressingMode.ZEROPAGE_X, 4],
  0xB5: [OperationType.LDA, AddressingMode.ZEROPAGE_X, 4],
  0xB6: [OperationType.LDX, AddressingMode.ZEROPAGE_Y, 4],
  0xB8: [OperationType.CLV, AddressingMode.IMPLIED, 2],
  0xB9: [OperationType.LDA, AddressingMode.ABSOLUTE_Y, 4], // *
  0xBA: [OperationType.TSX, AddressingMode.IMPLIED, 2], // *
  0xBC: [OperationType.LDY, AddressingMode.ABSOLUTE_X, 4], // *
  0xBD: [OperationType.LDA, AddressingMode.ABSOLUTE_X, 4], // *
  0xBE: [OperationType.LDX, AddressingMode.ABSOLUTE_Y, 4], // *

  0xC0: [OperationType.CPY, AddressingMode.IMMEDIATE, 2],
  0xC1: [OperationType.CMP, AddressingMode.INDIRECT_X, 6],
  0xC4: [OperationType.CPY, AddressingMode.ZEROPAGE, 3],
  0xC5: [OperationType.CMP, AddressingMode.ZEROPAGE, 3],
  0xC6: [OperationType.DEC, AddressingMode.ZEROPAGE, 5],
  0xC8: [OperationType.INY, AddressingMode.IMPLIED, 2],
  0xC9: [OperationType.CMP, AddressingMode.IMMEDIATE, 2],
  0xCA: [OperationType.DEX, AddressingMode.IMPLIED, 2],
  0xCC: [OperationType.CPY, AddressingMode.ABSOLUTE, 4],
  0xCD: [OperationType.CMP, AddressingMode.ABSOLUTE, 4],
  0xCE: [OperationType.DEC, AddressingMode.ABSOLUTE, 6],

  0xD0: [OperationType.BNE, AddressingMode.RELATIVE, 2], // **
  0xD1: [OperationType.CMP, AddressingMode.INDIRECT_Y, 5], // *
  0xD5: [OperationType.CMP, AddressingMode.ZEROPAGE_X, 4],
  0xD6: [OperationType.DEC, AddressingMode.ZEROPAGE_X, 6],
  0xD8: [OperationType.CLD, AddressingMode.IMPLIED, 2],
  0xD9: [OperationType.CMP, AddressingMode.ABSOLUTE_Y, 4], // *
  0xDD: [OperationType.CMP, AddressingMode.ABSOLUTE_X, 4], // *
  0xDE: [OperationType.DEC, AddressingMode.ABSOLUTE_X, 7],

  0xE0: [OperationType.CPX, AddressingMode.IMMEDIATE, 2],
  0xE1: [OperationType.SBC, AddressingMode.INDIRECT_X, 6],
  0xE4: [OperationType.CPX, AddressingMode.ZEROPAGE, 3],
  0xE5: [OperationType.SBC, AddressingMode.ZEROPAGE, 3],
  0xE6: [OperationType.INC, AddressingMode.ZEROPAGE, 5],
  0xE8: [OperationType.INX, AddressingMode.IMPLIED, 2],
  0xE9: [OperationType.SBC, AddressingMode.IMMEDIATE, 2],
  0xEA: [OperationType.NOP, AddressingMode.IMPLIED, 2],
  0xEC: [OperationType.CPX, AddressingMode.ABSOLUTE, 4],
  0xED: [OperationType.SBC, AddressingMode.ABSOLUTE, 4],
  0xEE: [OperationType.INC, AddressingMode.ABSOLUTE, 6],

  0xF0: [OperationType.BEQ, AddressingMode.RELATIVE, 2], // **
  0xF1: [OperationType.SBC, AddressingMode.INDIRECT_Y, 5], // *
  0xF5: [OperationType.SBC, AddressingMode.ZEROPAGE_X, 4],
  0xF6: [OperationType.INC, AddressingMode.ZEROPAGE_X, 6],
  0xF8: [OperationType.SED, AddressingMode.IMPLIED, 2],
  0xF9: [OperationType.SBC, AddressingMode.ABSOLUTE_Y, 4], // *
  0xFD: [OperationType.SBC, AddressingMode.ABSOLUTE_X, 4], // *
  0xFE: [OperationType.INC, AddressingMode.ABSOLUTE_X, 7],
};

export function address(mode: AddressingMode, cpu: Cpu) {
  switch (mode) {
    case AddressingMode.IMPLIED:
    case AddressingMode.ACCUMULATOR:
      cpu.fetched = cpu.acc;
      return 0;
    case AddressingMode.IMMEDIATE:
      cpu.absoluteAddress = cpu.pc;
      cpu.pc += 1;
      return 0;
    case AddressingMode.ZEROPAGE:
      cpu.absoluteAddress = cpu.readPc();
      return 0;
    case AddressingMode.ZEROPAGE_X:
      cpu.absoluteAddress = cpu.readPc() + cpu.x;
      cpu.absoluteAddress &= 0x00FF;
      return 0;
    case AddressingMode.ZEROPAGE_Y:
      cpu.absoluteAddress = cpu.readPc() + cpu.y;
      cpu.absoluteAddress &= 0x00FF;
      return 0;
    case AddressingMode.ABSOLUTE: {
      const lo = cpu.readPc();
      const hi = cpu.readPc();
      cpu.absoluteAddress = (hi << 8) | lo;
      return 0;
    }
    case AddressingMode.ABSOLUTE_X: {
      const lo = cpu.readPc();
      const hi = cpu.readPc();
      cpu.absoluteAddress = (hi << 8) | lo;
      cpu.absoluteAddress += cpu.x;
      return (cpu.absoluteAddress & 0xFF00) !== (hi << 8) ? 1 : 0;
    }
    case AddressingMode.INDIRECT: {
      const lo = cpu.readPc();
      const hi = cpu.readPc();
      const ptr = (hi << 8) | lo;
      const isNewPage = lo === 0x00FF; // Emulate hardware bug (see: http://nesdev.com/6502bugs.txt)
      cpu.absoluteAddress = (cpu.read(isNewPage ? ptr & 0xFF00 : ptr + 1) << 8) | cpu.read(ptr);
      return 0;
    }
    case AddressingMode.INDIRECT_X: {
      const t = cpu.readPc();
      const lo = cpu.read((t + cpu.x) & 0x00FF);
      const hi = cpu.read((t + cpu.x + 1) & 0x00FF);
      cpu.absoluteAddress = (hi << 8) | lo;
      return 0;
    }
    case AddressingMode.INDIRECT_Y: {
      const t = cpu.readPc();
      const lo = cpu.read(t & 0x00FF);
      const hi = cpu.read((t + 1) & 0x00FF);
      cpu.absoluteAddress = (hi << 8) | lo;
      cpu.absoluteAddress += cpu.y;
      return (cpu.absoluteAddress & 0xFF00) !== (hi << 8) ? 1 : 0;
    }
    case AddressingMode.RELATIVE: {
      cpu.relativeAddress = cpu.readPc();
      if (cpu.relativeAddress & 0x80) {
        cpu.relativeAddress |= 0xFF00;
      }
      return 0;
    }
  }
  return 0;
}

function branch(condition: number | boolean, cpu: Cpu) {
  if (condition) {
    cpu.cycles += 1;
    cpu.absoluteAddress = cpu.pc = cpu.relativeAddress;
    if ((cpu.absoluteAddress & 0xFF00) !== (cpu.pc & 0xFF00)) {
      cpu.cycles += 1;
    }
    cpu.pc = cpu.absoluteAddress;
  }
  return 0;
}

export function operate(mode: AddressingMode, operation: OperationType, cpu: Cpu) {
  switch (operation) {
    case OperationType.NOP:
      return 0;
    case OperationType.LDA:
      cpu.acc = cpu.fetch();
      cpu.setZNFlags(cpu.acc);
      return 1;
    case OperationType.STA:
      cpu.write(cpu.absoluteAddress, cpu.acc);
      return 0;
    case OperationType.LDX:
      cpu.x = cpu.fetch();
      cpu.setZNFlags(cpu.x);
      return 1;
    case OperationType.STX:
      cpu.write(cpu.absoluteAddress, cpu.x);
      return 0;
    case OperationType.LDY:
      cpu.y = cpu.fetch();
      cpu.setZNFlags(cpu.y);
      return 1;
    case OperationType.STY:
      cpu.write(cpu.absoluteAddress, cpu.y);
      return 0;
    case OperationType.TAX:
      cpu.x = cpu.acc;
      cpu.setZNFlags(cpu.acc);
      return 0;
    case OperationType.TAY:
      cpu.y = cpu.acc;
      cpu.setZNFlags(cpu.y);
      return 0;
    case OperationType.TXA:
      cpu.acc = cpu.x;
      cpu.setZNFlags(cpu.acc);
      return 0;
    case OperationType.TYA:
      cpu.acc = cpu.y;
      cpu.setZNFlags(cpu.acc);
      return 0;
    case OperationType.TXS:
      cpu.stackPointer = cpu.x;
      return 0;
    case OperationType.TSX:
      cpu.x = cpu.stackPointer;
      cpu.setZNFlags(cpu.x);
      return 0;
    case OperationType.INX:
      cpu.x += 1;
      cpu.setZNFlags(cpu.x);
      return 0;
    case OperationType.INY:
      cpu.y += 1;
      cpu.setZNFlags(cpu.y);
      return 0;
    case OperationType.INC: {
      const value = cpu.fetch() + 1;
      cpu.write(cpu.absoluteAddress, value & 0x00FF);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x0000);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      return 0;
    }
    case OperationType.DEX:
      cpu.x -= 1;
      cpu.setZNFlags(cpu.x);
      return 0;
    case OperationType.DEY:
      cpu.y -= 1;
      cpu.setZNFlags(cpu.y);
    case OperationType.DEC: {
      const value = cpu.fetch() - 1;
      cpu.write(cpu.absoluteAddress, value & 0x00FF);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x0000);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      return 0;
    }
    case OperationType.ORA:
      cpu.acc = cpu.acc | cpu.fetch();
      cpu.setZNFlags(cpu.acc);
      return 1;
    case OperationType.EOR:
      cpu.acc = cpu.acc ^ cpu.fetch();
      cpu.setZNFlags(cpu.acc);
    case OperationType.AND:
      cpu.fetch();
      cpu.acc  = cpu.acc & cpu.fetched;
      cpu.setZNFlags(cpu.acc);
      return 1;
    case OperationType.ROL: {
      const value = cpu.fetch() << 1 | cpu.getFlag(Flags.CarryBit);
      cpu.setFlag(Flags.CarryBit, value & 0xFF00);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      if (mode === AddressingMode.IMPLIED) {
        cpu.acc = value & 0x00FF;
      } else {
        cpu.write(cpu.absoluteAddress, value & 0x00FF);
      }
      return 0;
    }
    case OperationType.ROR: {
      cpu.fetch();
      const value = (cpu.getFlag(Flags.CarryBit) << 7) | (cpu.fetched >> 1);
      cpu.setFlag(Flags.CarryBit, cpu.fetched & 0x01);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      if (mode === AddressingMode.IMPLIED) {
        cpu.acc = value & 0x00FF;
      } else {
        cpu.write(cpu.absoluteAddress, value & 0x00FF);
      }
      return 0;
    }
    case OperationType.ASL: {
      const value = cpu.fetch() << 1;
      cpu.setFlag(Flags.CarryBit, (value & 0xFF00) > 0);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value && 0x80);
      if (mode === AddressingMode.IMPLIED) {
        cpu.acc = value & 0x00FF;
      } else {
        cpu.write(cpu.absoluteAddress, value & 0x00FF);
      }
      return 0;
    }
    case OperationType.LSR: {
      cpu.fetch();
      cpu.setFlag(Flags.CarryBit, cpu.fetched & 0x0001);
      const value = cpu.fetched >> 1;
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      if (mode === AddressingMode.IMPLIED) {
        cpu.acc = value & 0x00FF;
      } else {
        cpu.write(cpu.absoluteAddress, value & 0x00FF);
      }
      return 0;
    }
    case OperationType.BIT: {
      cpu.fetch();
      const value = cpu.acc & cpu.fetched;
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, cpu.fetched & (1 << 7));
      cpu.setFlag(Flags.Overflow, cpu.fetched & (1 << 6));
      return 0;
    }
    case OperationType.CMP: {
      cpu.fetch();
      const value = cpu.acc - cpu.fetched;
      cpu.setFlag(Flags.CarryBit, cpu.acc >= cpu.fetched);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      return 1;
    }
    case OperationType.CPX: {
      cpu.fetch();
      const value = cpu.x - cpu.fetched;
      cpu.setFlag(Flags.CarryBit, cpu.x >= cpu.fetched);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      return 0;
    }
    case OperationType.CPY: {
      cpu.fetch();
      const value = cpu.y - cpu.fetched;
      cpu.setFlag(Flags.CarryBit, cpu.y >= cpu.fetched);
      cpu.setFlag(Flags.Zero, (value & 0x00FF) === 0x00);
      cpu.setFlag(Flags.Negative, value & 0x0080);
      return 0;
    }
    case OperationType.JMP:
      cpu.pc = cpu.absoluteAddress;
      return 0;
    case OperationType.JSR: {
      cpu.pc -= 1;
      cpu.write(cpu.stackHead, (cpu.pc >> 8) & 0x00FF);
      cpu.stackPointer -= 1;
      cpu.write(cpu.stackHead, cpu.pc & 0x00FF);
      cpu.stackPointer -= 1;
      cpu.pc = cpu.absoluteAddress;
      return 0;
    }
    case OperationType.BCS:
      return branch(cpu.getFlag(Flags.CarryBit), cpu);
    case OperationType.BCC:
      return branch(!cpu.getFlag(Flags.CarryBit), cpu);
    case OperationType.BEQ:
      return branch(cpu.getFlag(Flags.Zero), cpu);
    case OperationType.BMI:
      return branch(cpu.getFlag(Flags.Negative), cpu);
    case OperationType.BNE:
      return branch(!cpu.getFlag(Flags.Zero), cpu);
    case OperationType.BPL:
      return branch(!cpu.getFlag(Flags.Negative), cpu);
    case OperationType.BVC:
      return branch(!cpu.getFlag(Flags.Overflow), cpu);
    case OperationType.BVS:
      return branch(cpu.getFlag(Flags.Overflow), cpu);
    case OperationType.CLC:
      cpu.setFlag(Flags.CarryBit, false);
      return 0;
    case OperationType.SEC:
      cpu.setFlag(Flags.CarryBit, true);
      return 0;
    case OperationType.CLD:
      cpu.setFlag(Flags.DecimalMode, false);
      return 0;
    case OperationType.SED:
      cpu.setFlag(Flags.DecimalMode, true);
      return 0;
    case OperationType.SEI:
      cpu.setFlag(Flags.InterruptsDisable, true);
      return 0;
    case OperationType.CLI:
      cpu.setFlag(Flags.InterruptsDisable, false);
      return 0;
    case OperationType.CLV:
      cpu.setFlag(Flags.Overflow, false);
      return 0;
    case OperationType.ADC: {
      cpu.fetch();
      const t = cpu.acc + cpu.fetched + cpu.getFlag(Flags.CarryBit);
      cpu.setFlag(Flags.CarryBit, t > 255);
      cpu.setFlag(Flags.Zero, (t & 0x00FF) === 0);
      cpu.setFlag(Flags.Negative, t & 0x80);
      cpu.setFlag(Flags.Overflow, (~cpu.acc ^ cpu.fetched) & (cpu.acc ^ t) & 0x0080);
      cpu.acc = t & 0x00FF;
      return 1;
    }
    case OperationType.SBC: {
      cpu.fetch();
      const value = cpu.fetched ^ 0x00FF;
      const t = cpu.acc + value + cpu.getFlag(Flags.CarryBit);
      cpu.setFlag(Flags.CarryBit, t & 0xFF00);
      cpu.setFlag(Flags.Zero, ((t & 0x00FF) === 0));
      cpu.setFlag(Flags.Overflow, (t ^ cpu.acc) & (t ^ value) & 0x0080);
      cpu.setFlag(Flags.Negative, t & 0x0080);
      cpu.acc = t & 0x00FF;
      return 1;
    }
    case OperationType.PHA:
      cpu.write(cpu.stackHead, cpu.acc);
      cpu.stackPointer -= 1;
      return 0;
    case OperationType.PLA:
      cpu.stackPointer += 1;
      cpu.acc = cpu.read(cpu.stackHead);
      cpu.setZNFlags(cpu.acc);
      return 0;
    case OperationType.PHP:
      cpu.write(cpu.stackHead, cpu.status | Flags.Break | Flags.Unused);
      cpu.setFlag(Flags.Break, false);
      cpu.setFlag(Flags.Unused, false);
      cpu.stackPointer -= 1;
      return 0;
    case OperationType.PLP:
      cpu.stackPointer += 1;
      cpu.status = cpu.read(cpu.stackHead);
      cpu.setFlag(Flags.Unused, true);
      return 0;
    case OperationType.RTI:
      cpu.stackPointer += 1;
      cpu.status = cpu.read(cpu.stackHead);
      cpu.status &= ~Flags.Break;
      cpu.status &= ~Flags.Unused;
      cpu.stackPointer += 1;
      cpu.pc = cpu.read(cpu.stackHead);
      cpu.stackPointer += 1;
      cpu.pc |= cpu.read(cpu.stackHead) << 8;
      return 0;
    case OperationType.RTS:
      cpu.stackPointer += 1;
      cpu.pc = cpu.read(cpu.stackHead);
      cpu.stackPointer += 1;
      cpu.pc |= cpu.read(cpu.stackHead) << 8;
      cpu.pc += 1;
      return 0;
    case OperationType.BRK:
      cpu.pc += 1;
      cpu.setFlag(Flags.InterruptsDisable, true);
      cpu.write(cpu.stackHead, (cpu.pc >> 8) & 0x00FF);
      cpu.stackPointer -= 1;
      cpu.write(cpu.stackHead, cpu.pc & 0x00FF);
      cpu.stackPointer -= 1;
      cpu.setFlag(Flags.Break, true);
      cpu.write(cpu.stackHead, cpu.status);
      cpu.stackPointer -= 1;
      cpu.setFlag(Flags.Break, false);
      cpu.pc = cpu.read(0xFFFE) | (cpu.read(0xFFFF) << 8);
  }
  return 0;
}
