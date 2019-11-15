import Cpu from './Cpu';

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
  return 0;
}

export function operate(operation: OperationType, cpu: Cpu) {
  return 0;
}
