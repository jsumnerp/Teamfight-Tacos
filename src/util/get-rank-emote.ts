const rankEmotes: Record<string, string> = {
  CHALLENGER: '<:challenger:1283159862976581703>',
  GRANDMASTER: '<:grandmaster:1283159782043422761>',
  MASTER: '<:master:1283159719653150861>',
  DIAMOND: '<:diamond:1283159836565049437>',
  EMERALD: '<:emerald:1283159815635599482>',
  PLATINUM: '<:platinum:1283159689407889528>',
  GOLD: '<:gold:1283159799537733713>',
  SILVER: '<:silver:1283159662392508575>',
  BRONZE: '<:bronze:1283159881968521277>',
  IRON: '<:iron:1283159745129087057>',
}

const defaultEmote = '<:unranked:1283159355092631602>'

export const getRankEmote = (rank: string): string =>
  rankEmotes[rank] ?? defaultEmote

