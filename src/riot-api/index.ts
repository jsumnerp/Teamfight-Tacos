import {config} from '../config'
import {getRegion} from '../util/get-region'

const {RIOT_API_KEY} = config

const fetchJson = async <T>(url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    return await response.json() as T
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    throw error
  }
}

const getLatestDdragonVersion = async () => {
  const versions = await fetchJson<string[]>('https://ddragon.leagueoflegends.com/api/versions.json')
  return versions[0]
}

type AccountResponse = {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export const getAccount = async (displayName: string, tag: string, region: string) => {
  const url = `https://${getRegion(region)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${displayName}/${tag}?api_key=${RIOT_API_KEY}`
  const account = await fetchJson<AccountResponse>(url)
  return account
}

type SummonerResponse = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export const getSummoner = async (puuid: string, region: string) => {
  const url = `https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`
  const summoner = await fetchJson<SummonerResponse>(url)

  const ddragonVersion = await getLatestDdragonVersion()
  const profilePicture = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${summoner.profileIconId}.png`

  return {summonerId: summoner.id, profilePicture}
}

export type RankResponse = {
  queueType: 'RANKED_TFT' | 'RANKED_TFT_DOUBLE_UP';
  tier: string;
  rank: string;
  leaguePoints: number;
}

export const getRanks = async (summonerId: string, region: string) => {
  const url = `https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`
  const ranks = await fetchJson<RankResponse[]>(url)
  return ranks
}
