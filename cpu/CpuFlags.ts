enum CpuFlags {
  CarryBit = (1 << 0),            // C
  Zero = (1 << 1),                // Z
  InterruptsDisable = (1 << 2),   // I
  DecimalMode = (1 << 3),         // D
  Break = (1 << 4),               // B
  Unused = (1 << 5),              // U
  Overflow = (1 << 6),            // V
  Negative = (1 << 7),            // N
}

export default CpuFlags;
