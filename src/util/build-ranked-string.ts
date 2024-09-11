import {type RankResponse} from '../riot-api'
import {getRankEmote} from './get-rank-emote'

const ranksWithNoDivisions = new Set(['CHALLENGER', 'GRANDMASTER', 'MASTER'])

export const buildRankedString = (rank: RankResponse): string => {
  const rankString = ranksWithNoDivisions.has(rank.tier)
    ? `${rank.tier} ${rank.leaguePoints} LP`
    : `${rank.tier} ${rank.rank} ${rank.leaguePoints} LP`

  return `${getRankEmote(rank.tier)} ${rankString}`
}
