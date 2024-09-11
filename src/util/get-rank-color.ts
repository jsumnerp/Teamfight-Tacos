const rankColors: Record<string, number> = {
  CHALLENGER: 0x00_E0_FA,
  GRANDMASTER: 0xC7_4D_2B,
  MASTER: 0x7D_0D_D5,
  DIAMOND: 0x47_6A_C5,
  EMERALD: 0x3C_96_73,
  PLATINUM: 0x5D_AB_C6,
  GOLD: 0xFF_EE_C2,
  SILVER: 0x8C_9B_A8,
  BRONZE: 0xCA_B0_A5,
  IRON: 0xBA_AF_AC,
}

export const getRankColor = (rank: string): number =>
  rankColors[rank] ?? 0x00_00_00

