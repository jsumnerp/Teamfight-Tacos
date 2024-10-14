import {type RankResponse} from '../riot-api'

const tierOrder = [
  'CHALLENGER',
  'GRANDMASTER',
  'MASTER',
  'DIAMOND',
  'EMERALD',
  'PLATINUM',
  'GOLD',
  'SILVER',
  'BRONZE',
  'IRON',
]

const divisionOrder = ['I', 'II', 'III', 'IV']

export const compareRanks = (rankA: RankResponse, rankB: RankResponse) => {
  const tierComparison = tierOrder.indexOf(rankA.tier) - tierOrder.indexOf(rankB.tier)

  if (tierComparison === 0) {
    // Only compare by rank.rank if the tier is not CHALLENGER, GRANDMASTER, or MASTER
    if (!['CHALLENGER', 'GRANDMASTER', 'MASTER'].includes(rankA.tier)) {
      const divisionComparison = divisionOrder.indexOf(rankA.rank) - divisionOrder.indexOf(rankB.rank)

      if (divisionComparison !== 0) {
        return divisionComparison
      }
    }

    // If the tiers are the same, sort by leaguePoints in descending order
    return rankB.leaguePoints - rankA.leaguePoints
  }

  return tierComparison
}
